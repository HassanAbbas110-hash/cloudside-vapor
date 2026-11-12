/* Coil & Pod Finder: which coils, pods and tanks fit which device.
   To add or fix a device, edit one line:
     id    short code used in links (fit.html?d=xros)
     brand shown as the first choice
     name  what the customer sees
     fit   pattern matched against product names in the Coils, Pods & Tanks / Heads categories
     dev   (optional) pattern that recognises the device itself in the shop, for its photo and product-page links
     not   (optional) device names to leave out of `dev` (different pods)
     juice "salt" for pod kits, "free" for sub-ohm tanks, "both" when either works
   Matching is by product name, so new stock with the same naming shows up on its own. */
const RPM1 = "\\brpm (coil quartz|mtl mesh|mesh coil|sc |triple)"; // original RPM coils
const FITS = [
  // Vaporesso
  { id: "xros", brand: "Vaporesso", name: "XROS series (XROS 2, 3, 4, 5, Mini, Nano, Pro, Cube)", fit: "xros series", dev: "\\bxros", juice: "salt" },
  { id: "vibe", brand: "Vaporesso", name: "Vibe", fit: "vibe dual mesh pod", dev: "vaporesso vibe pod kit", juice: "salt" },
  { id: "econano", brand: "Vaporesso", name: "Eco Nano / Eco Nano Pro", fit: "eco nano", dev: "eco nano", juice: "salt" },
  { id: "luxeq", brand: "Vaporesso", name: "Luxe Q / Luxe QS", fit: "luxe q mesh pod", dev: "luxe qs?\\b", juice: "salt" },
  { id: "luxexr", brand: "Vaporesso", name: "Luxe XR / XR Max / GTX tank (Target, Gen)", fit: "luxe xr|\\bgtx\\b", dev: "luxe xr", juice: "both" },
  { id: "gt", brand: "Vaporesso", name: "NRG / SKRR / Revenger tanks (GT cores)", fit: "\\bgt\\w* core", juice: "free" },
  { id: "gti", brand: "Vaporesso", name: "iTank / Swag PX80 / Gen PT / Target PM80 (GTi coils)", fit: "gti mesh", juice: "free" },
  { id: "zero", brand: "Vaporesso", name: "Zero / Zero 2 / Renova Zero", fit: "zero mesh pod", juice: "salt" },
  { id: "osmall", brand: "Vaporesso", name: "Osmall / Osmall 2", fit: "osmall", juice: "salt" },
  { id: "armourg", brand: "Vaporesso", name: "Armour G / GS", fit: "armour g", juice: "free" },
  // Oxva
  { id: "xlim", brand: "Oxva", name: "XLIM (V2, V3, SE, C, Pro, Pro 2, SQ Pro, Go)", fit: "\\bxlim (ez )?(pod cartridge|top fill)", dev: "\\bxlim\\b", not: "3 ultra|pro 3|go lite", juice: "salt" },
  { id: "nexlim", brand: "Oxva", name: "NeXLIM / NeXLIM 2 / 2 Mini / Go", fit: "nexlim pod cartridge", dev: "nexlim", juice: "salt" },
  { id: "oxpod", brand: "Oxva", name: "Oxbar Oxpod Elite", fit: "oxpod elite pod", dev: "oxpod elite", juice: "salt" },
  // Smok
  { id: "nord", brand: "Smok", name: "Nord (original)", fit: "nord ceramic", juice: "salt" },
  { id: "nord2", brand: "Smok", name: "Nord 2", fit: "nord\\s+2 (rpm )?replacement pod|" + RPM1, dev: "nord 2\\b", juice: "salt" },
  { id: "nord4", brand: "Smok", name: "Nord 4", fit: "nord 4 rpm|rpm 2 (coil|mesh)|" + RPM1, dev: "nord 4\\b", juice: "both" },
  { id: "nord5", brand: "Smok", name: "Nord 5", fit: "nord 5 replacement pod|rpm 3 coil", dev: "nord 5\\b", juice: "both" },
  { id: "nord50", brand: "Smok", name: "Nord 50W", fit: "nord 50w|\\blp2\\b|" + RPM1, juice: "both" },
  { id: "nordc", brand: "Smok", name: "Nord C", fit: "nord c replacement pod", dev: "nord c\\b", juice: "salt" },
  { id: "nord6", brand: "Smok", name: "Nord 6", fit: "nord 6", dev: "nord 6\\b", juice: "both" },
  { id: "rpm", brand: "Smok", name: "RPM40 / RPM80 / Fetch Pro (RPM pods)", fit: "rpm 80 rgc|rpm standard pod|" + RPM1, juice: "both" },
  { id: "rpm2", brand: "Smok", name: "RPM 2 / RPM 2S", fit: "rpm 2 (replacement pod|coil|mesh)", juice: "both" },
  { id: "rpm3", brand: "Smok", name: "RPM 3 / RPM 85 / RPM 100", fit: "rpm 3", juice: "free" },
  { id: "rpm4", brand: "Smok", name: "RPM 4", fit: "rpm 4 coil|\\blp2\\b", juice: "both" },
  { id: "novo2", brand: "Smok", name: "Novo 2 / Novo 2X", fit: "novo 2", juice: "salt" },
  { id: "novo5", brand: "Smok", name: "Novo 5", fit: "novo 5", juice: "salt" },
  { id: "novo4", brand: "Smok", name: "Novo 4 / Novo 4 Mini / Nord Pro (LP1 coils)", fit: "\\blp1\\b", juice: "salt" },
  { id: "arco", brand: "Smok", name: "Arco / Arco E1", fit: "arco pod", dev: "\\barco", juice: "salt" },
  { id: "solus2", brand: "Smok", name: "Solus 2", fit: "solus 2", juice: "salt" },
  { id: "nfix", brand: "Smok", name: "Nfix", fit: "nfix", juice: "salt" },
  { id: "tfv8baby", brand: "Smok", name: "TFV8 Baby / Big Baby (V8 Baby coils)", fit: "v8 baby|baby v8", juice: "free" },
  { id: "babyv2", brand: "Smok", name: "TFV8 Baby V2 / Stick V9 (Baby V2 coils)", fit: "baby v2", juice: "free" },
  { id: "tfv9", brand: "Smok", name: "TFV9 tank", fit: "tfv9", juice: "free" },
  { id: "tfv18", brand: "Smok", name: "TFV18 tank", fit: "tfv18", juice: "free" },
  { id: "tf", brand: "Smok", name: "TF tank (BF coils)", fit: "tf tank", juice: "free" },
  { id: "prince", brand: "Smok", name: "TFV12 Prince", fit: "v12 prince", juice: "free" },
  // Geekvape
  { id: "boost", brand: "Geekvape", name: "Aegis Boost", fit: "aegis boost pod +3|\\bb0\\.\\d", dev: "aegis boost(?! plus)", juice: "both" },
  { id: "boostplus", brand: "Geekvape", name: "Aegis Boost Plus", fit: "aegis boost plus|\\bb0\\.\\d", dev: "aegis boost plus", juice: "both" },
  { id: "sonderq", brand: "Geekvape", name: "Sonder Q / Sonder Q2", fit: "\\bq pod cartridge", dev: "sonder q", juice: "salt" },
  { id: "geekz", brand: "Geekvape", name: "Z sub-ohm tank / Z Max / Zeus (Z coils)", fit: "geekvape z (0\\.|sub ohm|max)|zeus", dev: "geekvape z sub ohm", juice: "free" },
  { id: "ap2", brand: "Geekvape", name: "Aegis Pod 2 (AP2)", fit: "\\bap2\\b", juice: "both" },
  { id: "wenaxu", brand: "Geekvape", name: "Wenax U / Sonder U (U cartridges)", fit: "\\bu0\\.\\d", juice: "salt" },
  // Voopoo
  { id: "pnp", brand: "Voopoo", name: "Drag X / Drag S / Argus X / Vinci 2 (PnP coils)", fit: "\\bpnp\\s*-?\\s*(tw|dw|vm|r\\d)", juice: "both" },
  { id: "pnpx", brand: "Voopoo", name: "Drag X2 / Drag S2 / Drag X Plus (PnP-X)", fit: "\\bpnp x", juice: "both" },
  { id: "vinci3", brand: "Voopoo", name: "Vinci 3", fit: "vinci 3|\\bpnp\\s*-?\\s*(dw|vm|r\\d)", dev: "vinci 3", juice: "salt" },
  { id: "vinci", brand: "Voopoo", name: "Vinci / Vinci Air (Vinci pods)", fit: "vinci (replacement|air replacement)", juice: "salt" },
  { id: "tpp", brand: "Voopoo", name: "Drag 3 / TPP pod tank", fit: "\\btpp", juice: "free" },
  { id: "argus", brand: "Voopoo", name: "Argus G / Argus Pod", fit: "argus pod", dev: "argus g pod kit", juice: "salt" },
  { id: "argusair", brand: "Voopoo", name: "Argus Air", fit: "argus air", juice: "salt" },
  { id: "vmate", brand: "Voopoo", name: "V.Mate / V.Mate Mini / V.Thru Pro", fit: "vmate cartridge", dev: "v ?mate|v ?thru", juice: "salt" },
  // Uwell
  { id: "calg", brand: "Uwell", name: "Caliburn G / G2 / GK2 / Koko Prime", fit: "caliburn g (coil|empty)|caliburn g2", juice: "salt" },
  { id: "calg3", brand: "Uwell", name: "Caliburn G3", fit: "caliburn g3", dev: "caliburn g3(?! pod pro)", juice: "salt" },
  { id: "cala2", brand: "Uwell", name: "Caliburn A2 / AK2", fit: "caliburn a2", juice: "salt" },
  { id: "cala3", brand: "Uwell", name: "Caliburn A3 / AK3", fit: "caliburn a3", juice: "salt" },
  { id: "cal", brand: "Uwell", name: "Caliburn (original) / Koko", fit: "caliburn pod cartridge", juice: "salt" },
  { id: "calx", brand: "Uwell", name: "Caliburn X", fit: "caliburn x", juice: "salt" },
  // Others
  { id: "pixo", brand: "Aspire", name: "Pixo", fit: "pixo replacement", juice: "salt" },
  { id: "ursa", brand: "Lost Vape", name: "Ursa Nano / Ursa Baby / Ursa Mini", fit: "ursa pod", juice: "salt" },
  { id: "ub", brand: "Lost Vape", name: "Ultra Boost (UB) devices: Thelema, Centaurus, Ursa Quest", fit: "\\bub (max|mini|pro)|ultra boost", juice: "both" },
  { id: "feelin", brand: "Nevoks", name: "Feelin / Feelin 2 / Feelin Mini", fit: "feelin", juice: "salt" },
  { id: "apx", brand: "Nevoks", name: "APX S1", fit: "apx s1", juice: "salt" },
  { id: "nevoksa1", brand: "Nevoks", name: "Nevoks A1", fit: "nevoks a1", juice: "salt" },
  { id: "spl10", brand: "Nevoks", name: "Feelin X / Pagee (SPL-10 coils)", fit: "spl 10", juice: "both" },
  { id: "airspops", brand: "Airscream", name: "AirsPops Pro", fit: "airspops pro", juice: "salt" },
  { id: "rebuild", brand: "Rebuildable", name: "RTA / RDA: tanks, prebuilt coils & wire", fit: "fydo|tri aliens|wirice|wotofo a1|supermesh|micromesh|dead rabbit|destiny rta|troll x|drop rda|z – x rta|profile m|810 drip", juice: "free" }
];
// compile once
FITS.forEach((f) => { f.fitRe = new RegExp(f.fit, "i"); f.devRe = f.dev ? new RegExp(f.dev, "i") : null; f.notRe = f.not ? new RegExp(f.not, "i") : null; });
const COIL_CATS = new Set(["Coils, Pods & Tanks"]); // "Heads" is hookah bowls
const fitsFor = (fam, all) => all.filter((p) => COIL_CATS.has(p.s) && fam.fitRe.test(p.n));
const familyOfDevice = (p) => p.s === "Devices" && FITS.find((f) => f.devRe && f.devRe.test(p.n) && !(f.notRe && f.notRe.test(p.n)));
const familiesForCoil = (p) => (COIL_CATS.has(p.s) ? FITS.filter((f) => f.fitRe.test(p.n)) : []);
