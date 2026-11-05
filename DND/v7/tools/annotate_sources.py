#!/usr/bin/env python3
"""Annotation unique : ajoute un champ `source` à chaque entrée de data/*.json.

  « SRD 5.2.1 »  contenu du System Reference Document 5.2.1 (CC-BY-4.0, redistribuable)
  « PHB 2024 » / « MM 2024 » / « DMG 2024 »  contenu hors SRD (usage privé)

Références : tools/srd/srd-5.2.1-index.json (listes anglaises officielles, Open5e srd-2024).
Les sorts ont été appariés par niveau + école (seuls les groupes en surnombre ont demandé
un tri manuel : liste NON_SRD_SPELLS) ; les monstres par PV + CA + FP + caractéristiques.

Usage : python3 tools/annotate_sources.py
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
REF = json.loads(
    (ROOT / "tools" / "srd" / "srd-5.2.1-index.json").read_text(encoding="utf-8")
)
SRD = "SRD 5.2.1"

# Sorts du PHB 2024 absents du SRD 5.2.1 (52 = 391 - 339).
NON_SRD_SPELLS = {
    "Voile défensif",
    "Amis|Faux amis",
    "Piqûre mentale",
    "Coup de tonnerre",
    "Mot de radiance",
    "Glas",
    "Fouet épineux",
    "Armure d'Agathys",
    "Grêle d'épines",
    "Tentacules de Hadar",
    "Duel forcé",
    "Châtiment de tonnerre",
    "Trait ensorcelé",
    "Châtiment de courroux",
    "Vigueur arcanique",
    "Convocation de bête",
    "Nuée de dagues",
    "Perception bestiale",
    "Couronne du dément",
    "Cordon de flèches",
    "Aura de vitalité",
    "Convocation de fée",
    "Invocation de projectiles|Hérissement",
    "Voracité de Hadar",
    "Aura du croisé",
    "Châtiment de cécité",
    "Convocation de mort-vivant",
    "État cadavérique",
    "Arme élémentaire",
    "Flèche de foudre",
    "Convocation d'aberration",
    "Convocation d'artificiel",
    "Convocation d'élémentaire",
    "Liane avide",
    "Châtiment de stupeur",
    "Fontaine de lune",
    "Sphère résiliente d'Otiluke",
    "Cercle de pouvoir",
    "Châtiment du ban",
    "Convocation de céleste",
    "Frappe du vent d'acier",
    "Invocation de volée",
    "Perturbations synaptiques",
    "Présence royale de Yolane",
    "Tempête radieuse de Jallarzi",
    "Vague destructrice",
    "Vif carquois",
    "Chaudron bouillonnant de Tasha",
    "Convocation de fiélon",
    "Portail arcanique",
    "Mot de pouvoir fortifiant",
    "Télépathie",
}

SRD_FEATS = {
    "Vigilant",
    "Initié à la magie",
    "Sauvagerie martiale",
    "Doué",
    "Amélioration de caractéristique",
    "Empoigneur",
    "Archerie",
    "Défense",
    "Arme à deux mains",
    "Combat à deux armes",
}

SRD_BACKGROUNDS = {"Acolyte", "Criminel", "Sage", "Soldat"}

SRD_CLASSES = {
    "Barbare",
    "Barde",
    "Clerc",
    "Druide",
    "Ensorceleur",
    "Guerrier",
    "Magicien",
    "Moine",
    "Occultiste",
    "Paladin",
    "Rodeur",
    "Roublard",
    "Voie du Berserker",
    "Collège du Savoir",
    "Domaine de la Vie",
    "Cercle de la Terre",
    "Sorcellerie draconique",
    "Champion",
    "Évocateur",
    "Credo de la Paume",
    "Protecteur Fiélon",
    "Serment de Dévotion",
    "Chasseur",
    "Voleur",
}

NON_SRD_MAGIC_ITEMS = {
    "Amulette de sombre éclat",
    "Amulette mécanique",
    "Armure de matelot",
}


def load(name):
    return json.loads((DATA / name).read_text(encoding="utf-8"))


def save(name, data):
    (DATA / name).write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def tag(entry, is_srd, other):
    entry["source"] = SRD if is_srd else other


def num(s):
    m = re.search(r"\d+", str(s))
    return int(m.group()) if m else None


def cr_value(s):
    s = str(s).strip()
    if "/" in s:
        a, b = s.split("/")[:2]
        return round(int(a) / int(re.sub(r"\D", "", b)), 3)
    return float(num(s) or 0)


def main():
    counts = {}

    def count(label, entries):
        counts[label] = (sum(e["source"] == SRD for e in entries), len(entries))

    sorts = load("sorts.json")
    for s in sorts:
        tag(s, s["name"] not in NON_SRD_SPELLS, "PHB 2024")
    assert sum(s["source"] == SRD for s in sorts) == len(REF["spells"]), (
        "liste de sorts SRD incohérente"
    )
    save("sorts.json", sorts)
    count("sorts", sorts)

    dons = load("dons.json")
    for d in dons:
        tag(d, d["name"] in SRD_FEATS, "PHB 2024")
    save("dons.json", dons)
    count("dons", dons)

    hist = load("historiques.json")
    for h in hist:
        tag(h, h["nom"] in SRD_BACKGROUNDS, "PHB 2024")
    save("historiques.json", hist)
    count("historiques", hist)

    classes = load("classes.json")
    flat = [c for group in classes for c in group]
    for c in flat:
        tag(c, c["classe_title"] in SRD_CLASSES, "PHB 2024")
    assert sum(c["source"] == SRD for c in flat) == len(REF["classes"]), (
        "liste de classes SRD incohérente"
    )
    save("classes.json", classes)
    count("classes + sous-classes", flat)

    species = load("species.json")
    for s in species:
        tag(s, True, "PHB 2024")
    save("species.json", species)
    count("espèces", species)

    items = load("objets_magiques.json")
    for o in items:
        tag(o, o["nom"] not in NON_SRD_MAGIC_ITEMS, "DMG 2024")
    save("objets_magiques.json", items)
    count("objets magiques", items)

    srd_creatures = {
        (c["pv"], c["ca"], round(c["fp"], 3), tuple(c["carac"]))
        for c in REF["creatures"]
    }
    monsters = load("monstres.json")
    for m in monsters:
        if "ouvrage" not in m:
            m["ouvrage"] = m.get("source")
        car = m["caracteristiques"]
        key = (
            num(m["pv"]),
            num(m["ca"]),
            cr_value(m["fp"]),
            tuple(
                int(car[k]["valeur"])
                for k in ["For", "Dex", "Con", "Int", "Sag", "Cha"]
            ),
        )
        tag(m, key in srd_creatures, "MM 2024")
    save("monstres.json", monsters)
    count("monstres", monsters)

    # Équipement et glossaire : intégralement dans le SRD 5.2.1.
    for name, lists in [
        ("armes.json", lambda d: [a for g in d["armes"] for a in g["armes"]]),
        ("armures.json", lambda d: [a for g in d["armures"] for a in g["armures"]]),
        ("outils.json", lambda d: d),
        ("materiels_aventuriers.json", lambda d: d),
        ("glossaire.json", lambda d: d["glossaire"] + d["actions"] + d["etats"]),
    ]:
        data = load(name)
        entries = lists(data)
        for e in entries:
            tag(e, True, "")
        save(name, data)
        count(name.replace(".json", ""), entries)

    for label, (srd, total) in counts.items():
        print(f"{label:28} {srd:4} SRD / {total}")


if __name__ == "__main__":
    main()
