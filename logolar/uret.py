#!/usr/bin/env python3
"""
Proje logoları — tek kaynaktan iki biçim.

Ev tarzı akts.tr favicon'undan alındı:
  - koyu karo #0a0a0a, rx ≈ boyutun %23'ü
  - %14 opak beyaz iç kenar çizgisi (karo kenarını belli eder)
  - degradeli, yuvarlak uçlu çizgi glif

DİKKAT: gradyan `gradientUnits="userSpaceOnUse"` olmak zorunda.
Varsayılan objectBoundingBox'ta yatay bir çizginin kutu yüksekliği 0
olduğu için degrade tanımsız kalıyor ve çizgi hiç boyanmıyor —
akts.tr favicon'unda bu hata bir kez yaşanmış, yorumu orada duruyor.
"""
import pathlib

# ad -> (gradyan başı, gradyan sonu, glif yolları, çizgi kalınlığı, dolgu mu)
LOGOLAR = {
    # Aktaş Mail ve OyunHub GERÇEK markalar — uydurulmadı, sunucudaki
    # asıllarından alındı (icon-512.png ve sitenin favicon'u). Kendi
    # kimlikleri olduğu için ev karosuna sarılmıyorlar.
    "aktas-mail": ("KENDI", None, None, 0, False),
    "oyunhub":    ("KENDI", None, None, 0, False),
    "hl-pulse": (
        "#ff5c7a", "#c9184a",
        # EKG izi: düz hat → küçük P dalgası → keskin QRS → düz hat
        ['<path d="M10 34 H21 L24.5 27 L28 34 L33 12 L38 50 L42.5 34 H54"/>'],
        5.0, False,
    ),
    "spam-modeli": (
        "#5ee6a8", "#059669",
        # huni: üstte karışık gelen, altta süzülmüş tek akış
        ['<path d="M13 15 H51 L37 32 V50 L27 44 V32 Z"/>'],
        5.0, False,
    ),
    "akts": (
        "#4da3ff", "#8b6cff",
        # "A" — akts.tr'nin mevcut markası, olduğu gibi korundu
        ['<path d="M32 18 L44 45"/>', '<path d="M32 18 L20 45"/>',
         '<path d="M25 36.5 H39"/>'],
        5.4, False,
    ),
    # TrCore ve TrKit: ikisi de TrPrac'ın kendi maskotunu kullanıyor
    # (assets/trprac.png) — ikisi de o ekosistemin parçası. SVG üretilmiyor.
}

# Gerçek markaların birebir yolları
KENDI_MARKA = {
    "aktas-mail": (
        '<linearGradient id="g-am" x1="0" y1="0" x2="1" y2="1">'
        '<stop offset="0" stop-color="#5b9bff"/><stop offset="1" stop-color="#1558d6"/>'
        '</linearGradient>',
        '<rect x="2" y="2" width="60" height="60" rx="15" fill="url(#g-am)"/>'
        '<g stroke-width="5.9" stroke-linecap="round" fill="none">'
        '<path d="M32 17 L45.3 45" stroke="#fff"/>'
        '<path d="M32 17 L18.7 45" stroke="#fff"/>'
        '<path d="M24.5 36.3 H39.5" stroke="#c2e7ff"/></g>',
    ),
    "oyunhub": (
        "",
        '<rect width="64" height="64" rx="15" fill="#0a0a0a"/>'
        '<rect x="1" y="1" width="62" height="62" rx="14" fill="none" '
        'stroke="#ffffff" stroke-opacity=".14" stroke-width="2"/>'
        '<g transform="translate(8.5,9.5) scale(0.955)">'
        '<path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937'
        'a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471'
        'c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474'
        'c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471'
        'c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>'
        '</g>',
    ),
}


def glif(ad: str, renkli=True) -> str:
    """Karosuz glif — portfolyo kartlarında kartın kendi zemini üstüne oturuyor."""
    if ad in KENDI_MARKA:
        grad, govde = KENDI_MARKA[ad]
        return (f"<defs>{grad}</defs>{govde}" if grad else govde)
    bas, son, yollar, kalinlik, dolgu = LOGOLAR[ad]
    gid = f"g-{ad}"
    boya = f"url(#{gid})" if renkli else "currentColor"
    grad = (f'<linearGradient id="{gid}" gradientUnits="userSpaceOnUse" '
            f'x1="14" y1="12" x2="50" y2="52">'
            f'<stop offset="0" stop-color="{bas}"/>'
            f'<stop offset="1" stop-color="{son}"/></linearGradient>') if renkli else ""
    if dolgu:
        ic = f'<g fill="{boya}">{"".join(yollar)}</g>'
    else:
        ic = (f'<g fill="none" stroke="{boya}" stroke-width="{kalinlik}" '
              f'stroke-linecap="round" stroke-linejoin="round">{"".join(yollar)}</g>')
    return f'<defs>{grad}</defs>{ic}' if grad else ic

def karo(ad: str) -> str:
    """Karolu tam logo — GitHub README'si ve favicon için."""
    if ad in KENDI_MARKA:  # kendi karosu var, ev karosuna sarma
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" '
                f'width="64" height="64" role="img" aria-label="{ad}">{glif(ad)}</svg>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" '
            f'width="64" height="64" role="img" aria-label="{ad}">'
            f'<rect width="64" height="64" rx="15" fill="#0a0a0a"/>'
            f'<rect x="1" y="1" width="62" height="62" rx="14" fill="none" '
            f'stroke="#ffffff" stroke-opacity=".14" stroke-width="2"/>'
            f'{glif(ad)}</svg>')

if __name__ == "__main__":
    hedef = pathlib.Path("cikti"); hedef.mkdir(exist_ok=True)
    for ad in LOGOLAR:
        (hedef / f"{ad}.svg").write_text(karo(ad), encoding="utf-8")
    print(f"{len(LOGOLAR)} logo yazıldı -> {hedef}/")
