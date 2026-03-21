export default function MountainSVG() {
  // Stars array seeded deterministically
  const stars = []
  let sx = 1234
  for (let i = 0; i < 280; i++) {
    sx = (sx * 16807 + 0) % 2147483647
    const x = (sx % 1440)
    sx = (sx * 16807 + 0) % 2147483647
    const y = (sx % 420)
    sx = (sx * 16807 + 0) % 2147483647
    const r = 0.5 + (sx % 10) * 0.12
    const op = 0.3 + (sx % 6) * 0.12
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
        {/* Sky gradient - deep navy top to slightly warmer at bottom */}
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020710" />
          <stop offset="45%" stopColor="#060e1c" />
          <stop offset="100%" stopColor="#0d1a2e" />
        </linearGradient>

        {/* Mountain shadow face (left) */}
        <linearGradient id="shadowFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f1a2c" />
          <stop offset="100%" stopColor="#0a1220" />
        </linearGradient>

        {/* Mountain lit face (right) */}
        <linearGradient id="litFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a2840" />
          <stop offset="100%" stopColor="#14203a" />
        </linearGradient>

        {/* Snow */}
        <linearGradient id="snowG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2f6ff" />
          <stop offset="100%" stopColor="#d0dff5" />
        </linearGradient>

        {/* Snow shadow */}
        <linearGradient id="snowShadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8aabcc" />
          <stop offset="100%" stopColor="#b8d0ea" />
        </linearGradient>

        {/* Campfire warm glow */}
        <radialGradient id="campGlowL" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff7020" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="campGlowR" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff8833" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
        </radialGradient>

        {/* Mist/haze layer */}
        <linearGradient id="mistG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ab0d0" stopOpacity="0" />
          <stop offset="50%" stopColor="#8ab0d0" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#8ab0d0" stopOpacity="0" />
        </linearGradient>

        {/* Warm base glow */}
        <linearGradient id="baseWarm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#201008" stopOpacity="0" />
          <stop offset="100%" stopColor="#301808" stopOpacity="0.4" />
        </linearGradient>

        {/* Clip path for mountain */}
        <clipPath id="mountainClip">
          <path d="
            M 720 62
            L 698 80 L 672 96 L 648 112 L 622 130 L 598 148
            L 572 168 L 548 188 L 522 210 L 495 234 L 466 260
            L 435 290 L 402 322 L 366 358 L 328 396 L 288 438
            L 244 484 L 196 534 L 144 590 L 85 652 L 18 720
            L 0 742 L 0 900 L 1440 900 L 1440 775
            L 1375 712 L 1312 648 L 1254 588 L 1200 534
            L 1148 482 L 1098 432 L 1050 386 L 1004 344
            L 958 302 L 912 264 L 868 228 L 826 198
            L 786 172 L 752 150 L 732 134 L 720 116 L 720 62 Z
          " />
        </clipPath>
      </defs>

      {/* ── SKY ── */}
      <rect width="1440" height="900" fill="url(#skyG)" />

      {/* Stars */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#c8d8f8" opacity={s.op} />
      ))}

      {/* Faint star glow clusters */}
      <ellipse cx="320" cy="120" rx="80" ry="40" fill="#1a2a5a" opacity="0.15" />
      <ellipse cx="1100" cy="90" rx="100" ry="50" fill="#1a2a5a" opacity="0.12" />

      {/* ── DISTANT BACKGROUND RANGES ── */}
      {/* Far range left */}
      <path
        d="M 0 700 L 50 640 L 120 665 L 180 605 L 250 640 L 330 580 L 410 615 L 480 565 L 540 595 L 590 545 L 640 570 L 680 530 L 720 550 L 720 900 L 0 900 Z"
        fill="#0c1528" opacity="0.6"
      />
      {/* Far range right */}
      <path
        d="M 720 550 L 760 525 L 820 560 L 890 510 L 960 545 L 1030 498 L 1100 528 L 1170 480 L 1240 515 L 1310 475 L 1380 510 L 1440 475 L 1440 900 L 720 900 Z"
        fill="#0c1528" opacity="0.6"
      />

      {/* ── MAIN MOUNTAIN SHADOW FACE (LEFT) ── */}
      <path
        d="
          M 720 62
          L 698 80 L 672 96 L 648 112 L 622 130 L 598 148
          L 572 168 L 548 188 L 522 210 L 495 234 L 466 260
          L 435 290 L 402 322 L 366 358 L 328 396 L 288 438
          L 244 484 L 196 534 L 144 590 L 85 652 L 18 720
          L 0 742 L 0 900 L 720 900 Z
        "
        fill="url(#shadowFace)"
      />

      {/* ── MAIN MOUNTAIN LIT FACE (RIGHT) ── */}
      <path
        d="
          M 720 62
          L 732 78 L 748 92 L 768 110 L 790 126 L 812 144
          L 834 162 L 858 182 L 882 204 L 908 228 L 934 254
          L 962 284 L 990 316 L 1020 352 L 1050 390
          L 1082 430 L 1115 472 L 1150 518 L 1186 566
          L 1224 618 L 1265 672 L 1308 726 L 1355 778
          L 1400 828 L 1440 868 L 1440 900 L 720 900 Z
        "
        fill="url(#litFace)"
      />

      {/* ── ROCK FACETS — shadow side ── */}
      {/* Upper left facets */}
      <path d="M 720 62 L 698 80 L 672 96 L 690 88 L 710 76 Z" fill="#0a1422" opacity="0.7" />
      <path d="M 672 96 L 648 112 L 662 105 L 680 100 Z" fill="#0b1525" opacity="0.6" />
      <path d="M 622 130 L 598 148 L 612 138 L 635 128 Z" fill="#0c1628" opacity="0.55" />

      {/* Mid left rock ledges */}
      <path d="M 522 210 L 495 234 L 510 228 L 535 218 Z" fill="#0d1830" opacity="0.5" />
      <path d="M 466 260 L 435 290 L 450 278 L 475 265 Z" fill="#0e1a32" opacity="0.5" />
      <path d="M 402 322 L 366 358 L 384 345 L 416 332 Z" fill="#0f1c35" opacity="0.45" />
      <path d="M 328 396 L 288 438 L 308 428 L 342 410 Z" fill="#101e38" opacity="0.4" />

      {/* Lower left rock formations */}
      <path d="M 244 484 L 196 534 L 220 522 L 258 500 Z" fill="#121f3a" opacity="0.4" />
      <path d="M 144 590 L 85 652 L 115 638 L 162 614 Z" fill="#131f3c" opacity="0.35" />

      {/* Shadow striations suggesting rock strata */}
      <path d="M 690 130 L 580 170 L 575 178 L 688 140 Z" fill="#0a1525" opacity="0.25" />
      <path d="M 650 200 L 500 258 L 496 268 L 648 212 Z" fill="#0a1525" opacity="0.2" />
      <path d="M 600 290 L 410 368 L 405 380 L 598 302 Z" fill="#0a1525" opacity="0.18" />
      <path d="M 540 395 L 295 498 L 290 510 L 536 408 Z" fill="#0a1525" opacity="0.15" />
      <path d="M 460 510 L 160 640 L 155 655 L 456 524 Z" fill="#0a1525" opacity="0.12" />

      {/* ── ROCK FACETS — lit side ── */}
      <path d="M 720 62 L 748 92 L 736 82 Z" fill="#1e3050" opacity="0.4" />
      <path d="M 812 144 L 834 162 L 820 155 L 800 142 Z" fill="#1c2e4e" opacity="0.35" />
      <path d="M 908 228 L 934 254 L 918 248 L 895 232 Z" fill="#1a2c4a" opacity="0.3" />
      <path d="M 1020 352 L 1050 390 L 1032 382 L 1005 362 Z" fill="#182848" opacity="0.3" />
      <path d="M 1150 518 L 1186 566 L 1165 558 L 1130 530 Z" fill="#162544" opacity="0.28" />

      {/* Lit side striations */}
      <path d="M 750 115 L 900 200 L 908 210 L 752 126 Z" fill="#1e3255" opacity="0.15" />
      <path d="M 790 185 L 980 298 L 988 310 L 794 196 Z" fill="#1e3255" opacity="0.12" />
      <path d="M 840 270 L 1065 406 L 1072 420 L 846 282 Z" fill="#1e3255" opacity="0.1" />

      {/* ── SECONDARY PEAK / SHOULDER ── */}
      {/* Left shoulder protrusion */}
      <path
        d="M 580 190 L 548 210 L 520 232 L 530 240 L 558 225 L 592 205 Z"
        fill="#0f1c30" opacity="0.8"
      />
      {/* Right shoulder subtlety */}
      <path
        d="M 858 200 L 882 222 L 870 218 L 845 210 Z"
        fill="#182c45" opacity="0.6"
      />

      {/* ── MIST LAYER (mid mountain ~y 320-420) ── */}
      <rect x="0" y="310" width="1440" height="130" fill="url(#mistG)" />

      {/* ── SNOW CAP ── */}
      {/* Main snow lit area */}
      <path
        d="
          M 720 62
          L 732 78 L 748 94 L 762 110 L 772 122
          L 778 136 L 770 148 L 758 155 L 742 158
          L 728 162 L 720 165
          L 710 162 L 695 158 L 680 152 L 670 142
          L 664 130 L 660 115 L 658 100
          L 668 88 L 684 76 L 700 68 Z
        "
        fill="url(#snowG)"
      />
      {/* Snow shadow (left side of cap) */}
      <path
        d="
          M 720 62
          L 700 68 L 684 76 L 668 88 L 658 100 L 660 115
          L 664 130 L 670 142 L 680 152 L 695 158 L 710 162
          L 720 165 L 720 62 Z
        "
        fill="url(#snowShadow)" opacity="0.7"
      />
      {/* Snow highlight at very tip */}
      <path d="M 720 62 L 728 72 L 720 80 L 712 72 Z" fill="#f8faff" opacity="0.9" />

      {/* Snow patches on ledges */}
      <path d="M 648 112 L 660 108 L 665 115 L 652 120 Z" fill="#d8eaff" opacity="0.6" />
      <path d="M 600 148 L 614 143 L 618 150 L 605 155 Z" fill="#d0e5ff" opacity="0.5" />
      <path d="M 798 138 L 812 134 L 815 142 L 800 146 Z" fill="#d0e5ff" opacity="0.5" />

      {/* ── TREELINE ── */}
      {/* Left treeline */}
      <path
        d="
          M 0 800 L 0 750
          L 25 725 L 38 745 L 52 718 L 68 742 L 82 710
          L 98 735 L 114 700 L 132 728 L 148 695
          L 166 720 L 182 688 L 200 714 L 218 680
          L 238 705 L 258 672 L 278 698 L 300 665
          L 322 690 L 345 658 L 368 682 L 392 652
          L 415 675 L 440 645 L 462 668 L 488 640
          L 510 662 L 535 636 L 555 658 L 578 634
          L 598 655 L 618 632 L 638 652
          L 638 900 L 0 900 Z
        "
        fill="#060e08"
      />
      {/* Right treeline */}
      <path
        d="
          M 1440 800 L 1440 750
          L 1415 722 L 1400 746 L 1384 712 L 1368 738
          L 1350 705 L 1332 730 L 1314 698 L 1295 722
          L 1275 690 L 1255 715 L 1234 684 L 1212 708
          L 1190 678 L 1168 702 L 1144 672 L 1120 696
          L 1095 668 L 1070 690 L 1045 662 L 1018 684
          L 990 657 L 962 678 L 935 652 L 908 672
          L 880 648 L 855 668 L 832 645 L 808 664
          L 808 900 L 1440 900 Z
        "
        fill="#060e08"
      />

      {/* Individual tree silhouettes in treeline (left) */}
      {[
        [90, 712, 10, 28], [130, 698, 9, 25], [175, 685, 11, 30],
        [225, 672, 8, 24], [272, 660, 10, 28], [320, 648, 9, 26],
        [368, 635, 11, 30], [415, 622, 10, 28], [460, 612, 8, 24],
        [505, 602, 9, 26], [548, 595, 10, 28],
      ].map(([cx, cy, rx, h], i) => (
        <polygon
          key={`tl${i}`}
          points={`${cx},${cy} ${cx - rx},${cy + h} ${cx + rx},${cy + h}`}
          fill="#050c07"
        />
      ))}

      {/* Individual tree silhouettes in treeline (right) */}
      {[
        [1350, 705, 10, 28], [1308, 690, 9, 25], [1262, 678, 11, 30],
        [1215, 665, 8, 24], [1168, 652, 10, 28], [1118, 640, 9, 26],
        [1068, 628, 11, 30], [1018, 615, 10, 28], [968, 605, 8, 24],
        [918, 595, 9, 26], [870, 586, 10, 28],
      ].map(([cx, cy, rx, h], i) => (
        <polygon
          key={`tr${i}`}
          points={`${cx},${cy} ${cx - rx},${cy + h} ${cx + rx},${cy + h}`}
          fill="#050c07"
        />
      ))}

      {/* ── BASE CAMP ELEMENTS ── */}
      {/* Campfire glow — left side */}
      <ellipse cx="280" cy="810" rx="90" ry="35" fill="url(#campGlowL)" />
      {/* Campfire glow — right side */}
      <ellipse cx="1160" cy="800" rx="80" ry="30" fill="url(#campGlowR)" />

      {/* Tent silhouettes */}
      <polygon points="250,825 235,848 265,848" fill="#0c1828" />
      <polygon points="278,822 260,848 296,848" fill="#0d1830" />
      <polygon points="1140,820 1123,845 1157,845" fill="#0c1828" />
      <polygon points="1168,818 1150,845 1186,845" fill="#0d1830" />
      <polygon points="1196,825 1180,848 1212,848" fill="#0c1828" />

      {/* Tent door line details */}
      <line x1="250" y1="848" x2="250" y2="836" stroke="#1a2840" strokeWidth="0.8" opacity="0.6" />
      <line x1="278" y1="848" x2="278" y2="832" stroke="#1a2840" strokeWidth="0.8" opacity="0.6" />
      <line x1="1140" y1="845" x2="1140" y2="833" stroke="#1a2840" strokeWidth="0.8" opacity="0.6" />
      <line x1="1168" y1="845" x2="1168" y2="830" stroke="#1a2840" strokeWidth="0.8" opacity="0.6" />
      <line x1="1196" y1="848" x2="1196" y2="835" stroke="#1a2840" strokeWidth="0.8" opacity="0.6" />

      {/* Base warm overlay at very bottom */}
      <rect x="0" y="750" width="1440" height="150" fill="url(#baseWarm)" />

      {/* ── ATMOSPHERIC DEPTH OVERLAY ── */}
      {/* Subtle vignette on sides */}
      <rect x="0" y="0" width="180" height="900" fill="#020710" opacity="0.15" />
      <rect x="1260" y="0" width="180" height="900" fill="#020710" opacity="0.15" />
    </svg>
  )
}
