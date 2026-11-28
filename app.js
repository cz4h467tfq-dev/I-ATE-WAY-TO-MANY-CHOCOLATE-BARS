/* Bayt Kfarchima: a first-person walk through a Lebanese house, built with CSS 3D.
   World units are CSS pixels. x points east, z points south, y points down (floor at y = 0). */
(() => {
  'use strict';

  const S = 500;          // grid cell size
  const H = 650;          // wall height
  const EYE = 330;        // eye height above the floor
  const RADIUS = 130;     // how close you can get to a wall
  const ROOMS_N = 9;
  const COLS = ROOMS_N * 4 + 1;
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- content: one entry per room ---------- */
  const T = (s) => `<span class="todo">${s}</span>`;
  const cedarSVG = `<svg width="380" height="420" viewBox="0 0 380 420" aria-label="A cedar tree">
      <rect x="176" y="330" width="28" height="80" fill="#5B3E28"/>
      <path d="M190 20 L250 110 L215 104 L300 200 L240 192 L350 320 L30 320 L140 192 L80 200 L165 104 L130 110 Z" fill="#1E5A42"/>
      <path d="M190 20 L215 104 L190 98 Z M140 192 L190 180 L240 192 L190 200 Z" fill="#123D2C"/>
    </svg>`;

  const ROOMS = [
    {
      id: 'welcome', en: 'Welcome', ar: 'أهلا', theme: 'house',
      panels: [
        { wall: 'N', u: 750, y: -350, w: 1340, h: 500, cls: 'painted', html: `
          <p class="big-ar" lang="ar">أهلا من كفرشيما</p>
          <h2 style="margin-top:14px">Hello from Kfarchima, Lebanon</h2>
          <p style="margin-top:18px;max-width:30em;color:#2E3A36">We are the WELNOVA team from Collège Notre Dame des Sœurs Antonines. Walk through this house: each room shows our city, our school or our teacher.</p>` },
        { wall: 'W', u: 750, y: -350, w: 1200, h: 470, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">ويلنوفا</span>
          <h3>WELNOVA: well-being and new beginnings</h3>
          <p style="margin-top:16px">An eTwinning project between schools in Lebanon, Ukraine, Bulgaria and Turkey. Together we design a happier, more inclusive, innovative and sustainable school.</p>
          <p class="muted">Week 1, 23–29 November 2026: introduce our city, our school and our teacher.</p>` },
        { wall: 'S', u: 750, y: -350, w: 1100, h: 470, cls: 'plaque', html: `
          <h3>How to walk</h3>
          <div class="keys">
            <span><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></span><span>walk, or use the arrow keys</span>
            <span><kbd>Drag</kbd></span><span>look around</span>
            <span><kbd>Shift</kbd></span><span>walk faster</span>
            <span><kbd>Phone</kbd></span><span>left thumb walks, right thumb looks</span>
          </div>
          <p class="muted" style="margin-top:22px">The arch on the east side leads to the next room.</p>` },
      ],
    },
    {
      id: 'lebanon', en: 'Lebanon', ar: 'لبنان', theme: 'house',
      panels: [
        { wall: 'N', u: 750, y: -350, w: 1380, h: 420, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">لبنان</span>
          <h3>Lebanon in four lines</h3>
          <div class="four">
            <div><strong>Beirut</strong><span>our capital, a few minutes from Kfarchima</span></div>
            <div><strong>Cedar</strong><span>the tree at the centre of our flag</span></div>
            <div><strong>Arabic</strong><span>with French and English spoken widely</span></div>
            <div><strong>Byblos</strong><span>one of the oldest cities in the world</span></div>
          </div>` },
        { wall: 'S', u: 750, y: -350, w: 1300, h: 470, cls: 'painted', html: `
          <div class="cedar-art">${cedarSVG}
            <div><h2>Sea and mountains</h2>
            <p style="margin-top:18px;color:#2E3A36">Lebanon is small, about 10,000 km². You can swim in the Mediterranean in the morning and see snow on Mount Lebanon the same afternoon.</p></div>
          </div>` },
      ],
    },
    {
      id: 'kfarchima', en: 'Kfarchima', ar: 'كفرشيما', theme: 'house',
      panels: [
        { wall: 'N', u: 750, y: -350, w: 1400, h: 560, cls: 'screen', map: true, html: `
          <iframe title="Map of Kfarchima, Lebanon" loading="lazy" style="height:430px" src="https://www.openstreetmap.org/export/embed.html?bbox=35.505%2C33.800%2C35.560%2C33.832&amp;layer=mapnik&amp;marker=33.8153%2C35.5333"></iframe>
          <div class="cap"><span>Kfarchima, 33°48′55″N 35°32′0″E</span><span><a href="https://www.openstreetmap.org/?mlat=33.8153&amp;mlon=35.5333#map=15/33.8153/35.5333" target="_blank" rel="noopener">OpenStreetMap</a> &nbsp; <a href="https://www.google.com/maps/search/?api=1&amp;query=Kfarchima%2C%20Lebanon" target="_blank" rel="noopener">Google Maps</a></span></div>` },
        { wall: 'S', u: 750, y: -350, w: 1380, h: 500, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">جغرافيا</span>
          <h3>Where we live</h3>
          <dl class="facts">
            <dt>Location</dt><dd>Baabda District, Mount Lebanon, southeast of Beirut and part of Greater Beirut</dd>
            <dt>Size</dt><dd>About 5 km², home to around 70,000 people</dd>
            <dt>Landscape</dt><dd>Hills overlooking the Mediterranean, with a mild climate</dd>
            <dt>Neighbours</dt><dd>Hadath, Choueifat, Baabda, and Bsous with its Silk Museum</dd>
          </dl>` },
      ],
    },
    {
      id: 'history', en: 'History', ar: 'تاريخ', theme: 'house',
      panels: [
        { wall: 'N', u: 750, y: -350, w: 1380, h: 500, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">تاريخنا</span>
          <h3>A town with a long memory</h3>
          <dl class="facts">
            <dt>Long before us</dt><dd>Many civilizations passed through these hills, and each left something behind.</dd>
            <dt>Thinkers</dt><dd>Saleem Takla, born here, co-founded Egypt’s Al-Ahram newspaper. The philosopher Shibli Shumayyil also came from Kfarchima.</dd>
            <dt>Living together</dt><dd>Christian and Muslim families live side by side. The town has seven churches from different traditions.</dd>
          </dl>` },
        { wall: 'S', u: 750, y: -350, w: 1300, h: 440, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">صُنع هنا</span>
          <h3>Made in Kfarchima</h3>
          <p style="margin-top:18px">Kfarchima is a working town. Its factories make ceramics, paper and cardboard, dairy, sweets, marble and soap.</p>
          <p class="muted">Many of these products end up in homes all over Lebanon.</p>` },
      ],
    },
    {
      id: 'music', en: 'Music', ar: 'موسيقى', theme: 'music',
      panels: [
        { wall: 'N', u: 750, y: -350, w: 1380, h: 520, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">بلدة تغنّي</span>
          <h3>A town that sings</h3>
          <ul class="names">
            <li><b>Philemon Wehbe</b><span>Composer who wrote songs for Fairouz</span></li>
            <li><b>Majida El Roumi</b><span>One of the best-known voices in the Arab world</span></li>
            <li><b>Melhem Barakat</b><span>Singer and stage actor who toured four continents</span></li>
            <li><b>Issam Rajji</b><span>Singer and composer who worked with the Rahbani brothers</span></li>
            <li><b>Marie Sleiman</b><span>Singer, first in Mount Lebanon on a 1980 talent show</span></li>
          </ul>` },
        { wall: 'S', u: 750, y: -340, w: 1300, h: 520, cls: 'plaque', html: `
          <h3>Play maqam Hijaz</h3>
          <p class="muted" style="margin-top:8px">Arabic music uses scales called maqamat. Hijaz is one of the most recognisable. Press play, or pluck the strings yourself.</p>
          <div class="oud">
            <div class="strings" data-strings>${'<span></span>'.repeat(8)}</div>
            <div style="display:flex;flex-direction:column;justify-content:center;gap:16px">
              <button type="button" class="act red" data-play>Play a phrase</button>
            </div>
          </div>
          <p class="notes" data-notes lang="ar"></p>` },
      ],
    },
    {
      id: 'kitchen', en: 'Kitchen', ar: 'المطبخ', theme: 'kitchen',
      panels: [
        { wall: 'N', u: 750, y: -350, w: 1400, h: 500, cls: 'painted', html: `
          <h2>On our table</h2>
          <div class="plates">
            <button type="button" class="plate" data-plate><div class="in"><div class="fr"><span class="ar" lang="ar">منقوشة</span><span><b>Manakish</b><br><small>Tap to taste</small></span></div><div class="bk"><b>Manakish</b>Flatbread with za’atar and olive oil. Breakfast for most of Lebanon.</div></div></button>
            <button type="button" class="plate" data-plate><div class="in"><div class="fr"><span class="ar" lang="ar">تبولة</span><span><b>Tabbouleh</b><br><small>Tap to taste</small></span></div><div class="bk"><b>Tabbouleh</b>Parsley, tomato, bulgur and a lot of lemon.</div></div></button>
            <button type="button" class="plate" data-plate><div class="in"><div class="fr"><span class="ar" lang="ar">حمص</span><span><b>Hummus</b><br><small>Tap to taste</small></span></div><div class="bk"><b>Hummus</b>Chickpeas and tahini, shared with bread at almost every meal.</div></div></button>
            <button type="button" class="plate" data-plate><div class="in"><div class="fr"><span class="ar" lang="ar">كنافة</span><span><b>Knefeh</b><br><small>Tap to taste</small></span></div><div class="bk"><b>Knefeh</b>Warm sweet cheese pastry with syrup, often in a sesame bun.</div></div></button>
          </div>` },
        { wall: 'S', u: 750, y: -350, w: 1200, h: 420, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">مازة</span>
          <h3>Mezze: many small plates</h3>
          <p style="margin-top:16px">A Lebanese meal is shared. The table fills with small dishes and everyone takes a little of each.</p>
          <p class="muted">Question for our partners: what is a typical breakfast in Ukraine, Bulgaria and Turkey?</p>` },
      ],
    },
    {
      id: 'school', en: 'Our school', ar: 'مدرستنا', theme: 'school',
      panels: [
        { wall: 'N', u: 750, y: -350, w: 1400, h: 540, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">مدرستنا</span>
          <h3>Collège Notre Dame des Sœurs Antonines – Kfarchima</h3>
          <dl class="facts">
            <dt>Founded by</dt><dd>The Congregation of the Antonine Sisters</dd>
            <dt>Levels</dt><dd>Preschool to secondary</dd>
            <dt>Founded in</dt><dd>${T('[year]')}</dd>
            <dt>Students</dt><dd>About ${T('[number]')}</dd>
            <dt>Languages</dt><dd>${T('[Arabic, French, English]')}</dd>
          </dl>` },
        { wall: 'S', u: 750, y: -340, w: 1400, h: 520, cls: 'painted', html: `
          <h2>Inside the school</h2>
          <div class="frames">
            <div>The school building ${T('[photo]')}</div>
            <div>A classroom ${T('[photo]')}</div>
            <div>The courtyard ${T('[photo]')}</div>
          </div>
          <p class="muted" style="margin-top:14px;font-size:24px">Photos show spaces and hands at work, never students’ faces.</p>` },
        { wall: 'E', u: 250, y: -350, w: 420, h: 430, cls: 'plaque', small: true, html: `
          <h3 style="font-size:32px">What we value</h3><p style="margin-top:10px;font-size:25px">Moral and spiritual growth alongside academic learning.</p>` },
        { wall: 'E', u: 1250, y: -350, w: 420, h: 430, cls: 'plaque', small: true, html: `
          <h3 style="font-size:32px">Beyond class</h3><p style="margin-top:10px;font-size:25px">Clubs and field trips. In 2023, 73 students from Grades 9 and 12 visited a national institution.</p>` },
      ],
    },
    {
      id: 'teacher', en: 'Teacher & consent', ar: 'معلّمتنا', theme: 'study',
      panels: [
        { wall: 'N', u: 750, y: -345, w: 1200, h: 560, cls: 'letter', html: `
          <p style="font-family:var(--kufi);font-size:44px;color:var(--cedar)">Dear partners,</p>
          <p style="margin-top:20px"><b>Who I am.</b> ${T('[Years of teaching, subjects and classes, earlier eTwinning projects]')}</p>
          <p><b>What I enjoy.</b> ${T('[Interests outside the classroom]')}</p>
          <p><b>What I hope WELNOVA brings.</b> ${T('[What she hopes students will gain]')}</p>
          <p style="margin-top:30px;font-family:var(--kufi);font-size:40px;color:var(--cedar)">Mary Safadi</p>
          <p class="muted" style="margin-top:0;font-size:24px">English Department</p>` },
        { wall: 'S', u: 750, y: -350, w: 1400, h: 500, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">موافقة الأهل</span>
          <h3>Parental consent, step by step</h3>
          <ol class="process">
            <li><b>Sent home</b>Parents receive the form with the project’s aims.</li>
            <li><b>Signed</b>They approve taking part and the use of work on TwinSpace.</li>
            <li><b>Hidden</b>Surnames, signatures and contact details are covered.</li>
            <li><b>Uploaded</b>Forms go to TwinSpace with only the teacher and school name.</li>
          </ol>
          <p class="tally"><b>${T('[X]')} / 10</b> forms collected</p>` },
      ],
    },
    {
      id: 'terrace', en: 'Terrace', ar: 'السطح', theme: 'terrace',
      panels: [
        { wall: 'N', u: 750, y: -420, w: 1400, h: 380, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">فريقنا</span>
          <h3>Our ten</h3>
          <div class="roster">${Array.from({ length: 10 }, () => `<div><b>${T('[Name]')}</b><span>${T('[one line]')}</span></div>`).join('')}</div>` },
        { wall: 'S', u: 750, y: -400, w: 1300, h: 420, cls: 'plaque', html: `
          <span class="tag-ar" lang="ar">مدرسة المستقبل</span>
          <h3>Our future school, in your room</h3>
          <p style="margin-top:14px">Four international teams, four floors, one Eco-Future School. Open it in 3D, or place it on your table with AR.</p>
          <p style="margin-top:26px"><button type="button" class="act red" data-ar>Open the 3D school</button></p>` },
        { wall: 'E', u: 750, y: -420, w: 1400, h: 330, cls: 'painted', html: `
          <p class="big-ar" lang="ar" style="font-size:110px">أهلا وسهلا</p>
          <div class="scripts"><span lang="ar">لبنان</span><span lang="uk">Україна</span><span lang="bg">България</span><span lang="tr">Türkiye</span></div>` },
      ],
    },
  ];

  /* ---------- grid ---------- */
  const walkable = (x, z) => {
    const c = Math.floor(x / S), r = Math.floor(z / S);
    if (r < 1 || r > 3 || c < 1 || c >= COLS - 1) return false;
    if (c % 4 !== 0) return true;
    return r === 2;           // doorway
  };
  const roomAt = (x) => Math.max(0, Math.min(ROOMS_N - 1, Math.floor((x / S - 1) / 4 + 0.125)));
  const roomCentre = (i) => ({ x: (4 * i + 2.5) * S, z: 2.5 * S });

  /* ---------- build the world ---------- */
  const scene = document.getElementById('scene');
  const faces = [];   // { el, rooms: [i...] }

  function face(cls, w, h, x, y, z, ry, rx, rooms, extra = {}) {
    const el = document.createElement('div');
    el.className = 'f ' + cls;
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.marginLeft = (-w / 2) + 'px';
    el.style.marginTop = (-h / 2) + 'px';
    el.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateY(${ry}deg) rotateX(${rx}deg)`;
    if (extra.bg) el.style.background = extra.bg;
    if (extra.html) el.innerHTML = extra.html;
    scene.appendChild(el);
    faces.push({ el, rooms });
    return el;
  }

  const archBG = (() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${S} ${H}' preserveAspectRatio='none'>
      <defs><pattern id='p' width='160' height='160' patternUnits='userSpaceOnUse'>
        <rect width='160' height='160' fill='#D9D2BF'/><path d='M0 79H160M0 159H160M1 0V79M81 80V159' stroke='#BAB199' stroke-width='3'/></pattern></defs>
      <path fill-rule='evenodd' fill='url(#p)' d='M0 0H${S}V${H}H0Z M92 ${H} V330 Q92 232 250 168 Q408 232 408 330 V${H} Z'/>
      <path fill='none' stroke='#C4BBA4' stroke-width='22' d='M92 ${H} V330 Q92 232 250 168 Q408 232 408 330 V${H}'/>
      <path fill='none' stroke='#A99F86' stroke-width='3' d='M80 ${H} V330 Q80 222 250 154 Q420 222 420 330 V${H}'/>
      <rect x='0' y='${H - 120}' width='80' height='120' fill='#6A4A33'/><rect x='${S - 80}' y='${H - 120}' width='80' height='120' fill='#6A4A33'/>
      <rect x='0' y='${H - 126}' width='80' height='6' fill='#4F3624'/><rect x='${S - 80}' y='${H - 126}' width='80' height='6' fill='#4F3624'/>
    </svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  })();

  ROOMS.forEach((room, i) => {
    const x0 = (4 * i + 1) * S;          // west edge of the interior
    const cx = x0 + 1.5 * S;
    const terrace = room.theme === 'terrace';
    const wallCls = terrace ? 'wall view' : 'wall dado';
    const r = [i];

    face('floor', 3 * S, 3 * S, cx, 0, 2.5 * S, 0, 90, r);
    face(terrace ? 'sky' : 'ceiling', 3 * S, 3 * S, cx, -H, 2.5 * S, 0, -90, r);
    face(wallCls + ' ns', 3 * S, H, cx, -H / 2, S, 0, 0, r);           // north
    face(wallCls + ' ns', 3 * S, H, cx, -H / 2, 4 * S, 180, 0, r);     // south

    // west and east walls: solid at the ends of the house, arched elsewhere
    for (const side of ['W', 'E']) {
      const x = side === 'W' ? x0 : x0 + 3 * S;
      const ry = side === 'W' ? 90 : -90;
      const solid = (side === 'W' && i === 0) || (side === 'E' && i === ROOMS_N - 1);
      if (solid) {
        face(wallCls, 3 * S, H, x, -H / 2, 2.5 * S, ry, 0, r);
      } else {
        face(wallCls, S, H, x, -H / 2, 1.5 * S, ry, 0, r);
        face(wallCls, S, H, x, -H / 2, 3.5 * S, ry, 0, r);
        face('arch', S, H, x, -H / 2, 2.5 * S, ry, 0, r, { bg: archBG });
      }
    }

    // doorway tunnel to the next room
    if (i < ROOMS_N - 1) {
      const tx = (4 * i + 4.5) * S;
      const both = [i, i + 1];
      face('floor', S, S, tx, 0, 2.5 * S, 0, 90, both);
      face('ceiling', S, S, tx, -H, 2.5 * S, 0, -90, both);
      face('wall', S, H, tx, -H / 2, 2 * S, 0, 0, both);
      face('wall', S, H, tx, -H / 2, 3 * S, 180, 0, both);
    }

    // exhibits
    room.panels.forEach((p) => {
      let x, z, ry;
      const off = 4;
      if (p.wall === 'N') { x = x0 + p.u; z = S + off; ry = 0; }
      if (p.wall === 'S') { x = x0 + 3 * S - p.u; z = 4 * S - off; ry = 180; }
      if (p.wall === 'W') { x = x0 + off; z = 4 * S - p.u; ry = 90; }
      if (p.wall === 'E') { x = x0 + 3 * S - off; z = S + p.u; ry = -90; }
      face('panel ' + p.cls, p.w, p.h, x, p.y, z, ry, 0, r, { html: p.html });
    });
  });

  /* ---------- camera ---------- */
  const view = document.getElementById('viewport');
  const STAND = () => (innerWidth < innerHeight ? 3.6 : 3.1) * S;   // where you stand when entering a room
  const cam = { x: roomCentre(0).x, z: STAND(), yaw: 0, pitch: 0.05 };
  let persp = 800;

  function resize() {
    const h = view.clientHeight, w = view.clientWidth;
    const fov = (w < h ? 104 : 70) * Math.PI / 180;     // wider on portrait phones so wall panels fit
    persp = Math.round((h / 2) / Math.tan(fov / 2));
    view.style.perspective = persp + 'px';
  }
  resize();
  addEventListener('resize', resize);

  function render() {
    scene.style.transform =
      `translateZ(${persp}px) rotateX(${cam.pitch}rad) rotateY(${cam.yaw}rad) translate3d(${-cam.x}px,${EYE}px,${-cam.z}px)`;
  }

  let currentRoom = -1;
  function updateRoom() {
    const ri = roomAt(cam.x);
    if (ri === currentRoom) return;
    currentRoom = ri;
    for (const f of faces) {
      const d = Math.min(...f.rooms.map((k) => Math.abs(k - ri)));
      f.el.classList.toggle('hidden', d > 2);
      f.el.style.filter = d === 0 ? '' : d === 1 ? 'brightness(.82)' : 'brightness(.6)';
    }
    const room = ROOMS[ri];
    document.getElementById('room-label').innerHTML = `${ri + 1}. ${room.en} &nbsp;<b lang="ar" dir="rtl">${room.ar}</b>`;
    if (started) showToast(room);
  }

  /* ---------- toast ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(room) {
    toast.innerHTML = `<span class="ar" lang="ar">${room.ar}</span><span class="en">${room.en}</span>`;
    toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('on'), 1800);
  }

  /* ---------- movement ---------- */
  const keys = new Set();
  const move = { f: 0, s: 0 };       // from the touch stick
  let tween = null;

  function tryMove(dx, dz) {
    const ok = (x, z) => walkable(x - RADIUS, z - RADIUS) && walkable(x + RADIUS, z - RADIUS) &&
      walkable(x - RADIUS, z + RADIUS) && walkable(x + RADIUS, z + RADIUS);
    if (ok(cam.x + dx, cam.z)) cam.x += dx;
    else if (Math.abs(dx) > Math.abs(dz) && Math.abs(cam.z - 2.5 * S) < 0.75 * S) {
      // heading for an arch but slightly off: slide towards the doorway's centre line
      const pull = Math.sign(2.5 * S - cam.z) * Math.min(Math.abs(2.5 * S - cam.z), Math.abs(dx) * 1.2);
      if (ok(cam.x, cam.z + pull)) cam.z += pull;
    }
    if (ok(cam.x, cam.z + dz)) cam.z += dz;
  }

  function step(dt) {
    let f = move.f, s = move.s, turn = 0;
    if (keys.has('w') || keys.has('arrowup')) f += 1;
    if (keys.has('s') || keys.has('arrowdown')) f -= 1;
    if (keys.has('d')) s += 1;
    if (keys.has('a')) s -= 1;
    if (keys.has('arrowright') || keys.has('e')) turn += 1;
    if (keys.has('arrowleft') || keys.has('q')) turn -= 1;
    cam.yaw += turn * 1.9 * dt;
    const len = Math.hypot(f, s);
    if (len > 0) {
      const speed = (keys.has('shift') ? 1250 : 650) * Math.min(1, len) / len;
      const sin = Math.sin(cam.yaw), cos = Math.cos(cam.yaw);
      const dx = (f * sin + s * cos) * speed * dt;
      const dz = (-f * cos + s * sin) * speed * dt;
      tryMove(dx, dz);
      tween = null;
      hideHint();
    }
  }

  function goToRoom(i) {
    const c = roomCentre(i);
    const target = { x: c.x, z: STAND(), yaw: Math.round(cam.yaw / (2 * Math.PI)) * 2 * Math.PI, pitch: 0.05 };
    if (REDUCED) { Object.assign(cam, target); return; }
    tween = { from: { ...cam }, to: target, t: 0, dur: Math.min(2.2, 0.6 + Math.abs(i - roomAt(cam.x)) * 0.25) };
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (tween) {
      tween.t += dt / tween.dur;
      const k = tween.t >= 1 ? 1 : 0.5 - Math.cos(Math.PI * tween.t) / 2;
      for (const key of ['x', 'z', 'yaw', 'pitch']) cam[key] = tween.from[key] + (tween.to[key] - tween.from[key]) * k;
      if (tween.t >= 1) tween = null;
    } else {
      step(dt);
    }
    applyGyro();
    render();
    updateRoom();
    drawMap();
    requestAnimationFrame(frame);
  }

  /* ---------- input: keyboard ---------- */
  const typing = (e) => e.target.closest && e.target.closest('input, textarea, dialog[open]');
  addEventListener('keydown', (e) => {
    if (typing(e) || !started) return;
    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'q', 'e', 'shift', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
      keys.add(k);
      if (k.startsWith('arrow')) e.preventDefault();
    }
  });
  addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
  addEventListener('blur', () => keys.clear());

  /* ---------- input: pointer (look) and touch stick (walk) ---------- */
  const stick = document.getElementById('stick');
  const knob = document.getElementById('stick-knob');
  let look = null, walk = null;

  function isTouchDevice() { return matchMedia('(pointer: coarse)').matches; }

  view.addEventListener('pointerdown', (e) => {
    if (!started) return;
    if (e.target.closest('button, a, iframe')) return;   // let exhibits be clicked
    const touch = e.pointerType === 'touch';
    if (touch && e.clientX < innerWidth * 0.45 && !walk) {
      const r = stick.getBoundingClientRect();
      walk = { id: e.pointerId, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      updateStick(e);
    } else if (!look) {
      look = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0 };
      view.classList.add('dragging');
    }
  });
  addEventListener('pointermove', (e) => {
    if (walk && e.pointerId === walk.id) updateStick(e);
    if (look && e.pointerId === look.id) {
      const dx = e.clientX - look.x, dy = e.clientY - look.y;
      look.x = e.clientX; look.y = e.clientY;
      look.moved += Math.abs(dx) + Math.abs(dy);
      const k = e.pointerType === 'touch' ? 0.006 : 0.0045;
      cam.yaw += dx * k;
      cam.pitch = Math.max(-0.75, Math.min(0.75, cam.pitch - dy * k));
      if (gyro.on) { gyro.yawOffset += dx * k; }
      tween = null;
      if (look.moved > 30) hideHint();
    }
  });
  const endPointer = (e) => {
    if (walk && e.pointerId === walk.id) { walk = null; move.f = move.s = 0; knob.style.transform = ''; }
    if (look && e.pointerId === look.id) { look = null; view.classList.remove('dragging'); }
  };
  addEventListener('pointerup', endPointer);
  addEventListener('pointercancel', endPointer);

  function updateStick(e) {
    const max = 46;
    let dx = e.clientX - walk.cx, dy = e.clientY - walk.cy;
    const d = Math.hypot(dx, dy);
    if (d > max) { dx *= max / d; dy *= max / d; }
    knob.style.transform = `translate(${dx}px,${dy}px)`;
    move.s = dx / max;
    move.f = -dy / max;
  }

  /* ---------- gyro ---------- */
  const gyro = { on: false, base: null, yawOffset: 0, alpha: null, beta: null };
  function onOrient(e) { gyro.alpha = e.alpha; gyro.beta = e.beta; }
  function applyGyro() {
    if (!gyro.on || gyro.alpha == null) return;
    if (gyro.base == null) { gyro.base = gyro.alpha; gyro.yawOffset = cam.yaw; }
    let d = gyro.alpha - gyro.base;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    cam.yaw = gyro.yawOffset - d * Math.PI / 180;
    const pitch = (gyro.beta - 80) * Math.PI / 180;      // phone held upright = level
    cam.pitch = Math.max(-0.75, Math.min(0.75, pitch));
  }
  const btnGyro = document.getElementById('btn-gyro');
  if ('DeviceOrientationEvent' in window && isTouchDevice()) btnGyro.hidden = false;
  btnGyro.addEventListener('click', async () => {
    if (gyro.on) {
      gyro.on = false; removeEventListener('deviceorientation', onOrient);
      btnGyro.textContent = 'Look with phone'; return;
    }
    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res !== 'granted') throw new Error('denied');
      }
      gyro.on = true; gyro.base = null;
      addEventListener('deviceorientation', onOrient);
      btnGyro.textContent = 'Stop phone look';
    } catch {
      flash('Motion access was turned off. Allow it in your browser settings to look around by moving your phone.');
    }
  });

  /* ---------- minimap ---------- */
  const map = document.getElementById('minimap');
  const mctx = map.getContext('2d');
  const MW = map.width, MH = map.height;
  const mk = MW / (COLS * S);
  function drawMap() {
    mctx.clearRect(0, 0, MW, MH);
    const top = (MH - 3 * S * mk) / 2 - S * mk;
    ROOMS.forEach((room, i) => {
      mctx.fillStyle = i === currentRoom ? '#B3261E' : room.theme === 'terrace' ? '#3F78A8' : '#5E6B65';
      mctx.fillRect((4 * i + 1) * S * mk, top + S * mk, 3 * S * mk - 1, 3 * S * mk);
      if (i < ROOMS_N - 1) { mctx.fillStyle = '#5E6B65'; mctx.fillRect((4 * i + 4) * S * mk, top + 2 * S * mk, S * mk, S * mk); }
    });
    const px = cam.x * mk, pz = top + cam.z * mk;
    mctx.fillStyle = 'rgba(242,182,50,.35)';
    mctx.beginPath(); mctx.moveTo(px, pz);
    mctx.arc(px, pz, 16, cam.yaw - Math.PI / 2 - 0.6, cam.yaw - Math.PI / 2 + 0.6); mctx.fill();
    mctx.fillStyle = '#F2B632';
    mctx.beginPath(); mctx.arc(px, pz, 3.5, 0, 7); mctx.fill();
  }
  map.addEventListener('click', (e) => {
    const r = map.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * MW / mk;
    goToRoom(roomAt(x));
  });

  /* ---------- rooms menu ---------- */
  const roomsDlg = document.getElementById('rooms-dialog');
  const list = document.getElementById('rooms-list');
  ROOMS.forEach((room, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button"><span>${room.en}</span><span class="ar" lang="ar">${room.ar}</span></button>`;
    li.firstChild.addEventListener('click', () => { roomsDlg.close(); goToRoom(i); });
    list.appendChild(li);
  });
  document.getElementById('btn-rooms').addEventListener('click', () => roomsDlg.showModal());

  /* ---------- AR dialog ---------- */
  const arDlg = document.getElementById('ar-dialog');
  function openAR() {
    arDlg.showModal();
    if (!customElements.get('model-viewer')) {
      document.getElementById('ar-note').textContent = 'The 3D viewer could not load. Check your internet connection and try again.';
    }
  }
  document.getElementById('btn-ar').addEventListener('click', openAR);

  /* ---------- classic page ---------- */
  const classicDlg = document.getElementById('classic-dialog');
  const classicBody = document.getElementById('classic-body');
  let classicBuilt = false;
  function openClassic() {
    if (!classicBuilt) {
      classicBody.innerHTML = ROOMS.map((room, i) => `
        <section>
          <h3 class="room-title">${i + 1}. ${room.en}<span class="ar" lang="ar">${room.ar}</span></h3>
          ${room.panels.map((p) => `<div class="panel ${p.cls}">${p.html}</div>`).join('')}
        </section>`).join('');
      classicBuilt = true;
    }
    classicDlg.showModal();
  }
  document.getElementById('btn-classic').addEventListener('click', openClassic);
  document.getElementById('btn-intro-classic').addEventListener('click', openClassic);

  document.querySelectorAll('dialog [data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));

  /* ---------- exhibits: delegated clicks (works in the house and the classic page) ---------- */
  document.addEventListener('click', (e) => {
    const plate = e.target.closest('[data-plate]');
    if (plate) { plate.classList.toggle('flip'); return; }
    if (e.target.closest('[data-ar]')) { openAR(); return; }
    if (e.target.closest('[data-play]')) { playPhrase(e.target.closest('.panel')); return; }
    const str = e.target.closest('[data-strings]');
    if (str) {
      const spans = [...str.children];
      const r = str.getBoundingClientRect();
      const idx = Math.max(0, Math.min(7, Math.floor((e.clientX - r.left) / r.width * 8)));
      pluck(idx, str.closest('.panel'));
    }
  });

  /* ---------- music: maqam Hijaz on D ---------- */
  const HIJAZ = [293.66, 311.13, 369.99, 392.0, 440.0, 466.16, 523.25, 587.33];
  const HIJAZ_AR = ['دو', 'مي♭', 'فا♯', 'صول', 'لا', 'سي♭', 'دو', 'ري'];
  const NAMES = ['D', 'E♭', 'F♯', 'G', 'A', 'B♭', 'C', 'D'];
  let actx = null;
  function audio() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }
  function pluck(i, panel, when = 0) {
    const ac = audio();
    const t = ac.currentTime + when;
    const out = ac.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(0.35, t + 0.008);
    out.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3200, t);
    lp.frequency.exponentialRampToValueAtTime(500, t + 0.5);
    lp.connect(out); out.connect(ac.destination);
    for (const [type, det, g] of [['sawtooth', 0, 0.6], ['triangle', 6, 0.5], ['sine', -4, 0.4]]) {
      const o = ac.createOscillator(); const og = ac.createGain();
      o.type = type; o.frequency.value = HIJAZ[i]; o.detune.value = det; og.gain.value = g;
      o.connect(og); og.connect(lp); o.start(t); o.stop(t + 1.7);
    }
    setTimeout(() => {
      if (!panel) return;
      const s = panel.querySelectorAll('[data-strings] span')[i];
      if (s) { s.classList.remove('hit'); void s.offsetWidth; s.classList.add('hit'); }
      const n = panel.querySelector('[data-notes]');
      if (n) n.textContent = `${HIJAZ_AR[i]}  ·  ${NAMES[i]}`;
    }, when * 1000);
  }
  function playPhrase(panel) {
    const phrase = [[4, 0], [3, .32], [2, .56], [1, .8], [2, 1.2], [1, 1.44], [0, 1.68], [0, 2.3], [1, 2.6], [2, 2.84], [3, 3.08], [4, 3.32], [5, 3.6], [4, 3.84], [3, 4.08], [2, 4.4], [1, 4.64], [0, 5.0]];
    phrase.forEach(([n, t]) => pluck(n, panel, t));
  }

  /* ---------- hints & flash ---------- */
  const hint = document.getElementById('hint');
  let hintHidden = false;
  function hideHint() { if (!hintHidden) { hintHidden = true; hint.style.opacity = 0; } }
  function flash(msg) {
    toast.innerHTML = `<span class="en" style="font-size:16px;max-width:80vw;display:block">${msg}</span>`;
    toast.classList.add('on'); clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('on'), 3500);
  }

  /* ---------- start ---------- */
  let started = false;
  const touch = isTouchDevice();
  if (touch) document.body.classList.add('touch');
  document.getElementById('intro-keys').textContent = touch
    ? 'Left thumb walks, right thumb looks around. Tap anything on the walls.'
    : 'Walk with W A S D or the arrow keys. Drag to look around. Click anything on the walls.';
  hint.textContent = touch ? 'Left thumb: walk · Right thumb: look' : 'W A S D to walk · drag to look';

  document.getElementById('btn-enter').addEventListener('click', () => {
    started = true;
    document.getElementById('intro').classList.add('gone');
    document.getElementById('hud').hidden = false;
    showToast(ROOMS[currentRoom]);
    audio();
  });

  updateRoom();
  render();
  requestAnimationFrame(frame);

  window.__bayt = cam;   // handy for debugging in the console
  // test hook: ?at=room&yaw=deg
  const q = new URLSearchParams(location.search);
  if (q.has('at')) {
    const c = roomCentre(+q.get('at'));
    cam.x = c.x; cam.z = +(q.get('z') || 2.5) * S; cam.yaw = (+q.get('yaw') || 0) * Math.PI / 180;
    if (q.has('start')) document.getElementById('btn-enter').click();
  }
})();
