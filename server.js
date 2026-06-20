const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const csrfTokens = new Map();
const rateLimits = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

function send(res, status, body, headers = {}) {
  const baseHeaders = {
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com; form-action 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
    "X-Frame-Options": "DENY",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Cache-Control": status >= 400 ? "no-store" : "public, max-age=300"
  };
  res.writeHead(status, { ...baseHeaders, ...headers });
  res.end(body);
}

function clientId(req) {
  return crypto.createHash("sha256").update(req.socket.remoteAddress || "local").digest("hex");
}

function parseCookies(header = "") {
  return Object.fromEntries(header.split(";").map((part) => {
    const [key, ...value] = part.trim().split("=");
    return [key, value.join("=")];
  }).filter(([key]) => key));
}

function validText(value, min, max) {
  return typeof value === "string" && value.trim().length >= min && value.trim().length <= max && !/[<>]/.test(value);
}

function validEmail(value) {
  return typeof value === "string" && value.length <= 120 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validFiles(files) {
  const allowed = new Set(["jpg", "jpeg", "png", "webp", "pdf", "doc", "docx", "dwg", "dxf"]);
  if (!Array.isArray(files) || files.length > 9) return false;
  return files.every((file) => {
    if (!file || typeof file.name !== "string" || typeof file.size !== "number") return false;
    const ext = file.name.split(".").pop().toLowerCase();
    return file.name.length <= 160 && allowed.has(ext) && file.size <= 10 * 1024 * 1024 && !/[<>:"/\\|?*]/.test(file.name);
  });
}

function tooManyRequests(id) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const current = rateLimits.get(id) || [];
  const recent = current.filter((time) => now - time < windowMs);
  recent.push(now);
  rateLimits.set(id, recent);
  return recent.length > 5;
}

const server = http.createServer((req, res) => {
  if (req.headers["x-forwarded-proto"] === "http") {
    send(res, 308, "", { Location: `https://${req.headers.host}${req.url}` });
    return;
  }

  if (req.method === "GET" && req.url === "/api/csrf") {
    const id = clientId(req);
    const token = crypto.randomBytes(32).toString("hex");
    csrfTokens.set(id, token);
    send(res, 200, JSON.stringify({ csrf: token }), {
      "Content-Type": "application/json; charset=utf-8",
      "Set-Cookie": "ferinox_csrf=1; HttpOnly; SameSite=Strict; Path=/; Max-Age=3600",
      "Cache-Control": "no-store"
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/contact") {
    const id = clientId(req);
    if (tooManyRequests(id)) {
      send(res, 429, JSON.stringify({ ok: false }), { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      return;
    }
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 12000) req.destroy();
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const cookies = parseCookies(req.headers.cookie);
        const csrfOk = cookies.ferinox_csrf && csrfTokens.get(id) === data.csrf;
        const valid = csrfOk &&
          !data.website &&
          validText(data.name, 2, 80) &&
          validEmail(data.email) &&
          validText(data.projectType, 2, 80) &&
          validText(data.location, 2, 120) &&
          (!data.dimensions || validText(data.dimensions, 0, 160)) &&
          (!data.material || validText(data.material, 0, 160)) &&
          validText(data.message, 10, 1600) &&
          validFiles(data.images || []) &&
          validFiles(data.plans || []) &&
          (!data.phone || validText(data.phone, 0, 40)) &&
          data.privacy === "on";
        if (valid) csrfTokens.delete(id);
        send(res, valid ? 200 : 400, JSON.stringify({ ok: valid }), { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      } catch {
        send(res, 400, JSON.stringify({ ok: false }), { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      }
    });
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "Method not allowed", { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    return;
  }

  const urlPath = req.url.split("?")[0] === "/" ? "/index.html" : req.url.split("?")[0];
  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, safePath);
  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden", { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(root, "404.html"), (notFoundErr, notFound) => {
        send(res, 404, notFoundErr ? "Not found" : notFound, { "Content-Type": notFoundErr ? "text/plain; charset=utf-8" : "text/html; charset=utf-8", "Cache-Control": "no-store" });
      });
      return;
    }
    const ext = path.extname(filePath);
    const cache = [".png", ".svg", ".css", ".js"].includes(ext) ? "public, max-age=31536000, immutable" : "public, max-age=300";
    send(res, 200, req.method === "HEAD" ? "" : data, { "Content-Type": mimeTypes[ext] || "application/octet-stream", "Cache-Control": cache });
  });
});

server.listen(port, host, () => {
  console.log(`FERINOX site running on http://${host}:${port}`);
});
