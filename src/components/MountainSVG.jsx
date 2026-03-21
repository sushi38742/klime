// Flat illustrated mountain — matches the reference style:
// muted steel-blue sky, cream/off-white snow, blue-grey shadow faces,
// dark pine tree silhouettes, rolling cream snow hills at base.

export default function MountainSVG() {
  // Deterministic stars in the sky region only (upper ~48%)
  const stars = []
  let seed = 9876
  const rng = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  for (let i = 0; i < 55; i++) {
    const x = rng() * 1440
    const y = rng() * 420
    const r = 0.8 + rng() * 1.2
    const op = 0.35 + rng() * 0.55
    stars.push({ x, y, r, op })
  }

  return (
    <svg
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6a8eac" />
          <stop offset="55%"  stopColor="#8aaec4" />
          <stop offset="100%" stopColor="#a4c0d0" />
        </linearGradient>
        <linearGradient id="groundFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ddd8c2" />
          <stop offset="100%" stopColor="#ece8d6" />
        </linearGradient>
      </defs>

      {/* ── SKY ── */}
      <rect width="1440" height="900" fill="url(#sky)" />

      {/* Stars */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f0f4f8" opacity={s.op} />
      ))}

      {/* ── MOUNTAIN SHADOW FACE (left side, blue-grey) ── */}
      <path
        fill="#6a8da8"
        d="
          M 715 90
          L 674 127 L 633 162 L 590 198 L 545 237 L 498 280
          L 447 327 L 391 382 L 330 444 L 262 515 L 188 595
          L 105 683 L 15 773
          L 0 800 L 0 900 L 762 900
          L 762 818 L 755 738 L 745 598 L 730 448 L 720 298 L 716 178
          Z
        "
      />

      {/* ── MOUNTAIN LIT/SNOW FACE (right side, cream) ── */}
      <path
        fill="#e2dbc7"
        d="
          M 715 90
          L 716 178 L 720 298 L 730 448 L 745 598 L 755 738 L 762 818
          L 762 900 L 1440 900 L 1440 850
          L 1382 822 L 1342 792 L 1308 758 L 1272 720 L 1234 678
          L 1192 632 L 1148 584 L 1100 532 L 1050 478 L 998 422
          L 944 366 L 888 312 L 832 260 L 778 212 L 742 170
          Z
        "
      />

      {/* ── SNOW PEAK HIGHLIGHT (bright cream at the very top) ── */}
      <path
        fill="#ede7d4"
        d="
          M 715 90
          L 716 160 L 718 240
          L 726 200 L 738 270
          L 742 170 L 778 212 L 832 260
          L 844 250 L 888 312 L 944 366
          L 900 330 L 998 422
          L 985 408 L 1050 478
          L 715 90
          Z
        "
        opacity="0.5"
      />

      {/* ── SHADOW SPINE EDGE (crisp ridge between shadow and snow faces) ── */}
      <path
        fill="#c8d6e2"
        d="
          M 716 178 L 715 90 L 720 180
          L 722 300 L 732 450 L 746 600 L 757 740 L 763 820
          L 759 820 L 748 600 L 734 450 L 724 300 L 717 180
          Z
        "
        opacity="0.6"
      />

      {/* ── SNOW CHANNELS ON SHADOW FACE (snow in shadow, lighter blue-grey strips) ── */}
      <path fill="#b4c8da" opacity="0.55" d="M 700 115 L 690 135 L 652 178 L 655 190 L 694 148 L 706 128 Z" />
      <path fill="#b4c8da" opacity="0.50" d="M 672 168 L 660 190 L 610 252 L 614 266 L 665 204 L 678 182 Z" />
      <path fill="#b4c8da" opacity="0.45" d="M 635 232 L 620 258 L 558 338 L 563 354 L 628 274 L 644 248 Z" />
      <path fill="#b4c8da" opacity="0.40" d="M 592 318 L 574 348 L 496 448 L 502 466 L 582 366 L 600 336 Z" />
      <path fill="#b4c8da" opacity="0.35" d="M 538 428 L 518 462 L 420 578 L 428 596 L 528 480 L 548 446 Z" />
      <path fill="#b4c8da" opacity="0.30" d="M 470 558 L 446 596 L 330 726 L 340 744 L 456 614 L 480 576 Z" />

      {/* ── SNOW CREVICE LINES ON LIT FACE ── */}
      <path fill="none" stroke="#cec6ae" strokeWidth="2" opacity="0.5"
        d="M 730 220 Q 810 268 895 302 Q 960 328 1010 360" />
      <path fill="none" stroke="#cec6ae" strokeWidth="2" opacity="0.45"
        d="M 738 360 Q 820 408 910 448 Q 985 480 1048 518" />
      <path fill="none" stroke="#cec6ae" strokeWidth="2" opacity="0.4"
        d="M 748 510 Q 828 554 918 592 Q 992 622 1055 658" />
      <path fill="none" stroke="#cec6ae" strokeWidth="1.5" opacity="0.35"
        d="M 754 650 Q 830 690 918 724 Q 995 752 1058 782" />

      {/* ── GROUND SNOW HILLS ── */}
      {/* Back hill (slightly darker/cooler tone) */}
      <path
        fill="#d8d3be"
        d="
          M 0 840
          C 120 810 280 790 480 820 C 680 850 900 860 1100 845
          C 1260 832 1380 828 1440 830
          L 1440 900 L 0 900 Z
        "
      />
      {/* Mid hill */}
      <path
        fill="#e2dcc8"
        d="
          M 0 870
          C 80 848 200 838 380 860 C 560 882 760 888 960 876
          C 1100 866 1260 858 1440 865
          L 1440 900 L 0 900 Z
        "
      />
      {/* Front hill (warmest/lightest) */}
      <path
        fill="#ece8d6"
        d="
          M 0 900
          C 100 882 250 872 440 888 C 620 902 820 898 1020 886
          C 1180 876 1340 882 1440 888
          L 1440 900 Z
        "
      />

      {/* ── PINE TREES — LEFT CLUSTER ── */}
      {/* Each tree = 3 overlapping triangles (tiers) + trunk */}
      {[
        { cx: 62,  h: [68,52,38], base: 778 },
        { cx: 120, h: [82,64,46], base: 762 },
        { cx: 178, h: [76,58,42], base: 754 },
        { cx: 232, h: [60,46,34], base: 762 },
      ].map((t, i) => {
        const by = t.base
        const [h0, h1, h2] = t.h
        const w0 = h0 * 0.55, w1 = h1 * 0.55, w2 = h2 * 0.55
        return (
          <g key={i} fill="#2c3d4e">
            <rect x={t.cx - 3} y={by - 12} width={6} height={16} />
            <polygon points={`${t.cx},${by - h0 + 10} ${t.cx - w0},${by} ${t.cx + w0},${by}`} />
            <polygon points={`${t.cx},${by - h1 - 4} ${t.cx - w1},${by - h0 + 22} ${t.cx + w1},${by - h0 + 22}`} />
            <polygon points={`${t.cx},${by - h2 - h1 + 8} ${t.cx - w2},${by - h0 - h1 + 38} ${t.cx + w2},${by - h0 - h1 + 38}`} />
          </g>
        )
      })}

      {/* ── PINE TREES — RIGHT CLUSTER ── */}
      {[
        { cx: 1210, h: [70,54,38], base: 764 },
        { cx: 1272, h: [88,68,50], base: 752 },
        { cx: 1338, h: [78,60,44], base: 758 },
        { cx: 1395, h: [62,48,36], base: 766 },
      ].map((t, i) => {
        const by = t.base
        const [h0, h1, h2] = t.h
        const w0 = h0 * 0.55, w1 = h1 * 0.55, w2 = h2 * 0.55
        return (
          <g key={i} fill="#2c3d4e">
            <rect x={t.cx - 3} y={by - 12} width={6} height={16} />
            <polygon points={`${t.cx},${by - h0 + 10} ${t.cx - w0},${by} ${t.cx + w0},${by}`} />
            <polygon points={`${t.cx},${by - h1 - 4} ${t.cx - w1},${by - h0 + 22} ${t.cx + w1},${by - h0 + 22}`} />
            <polygon points={`${t.cx},${by - h2 - h1 + 8} ${t.cx - w2},${by - h0 - h1 + 38} ${t.cx + w2},${by - h0 - h1 + 38}`} />
          </g>
        )
      })}

      {/* A few smaller background trees */}
      {[
        { cx: 290, h: [44,34,26], base: 774, fill: '#38505f' },
        { cx: 1155, h: [48,36,28], base: 770, fill: '#38505f' },
      ].map((t, i) => {
        const by = t.base
        const [h0, h1, h2] = t.h
        const w0 = h0 * 0.55, w1 = h1 * 0.55, w2 = h2 * 0.55
        return (
          <g key={i} fill={t.fill}>
            <rect x={t.cx - 2} y={by - 10} width={4} height={14} />
            <polygon points={`${t.cx},${by - h0 + 10} ${t.cx - w0},${by} ${t.cx + w0},${by}`} />
            <polygon points={`${t.cx},${by - h1 - 4} ${t.cx - w1},${by - h0 + 22} ${t.cx + w1},${by - h0 + 22}`} />
            <polygon points={`${t.cx},${by - h2 - h1 + 8} ${t.cx - w2},${by - h0 - h1 + 38} ${t.cx + w2},${by - h0 - h1 + 38}`} />
          </g>
        )
      })}
    </svg>
  )
}
