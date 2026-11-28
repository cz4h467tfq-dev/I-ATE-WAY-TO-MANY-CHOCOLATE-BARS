/* Bayt Kfarchima: a first-person walk through a Lebanese house, guided by Anna the ghost.
   Built with CSS 3D. World units are CSS pixels: x east, z south, y down (floor at y = 0). */
(() => {
  'use strict';

  const S = 500, H = 650, EYE = 330, RADIUS = 130;
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ART = window.ART;
  const T = (s) => `<span class="todo">${s}</span>`;

  /* =====================================================================
     CONTENT. u runs west to east (0–1500), v north to south (0–1500) inside a room.
     decor hangs on walls, props stand in the room, pois are what Anna shows you.
     ===================================================================== */
  const ROOMS = [
    {
      id: 'welcome', en: 'Welcome', ar: 'أهلا',
      decor: [
        { wall: 'N', at: 750, y: -380, w: 1200, h: 340, html: ART.W.calligraphy, txt: true },
        { wall: 'W', at: 750, y: -360, w: 720, h: 400, html: ART.W.logo, txt: true },
        { wall: 'S', at: 750, y: -360, w: 900, h: 360, html: ART.W.noticeboard, txt: true },
      ],
      props: [
        { u: 420, v: 520, w: 120, h: 260, y: -H + 130, art: ART.S.lantern },
        { u: 1080, v: 520, w: 120, h: 260, y: -H + 130, art: ART.S.lantern },
        { u: 170, v: 180, w: 200, h: 300, art: ART.S.plant },
        { u: 1330, v: 180, w: 200, h: 300, art: ART.S.plant },
      ],
      pois: [
        { look: ['N', 750, -380], title: 'Ahlan! I’m Anna', ar: 'أنا آنا', html: `
          <p>I’m the ghost of this old Lebanese house in Kfarchima, and I’ll be your guide.</p>
          <p>In every room I’ll point at something and tell you about it. Read each card, then the arch to the next room opens.</p>
          <p class="muted">Walk with W A S D or the arrow keys and drag to look. On a phone, your left thumb walks and your right thumb looks.</p>` },
        { look: ['W', 750, -360], title: 'What is WELNOVA?', ar: 'ويلنوفا', html: `
          <p><b>WELL</b> means well-being, happiness and a healthy school. <b>NOVA</b> means innovation and new beginnings.</p>
          <p>WELNOVA is an eTwinning project between schools in <b>Lebanon, Ukraine, Bulgaria and Turkey</b>. Students from all four countries work in mixed teams to design a happier, more inclusive, innovative and sustainable school.</p>` },
        { look: ['S', 750, -360], title: 'This is Week 1', ar: 'الأسبوع الأول', html: `
          <p>Week 1 runs from <b>23 to 29 November 2026</b>. Each school introduces:</p>
          <ul class="ticks"><li>its city</li><li>its school</li><li>its teacher</li><li>its parental consent forms</li></ul>
          <p class="muted">That’s exactly what this house shows. Follow me.</p>` },
      ],
    },
    {
      id: 'lebanon', en: 'Lebanon', ar: 'لبنان',
      decor: [
        { wall: 'N', at: 750, y: -330, w: 470, h: 640, html: ART.W.window },
        { wall: 'S', at: 750, y: -360, w: 700, h: 440, html: ART.W.ship },
      ],
      props: [
        { u: 300, v: 330, w: 300, h: 420, art: ART.S.cedarPot },
        { u: 1250, v: 1250, w: 200, h: 300, art: ART.S.plant },
        { u: 750, v: 750, w: 120, h: 260, y: -H + 130, art: ART.S.lantern },
      ],
      pois: [
        { look: ['P', 0], title: 'The cedar', ar: 'الأرزة', html: `
          <p>The green cedar tree stands in the middle of the Lebanese flag. Cedars grow high on Mount Lebanon, and some are thousands of years old.</p>
          <div class="four">
            <div><strong>Beirut</strong><span>our capital</span></div>
            <div><strong>Cedar</strong><span>our national symbol</span></div>
            <div><strong>Arabic</strong><span>with French and English spoken widely</span></div>
            <div><strong>10,452 km²</strong><span>a small country</span></div>
          </div>` },
        { look: ['N', 750, -330], title: 'Sea and mountains', ar: 'بحر وجبل', html: `
          <p>Lebanon sits on the eastern shore of the Mediterranean. Behind the coast, Mount Lebanon rises steeply.</p>
          <p>On a winter day you can swim in the sea in the morning and see snow on the mountains in the afternoon.</p>` },
        { look: ['S', 750, -360], title: 'Byblos and the alphabet', ar: 'جبيل', html: `
          <p>Byblos, north of Beirut, is one of the oldest cities in the world that people have lived in without a break.</p>
          <p>The Phoenicians who sailed from here used an alphabet that later shaped the Greek and Latin alphabets, the letters you are reading now.</p>` },
      ],
    },
    {
      id: 'kfarchima', en: 'Kfarchima', ar: 'كفرشيما',
      decor: [
        { wall: 'N', at: 750, y: -360, w: 700, h: 520, html: ART.W.map, txt: true },
        { wall: 'S', at: 750, y: -330, w: 470, h: 640, html: ART.W.window },
      ],
      props: [
        { u: 750, v: 750, w: 120, h: 260, y: -H + 130, art: ART.S.lantern },
        { u: 180, v: 1300, w: 200, h: 300, art: ART.S.plant },
        { u: 1320, v: 1300, w: 200, h: 300, art: ART.S.plant },
      ],
      pois: [
        { look: ['N', 750, -360], title: 'Where we live', ar: 'وين ساكنين', html: `
          <dl class="facts">
            <dt>Location</dt><dd>Baabda District, Mount Lebanon, southeast of Beirut and part of Greater Beirut</dd>
            <dt>Size</dt><dd>About 5 km², home to around 70,000 people</dd>
            <dt>Name</dt><dd>Also written Kfarshima, <span lang="ar">كفرشيما</span></dd>
          </dl>
          <iframe class="map" title="Map of Kfarchima, Lebanon" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=35.505%2C33.800%2C35.560%2C33.832&amp;layer=mapnik&amp;marker=33.8153%2C35.5333"></iframe>
          <p class="muted"><a href="https://www.google.com/maps/search/?api=1&amp;query=Kfarchima%2C%20Lebanon" target="_blank" rel="noopener">Open in Google Maps</a></p>` },
        { look: ['S', 750, -330], title: 'The view from our hills', ar: 'المنظر', html: `
          <p>Kfarchima sits on the first hills above Beirut. From the rooftops you can see the Mediterranean, and the climate is mild most of the year.</p>
          <p>Our neighbours are Hadath, Choueifat, Baabda, and Bsous, which has a museum about Lebanon’s old silk industry.</p>` },
      ],
    },
    {
      id: 'history', en: 'History', ar: 'تاريخ',
      decor: [
        { wall: 'N', at: 430, y: -370, w: 360, h: 440, html: ART.W.sepia('Old Kfarchima'), txt: true },
        { wall: 'N', at: 1070, y: -370, w: 360, h: 440, html: ART.W.sepia('Houses on the hill'), txt: true },
      ],
      props: [
        { u: 230, v: 230, w: 360, h: 520, art: ART.S.bookshelf },
        { u: 1120, v: 1230, w: 460, h: 330, art: ART.S.crafts },
        { u: 750, v: 750, w: 120, h: 260, y: -H + 130, art: ART.S.lantern },
      ],
      pois: [
        { look: ['N', 750, -370], title: 'A town with a long memory', ar: 'ذاكرة طويلة', html: `
          <p>Many civilizations passed through these hills, and each left something behind. Today most of the old traces sit under modern buildings.</p>
          <p>Christian and Muslim families live side by side in Kfarchima, and the town has seven churches from different traditions.</p>` },
        { look: ['P', 0], title: 'Writers and thinkers', ar: 'كتّاب ومفكّرون', html: `
          <p><b>Saleem Takla</b>, born in Kfarchima, co-founded <i>Al-Ahram</i> in Egypt, one of the best-known newspapers in the Arab world.</p>
          <p><b>Shibli Shumayyil</b>, a doctor and philosopher, also came from here, and so did the poet <b>Ilyas Farhat</b>.</p>` },
        { look: ['P', 1], title: 'Made in Kfarchima', ar: 'صُنع هنا', html: `
          <p>Kfarchima is a working town. Its factories make ceramics, paper and cardboard, dairy products, sweets, marble and soap.</p>
          <p class="muted">Many of these end up in homes all over Lebanon.</p>` },
      ],
    },
    {
      id: 'music', en: 'Music', ar: 'موسيقى',
      decor: [
        { wall: 'N', at: 750, y: -420, w: 900, h: 300, html: ART.W.records },
      ],
      props: [
        { u: 1280, v: 1220, w: 320, h: 360, art: ART.S.radio },
        { u: 380, v: 330, w: 300, h: 460, art: ART.S.oud },
        { u: 1080, v: 330, w: 220, h: 300, art: ART.S.drum },
      ],
      pois: [
        { look: ['P', 0], title: 'A town that sings', ar: 'بلدة تغنّي', html: `
          <p>Ask anyone in Lebanon about Kfarchima and they will name a singer. All of these artists come from here:</p>
          <ul class="names">
            <li><b>Philemon Wehbe</b><span>composer who wrote songs for Fairouz</span></li>
            <li><b>Majida El Roumi</b><span>one of the best-known voices in the Arab world</span></li>
            <li><b>Melhem Barakat</b><span>singer and stage actor</span></li>
            <li><b>Issam Rajji</b><span>worked with the Rahbani brothers</span></li>
            <li><b>Marie Sleiman</b><span>singer</span></li>
          </ul>` },
        { look: ['P', 1], title: 'Play the oud', ar: 'العود', html: `
          <p>The oud is the king of Arabic instruments. Arabic music uses scales called <b>maqamat</b>. Here is <b>maqam Hijaz</b>: tap a string or play a phrase.</p>
          <div class="oud"><div class="strings" data-strings>${'<span></span>'.repeat(8)}</div><button type="button" class="act red" data-play>Play a phrase</button></div>
          <p class="notes" data-notes></p>` },
        { look: ['P', 2], title: 'The derbakeh', ar: 'الدربكة', html: `
          <p>The derbakeh is a goblet-shaped drum. The deep sound in the middle is called <b>dum</b>, the sharp sound at the edge is <b>tek</b>.</p>
          <p>Try the most common Lebanese rhythm, <b>maqsoum</b>: dum tek – tek dum – tek –.</p>
          <p class="drumrow"><button type="button" class="act" data-dum>Dum</button> <button type="button" class="act" data-tek>Tek</button> <button type="button" class="act red" data-rhythm>Play maqsoum</button></p>` },
      ],
    },
    {
      id: 'kitchen', en: 'Kitchen', ar: 'المطبخ',
      decor: [
        { wall: 'N', at: 750, y: -430, w: 1100, h: 300, html: ART.W.jars, txt: true },
      ],
      props: [
        { u: 750, v: 700, w: 560, h: 300, art: ART.S.mezze },
        { u: 260, v: 1250, w: 260, h: 260, art: ART.S.rakweh },
        { u: 1300, v: 1250, w: 200, h: 300, art: ART.S.plant },
        { u: 750, v: 700, w: 120, h: 260, y: -H + 130, art: ART.S.lantern },
      ],
      pois: [
        { look: ['P', 0], title: 'Mezze: many small plates', ar: 'مازة', html: `
          <p>A Lebanese meal is shared. The table fills with small dishes and everyone takes a little of each. Tap a plate to taste it.</p>
          <div class="plates">
            <button type="button" class="plate" data-plate><span class="fr"><span lang="ar">منقوشة</span><b>Manakish</b></span><span class="bk">Flatbread with za’atar and olive oil. Breakfast for most of Lebanon.</span></button>
            <button type="button" class="plate" data-plate><span class="fr"><span lang="ar">تبولة</span><b>Tabbouleh</b></span><span class="bk">Parsley, tomato, bulgur and a lot of lemon.</span></button>
            <button type="button" class="plate" data-plate><span class="fr"><span lang="ar">حمص</span><b>Hummus</b></span><span class="bk">Chickpeas and tahini, shared with bread at almost every meal.</span></button>
            <button type="button" class="plate" data-plate><span class="fr"><span lang="ar">كنافة</span><b>Knefeh</b></span><span class="bk">Warm sweet cheese pastry with syrup, often in a sesame bun.</span></button>
          </div>` },
        { look: ['N', 750, -430], title: 'The spice shelf', ar: 'رفّ البهارات', html: `
          <p>Every Lebanese kitchen has jars like these:</p>
          <dl class="facts">
            <dt lang="ar">زعتر</dt><dd><b>Za’atar</b>: wild thyme with sesame and sumac, for manakish</dd>
            <dt lang="ar">سماق</dt><dd><b>Sumac</b>: a sour red spice sprinkled on salads</dd>
            <dt lang="ar">دبس</dt><dd><b>Dibs</b>: thick grape or carob molasses</dd>
            <dt lang="ar">برغل</dt><dd><b>Bulgur</b>: cracked wheat, for tabbouleh and kibbeh</dd>
          </dl>` },
        { look: ['P', 1], title: 'A cup of welcome', ar: 'قهوة', html: `
          <p>Lebanese coffee is boiled in a small pot called a <b>rakweh</b>, often with cardamom, and served in tiny cups.</p>
          <p>Offering coffee to a guest is how Lebanese people say welcome.</p>
          <p class="muted">Question for our partners: what do you offer a guest in Ukraine, Bulgaria and Turkey?</p>` },
      ],
    },
    {
      id: 'school', en: 'Our school', ar: 'مدرستنا',
      decor: [
        { wall: 'N', at: 750, y: -390, w: 1000, h: 420, html: ART.W.chalkboard, txt: true },
        { wall: 'S', at: 750, y: -370, w: 1200, h: 380, html: ART.W.photoFrames, txt: true },
      ],
      props: [
        { u: 480, v: 650, w: 420, h: 330, art: ART.S.desk },
        { u: 1020, v: 650, w: 420, h: 330, art: ART.S.desk },
        { u: 1300, v: 1220, w: 260, h: 300, art: ART.S.schoolbag },
      ],
      pois: [
        { look: ['N', 750, -390], title: 'Collège Notre Dame des Sœurs Antonines', ar: 'مدرستنا', html: `
          <p>Our school in Kfarchima, also called Antonines Sisters High School.</p>
          <dl class="facts">
            <dt>Founded by</dt><dd>The Congregation of the Antonine Sisters, a Lebanese order that runs schools across the country</dd>
            <dt>Levels</dt><dd>Preschool to secondary</dd>
            <dt>Founded in</dt><dd>${T('[year]')}</dd>
            <dt>Students</dt><dd>About ${T('[number]')}</dd>
            <dt>Languages</dt><dd>${T('[Arabic, French, English]')}</dd>
          </dl>` },
        { look: ['P', 0], title: 'What we learn here', ar: 'قيمنا', html: `
          <p>The school puts moral and spiritual growth alongside academic learning.</p>
          <p>There are clubs, activities and field trips. In 2023, 73 students from Grades 9 and 12 visited a national institution to learn how it supports Lebanon’s economy.</p>
          <p class="muted">A school app sends families news, timetables, homework and announcements.</p>` },
        { look: ['S', 750, -370], title: 'Inside the school', ar: 'جولة', html: `
          <p>Photos of the building, a classroom and the courtyard go here.</p>
          <p>${T('[Add the photos]')}</p>
          <p class="muted">All photos show spaces and hands at work, never students’ faces.</p>` },
      ],
    },
    {
      id: 'teacher', en: 'Teacher & consent', ar: 'معلّمتنا',
      decor: [
        { wall: 'N', at: 750, y: -330, w: 470, h: 640, html: ART.W.window },
      ],
      props: [
        { u: 750, v: 560, w: 520, h: 360, art: ART.S.teacherDesk },
        { u: 1250, v: 1230, w: 300, h: 300, art: ART.S.forms },
        { u: 220, v: 230, w: 360, h: 520, art: ART.S.bookshelf },
      ],
      pois: [
        { look: ['P', 0], title: 'A letter from our teacher', ar: 'رسالة', html: `
          <div class="letter">
            <p class="greet">Dear partners,</p>
            <p><b>Who I am.</b> ${T('[Years of teaching, subjects and classes, earlier eTwinning projects]')}</p>
            <p><b>What I enjoy.</b> ${T('[Interests outside the classroom]')}</p>
            <p><b>What I hope WELNOVA brings.</b> ${T('[What she hopes students will gain]')}</p>
            <p class="sig">Mary Safadi<small>English Department</small></p>
          </div>` },
        { look: ['P', 1], title: 'Parental consent', ar: 'موافقة الأهل', html: `
          <p>Every student joins with written permission from their parents, on a form written in English.</p>
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
      id: 'terrace', en: 'Terrace', ar: 'السطح', terrace: true,
      decor: [
        { wall: 'N', at: 750, y: -500, w: 1400, h: 200, html: ART.S.bunting },
      ],
      props: [
        { u: 750, v: 480, w: 320, h: 420, art: ART.S.schoolModel },
        { u: 420, v: 1180, w: 520, h: 420, art: ART.S.students },
        { u: 170, v: 170, w: 200, h: 300, art: ART.S.plant },
        { u: 1330, v: 170, w: 200, h: 300, art: ART.S.plant },
        { u: 1330, v: 1330, w: 200, h: 300, art: ART.S.plant },
      ],
      pois: [
        { look: ['P', 1], title: 'Our ten', ar: 'فريقنا', html: `
          <p>Ten students from our school join the four international teams, two or three in each.</p>
          <div class="roster">${Array.from({ length: 10 }, () => `<span>${T('[Name]')}</span>`).join('')}</div>` },
        { look: ['P', 0], title: 'Our future school', ar: 'مدرسة المستقبل', html: `
          <p>Four international teams, four floors, one Eco-Future School:</p>
          <ol class="floors">
            <li class="c1">Inclusion &amp; Accessibility</li><li class="c2">Anti-Bullying &amp; Well-being</li>
            <li class="c3">Digital Learning &amp; Innovation</li><li class="c4">Environment &amp; Sustainability</li>
          </ol>
          <p>Plus a rooftop garden and a basement that collects rainwater.</p>
          <p><button type="button" class="act red" data-ar>See it in 3D and AR</button></p>` },
        { look: ['N', 750, -500], title: 'Ahlan wa sahlan', ar: 'أهلا وسهلا', html: `
          <p class="big-ar" lang="ar">أهلا وسهلا</p>
          <p>Welcome, friends from <b>Ukraine, Bulgaria and Turkey</b>. We can’t wait to meet you and design our future school together.</p>
          <p class="muted">You’ve seen the whole house. Walk around as much as you like, or tap me to hear any room again.</p>` },
      ],
    },
  ];
  const ROOMS_N = ROOMS.length;
  const COLS = ROOMS_N * 4 + 1;

  /* ---------- progress: which rooms Anna has finished showing ---------- */
  const done = (() => {
    try { const v = JSON.parse(localStorage.getItem('bayt-anna') || '[]'); if (Array.isArray(v)) return v; } catch {}
    return [];
  })();
  const saveDone = () => { try { localStorage.setItem('bayt-anna', JSON.stringify(done)); } catch {} };
  const unlocked = (i) => i === 0 || !!done[i - 1];

  /* ---------- grid ---------- */
  const walkable = (x, z) => {
    const c = Math.floor(x / S), r = Math.floor(z / S);
    if (r < 1 || r > 3 || c < 1 || c >= COLS - 1) return false;
    if (c % 4 !== 0) return true;
    return r === 2 && !!done[c / 4 - 1];        // doorway, open once the room before it is read
  };
  const roomAt = (x) => Math.max(0, Math.min(ROOMS_N - 1, Math.floor((x / S - 1) / 4 + 0.125)));
  const x0Of = (i) => (4 * i + 1) * S;
  const standZ = () => (innerWidth < innerHeight ? 3.6 : 3.1) * S;

  /* =====================================================================
     BUILD THE WORLD
     ===================================================================== */
  const scene = document.getElementById('scene');
  const faces = [];       // { el, rooms }
  const boards = [];      // billboards: { el, x, y, z, q, rooms }
  const DPR = window.devicePixelRatio || 1;
  const Q_TEX = DPR >= 2 ? 3.5 : 1.5;   // big surfaces, drawn small and scaled up to save memory
  const Q_TXT = DPR >= 2 ? 2 : 1;       // surfaces with lettering

  function face(cls, w, h, x, y, z, ry, rx, rooms, extra = {}) {
    const q = extra.q || Q_TEX;
    const el = document.createElement('div');
    el.className = 'f';
    el.style.width = (w / q) + 'px';
    el.style.height = (h / q) + 'px';
    el.style.marginLeft = (-w / q / 2) + 'px';
    el.style.marginTop = (-h / q / 2) + 'px';
    el.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateY(${ry}deg) rotateX(${rx}deg) scale(${q})`;
    const inner = document.createElement('div');
    inner.className = 'fi ' + cls;
    inner.style.width = w + 'px';
    inner.style.height = h + 'px';
    inner.style.transform = `scale(${1 / q})`;
    if (extra.bg) inner.style.background = extra.bg;
    if (extra.html) inner.innerHTML = extra.html;
    el.appendChild(inner);
    scene.appendChild(el);
    faces.push({ el, rooms });
    return { el, inner, q };
  }

  function board(cls, w, h, x, y, z, rooms, html) {
    const f = face(cls, w, h, x, y, z, 0, 0, rooms, { html, q: Q_TXT });
    const b = { el: f.el, inner: f.inner, x, y, z, q: f.q, rooms };
    boards.push(b);
    return b;
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

  const wallSpot = (i, wall, at) => {
    const x0 = x0Of(i), off = 5;
    if (wall === 'N') return { x: x0 + at, z: S + off, ry: 0 };
    if (wall === 'S') return { x: x0 + at, z: 4 * S - off, ry: 180 };
    if (wall === 'W') return { x: x0 + off, z: S + at, ry: 90 };
    return { x: x0 + 3 * S - off, z: S + at, ry: -90 };
  };

  const veils = [];
  ROOMS.forEach((room, i) => {
    const x0 = x0Of(i), cx = x0 + 1.5 * S;
    const r = [i];
    const wallCls = room.terrace ? 'wall view' : 'wall dado';

    face('floor', 3 * S, 3 * S, cx, 0, 2.5 * S, 0, 90, r);
    face(room.terrace ? 'sky' : 'ceiling', 3 * S, 3 * S, cx, -H, 2.5 * S, 0, -90, r);
    face(wallCls, 3 * S, H, cx, -H / 2, S, 0, 0, r);
    face(wallCls, 3 * S, H, cx, -H / 2, 4 * S, 180, 0, r);
    for (const side of ['W', 'E']) {
      const x = side === 'W' ? x0 : x0 + 3 * S;
      const ry = side === 'W' ? 90 : -90;
      const solid = (side === 'W' && i === 0) || (side === 'E' && i === ROOMS_N - 1);
      if (solid) face(wallCls, 3 * S, H, x, -H / 2, 2.5 * S, ry, 0, r);
      else {
        face(wallCls, S, H, x, -H / 2, 1.5 * S, ry, 0, r);
        face(wallCls, S, H, x, -H / 2, 3.5 * S, ry, 0, r);
        face('arch', S, H, x, -H / 2, 2.5 * S, ry, 0, r, { bg: archBG });
      }
    }
    if (i < ROOMS_N - 1) {
      const tx = (4 * i + 4.5) * S, both = [i, i + 1];
      face('floor', S, S, tx, 0, 2.5 * S, 0, 90, both);
      face('ceiling', S, S, tx, -H, 2.5 * S, 0, -90, both);
      face('wall', S, H, tx, -H / 2, 2 * S, 0, 0, both);
      face('wall', S, H, tx, -H / 2, 3 * S, 180, 0, both);
      const v = face('veil', 320, 480, (4 * i + 4) * S - 6, -240, 2.5 * S, -90, 0, [i], { q: 2 });
      v.inner.innerHTML = '<span>Read everything in this room to open the arch</span>';
      veils[i] = v.inner;
    }

    room.decor.forEach((d) => {
      const p = wallSpot(i, d.wall, d.at);
      face('decor', d.w, d.h, p.x, d.y, p.z, p.ry, 0, r, { html: d.html, q: d.txt ? Q_TXT : Q_TEX / 1.5 });
    });
    room.props.forEach((p) => {
      p.x = x0 + p.u; p.z = S + p.v; p.yy = p.y != null ? p.y : -p.h / 2;
      p.board = board('prop', p.w, p.h, p.x, p.yy, p.z, r, p.art);
    });
  });

  function refreshVeils() {
    veils.forEach((inner, i) => { if (inner) inner.classList.toggle('open', !!done[i]); });
  }
  refreshVeils();

  /* ---------- Anna ---------- */
  const anna = board('ghost', 240, 300, 0, -420, 0, [], ART.ghost(true));
  anna.inner.setAttribute('title', 'Anna');
  const annaPos = { x: x0Of(0) + 1050, y: -430, z: S + 650 };
  const annaGoal = { ...annaPos };

  /* =====================================================================
     CAMERA, RENDER, CULLING
     ===================================================================== */
  const view = document.getElementById('viewport');
  const cam = { x: x0Of(0) + 750, z: standZ(), yaw: 0, pitch: 0.05 };
  let persp = 800;
  function resize() {
    const h = view.clientHeight, w = view.clientWidth;
    persp = Math.round((h / 2) / Math.tan((w < h ? 104 : 70) * Math.PI / 360));
    view.style.perspective = persp + 'px';
  }
  resize();
  addEventListener('resize', resize);

  let currentRoom = -1;
  function updateRoom() {
    const ri = roomAt(cam.x);
    if (ri === currentRoom) return;
    currentRoom = ri;
    for (const f of faces) {
      if (f.el === anna.el) continue;
      const d = Math.min(...f.rooms.map((k) => Math.abs(k - ri)));
      f.el.classList.toggle('hidden', d > 1);
    }
    const room = ROOMS[ri];
    document.getElementById('room-label').innerHTML = `${ri + 1}. ${room.en} &nbsp;<b lang="ar" dir="rtl">${room.ar}</b>`;
    if (started) showToast(room);
    if (!tour && done[ri]) idleAnna();
  }

  function render(t) {
    scene.style.transform =
      `translateZ(${persp}px) rotateX(${cam.pitch}rad) rotateY(${cam.yaw}rad) translate3d(${-cam.x}px,${EYE}px,${-cam.z}px)`;
    for (const k of ['x', 'y', 'z']) annaPos[k] += (annaGoal[k] - annaPos[k]) * 0.06;   // Anna drifts towards her goal
    anna.x = annaPos.x; anna.z = annaPos.z;
    anna.y = annaPos.y + (REDUCED ? 0 : Math.sin(t / 420) * 14);
    const turn = `rotateY(${-cam.yaw}rad)`;
    for (const b of boards) {
      if (b.el.classList.contains('hidden')) continue;
      b.el.style.transform = `translate3d(${b.x}px,${b.y}px,${b.z}px) ${turn} scale(${b.q})`;
    }
  }

  /* =====================================================================
     MOVEMENT
     ===================================================================== */
  const keys = new Set();
  const move = { f: 0, s: 0 };
  let tween = null;
  let bumpCooldown = 0;

  function tryMove(dx, dz) {
    const ok = (x, z) => walkable(x - RADIUS, z - RADIUS) && walkable(x + RADIUS, z - RADIUS) &&
      walkable(x - RADIUS, z + RADIUS) && walkable(x + RADIUS, z + RADIUS);
    if (ok(cam.x + dx, cam.z)) cam.x += dx;
    else {
      const ri = roomAt(cam.x);
      const atArch = Math.abs(cam.z - 2.5 * S) < 0.75 * S && dx > 0 && cam.x > x0Of(ri) + 2.4 * S && ri < ROOMS_N - 1;
      if (atArch && !done[ri]) {
        if (bumpCooldown <= 0) { bumpCooldown = 3; annaSays('Wait! Let me show you this room first.'); }
      } else if (Math.abs(dx) > Math.abs(dz) && Math.abs(cam.z - 2.5 * S) < 0.75 * S) {
        const pull = Math.sign(2.5 * S - cam.z) * Math.min(Math.abs(2.5 * S - cam.z), Math.abs(dx) * 1.2);
        if (ok(cam.x, cam.z + pull)) cam.z += pull;
      }
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
      tryMove((f * sin + s * cos) * speed * dt, (-f * cos + s * sin) * speed * dt);
      tween = null;
      hideHint();
    }
  }

  function goToRoom(i) {
    if (!unlocked(i)) return;
    const target = { x: x0Of(i) + 750, z: standZ(), yaw: Math.round(cam.yaw / (2 * Math.PI)) * 2 * Math.PI, pitch: 0.05 };
    if (REDUCED) { Object.assign(cam, target); return; }
    tween = { from: { ...cam }, to: target, t: 0, dur: Math.min(2.2, 0.6 + Math.abs(i - roomAt(cam.x)) * 0.25) };
  }

  function lookAt(px, py, pz, then) {
    const dx = px - cam.x, dz = pz - cam.z;
    let yaw = Math.atan2(dx, -dz);
    while (yaw - cam.yaw > Math.PI) yaw -= 2 * Math.PI;
    while (yaw - cam.yaw < -Math.PI) yaw += 2 * Math.PI;
    // aim a little low so the thing sits in the upper part of the screen, above Anna's card
    const pitch = Math.max(-0.6, Math.min(0.5, Math.atan2(-(py + EYE), Math.hypot(dx, dz)) - 0.22));
    const to = { x: cam.x, z: cam.z, yaw, pitch };
    if (REDUCED) { Object.assign(cam, to); if (then) then(); return; }
    tween = { from: { ...cam }, to, t: 0, dur: 0.75, then };
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    bumpCooldown -= dt;
    if (tween) {
      tween.t += dt / tween.dur;
      const k = tween.t >= 1 ? 1 : 0.5 - Math.cos(Math.PI * tween.t) / 2;
      for (const key of ['x', 'z', 'yaw', 'pitch']) cam[key] = tween.from[key] + (tween.to[key] - tween.from[key]) * k;
      if (tween.t >= 1) { const then = tween.then; tween = null; if (then) then(); }
    } else if (!cardOpen) {
      step(dt);
      applyGyro();
    }
    render(now);
    updateRoom();
    checkTourStart();
    drawMap();
    requestAnimationFrame(frame);
  }

  /* =====================================================================
     ANNA'S TOUR
     ===================================================================== */
  let tour = null;          // { room, idx, replay }
  let cardOpen = false;

  function poiPoint(i, poi) {
    const [kind, a, b] = poi.look;
    if (kind === 'P') { const p = ROOMS[i].props[a]; return { x: p.x, y: p.yy, z: p.z }; }
    const s = wallSpot(i, kind, a);
    return { x: s.x, y: b, z: s.z };
  }

  function placeAnnaBeside(pt) {
    const dx = pt.x - cam.x, dz = pt.z - cam.z, d = Math.hypot(dx, dz) || 1;
    const fx = dx / d, fz = dz / d;           // towards the thing
    const rx = -fz, rz = fx;                  // to its right, seen from the camera
    const back = Math.min(380, d * 0.45);
    const x0 = x0Of(currentRoom);
    annaGoal.x = Math.max(x0 + 140, Math.min(x0 + 3 * S - 140, pt.x - fx * back - rx * 230));
    annaGoal.z = Math.max(S + 140, Math.min(4 * S - 140, pt.z - fz * back - rz * 230));
    annaGoal.y = Math.min(-300, pt.y - 40);
  }

  function idleAnna() {
    const x0 = x0Of(currentRoom);
    annaGoal.x = x0 + 1150; annaGoal.z = S + 520; annaGoal.y = -440;
  }

  function checkTourStart() {
    if (!started || tour || cardOpen) return;
    const i = roomAt(cam.x), x0 = x0Of(i);
    if (done[i]) return;
    if (cam.x > x0 + 120 && cam.x < x0 + 3 * S - 120) startTour(i);
  }

  function startTour(i, replay = false) {
    tour = { room: i, idx: 0, replay };
    hideHint();
    showPoi();
  }

  function showPoi() {
    const room = ROOMS[tour.room];
    const poi = room.pois[tour.idx];
    const pt = poiPoint(tour.room, poi);
    keys.clear(); move.f = move.s = 0;
    cardOpen = true;
    placeAnnaBeside(pt);
    lookAt(pt.x, pt.y, pt.z, () => {
      placeAnnaBeside(pt);
      setTimeout(() => openCard(room, poi, tour.idx, room.pois.length), REDUCED ? 0 : 450);
    });
  }

  function nextPoi() {
    closeCard();
    if (!tour) return;
    tour.idx++;
    const room = ROOMS[tour.room];
    if (tour.idx < room.pois.length) { showPoi(); return; }
    const i = tour.room;
    const first = !done[i];
    done[i] = true; saveDone(); refreshVeils();
    tour = null;
    idleAnna();
    renderRoomsMenu();
    if (i < ROOMS_N - 1) annaSays(first ? 'Yalla! The arch is open. Walk east to the next room.' : 'The arch to the next room is open.');
    else annaSays('That’s the whole house. Tap me any time to hear a room again.');
  }

  /* ---------- the card that pops up in front of you ---------- */
  const card = document.getElementById('card');
  const cardBody = document.getElementById('card-body');
  const cardTitle = document.getElementById('card-title');
  const cardAr = document.getElementById('card-ar');
  const cardStep = document.getElementById('card-step');
  const btnNext = document.getElementById('card-next');
  let readTimer = null;

  function openCard(room, poi, idx, total) {
    cardTitle.textContent = poi.title;
    cardAr.textContent = poi.ar || '';
    cardBody.innerHTML = poi.html;
    cardStep.textContent = total > 1 ? `${idx + 1} of ${total} in ${room.en}` : room.en;
    const lastOne = idx + 1 >= total;
    btnNext.textContent = !lastOne ? 'Next' : (tour && tour.room < ROOMS_N - 1 ? 'Open the arch' : 'Done');
    card.hidden = false;
    card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop');

    // you have to read it: Next waits about as long as it takes to read the card
    const words = (poi.title + ' ' + cardBody.textContent).split(/\s+/).filter(Boolean).length;
    const ms = tour && !tour.replay ? Math.max(2500, Math.min(9000, words * 230)) : 500;
    btnNext.disabled = true;
    btnNext.style.setProperty('--wait', ms + 'ms');
    btnNext.classList.remove('filling'); void btnNext.offsetWidth; btnNext.classList.add('filling');
    clearTimeout(readTimer);
    readTimer = setTimeout(() => { btnNext.disabled = false; btnNext.focus({ preventScroll: true }); }, ms);
    cardBody.scrollTop = 0;
  }

  function closeCard() {
    card.hidden = true;
    cardOpen = false;
    clearTimeout(readTimer);
  }

  btnNext.addEventListener('click', () => { if (!btnNext.disabled) nextPoi(); });
  addEventListener('keydown', (e) => {
    if (!cardOpen || card.hidden) return;
    if ((e.key === 'Enter' || e.key === ' ') && !btnNext.disabled && !e.target.closest('button:not(#card-next), a, iframe')) { e.preventDefault(); nextPoi(); }
  });

  /* ---------- short lines from Anna ---------- */
  const toast = document.getElementById('toast');
  const sayBox = document.getElementById('anna-says');
  let toastTimer, sayTimer;
  function showToast(room) {
    toast.innerHTML = `<span class="ar" lang="ar">${room.ar}</span><span class="en">${room.en}</span>`;
    toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('on'), 1800);
  }
  function annaSays(msg) {
    sayBox.innerHTML = `<b>Anna</b>${msg}`;
    sayBox.classList.add('on');
    clearTimeout(sayTimer);
    sayTimer = setTimeout(() => sayBox.classList.remove('on'), 3800);
  }

  /* =====================================================================
     INPUT
     ===================================================================== */
  const typing = (e) => e.target.closest && e.target.closest('input, textarea, dialog[open]');
  addEventListener('keydown', (e) => {
    if (typing(e) || !started || cardOpen) return;
    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'q', 'e', 'shift', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
      keys.add(k);
      if (k.startsWith('arrow')) e.preventDefault();
    }
  });
  addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
  addEventListener('blur', () => keys.clear());

  const stick = document.getElementById('stick');
  const knob = document.getElementById('stick-knob');
  let look = null, walk = null, lastDrag = 0;
  const isTouch = () => matchMedia('(pointer: coarse)').matches;

  view.addEventListener('pointerdown', (e) => {
    if (!started || cardOpen) return;
    if (e.pointerType === 'touch' && e.clientX < innerWidth * 0.45 && !walk) {
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
    if (look && e.pointerId === look.id && !cardOpen) {
      const dx = e.clientX - look.x, dy = e.clientY - look.y;
      look.x = e.clientX; look.y = e.clientY;
      look.moved += Math.abs(dx) + Math.abs(dy);
      const k = e.pointerType === 'touch' ? 0.006 : 0.0045;
      cam.yaw += dx * k;
      cam.pitch = Math.max(-0.75, Math.min(0.75, cam.pitch - dy * k));
      if (gyro.on) gyro.yawOffset += dx * k;
      tween = null;
      if (look.moved > 30) hideHint();
    }
  });
  const endPointer = (e) => {
    if (walk && e.pointerId === walk.id) { walk = null; move.f = move.s = 0; knob.style.transform = ''; }
    if (look && e.pointerId === look.id) { lastDrag = look.moved; look = null; view.classList.remove('dragging'); }
  };
  addEventListener('pointerup', endPointer);
  addEventListener('pointercancel', endPointer);
  function updateStick(e) {
    const max = 46;
    let dx = e.clientX - walk.cx, dy = e.clientY - walk.cy;
    const d = Math.hypot(dx, dy);
    if (d > max) { dx *= max / d; dy *= max / d; }
    knob.style.transform = `translate(${dx}px,${dy}px)`;
    if (!cardOpen) { move.s = dx / max; move.f = -dy / max; }
  }

  // tap Anna to hear this room again
  anna.inner.addEventListener('click', () => {
    if (lastDrag > 8 || cardOpen || tour) return;
    startTour(currentRoom, !!done[currentRoom]);
  });

  /* ---------- gyro ---------- */
  const gyro = { on: false, base: null, yawOffset: 0, alpha: null, beta: null };
  const onOrient = (e) => { gyro.alpha = e.alpha; gyro.beta = e.beta; };
  function applyGyro() {
    if (!gyro.on || gyro.alpha == null) return;
    if (gyro.base == null) { gyro.base = gyro.alpha; gyro.yawOffset = cam.yaw; }
    let d = gyro.alpha - gyro.base;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    cam.yaw = gyro.yawOffset - d * Math.PI / 180;
    cam.pitch = Math.max(-0.75, Math.min(0.75, (gyro.beta - 80) * Math.PI / 180));
  }
  const btnGyro = document.getElementById('btn-gyro');
  if ('DeviceOrientationEvent' in window && isTouch()) btnGyro.hidden = false;
  btnGyro.addEventListener('click', async () => {
    if (gyro.on) { gyro.on = false; removeEventListener('deviceorientation', onOrient); btnGyro.textContent = 'Look with phone'; return; }
    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        if ((await DeviceOrientationEvent.requestPermission()) !== 'granted') throw new Error('denied');
      }
      gyro.on = true; gyro.base = null;
      addEventListener('deviceorientation', onOrient);
      btnGyro.textContent = 'Stop phone look';
    } catch {
      annaSays('Motion access is off. Allow it in your browser settings to look around by moving your phone.');
    }
  });

  /* ---------- minimap ---------- */
  const map = document.getElementById('minimap');
  const mctx = map.getContext('2d');
  const MW = map.width, MH = map.height, mk = MW / (COLS * S);
  function drawMap() {
    mctx.clearRect(0, 0, MW, MH);
    const top = (MH - 3 * S * mk) / 2 - S * mk;
    ROOMS.forEach((room, i) => {
      mctx.fillStyle = i === currentRoom ? '#B3261E' : !unlocked(i) ? '#2C3330' : room.terrace ? '#3F78A8' : '#5E6B65';
      mctx.fillRect((4 * i + 1) * S * mk, top + S * mk, 3 * S * mk - 1, 3 * S * mk);
      if (i < ROOMS_N - 1) { mctx.fillStyle = done[i] ? '#5E6B65' : '#2C3330'; mctx.fillRect((4 * i + 4) * S * mk, top + 2 * S * mk, S * mk, S * mk); }
    });
    const px = cam.x * mk, pz = top + cam.z * mk;
    mctx.fillStyle = 'rgba(242,182,50,.35)';
    mctx.beginPath(); mctx.moveTo(px, pz);
    mctx.arc(px, pz, 16, cam.yaw - Math.PI / 2 - 0.6, cam.yaw - Math.PI / 2 + 0.6); mctx.fill();
    mctx.fillStyle = '#F2B632';
    mctx.beginPath(); mctx.arc(px, pz, 3.5, 0, 7); mctx.fill();
  }
  map.addEventListener('click', (e) => {
    if (cardOpen) return;
    const r = map.getBoundingClientRect();
    const i = roomAt((e.clientX - r.left) / r.width * MW / mk);
    if (unlocked(i)) goToRoom(i); else annaSays('That room is still closed. Finish the rooms before it first.');
  });

  /* ---------- rooms menu ---------- */
  const roomsDlg = document.getElementById('rooms-dialog');
  const list = document.getElementById('rooms-list');
  function renderRoomsMenu() {
    list.innerHTML = '';
    ROOMS.forEach((room, i) => {
      const li = document.createElement('li');
      const open = unlocked(i);
      li.innerHTML = `<button type="button" ${open ? '' : 'disabled'}><span>${room.en}${open ? '' : ' <small>(closed)</small>'}</span><span class="ar" lang="ar">${room.ar}</span></button>`;
      li.firstChild.addEventListener('click', () => { roomsDlg.close(); goToRoom(i); });
      list.appendChild(li);
    });
  }
  renderRoomsMenu();
  document.getElementById('btn-rooms').addEventListener('click', () => { if (!cardOpen) roomsDlg.showModal(); });
  document.getElementById('btn-restart').addEventListener('click', () => {
    done.length = 0; saveDone(); refreshVeils(); renderRoomsMenu(); roomsDlg.close();
    tour = null; Object.assign(cam, { x: x0Of(0) + 750, z: standZ(), yaw: 0, pitch: 0.05 });
  });

  /* ---------- AR ---------- */
  const arDlg = document.getElementById('ar-dialog');
  let mvLoading = false;
  function openAR() {
    arDlg.showModal();
    if (customElements.get('model-viewer') || mvLoading) return;
    mvLoading = true;
    const sc = document.createElement('script');
    sc.type = 'module';
    sc.src = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@3/dist/model-viewer.min.js';
    sc.onerror = () => { mvLoading = false; document.getElementById('ar-note').textContent = 'The 3D viewer could not load. Check your internet connection and try again.'; };
    document.head.appendChild(sc);
  }
  document.getElementById('btn-ar').addEventListener('click', () => { if (!cardOpen) openAR(); });

  /* ---------- classic page (for teachers) ---------- */
  const classicDlg = document.getElementById('classic-dialog');
  const classicBody = document.getElementById('classic-body');
  let classicBuilt = false;
  document.getElementById('btn-intro-classic').addEventListener('click', () => {
    if (!classicBuilt) {
      classicBody.innerHTML = ROOMS.map((room, i) => `
        <section>
          <h3 class="room-title">${i + 1}. ${room.en}<span class="ar" lang="ar">${room.ar}</span></h3>
          ${room.pois.map((p) => `<article class="flat"><h4>${p.title}</h4>${p.html}</article>`).join('')}
        </section>`).join('');
      classicBuilt = true;
    }
    classicDlg.showModal();
  });
  document.querySelectorAll('dialog [data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));

  /* ---------- things you can play with inside cards ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target;
    const plate = t.closest('[data-plate]');
    if (plate) { plate.classList.toggle('flip'); return; }
    if (t.closest('[data-ar]')) { openAR(); return; }
    if (t.closest('[data-play]')) { playPhrase(t.closest('.flat, #card')); return; }
    if (t.closest('[data-dum]')) { drum('dum'); return; }
    if (t.closest('[data-tek]')) { drum('tek'); return; }
    if (t.closest('[data-rhythm]')) { maqsoum(); return; }
    const str = t.closest('[data-strings]');
    if (str) {
      const r = str.getBoundingClientRect();
      pluck(Math.max(0, Math.min(7, Math.floor((e.clientX - r.left) / r.width * 8))), str.closest('.flat, #card'));
    }
  });

  /* ---------- sound ---------- */
  const HIJAZ = [293.66, 311.13, 369.99, 392.0, 440.0, 466.16, 523.25, 587.33];
  const NAMES = ['D', 'E♭', 'F♯', 'G', 'A', 'B♭', 'C', 'D'];
  let actx = null;
  function audio() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }
  function pluck(i, scope, when = 0) {
    const ac = audio(), t = ac.currentTime + when;
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
      const o = ac.createOscillator(), og = ac.createGain();
      o.type = type; o.frequency.value = HIJAZ[i]; o.detune.value = det; og.gain.value = g;
      o.connect(og); og.connect(lp); o.start(t); o.stop(t + 1.7);
    }
    setTimeout(() => {
      if (!scope) return;
      const s = scope.querySelectorAll('[data-strings] span')[i];
      if (s) { s.classList.remove('hit'); void s.offsetWidth; s.classList.add('hit'); }
      const n = scope.querySelector('[data-notes]');
      if (n) n.textContent = `Note: ${NAMES[i]}`;
    }, when * 1000);
  }
  function playPhrase(scope) {
    [[4, 0], [3, .32], [2, .56], [1, .8], [2, 1.2], [1, 1.44], [0, 1.68], [0, 2.3], [1, 2.6], [2, 2.84], [3, 3.08], [4, 3.32], [5, 3.6], [4, 3.84], [3, 4.08], [2, 4.4], [1, 4.64], [0, 5.0]]
      .forEach(([n, t]) => pluck(n, scope, t));
  }
  function drum(kind, when = 0) {
    const ac = audio(), t = ac.currentTime + when;
    if (kind === 'dum') {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.25);
      g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + 0.5);
    } else {
      const len = Math.floor(ac.sampleRate * 0.12);
      const buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4);
      const src = ac.createBufferSource(), bp = ac.createBiquadFilter(), g = ac.createGain();
      src.buffer = buf; bp.type = 'bandpass'; bp.frequency.value = 2600; bp.Q.value = 1.2; g.gain.value = 0.9;
      src.connect(bp); bp.connect(g); g.connect(ac.destination); src.start(t);
    }
  }
  function maqsoum() {
    const beat = 0.24;
    for (let bar = 0; bar < 3; bar++) {
      const b = bar * 8 * beat;
      [['dum', 0], ['tek', 1], ['tek', 3], ['dum', 4], ['tek', 6]].forEach(([k, s]) => drum(k, b + s * beat));
    }
  }

  /* ---------- hints ---------- */
  const hint = document.getElementById('hint');
  let hintHidden = false;
  function hideHint() { if (!hintHidden) { hintHidden = true; hint.style.opacity = 0; } }

  /* =====================================================================
     START
     ===================================================================== */
  let started = false;
  const touch = isTouch();
  if (touch) document.body.classList.add('touch');
  document.getElementById('intro-keys').textContent = touch
    ? 'Left thumb walks, right thumb looks around. Anna the ghost will show you everything.'
    : 'Walk with W A S D or the arrow keys and drag to look. Anna the ghost will show you everything.';
  hint.textContent = touch ? 'Left thumb: walk · Right thumb: look' : 'W A S D to walk · drag to look';

  document.getElementById('btn-enter').addEventListener('click', () => {
    started = true;
    document.getElementById('intro').classList.add('gone');
    document.getElementById('hud').hidden = false;
    audio();
    showToast(ROOMS[currentRoom]);
  });

  updateRoom();
  idleAnna();
  Object.assign(annaPos, annaGoal);
  render(0);
  requestAnimationFrame(frame);

  window.__bayt = { cam, done, get tour() { return tour; }, get cardOpen() { return cardOpen; } };
  const q = new URLSearchParams(location.search);
  if (q.has('at')) {                                  // for testing: ?at=room&yaw=deg&start
    const i = +q.get('at');
    for (let k = 0; k < i; k++) done[k] = true;
    refreshVeils(); renderRoomsMenu();
    cam.x = x0Of(i) + 750; cam.z = +(q.get('z') || 2.5) * S; cam.yaw = (+q.get('yaw') || 0) * Math.PI / 180;
    if (q.has('notour')) done[i] = true;
    if (q.has('start')) document.getElementById('btn-enter').click();
  }
})();
