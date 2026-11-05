#!/usr/bin/env python3
"""Conversion unique : html_traits_table / html_capacites_table de data/classes.json
→ champs structurés `traits`, `progression` et `incantation` (même logique que les anciens
parseurs JS de js/class-traits.js). Les tables HTML restent pour l'affichage.
Ajoute aussi `rituel` (booléen) à chaque sort de data/sorts.json.

Usage : python3 tools/convert_class_tables.py
"""

import json
import re
import unicodedata
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CLASSES = ROOT / "data" / "classes.json"
SORTS = ROOT / "data" / "sorts.json"

ALL_SKILLS = [
    "Acrobaties",
    "Arcanes",
    "Athlétisme",
    "Discrétion",
    "Dressage",
    "Escamotage",
    "Histoire",
    "Intimidation",
    "Intuition",
    "Investigation",
    "Médecine",
    "Nature",
    "Perception",
    "Persuasion",
    "Religion",
    "Représentation",
    "Survie",
    "Tromperie",
]


def norm(s):
    return unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower()


def clean(s):
    return re.sub(r"\s+", " ", s or "").strip()


class TableParser(HTMLParser):
    """Lignes du tableau : liste de (est_entete, [(texte, colspan), ...])."""

    def __init__(self):
        super().__init__()
        self.rows, self.row, self.cell, self.colspan, self.has_td = (
            [],
            None,
            None,
            1,
            False,
        )

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self.row, self.has_td = [], False
        elif tag in ("td", "th") and self.row is not None:
            self.cell, self.colspan = [], int(dict(attrs).get("colspan") or 1)
            self.has_td = self.has_td or tag == "td"
        elif tag == "br" and self.cell is not None:
            self.cell.append(" ")

    def handle_endtag(self, tag):
        if tag in ("td", "th") and self.cell is not None:
            self.row.append((clean("".join(self.cell)), self.colspan))
            self.cell = None
        elif tag == "tr" and self.row is not None:
            self.rows.append((not self.has_td, self.row))
            self.row = None

    def handle_data(self, data):
        if self.cell is not None:
            self.cell.append(data)


def table_rows(html):
    p = TableParser()
    p.feed(html or "")
    return p.rows


def split_list(s):
    return [x.strip() for x in re.split(r",|\bet\b", s, flags=re.I) if x.strip()]


def parse_equipment(raw):
    if not raw:
        return []
    body = raw[raw.index(":") + 1 :] if ":" in raw else raw
    options = []
    for raw_chunk in [c.strip() for c in body.split(";") if c.strip()]:
        chunk = re.sub(r"^ou\s+", "", raw_chunk, flags=re.I)
        m = re.match(r"^\(([A-C])\)\s*(.+)$", chunk)
        if not m:
            continue
        rest = m.group(2)
        last_et = rest.rfind(" et ")
        if last_et != -1:
            rest = rest[:last_et] + ", " + rest[last_et + 4 :]
        items, gold = [], 0.0
        for t in [t.strip() for t in rest.split(",") if t.strip()]:
            g = re.match(r"^(\d+(?:[.,]\d+)?)\s*po$", t, re.I)
            if g:
                gold += float(g.group(1).replace(",", "."))
                continue
            q = re.match(r"^(\d+)\s+(.+)$", t)
            qty, name = (int(q.group(1)), q.group(2)) if q else (1, t)
            items.append({"nom": name[:1].upper() + name[1:], "quantite": qty})
        options.append(
            {
                "option": m.group(1),
                "objets": items,
                "po": int(gold) if gold.is_integer() else gold,
            }
        )
    return options


def parse_traits(html):
    rows = {}
    for is_head, cells in table_rows(html):
        if not is_head and len(cells) >= 2:
            rows[norm(cells[0][0])] = cells[1][0]

    def grab(pattern):
        return next((v for k, v in rows.items() if re.search(pattern, k)), "")

    de_vie = grab(r"de de vie")
    comp_raw = grab(r"maitrises? de competence")
    m = re.match(r"(\d+)[^:]*:\s*(.+)", comp_raw)
    if m:
        competences = {"nombre": int(m.group(1)), "options": split_list(m.group(2))}
    else:
        n = re.search(r"(\d+)", comp_raw)
        competences = {
            "nombre": int(n.group(1)) if n else 2,
            "options": list(ALL_SKILLS),
        }
    return {
        "caracteristique": grab(r"caracteristique principale"),
        "de_vie": de_vie,
        "de_vie_faces": int((re.search(r"D(\d+)", de_vie, re.I) or [None, "8"])[1]),
        "sauvegardes": split_list(grab(r"jets? de sauvegarde")),
        "competences": competences,
        "armes": grab(r"maitrises? d.armes?"),
        "armures": grab(r"(maitrises? d.armures?|formation aux armures)"),
        "outils": grab(r"maitrises? d.outils?"),
        "equipement_depart": parse_equipment(grab(r"equipement de depart")),
    }


