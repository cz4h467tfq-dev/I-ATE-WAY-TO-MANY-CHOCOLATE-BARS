/* Drawings for Bayt Kfarchima: sprites that stand in the rooms and pictures hung on the walls.
   Everything is plain SVG so it stays sharp and light. */
window.ART = (() => {
  const svg = (w, h, body, vb) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${vb || `0 0 ${w} ${h}`}" aria-hidden="true">${body}</svg>`;

  /* ---------- the ghost ---------- */
  const ghost = (pointing = true) => svg(240, 300, `
    <defs>
      <radialGradient id="gb" cx="45%" cy="35%" r="70%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".75" stop-color="#F1F5F8"/><stop offset="1" stop-color="#D7E2EA"/></radialGradient>
    </defs>
    <path d="M110 58 C164 58 190 100 190 150 L190 250 Q176 234 161 250 Q146 266 131 250 Q116 234 101 250 Q86 266 71 250 Q56 234 41 250 Q34 258 30 250 L30 150 C30 100 56 58 110 58 Z" fill="url(#gb)" opacity=".95"/>
    ${pointing ? '<path d="M184 152 Q206 146 224 132" stroke="#F1F5F8" stroke-width="20" stroke-linecap="round" fill="none"/><circle cx="226" cy="130" r="11" fill="#FFFFFF"/>' : ''}
    <path d="M36 160 Q20 178 26 196" stroke="#E9EFF3" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="86" cy="136" rx="11" ry="15" fill="#1B2430"/><ellipse cx="132" cy="136" rx="11" ry="15" fill="#1B2430"/>
    <circle cx="90" cy="131" r="4" fill="#fff"/><circle cx="136" cy="131" r="4" fill="#fff"/>
    <ellipse cx="72" cy="160" rx="11" ry="6" fill="#F4A9A0" opacity=".7"/><ellipse cx="148" cy="160" rx="11" ry="6" fill="#F4A9A0" opacity=".7"/>
    <path d="M100 166 Q110 176 120 166" stroke="#1B2430" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M74 122 L68 114 M80 120 L76 110 M140 120 L144 110 M146 122 L152 114" stroke="#1B2430" stroke-width="3" stroke-linecap="round"/>
    <g transform="translate(150 78)">
      <circle cx="0" cy="-14" r="12" fill="#D9442F"/><circle cx="13" cy="-4" r="12" fill="#D9442F"/><circle cx="8" cy="12" r="12" fill="#D9442F"/>
      <circle cx="-8" cy="12" r="12" fill="#D9442F"/><circle cx="-13" cy="-4" r="12" fill="#D9442F"/><circle cx="0" cy="0" r="8" fill="#F2B632"/>
      <path d="M-14 22 Q-26 34 -20 44 Q-8 36 -14 22 Z" fill="#2E6B3A"/>
    </g>`);

  /* ---------- sprites (stand on the floor unless noted) ---------- */
  const S = {};
  S.cedarPot = svg(300, 420, `
    <rect x="138" y="300" width="24" height="50" fill="#5B3E28"/>
    <path d="M150 20 L205 100 L178 96 L250 180 L200 174 L290 290 L10 290 L100 174 L50 180 L122 96 L95 100 Z" fill="#1E5A42"/>
    <path d="M150 20 L178 96 L150 90 Z M100 174 L150 160 L200 174 L150 184 Z" fill="#123D2C"/>
    <path d="M70 340 L230 340 L210 418 L90 418 Z" fill="#B76A43"/><rect x="62" y="330" width="176" height="18" fill="#9C5734"/>`);

  S.lantern = svg(120, 260, `
    <line x1="60" y1="0" x2="60" y2="70" stroke="#3A2B1E" stroke-width="4"/>
    <path d="M40 70 L80 70 L92 92 L28 92 Z" fill="#9C7A3C"/>
    <path d="M28 92 L92 92 L100 190 L20 190 Z" fill="#F6D58A" opacity=".95"/>
    <path d="M28 92 L92 92 L100 190 L20 190 Z" fill="none" stroke="#7C5E2A" stroke-width="5"/>
    <line x1="60" y1="92" x2="60" y2="190" stroke="#7C5E2A" stroke-width="4"/>
    <path d="M20 190 L100 190 L82 214 L38 214 Z" fill="#9C7A3C"/>
    <circle cx="60" cy="142" r="22" fill="#FFF3C4" opacity=".9"/>
    <path d="M52 214 L68 214 L60 250 Z" fill="#7C5E2A"/>`);

  S.oud = svg(300, 460, `
    <path d="M150 440 C70 440 40 360 52 290 C64 220 110 180 150 180 C190 180 236 220 248 290 C260 360 230 440 150 440 Z" fill="#8B5A2B"/>
    <path d="M150 440 C70 440 40 360 52 290" stroke="#6B3F1A" stroke-width="10" fill="none"/>
    <circle cx="150" cy="300" r="26" fill="#3E2614"/><circle cx="150" cy="300" r="34" fill="none" stroke="#C9A25E" stroke-width="5"/>
    <rect x="138" y="70" width="24" height="120" fill="#5A3A20"/>
    <path d="M136 72 L118 18 L150 8 L164 70 Z" fill="#4A2E18"/>
    <g fill="#C9A25E"><circle cx="122" cy="30" r="6"/><circle cx="128" cy="48" r="6"/><circle cx="160" cy="24" r="6"/><circle cx="164" cy="44" r="6"/></g>
    <g stroke="#EEDDB0" stroke-width="2"><line x1="144" y1="70" x2="144" y2="395"/><line x1="150" y1="70" x2="150" y2="395"/><line x1="156" y1="70" x2="156" y2="395"/></g>
    <rect x="120" y="388" width="60" height="10" fill="#3E2614"/>`);

  S.drum = svg(220, 300, `
    <ellipse cx="110" cy="40" rx="92" ry="26" fill="#EFE3C6"/>
    <path d="M18 40 C18 110 80 140 82 190 L74 290 L146 290 L138 190 C140 140 202 110 202 40 Z" fill="#B88B3E"/>
    <path d="M30 60 C60 90 160 90 190 60" stroke="#7A5A22" stroke-width="6" fill="none"/>
    <path d="M60 120 C90 140 130 140 160 120" stroke="#7A5A22" stroke-width="5" fill="none"/>
    <ellipse cx="110" cy="290" rx="38" ry="10" fill="#7A5A22"/>
    <ellipse cx="110" cy="40" rx="92" ry="26" fill="none" stroke="#7A5A22" stroke-width="6"/>`);

  S.radio = svg(320, 360, `
    <rect x="40" y="250" width="240" height="110" fill="#5E4330"/><rect x="40" y="250" width="240" height="14" fill="#4A3324"/>
    <path d="M40 250 L40 120 Q40 30 160 30 Q280 30 280 120 L280 250 Z" fill="#8A5E3B"/>
    <path d="M70 230 L70 130 Q70 64 160 64 Q250 64 250 130 L250 230 Z" fill="#D8C296"/>
    <g stroke="#8A5E3B" stroke-width="5">${[90, 110, 130, 150, 170, 190, 210].map((y) => `<line x1="74" y1="${y}" x2="246" y2="${y}"/>`).join('')}</g>
    <circle cx="110" cy="236" r="9" fill="#2E2016"/><circle cx="210" cy="236" r="9" fill="#2E2016"/>`);

  S.mezze = svg(560, 300, `
    <rect x="20" y="120" width="520" height="28" fill="#7A5232"/>
    <rect x="50" y="148" width="22" height="150" fill="#5E3E25"/><rect x="488" y="148" width="22" height="150" fill="#5E3E25"/>
    <rect x="30" y="104" width="500" height="20" fill="#EDE3CF"/>
    <ellipse cx="100" cy="98" rx="54" ry="14" fill="#E9E1D2"/><ellipse cx="100" cy="92" rx="40" ry="10" fill="#E3C27B"/>
    <ellipse cx="220" cy="98" rx="54" ry="14" fill="#E9E1D2"/><ellipse cx="220" cy="90" rx="40" ry="12" fill="#5D9A45"/><circle cx="210" cy="86" r="5" fill="#D9442F"/><circle cx="232" cy="88" r="5" fill="#D9442F"/>
    <ellipse cx="340" cy="98" rx="54" ry="14" fill="#E9E1D2"/><ellipse cx="340" cy="91" rx="40" ry="10" fill="#E8D3A0"/><circle cx="340" cy="89" r="6" fill="#7C9A3C"/>
    <ellipse cx="460" cy="98" rx="54" ry="14" fill="#E9E1D2"/><ellipse cx="460" cy="91" rx="40" ry="10" fill="#E07A2E"/>
    <path d="M150 60 Q160 40 150 20 M330 64 Q340 44 330 24" stroke="#fff" stroke-width="4" fill="none" opacity=".6"/>`);

  S.rakweh = svg(260, 260, `
    <path d="M60 110 L170 110 L160 220 Q115 240 70 220 Z" fill="#C8A04A"/>
    <path d="M60 110 L170 110 L176 96 L54 96 Z" fill="#E2BD62"/>
    <path d="M54 96 L30 82 L40 110 Z" fill="#C8A04A"/>
    <path d="M168 140 L250 120 L252 132 L170 156 Z" fill="#4A3324"/>
    <ellipse cx="115" cy="230" rx="70" ry="12" fill="#3A2B1E" opacity=".25"/>
    <g><path d="M190 200 L230 200 L226 230 L194 230 Z" fill="#F4EEDD"/><path d="M190 200 L230 200" stroke="#2F6FD6" stroke-width="4"/></g>
    <path d="M100 80 Q110 60 100 40 M130 84 Q140 64 130 44" stroke="#aaa" stroke-width="4" fill="none" opacity=".6"/>`);

  S.bookshelf = svg(360, 520, `
    <rect x="20" y="10" width="320" height="510" fill="#5E4330"/>
    <rect x="36" y="26" width="288" height="478" fill="#3E2C1F"/>
    ${[0, 1, 2, 3].map((r) => `<rect x="36" y="${140 + r * 120}" width="288" height="14" fill="#5E4330"/>`).join('')}
    ${[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5, 6, 7, 8].map((b) => {
      const colors = ['#8E1D17', '#1E5A42', '#2B5D8A', '#C9A25E', '#6B4A8C', '#B76A43'];
      const w = 22 + ((b * 7 + r * 3) % 4) * 4, x = 44 + b * 30, hgt = 80 + ((b + r) % 3) * 12;
      return x + w < 320 ? `<rect x="${x}" y="${140 + r * 120 - hgt}" width="${w}" height="${hgt}" fill="${colors[(b + r) % 6]}"/>` : '';
    }).join('')).join('')}`);

  S.crafts = svg(460, 330, `
    <rect x="20" y="170" width="420" height="24" fill="#7A5232"/>
    <rect x="44" y="194" width="20" height="136" fill="#5E3E25"/><rect x="396" y="194" width="20" height="136" fill="#5E3E25"/>
    <path d="M80 170 C60 120 70 70 100 60 L100 40 L130 40 L130 60 C160 70 170 120 150 170 Z" fill="#2B5D8A"/>
    <path d="M86 120 C110 130 130 130 146 120" stroke="#F2E6C8" stroke-width="6" fill="none"/>
    <rect x="200" y="130" width="70" height="40" fill="#E8DDB5"/><rect x="214" y="100" width="70" height="30" fill="#D9CC98"/>
    <rect x="300" y="110" width="110" height="60" fill="#D9D4C8"/><path d="M300 125 L410 125 M300 145 L410 145" stroke="#BDB6A6" stroke-width="3"/>`);

  S.desk = svg(420, 330, `
    <rect x="20" y="130" width="380" height="24" fill="#B98E5A"/>
    <rect x="40" y="154" width="18" height="170" fill="#4D4D4D"/><rect x="362" y="154" width="18" height="170" fill="#4D4D4D"/>
    <rect x="60" y="100" width="120" height="30" fill="#F5F1E4"/><path d="M70 110 L170 110 M70 120 L150 120" stroke="#9AA" stroke-width="3"/>
    <rect x="230" y="70" width="44" height="60" fill="#2F6FD6"/><rect x="278" y="84" width="36" height="46" fill="#B3261E"/>
    <path d="M330 130 L336 60 L344 60 L350 130 Z" fill="#E2B33A"/>`);

  S.schoolbag = svg(260, 300, `
    <path d="M70 70 Q70 30 130 30 Q190 30 190 70" stroke="#7A3B2E" stroke-width="12" fill="none"/>
    <rect x="40" y="70" width="180" height="220" rx="0" fill="#B3261E"/>
    <rect x="60" y="170" width="140" height="90" fill="#8E1D17"/>
    <rect x="40" y="70" width="180" height="40" fill="#8E1D17"/>
    <rect x="118" y="100" width="24" height="20" fill="#E2B33A"/>`);

  S.teacherDesk = svg(520, 360, `
    <rect x="20" y="150" width="480" height="30" fill="#6B4A30"/>
    <rect x="40" y="180" width="160" height="176" fill="#5E3E25"/><rect x="330" y="180" width="150" height="176" fill="#5E3E25"/>
    <g stroke="#8A6A4C" stroke-width="4" fill="none"><rect x="56" y="200" width="128" height="62"/><rect x="56" y="276" width="128" height="62"/></g>
    <path d="M220 136 L330 120 L340 146 L230 150 Z" fill="#FBFAF4"/><path d="M232 138 L322 126" stroke="#B3261E" stroke-width="3"/>
    <path d="M400 150 L410 70 L440 70 L450 150 Z" fill="#1E5A42"/><path d="M398 70 L452 70 L440 40 L410 40 Z" fill="#E2B33A"/>
    <circle cx="120" cy="130" r="20" fill="#F4EEDD"/><path d="M140 124 Q156 128 142 140" stroke="#F4EEDD" stroke-width="6" fill="none"/>`);

  S.forms = svg(300, 300, `
    <rect x="60" y="150" width="180" height="150" fill="#5E4330"/>
    <path d="M70 150 L80 60 L220 50 L230 150 Z" fill="#FBFAF4"/><path d="M90 80 L200 72 M92 100 L190 94 M94 120 L170 116" stroke="#9AA" stroke-width="4"/>
    <path d="M100 150 L110 80 L240 90 L236 150 Z" fill="#F3EEDD"/>
    <path d="M100 150 L118 110 L236 118 L236 150 Z" fill="#E7DFC8"/>
    <rect x="150" y="128" width="40" height="10" fill="#B3261E"/>`);

  S.schoolModel = svg(320, 420, `
    <rect x="20" y="300" width="280" height="24" fill="#7A5232"/>
    <rect x="44" y="324" width="18" height="96" fill="#5E3E25"/><rect x="258" y="324" width="18" height="96" fill="#5E3E25"/>
    <rect x="70" y="270" width="180" height="30" fill="#2B6A9E"/>
    <rect x="70" y="226" width="180" height="44" fill="#E4E2DA"/><rect x="66" y="262" width="188" height="8" fill="#2F6FD6"/>
    <rect x="70" y="182" width="180" height="44" fill="#E4E2DA"/><rect x="66" y="218" width="188" height="8" fill="#D94C8A"/>
    <rect x="70" y="138" width="180" height="44" fill="#E4E2DA"/><rect x="66" y="174" width="188" height="8" fill="#7B4BC4"/>
    <rect x="70" y="94" width="180" height="44" fill="#E4E2DA"/><rect x="66" y="130" width="188" height="8" fill="#1E7A52"/>
    ${[0, 1, 2, 3].map((f) => [0, 1, 2, 3].map((w) => `<rect x="${86 + w * 40}" y="${104 + f * 44}" width="22" height="22" fill="#22384C"/>`).join('')).join('')}
    <rect x="64" y="86" width="192" height="10" fill="#5D9A45"/>
    <path d="M100 86 L112 50 L124 86 Z M150 86 L164 40 L178 86 Z" fill="#1E5A42"/>
    <rect x="200" y="70" width="40" height="8" fill="#1B2A44" transform="rotate(-12 220 74)"/>`);

  S.students = svg(520, 420, `
    ${[[70, '#2F6FD6'], [170, '#D94C8A'], [270, '#7B4BC4'], [370, '#1E7A52'], [455, '#B3261E']].map(([x, c], i) => {
      const h = 330 + (i % 2) * 20;
      return `<circle cx="${x}" cy="${420 - h}" r="34" fill="#3A2B1E"/>
        <path d="M${x - 46} ${420 - h + 40} Q${x} ${420 - h + 20} ${x + 46} ${420 - h + 40} L${x + 52} 420 L${x - 52} 420 Z" fill="${c}"/>`;
    }).join('')}`);

  S.plant = svg(200, 300, `
    <path d="M50 200 L150 200 L136 296 L64 296 Z" fill="#B76A43"/><rect x="44" y="192" width="112" height="14" fill="#9C5734"/>
    <path d="M100 196 C90 140 50 120 30 70 M100 196 C110 130 150 110 170 60 M100 196 C100 140 100 100 98 40" stroke="#2E6B3A" stroke-width="8" fill="none"/>
    <g fill="#D9442F"><circle cx="30" cy="66" r="18"/><circle cx="170" cy="56" r="18"/><circle cx="98" cy="36" r="18"/><circle cx="60" cy="110" r="14"/><circle cx="140" cy="100" r="14"/></g>`);

  S.bunting = svg(1400, 200, `
    <path d="M0 20 Q700 120 1400 20" stroke="#5E4330" stroke-width="5" fill="none"/>
    ${[['#1E7A52', 'لبنان'], ['#2F6FD6', 'Україна'], ['#D94C8A', 'България'], ['#B3261E', 'Türkiye']].map(([c, t], i) => {
      const x = 175 + i * 350, y = 20 + 100 * (1 - Math.pow((x - 700) / 700, 2)) * 0.98;
      return `<path d="M${x - 120} ${y} L${x + 120} ${y} L${x} ${y + 150} Z" fill="${c}"/>
        <text x="${x}" y="${y + 52}" text-anchor="middle" font-family="Reem Kufi, Tahoma, sans-serif" font-size="40" font-weight="700" fill="#fff">${t}</text>`;
    }).join('')}`);

  /* ---------- wall art ---------- */
  const W = {};
  W.calligraphy = `<div class="art-calli"><span lang="ar">أهلا وسهلا</span><small>Ahlan wa sahlan · Welcome</small></div>`;
  W.logo = `<div class="art-frame art-logo"><b><i style="color:#1E7A52">W</i><i style="color:#E2A21E">E</i><i style="color:#2F6FD6">L</i><i style="color:#B3261E">N</i><i style="color:#7B4BC4">O</i><i style="color:#D94C8A">V</i><i style="color:#1E7A52">A</i></b><span>WELL &amp; NOVA</span></div>`;
  W.window = `<div class="art-window">${svg(560, 760, `
    <defs><clipPath id="wa"><path d="M40 760 V300 Q40 120 280 40 Q520 120 520 300 V760 Z"/></clipPath></defs>
    <g clip-path="url(#wa)">
      <rect width="560" height="760" fill="#9CC6E6"/>
      <path d="M0 430 L110 350 L220 400 L330 300 L450 370 L560 330 L560 560 L0 560 Z" fill="#7E9C8C"/>
      <path d="M0 430 L80 400 L140 420" stroke="#F4F7F8" stroke-width="14" fill="none"/>
      <path d="M300 310 L330 300 L360 318" stroke="#F4F7F8" stroke-width="14" fill="none"/>
      <rect y="560" width="560" height="60" fill="#2B5D8A"/><rect y="620" width="560" height="140" fill="#C9A27E"/>
      <circle cx="430" cy="170" r="46" fill="#FFF0B8"/>
    </g>
    <path d="M40 760 V300 Q40 120 280 40 Q520 120 520 300 V760" fill="none" stroke="#C4BBA4" stroke-width="34"/>
    <line x1="280" y1="70" x2="280" y2="760" stroke="#5E4330" stroke-width="12"/>
    <rect x="0" y="720" width="560" height="40" fill="#BAB199"/>`)}</div>`;
  W.ship = `<div class="art-frame">${svg(700, 440, `
    <rect width="700" height="440" fill="#E7D9B4"/>
    <rect y="300" width="700" height="140" fill="#2B5D8A"/><path d="M0 320 Q60 306 120 320 T240 320 T360 320 T480 320 T600 320 T720 320" stroke="#BFD8EA" stroke-width="5" fill="none"/>
    <path d="M140 300 L560 300 Q520 360 200 360 Q160 340 140 300 Z" fill="#6B3F1A"/>
    <path d="M560 300 Q600 260 590 220" stroke="#6B3F1A" stroke-width="14" fill="none"/>
    <line x1="350" y1="300" x2="350" y2="70" stroke="#4A2E18" stroke-width="10"/>
    <path d="M230 90 L470 90 L460 250 L240 250 Z" fill="#F4EEDD"/>
    <path d="M230 120 L470 120 M234 170 L466 170 M238 220 L462 220" stroke="#B3261E" stroke-width="10"/>
    <g fill="#8A5E3B">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${200 + i * 55}" y="330" width="8" height="60" transform="rotate(25 ${204 + i * 55} 330)"/>`).join('')}</g>
    <text x="350" y="425" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#F4EEDD">A Phoenician ship of Byblos</text>`)}</div>`;
  W.map = `<div class="art-frame">${svg(700, 520, `
    <rect width="700" height="520" fill="#EFE7D2"/>
    <path d="M0 0 L250 0 C230 80 200 120 220 190 C240 260 180 300 200 380 C215 440 170 480 180 520 L0 520 Z" fill="#9CC6E6"/>
    <path d="M250 0 C230 80 200 120 220 190 C240 260 180 300 200 380 C215 440 170 480 180 520" stroke="#2B5D8A" stroke-width="5" fill="none"/>
    <path d="M420 40 Q470 160 450 260 Q430 360 480 500" stroke="#B5A58A" stroke-width="40" fill="none" opacity=".6"/>
    <circle cx="245" cy="200" r="12" fill="#15191A"/><text x="268" y="196" font-family="Work Sans, Arial" font-size="28" fill="#15191A">Beirut</text>
    <circle cx="300" cy="262" r="16" fill="#B3261E"/><circle cx="300" cy="262" r="30" fill="none" stroke="#B3261E" stroke-width="4"/>
    <text x="336" y="270" font-family="Work Sans, Arial" font-weight="600" font-size="32" fill="#B3261E">Kfarchima</text>
    <text x="40" y="300" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#2B5D8A">Mediterranean</text>
    <text x="430" y="470" font-family="Georgia, serif" font-style="italic" font-size="24" fill="#6E6450">Mount Lebanon</text>
    <path d="M620 60 L640 20 L660 60 M640 20 L640 110" stroke="#15191A" stroke-width="5" fill="none"/><text x="630" y="140" font-family="Work Sans, Arial" font-size="24">N</text>`)}</div>`;
  W.sepia = (label) => `<div class="art-frame art-sepia">${svg(360, 440, `
    <rect width="360" height="440" fill="#CDB98E"/>
    <path d="M0 300 L80 220 L160 260 L250 170 L360 240 L360 440 L0 440 Z" fill="#A99268"/>
    <rect x="60" y="250" width="70" height="80" fill="#8E7650"/><path d="M60 250 L95 220 L130 250 Z" fill="#7A6342"/>
    <rect x="200" y="270" width="90" height="70" fill="#8E7650"/><path d="M200 270 L245 236 L290 270 Z" fill="#7A6342"/>
    <text x="180" y="420" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#4A3B22">${label}</text>`)}</div>`;
  W.records = `<div class="art-records">${[0, 1, 2].map((i) => `<div>${svg(240, 240, `
    <circle cx="120" cy="120" r="116" fill="#15191A"/><circle cx="120" cy="120" r="96" fill="none" stroke="#2A2F31" stroke-width="3"/>
    <circle cx="120" cy="120" r="76" fill="none" stroke="#2A2F31" stroke-width="3"/>
    <circle cx="120" cy="120" r="40" fill="${['#B3261E', '#E2B33A', '#1E5A42'][i]}"/><circle cx="120" cy="120" r="6" fill="#ECEDE6"/>`)}</div>`).join('')}</div>`;
  W.jars = `<div class="art-shelf">${svg(1100, 300, `
    <rect y="250" width="1100" height="26" fill="#6B4A30"/>
    ${[['#7C9A3C', 'زعتر'], ['#C64B2E', 'سماق'], ['#E2B33A', 'كمون'], ['#8E1D17', 'دبس'], ['#D9CC98', 'برغل'], ['#5D3A1A', 'قهوة']].map(([c, t], i) => `
      <rect x="${40 + i * 175}" y="110" width="120" height="140" fill="#E9F0F2" opacity=".85"/>
      <rect x="${40 + i * 175}" y="150" width="120" height="100" fill="${c}"/>
      <rect x="${34 + i * 175}" y="92" width="132" height="22" fill="#9C7A3C"/>
      <rect x="${55 + i * 175}" y="170" width="90" height="44" fill="#F4EEDD"/>
      <text x="${100 + i * 175}" y="203" text-anchor="middle" font-family="Reem Kufi, Tahoma" font-size="28" fill="#15191A">${t}</text>`).join('')}`)}</div>`;
  W.chalkboard = `<div class="art-chalk"><p lang="ar">مرحبا</p><p>Bonjour · Hello</p><p class="eq">π ≈ 3.14 &nbsp; E = mc²</p></div>`;
  W.photoFrames = `<div class="art-photos"><div><span>School building</span><b>[photo]</b></div><div><span>A classroom</span><b>[photo]</b></div><div><span>The courtyard</span><b>[photo]</b></div></div>`;
  W.noticeboard = `<div class="art-board"><span style="background:#F6E9B8;transform:rotate(-3deg)">Week 1</span><span style="background:#DDF1E6;transform:rotate(2deg)">TwinSpace</span><span style="background:#E1ECFB;transform:rotate(-1deg)">eSafety</span><span style="background:#FBE4EF;transform:rotate(3deg)">Code of Ethics</span></div>`;

  return { ghost, S, W };
})();
