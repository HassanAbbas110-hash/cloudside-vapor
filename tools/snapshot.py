"""Refresh assets/products.json from Cloudside's live WooCommerce store (in-stock only).
Run: python tools/snapshot.py   (or pass a folder of saved page JSONs to skip downloading)"""
import json, re, html, sys, glob, urllib.request, pathlib

API = "https://cloudsidevapor.co.za/wp-json/wc/store/v1/products?per_page=100&stock_status=instock&page={}"
SHARDS = 40  # must match DETAIL_SHARDS in assets/site.js
MAIN = {"Vape": "vape", "Hookah": "hookah", "Snus": "snus"}
SKIP = {"December Sale", "NEW ARRIVALS", "Uncategorized", "MTL", "Vape", "Hookah"}

def pages():
    if len(sys.argv) > 1:
        for f in sorted(glob.glob(sys.argv[1] + "/*.json")):
            yield json.load(open(f, encoding="utf-8"))
        return
    for n in range(1, 100):
        req = urllib.request.Request(API.format(n), headers={"User-Agent": "Mozilla/5.0"})
        batch = json.load(urllib.request.urlopen(req, timeout=60))
        if not batch: return
        yield batch

def text(h, cap):
    t = html.unescape(re.sub(r"<[^>]+>", " ", re.sub(r"<(script|style)[\s\S]*?</\1>", "", h or "")))
    t = re.sub(r"\s+", " ", t).strip()
    return t if len(t) <= cap else t[:cap].rsplit(" ", 1)[0] + "…"

out, details = [], {}
for batch in pages():
    for p in batch:
        if not p.get("is_in_stock") or not p.get("is_purchasable", True): continue
        cats = [html.unescape(c["name"]) for c in p["categories"]]
        main = next((MAIN[c] for c in cats if c in MAIN), "vape")
        sub = next((c for c in cats if c not in SKIP), "MTL" if "MTL" in cats else "Other")
        name = html.unescape(p["name"])
        pr = p["prices"]; div = 10 ** pr["currency_minor_unit"]
        price = int(pr["price"]) / div
        if pr.get("price_range"): price = int(pr["price_range"]["min_amount"]) / div
        if price <= 0 or price >= 100000: price = 0  # their store has typos like R399,999; shown as "Ask for price"
        puffs = re.search(r"(\d{1,3}(?:[ ,]\d{3})+|\d+(?:\.\d+)?)\s*k?\s*puffs?", name, re.I)  # "16 000 Puff", "20k puffs"
        mg = re.search(r"(\d+(?:\.\d+)?)\s*mg", name, re.I)
        img = p["images"][0] if p["images"] else {}
        attrs = {a["name"]: ", ".join(t["name"] for t in a["terms"]) for a in p["attributes"] if a.get("terms")}
        desc = text(p["short_description"] or p["description"], 700)
        details[p["id"]] = {"i": img.get("src", ""), "d": "" if desc.lower() in ("none", "") else desc, "a": attrs}
        out.append({
            "id": p["id"], "n": name, "p": price, "c": main, "s": sub,
            "b": html.unescape(p["brands"][0]["name"]) if p.get("brands") else "",
            "t": img.get("thumbnail", ""), "u": p["permalink"],
            "new": "NEW ARRIVALS" in cats, "var": p["type"] == "variable",
            "puffs": re.sub(r"[ ,]", "", puffs.group(1)) if puffs else "", "mg": mg.group(1) if mg else "",
        })

assert out, "no products downloaded"
assert sum(o["p"] > 0 for o in out) > len(out) * 0.9, "prices look wrong"
out.sort(key=lambda o: (not o["new"], not o["t"], o["n"]))
path = pathlib.Path(__file__).resolve().parent.parent / "assets" / "products.json"
path.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
# details are sharded so a product page only downloads ~1/40th of them
ddir = path.parent / "details"; ddir.mkdir(exist_ok=True)
for old in ddir.glob("*.json"): old.unlink()
for k in range(SHARDS):
    part = {i: v for i, v in details.items() if i % SHARDS == k}
    (ddir / f"{k}.json").write_text(json.dumps(part, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(f"{len(out)} in-stock products -> {path.name} ({path.stat().st_size // 1024} KB) + {SHARDS} detail shards")
