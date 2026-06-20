/* FERINOX – Frontend-Logik (rekonstruiert passend zur vorhandenen HTML- und Server-Struktur) */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
   * i18n – Deutsch ist die Vorlage und wird beim Laden aus dem DOM
   * erfasst. Hier liegen nur die Übersetzungen für FR und EN.
   * ------------------------------------------------------------- */
  var i18n = {
    fr: {
      skip: "Aller au contenu", brandSub: "Inox sur mesure", menu: "Menu",
      navServices: "Prestations", navBeforeAfter: "Avant/Après", navHistory: "Histoire",
      navRefs: "Références", navContact: "Contact",
      heroEyebrow: "Métallerie premium pour l'architecture et l'habitat",
      heroTitle: "L'architecture rencontre l'artisanat.",
      heroText: "Constructions sur mesure en métal et verre, conçues, fabriquées et installées avec précision.",
      heroCta: "Demander un projet", heroSecond: "Découvrir les prestations",
      signalCustom: "Sur mesure", signalProduction: "Fabrication interne",
      signalQuality: "Qualité supérieure", signalRegion: "Luxembourg & Grande Région",
      servicesEyebrow: "Prestations",
      servicesTitle: "Du sur-mesure pour le métal, le verre et l'architecture.",
      servicesText: "Un aperçu sélectionné des prestations : du projet résidentiel privé à la construction précise pour des projets immobiliers.",
      serviceRailings: "Garde-corps", serviceStairs: "Escaliers", serviceGlass: "Verrerie",
      serviceCanopies: "Couvertures", serviceGates: "Portails", serviceCustom: "Fabrications spéciales",
      compareEyebrow: "Avant / Après", compareTitle: "Quand la qualité devient visible.",
      before: "Avant", after: "Après",
      historyEyebrow: "Histoire / Confiance", historyTitle: "Né de l'artisanat. Prêt pour l'architecture.",
      historyText: "Familiale, expérimentée et moderne : un partenaire fiable du conseil au montage.",
      factFounded: "Entreprise familiale depuis", factTeam: "près de 30 collaborateurs",
      factHall: "Hall de production avec showroom", factRegion: "Luxembourg et Grande Région",
      advantagesEyebrow: "Points forts", advantagesTitle: "Des atouts concrets pour des projets de métallerie précis.",
      advFamily: "Entreprise familiale depuis 2004", advTeam: "Près de 30 collaborateurs",
      advProduction: "Hall de production propre", advShowroom: "Showroom à Ellange",
      advMachines: "Machines modernes", advCustom: "Fabrication sur mesure individuelle",
      advProcess: "De la planification au montage", advRegion: "Luxembourg et Grande Région",
      processEyebrow: "Déroulement du projet", processTitle: "De la première idée au montage.",
      stepConsult: "Conseil", stepConsultText: "Clarifier l'idée, les exigences et la première orientation.",
      stepPlan: "Planification", stepPlanText: "Définir les dimensions, le matériau souhaité et la solution technique.",
      stepBuild: "Fabrication", stepBuildText: "Fabrication précise dans notre propre hall de production.",
      stepDelivery: "Livraison", stepDeliveryText: "Livraison coordonnée sur le site du projet.",
      stepInstall: "Montage", stepInstallText: "Montage professionnel sur site par des équipes expérimentées.",
      stepDone: "Projet finalisé", stepDoneText: "Réalisation durable, précise jusque dans les détails.",
      refsEyebrow: "Références", refsTitle: "Des projets qui parlent d'eux-mêmes.",
      refOne: "Garde-corps en verre dans l'habitat", refOneText: "Architecture intérieure avec des détails en verre précis",
      refTwo: "Auvent en verre", refTwoText: "Entrée avec une technique inox fine",
      refThree: "Extérieur", refThreeText: "Terrasses, brise-vues et couvertines",
      refFour: "Mobilier en acier", refFourText: "Mobilier et constructions spéciales pour des espaces haut de gamme",
      refFive: "Structure de jardin", refFiveText: "Construction extérieure aux lignes épurées",
      refSix: "Système de portail", refSixText: "Portails et portillons sur mesure",
      contactEyebrow: "Contact pour vos questions",
      contactTitle: "Nous accompagnons votre projet dès le premier échange.",
      contactIntro: "Vous avez une idée, des premières mesures ou déjà des plans ? FERINOX étudie votre projet et prépare l'étape suivante.",
      quoteTitle: "Demander un devis",
      quoteLead: "Plus vous fournissez d'informations, plus la première estimation sera précise.",
      fieldName: "Nom *", fieldEmail: "E-mail *", fieldPhone: "Téléphone", fieldProjectType: "Type de projet *",
      selectProject: "Veuillez choisir", fieldLocation: "Lieu / Site du projet *",
      fieldDimensions: "Dimensions / Ampleur", fieldMaterial: "Matériau souhaité",
      fieldMessage: "Description *", fieldImages: "Télécharger des images", fieldPlans: "Télécharger des plans",
      privacyConsent: "J'accepte que mes données soient traitées pour le traitement de la demande. *",
      formNote: "Pas de cookies marketing. Aucune transmission de données aux services de cartographie sans votre action.",
      send: "Envoyer la demande", mapEyebrow: "Emplacement",
      openMap: "Ouvrir l'itinéraire avec Google Maps", planRoute: "Planifier l'itinéraire",
      mapConsentTitle: "Charger Google Maps",
      mapConsentText: "La carte interactive n'est chargée qu'après votre consentement, pour des raisons de protection des données.",
      loadMap: "Charger la carte interactive",
      cookieText: "Ce site n'utilise que des fonctions techniquement nécessaires. Les services externes ne sont chargés qu'après votre action.",
      cookieOk: "Compris",
      footerText: "Entreprise familiale luxembourgeoise spécialisée dans les constructions sur mesure en métal et verre haut de gamme.",
      footerServices: "Prestations", footerCompany: "Entreprise", footerLegal: "Mentions légales",
      imprint: "Mentions légales", privacy: "Confidentialité",
      hours: "Lundi au vendredi : 08:00-17:00<br>Samedi sur rendez-vous<br>Dimanche fermé",
      contactPerson: "Interlocuteur : équipe FERINOX"
    },
    en: {
      skip: "Skip to content", brandSub: "Stainless steel, made to measure", menu: "Menu",
      navServices: "Services", navBeforeAfter: "Before/After", navHistory: "History",
      navRefs: "References", navContact: "Contact",
      heroEyebrow: "Premium metalwork for architecture and living spaces",
      heroTitle: "Architecture meets craftsmanship.",
      heroText: "Tailor-made metal and glass constructions, precisely planned, manufactured and installed on site.",
      heroCta: "Request a project", heroSecond: "Explore services",
      signalCustom: "Bespoke work", signalProduction: "In-house production",
      signalQuality: "Highest quality", signalRegion: "Luxembourg & Greater Region",
      servicesEyebrow: "Services",
      servicesTitle: "Bespoke work for metal, glass and architecture.",
      servicesText: "A curated overview of services: from private residential projects to precisely planned constructions for real estate and building projects.",
      serviceRailings: "Railings", serviceStairs: "Stairs", serviceGlass: "Glasswork",
      serviceCanopies: "Canopies", serviceGates: "Gates", serviceCustom: "Custom fabrications",
      compareEyebrow: "Before / After", compareTitle: "When quality becomes visible.",
      before: "Before", after: "After",
      historyEyebrow: "History / Trust", historyTitle: "Grown from craft. Ready for architecture.",
      historyText: "Family-run, experienced and modernly equipped: a reliable partner from consultation to installation.",
      factFounded: "Family business since", factTeam: "nearly 30 employees",
      factHall: "Production hall with showroom", factRegion: "Luxembourg and Greater Region",
      advantagesEyebrow: "Highlights", advantagesTitle: "Concrete strengths for precise metalwork projects.",
      advFamily: "Family business since 2004", advTeam: "Nearly 30 employees",
      advProduction: "Own production hall", advShowroom: "Showroom in Ellange",
      advMachines: "Modern machinery", advCustom: "Individual bespoke fabrication",
      advProcess: "Planning to installation", advRegion: "Luxembourg and Greater Region",
      processEyebrow: "Project flow", processTitle: "From the first idea to installation.",
      stepConsult: "Consultation", stepConsultText: "Clarify the project idea, requirements and initial direction.",
      stepPlan: "Planning", stepPlanText: "Define dimensions, material preferences and the technical solution.",
      stepBuild: "Manufacturing", stepBuildText: "Precise production in our own production hall.",
      stepDelivery: "Delivery", stepDeliveryText: "Coordinated delivery to the project site.",
      stepInstall: "Installation", stepInstallText: "Professional on-site installation by experienced teams.",
      stepDone: "Finished project", stepDoneText: "Durable execution, visibly precise down to the detail.",
      refsEyebrow: "References", refsTitle: "Projects that speak for themselves.",
      refOne: "Glass railing in living space", refOneText: "Interior design with precise glass details",
      refTwo: "Glass canopy", refTwoText: "Entrance area with filigree stainless steel technology",
      refThree: "Outdoor area", refThreeText: "Terraces, privacy screens and wall coverings",
      refFour: "Steel furniture", refFourText: "Furniture and custom builds for high-end spaces",
      refFive: "Garden structure", refFiveText: "Outdoor construction with clean lines",
      refSix: "Gate system", refSixText: "Gates and wickets made to measure",
      contactEyebrow: "Contact for questions",
      contactTitle: "We support your project from the very first conversation.",
      contactIntro: "Do you have an idea, initial dimensions or plans already? FERINOX reviews your project and prepares the next step.",
      quoteTitle: "Request a quote",
      quoteLead: "The more information you provide, the more precise the initial estimate can be.",
      fieldName: "Name *", fieldEmail: "Email *", fieldPhone: "Phone", fieldProjectType: "Project type *",
      selectProject: "Please select", fieldLocation: "Location / Project site *",
      fieldDimensions: "Dimensions / Scope", fieldMaterial: "Preferred material",
      fieldMessage: "Description *", fieldImages: "Upload images", fieldPlans: "Upload plans",
      privacyConsent: "I agree that my data may be processed to handle this request. *",
      formNote: "No marketing cookies. No data transfer to map services without your action.",
      send: "Send request", mapEyebrow: "Location",
      openMap: "Open route with Google Maps", planRoute: "Plan your route",
      mapConsentTitle: "Load Google Maps",
      mapConsentText: "For privacy reasons, the interactive map is only loaded after your consent.",
      loadMap: "Load interactive map",
      cookieText: "This website only uses technically necessary functions. External services are only loaded after your action.",
      cookieOk: "Got it",
      footerText: "Luxembourg family business for high-quality, made-to-measure metal and glass constructions.",
      footerServices: "Services", footerCompany: "Company", footerLegal: "Legal",
      imprint: "Imprint", privacy: "Privacy",
      hours: "Monday to Friday: 08:00-17:00<br>Saturday by appointment<br>Sunday closed",
      contactPerson: "Contact: FERINOX team"
    }
  };

  /* Leistungs-Inhalte je Sprache + Bildergalerie (nutzt die vorhandenen Platzhalter). */
  var services = {
    railings: {
      images: ["assets/references/railing-interior-inox.png", "assets/references/terrace-railing.png", "assets/railing-after.png"],
      de: { title: "Geländer", subtitle: "Innen, außen, Glas und Edelstahl", desc: "Geländer für Innen- und Außenbereiche, präzise gefertigt aus Edelstahl, Stahl und Glas.", points: ["Innenbereich", "Außenbereich", "Glasgeländer", "Edelstahlgeländer"] },
      fr: { title: "Garde-corps", subtitle: "Intérieur, extérieur, verre et inox", desc: "Garde-corps pour intérieur et extérieur, fabriqués avec précision en inox, acier et verre.", points: ["Intérieur", "Extérieur", "Garde-corps verre", "Garde-corps inox"] },
      en: { title: "Railings", subtitle: "Indoor, outdoor, glass and stainless steel", desc: "Railings for indoor and outdoor areas, precisely manufactured from stainless steel, steel and glass.", points: ["Indoor", "Outdoor", "Glass railings", "Stainless steel railings"] }
    },
    stairs: {
      images: ["assets/references/hero-staircase-final.png", "assets/references/railing-interior-inox.png", "assets/references/showroom-table.png"],
      de: { title: "Treppen", subtitle: "Stahl, Holz und Glas kombiniert", desc: "Treppenkonstruktionen nach Maß – tragend, sicher und elegant in das Gebäude integriert.", points: ["Stahltreppen", "Wangentreppen", "Geschwungene Formen", "Handläufe"] },
      fr: { title: "Escaliers", subtitle: "Acier, bois et verre combinés", desc: "Escaliers sur mesure – porteurs, sûrs et intégrés élégamment au bâtiment.", points: ["Escaliers acier", "Escaliers à limon", "Formes courbes", "Mains courantes"] },
      en: { title: "Stairs", subtitle: "Steel, wood and glass combined", desc: "Bespoke staircase constructions – load-bearing, safe and elegantly integrated into the building.", points: ["Steel stairs", "Stringer stairs", "Curved shapes", "Handrails"] }
    },
    glass: {
      images: ["assets/references/glass-interior.png", "assets/references/glass-canopy.png", "assets/references/terrace-railing.png"],
      de: { title: "Glasbau", subtitle: "Transparenz mit Präzision", desc: "Glaskonstruktionen für Geländer, Trennwände und Vordächer mit filigraner Befestigungstechnik.", points: ["Glasgeländer", "Trennwände", "Vordächer", "Ganzglas"] },
      fr: { title: "Verrerie", subtitle: "Transparence et précision", desc: "Constructions en verre pour garde-corps, cloisons et auvents avec une fixation fine.", points: ["Garde-corps verre", "Cloisons", "Auvents", "Tout-verre"] },
      en: { title: "Glasswork", subtitle: "Transparency with precision", desc: "Glass constructions for railings, partitions and canopies with filigree fixing technology.", points: ["Glass railings", "Partitions", "Canopies", "All-glass"] }
    },
    canopies: {
      images: ["assets/references/glass-canopy.png", "assets/references/garden-structure.png", "assets/references/metal-gate.png"],
      de: { title: "Überdachungen", subtitle: "Schutz mit klarer Linie", desc: "Überdachungen und Vordächer aus Metall und Glas – wetterfest und architektonisch passend.", points: ["Terrassendächer", "Eingangsvordächer", "Carports", "Glasdächer"] },
      fr: { title: "Couvertures", subtitle: "Protection aux lignes nettes", desc: "Couvertures et auvents en métal et verre – résistants aux intempéries et adaptés à l'architecture.", points: ["Toits de terrasse", "Auvents d'entrée", "Carports", "Toits en verre"] },
      en: { title: "Canopies", subtitle: "Protection with a clean line", desc: "Canopies and porch roofs made of metal and glass – weatherproof and architecturally fitting.", points: ["Terrace roofs", "Entrance canopies", "Carports", "Glass roofs"] }
    },
    gates: {
      images: ["assets/references/metal-gate.png", "assets/references/garden-structure.png", "assets/references/terrace-railing.png"],
      de: { title: "Tore", subtitle: "Zufahrt und Zutritt nach Maß", desc: "Tore, Portillons und Zaunanlagen – funktional, sicher und gestalterisch abgestimmt.", points: ["Einfahrtstore", "Portillons", "Zäune", "Motorisierung"] },
      fr: { title: "Portails", subtitle: "Accès sur mesure", desc: "Portails, portillons et clôtures – fonctionnels, sûrs et harmonisés sur le plan esthétique.", points: ["Portails d'entrée", "Portillons", "Clôtures", "Motorisation"] },
      en: { title: "Gates", subtitle: "Access and entry made to measure", desc: "Gates, wickets and fencing – functional, secure and aesthetically coordinated.", points: ["Driveway gates", "Wickets", "Fences", "Motorisation"] }
    },
    custom: {
      images: ["assets/references/showroom-table.png", "assets/references/garden-structure.png", "assets/references/glass-interior.png"],
      de: { title: "Sonderanfertigungen", subtitle: "Wenn Standard nicht reicht", desc: "Individuelle Metall- und Stahlkonstruktionen, Möbel und Sonderbau nach Ihren Vorstellungen.", points: ["Stahlmöbel", "Schmiedeeisen", "Sichtschutz", "Sonderbau"] },
      fr: { title: "Fabrications spéciales", subtitle: "Quand le standard ne suffit pas", desc: "Constructions individuelles en métal et acier, mobilier et fabrications spéciales selon vos souhaits.", points: ["Mobilier acier", "Fer forgé", "Brise-vue", "Construction spéciale"] },
      en: { title: "Custom fabrications", subtitle: "When standard isn't enough", desc: "Individual metal and steel constructions, furniture and custom builds to your specifications.", points: ["Steel furniture", "Wrought iron", "Privacy screens", "Custom builds"] }
    }
  };

  var state = { lang: "de", service: "railings", galleryIndex: 0, csrf: "" };
  var baseline = {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* --------- i18n anwenden --------- */
  function captureBaseline() {
    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!(key in baseline)) baseline[key] = el.innerHTML;
    });
  }

  function applyLang(lang) {
    state.lang = lang;
    var dict = lang === "de" ? baseline : i18n[lang] || {};
    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = lang === "de" ? baseline[key] : (dict[key] != null ? dict[key] : baseline[key]);
      if (val != null) el.innerHTML = val;
    });
    document.documentElement.lang = lang;
    $$(".language-switcher button").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem("ferinox_lang", lang); } catch (e) {}
    renderService();
  }

  /* --------- Leistungen / Service-Showcase --------- */
  function renderService() {
    var svc = services[state.service];
    if (!svc) return;
    var loc = svc[state.lang] || svc.de;
    var img = $("[data-service-image]");
    var idx = Math.min(state.galleryIndex, svc.images.length - 1);
    if (img) {
      img.src = svc.images[idx];
      img.alt = loc.title;
    }
    var title = $("[data-service-title]");
    var subtitle = $("[data-service-subtitle]");
    var desc = $("[data-service-description]");
    var points = $("[data-service-points]");
    if (title) title.textContent = loc.title;
    if (subtitle) subtitle.textContent = loc.subtitle;
    if (desc) desc.textContent = loc.desc;
    if (points) points.innerHTML = loc.points.map(function (p) { return "<li>" + p + "</li>"; }).join("");
    $$("[data-service-gallery] button").forEach(function (b, i) {
      b.classList.toggle("is-active", i === idx);
    });
  }

  function initServices() {
    $$(".service-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.service = btn.getAttribute("data-service");
        state.galleryIndex = 0;
        $$(".service-item").forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", active ? "true" : "false");
        });
        renderService();
      });
    });
    $$("[data-service-gallery] button").forEach(function (dot) {
      dot.addEventListener("click", function () {
        state.galleryIndex = parseInt(dot.getAttribute("data-gallery-index"), 10) || 0;
        renderService();
      });
    });
  }

  /* --------- Vorher / Nachher --------- */
  function initCompare() {
    var box = $("[data-compare]");
    if (!box) return;
    var range = $(".compare-range", box);
    var after = $(".compare-after", box);
    var handle = $(".compare-handle", box);
    function setPos(v) {
      after.style.width = v + "%";
      handle.style.left = v + "%";
    }
    range.addEventListener("input", function () { setPos(range.value); });
    range.value = 50;
    setPos(50);
  }

  /* --------- Header-Scroll & Mobilmenü --------- */
  function initHeader() {
    var header = $(".site-header");
    var toggle = $(".menu-toggle");
    var menu = $(".site-menu");
    if (header) {
      var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 20); };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$("a", menu).forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* --------- Cookie-Hinweis --------- */
  function initCookie() {
    var banner = $(".cookie-banner");
    if (!banner) return;
    var ok = true;
    try { ok = localStorage.getItem("ferinox_cookie") === "1"; } catch (e) {}
    if (!ok) banner.hidden = false;
    var btn = $("[data-cookie-ok]", banner);
    if (btn) btn.addEventListener("click", function () {
      banner.hidden = true;
      try { localStorage.setItem("ferinox_cookie", "1"); } catch (e) {}
    });
  }

  /* --------- Karte (erst nach Zustimmung) --------- */
  function initMap() {
    var btn = $("[data-load-map]");
    var preview = $("[data-map-preview]");
    if (!btn || !preview) return;
    btn.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.google.com/maps?q=FERINOX%2026%20Z.A.E.%20Le%20Triangle%20Vert%205691%20Ellange%20Luxembourg&output=embed";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.title = "Google Maps – FERINOX Ellange";
      iframe.setAttribute("allowfullscreen", "");
      preview.innerHTML = "";
      preview.appendChild(iframe);
    });
  }

  /* --------- Kontaktformular (CSRF + serverseitige Validierung) --------- */
  function fileMeta(input) {
    if (!input || !input.files) return [];
    return Array.prototype.slice.call(input.files).map(function (f) {
      return { name: f.name, size: f.size };
    });
  }

  function fetchCsrf(form) {
    return fetch("/api/csrf", { credentials: "same-origin" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        state.csrf = data.csrf;
        var field = $("#csrf-token", form);
        if (field) field.value = data.csrf;
      })
      .catch(function () {});
  }

  function initContact() {
    var form = $("#contact-form");
    if (!form) return;
    fetchCsrf(form);
    var status = $(".form-status", form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var payload = {
        csrf: state.csrf,
        website: (form.website && form.website.value) || "",
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        projectType: form.projectType.value,
        location: form.location.value.trim(),
        dimensions: form.dimensions.value.trim(),
        material: form.material.value.trim(),
        message: form.message.value.trim(),
        privacy: form.privacy.checked ? "on" : "",
        images: fileMeta(form.images),
        plans: fileMeta(form.plans)
      };
      var sending = state.lang === "fr" ? "Envoi en cours…" : state.lang === "en" ? "Sending…" : "Wird gesendet…";
      var okMsg = state.lang === "fr" ? "Merci ! Votre demande a bien été reçue." : state.lang === "en" ? "Thank you! Your request has been received." : "Vielen Dank! Ihre Anfrage ist eingegangen.";
      var errMsg = state.lang === "fr" ? "Veuillez vérifier vos saisies et réessayer." : state.lang === "en" ? "Please check your input and try again." : "Bitte prüfen Sie Ihre Eingaben und versuchen Sie es erneut.";
      if (status) { status.textContent = sending; status.className = "form-status"; }
      fetch("/api/contact", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
        .then(function (data) {
          if (data && data.ok) {
            if (status) { status.textContent = okMsg; status.className = "form-status is-ok"; }
            form.reset();
            fetchCsrf(form);
          } else {
            if (status) { status.textContent = errMsg; status.className = "form-status is-error"; }
            fetchCsrf(form);
          }
        })
        .catch(function () {
          if (status) { status.textContent = errMsg; status.className = "form-status is-error"; }
        });
    });
  }

  /* --------- Sprachumschalter-Buttons --------- */
  function initLangButtons() {
    $$(".language-switcher button").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
    });
  }

  /* --------- Start --------- */
  function init() {
    captureBaseline();
    initLangButtons();
    initServices();
    initCompare();
    initHeader();
    initCookie();
    initMap();
    initContact();
    var saved = "de";
    try { saved = localStorage.getItem("ferinox_lang") || "de"; } catch (e) {}
    if (saved !== "de" && !i18n[saved]) saved = "de";
    applyLang(saved);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