def merged_headers(rows):
    """Libellés de colonnes : les lignes d'en-tête empilées (« Conduit » + « divin »)."""
    heads = [cells for is_head, cells in rows if is_head]
    width = max((sum(c for _, c in h) for h in heads), default=0)
    labels = [""] * width
    for cells in heads:
        if len(cells) == 1 and cells[0][1] > 1:
            continue  # bandeau décoratif sur toute la largeur
        col = 0
        for text, span in cells:
            if span == 1 and text:
                labels[col] = clean(f"{labels[col]} {text}")
            col += span
    return labels


def num(s):
    d = re.sub(r"[^\d]", "", s or "")
    return int(d) if d else 0


def parse_progression(html):
    rows = table_rows(html)
    labels = merged_headers(rows)
    keys = [norm(l) for l in labels]
    slot_cols = {l: i for i, l in enumerate(labels) if re.fullmatch(r"[1-9]", l)}
    cantrips = next((i for i, k in enumerate(keys) if "mineurs" in k), None)
    prepared = next((i for i, k in enumerate(keys) if "prepares" in k), None)
    pact_lvl = next(
        (i for i, k in enumerate(keys) if "emplacements" in k and "niveau" in k), None
    )
    pact_n = next(
        (
            i
            for i, k in enumerate(keys)
            if "emplacements" in k and i != pact_lvl and not slot_cols
        ),
        None,
    )
    caster = cantrips is not None or prepared is not None or bool(slot_cols)
    spell_cols = {
        i for i in [cantrips, prepared, pact_lvl, pact_n] if i is not None
    } | set(slot_cols.values())

    progression, incantation = [], []
    for is_head, cells in rows:
        if is_head:
            continue
        texts = [t for t, _ in cells]
        level = num(texts[0]) if texts else 0
        if not level:
            continue
        caps = (
            []
            if texts[2] in ("–", "-", "")
            else [c.strip() for c in texts[2].split(",") if c.strip()]
        )
        progression.append(
            {
                "niveau": level,
                "bonus_maitrise": num(texts[1]),
                "capacites": caps,
                "colonnes": {
                    labels[i]: texts[i]
                    for i in range(3, len(texts))
                    if i < len(labels) and i not in spell_cols
                },
            }
        )
        if caster:
            pact = (
                {"nombre": num(texts[pact_n]), "niveau": num(texts[pact_lvl])}
                if pact_n is not None
                else None
            )
            incantation.append(
                {
                    "niveau": level,
                    "mineurs": num(texts[cantrips]) if cantrips is not None else 0,
                    "prepares": num(texts[prepared]) if prepared is not None else 0,
                    "emplacements": [
                        num(texts[slot_cols[str(i)]]) if str(i) in slot_cols else 0
                        for i in range(1, 10)
                    ],
                    "pacte": pact,
                }
            )
    return progression, (incantation or None)


def main():
    classes = json.loads(CLASSES.read_text(encoding="utf-8"))
    for group in classes:
        main_cls = group[0]
        main_cls["traits"] = parse_traits(main_cls.get("html_traits_table"))
        main_cls["progression"], main_cls["incantation"] = parse_progression(
            main_cls.get("html_capacites_table")
        )
    CLASSES.write_text(
        json.dumps(classes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    sorts = json.loads(SORTS.read_text(encoding="utf-8"))
    for s in sorts:
        s["rituel"] = bool(
            re.search(r"rituel", f"{s.get('temps', '')} {s.get('duree', '')}", re.I)
        )
    SORTS.write_text(
        json.dumps(sorts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(
        f"{len(classes)} classes structurées, {sum(s['rituel'] for s in sorts)} rituels sur {len(sorts)} sorts."
    )


if __name__ == "__main__":
    main()
