// Generator für fehlende Bild-Assets (Platzhalter).
// Erzeugt valide PNGs (Edelstahl-/Glas-Farbverläufe) an den von der HTML referenzierten Pfaden.
// Die echten Projektfotos sollten diese Platzhalter später ersetzen.
// Ausführen mit:  node generate-assets.js
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function makePNG(width, height, painter) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // color type: truecolor RGB
  const raw = Buffer.alloc((width * 3 + 1) * height);
  let p = 0;
  const out = [0, 0, 0];
  for (let y = 0; y < height; y++) {
    raw[p++] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      painter(x, y, width, height, out);
      raw[p++] = out[0];
      raw[p++] = out[1];
      raw[p++] = out[2];
    }
  }
  const idat = zlib.deflateSync(raw, { level: 8 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v | 0);

// Diagonaler Verlauf c0 -> c1, weiches Licht-Highlight und dezente Vignette.
function painterFor(c0, c1, hl) {
  return (x, y, w, h, out) => {
    const t = (x / w) * 0.55 + (y / h) * 0.45;
    let r = lerp(c0[0], c1[0], t);
    let g = lerp(c0[1], c1[1], t);
    let b = lerp(c0[2], c1[2], t);
    if (hl) {
      const dx = x - hl.x * w;
      const dy = y - hl.y * h;
      const dist = Math.sqrt(dx * dx + dy * dy) / (hl.r * Math.max(w, h));
      const f = Math.max(0, 1 - dist) * hl.s;
      r = lerp(r, hl.c[0], f);
      g = lerp(g, hl.c[1], f);
      b = lerp(b, hl.c[2], f);
    }
    const vx = x / w - 0.5;
    const vy = y / h - 0.5;
    const vig = 1 - (vx * vx + vy * vy) * 0.55;
    out[0] = clamp(r * vig);
    out[1] = clamp(g * vig);
    out[2] = clamp(b * vig);
  };
}

const warmLight = { x: 0.7, y: 0.25, r: 0.85, s: 0.5, c: [240, 222, 188] };
const coolLight = { x: 0.32, y: 0.2, r: 0.9, s: 0.45, c: [225, 238, 245] };

const images = [
  // [relativer Pfad, breite, höhe, c0, c1, highlight]
  ["assets/references/hero-staircase-final.png", 1600, 1000, [18, 21, 26], [58, 47, 38], warmLight],
  ["assets/references/railing-interior-inox.png", 1200, 800, [120, 131, 142], [38, 44, 52], coolLight],
  ["assets/references/glass-interior.png", 1200, 800, [96, 124, 134], [28, 38, 46], coolLight],
  ["assets/references/glass-canopy.png", 1200, 800, [142, 162, 178], [58, 74, 90], coolLight],
  ["assets/references/terrace-railing.png", 1200, 800, [152, 142, 126], [70, 66, 60], warmLight],
  ["assets/references/showroom-table.png", 1200, 800, [46, 46, 54], [96, 86, 72], warmLight],
  ["assets/references/garden-structure.png", 1200, 800, [98, 112, 96], [40, 50, 42], coolLight],
  ["assets/references/metal-gate.png", 1200, 800, [72, 76, 82], [26, 28, 32], coolLight],
  // Vorher: gealtert, warm-stumpf. Nachher: sauberes, kühles Inox.
  ["assets/railing-before.png", 1200, 800, [116, 104, 86], [66, 60, 50], { x: 0.6, y: 0.3, r: 0.8, s: 0.25, c: [180, 168, 150] }],
  ["assets/railing-after.png", 1200, 800, [176, 190, 200], [92, 108, 124], coolLight]
];

for (const [rel, w, h, c0, c1, hl] of images) {
  const file = path.join(__dirname, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, makePNG(w, h, painterFor(c0, c1, hl)));
  console.log("erzeugt:", rel);
}
console.log("Fertig.");
