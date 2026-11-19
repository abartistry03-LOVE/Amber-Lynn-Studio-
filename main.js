/* Amber Lynn — portfolio interactions: gallery filters, click-to-enlarge, inquiry form, copy email */
(function () {
  // ---------- gallery filters ----------
  var btns = document.querySelectorAll('.filters button');
  var pieces = document.querySelectorAll('.piece');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.f;
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      pieces.forEach(function (p) { p.hidden = !(f === 'all' || p.dataset.cat === f); });
    });
  });

  // ---------- gallery videos: stay still for visitors who prefer reduced motion ----------
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.gallery video').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  }

  // ---------- enlarge on click (shows a story too, if a piece has one) ----------
  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img');
  var lbVid = document.getElementById('lb-vid');
  var lbTitle = document.getElementById('lb-title'), lbLabel = document.getElementById('lb-label'), lbStory = document.getElementById('lb-story');
  var current = null, opener = null;
  function zoomables() { return Array.prototype.filter.call(document.querySelectorAll('.zoom'), function (z) { return !z.closest('.piece').hidden; }); }
  function show(z) {
    current = z;
    var fig = z.closest('figure'), media = z.querySelector('video');
    if (media) {
      lbImg.hidden = true; lbImg.removeAttribute('src');
      lbVid.src = media.currentSrc || media.src; lbVid.poster = media.poster; lbVid.setAttribute('aria-label', media.getAttribute('aria-label') || '');
      lbVid.hidden = false; var pr = lbVid.play(); if (pr && pr.catch) pr.catch(function () {});
    } else {
      var img = z.querySelector('img');
      lbVid.pause(); lbVid.hidden = true; lbVid.removeAttribute('src');
      lbImg.hidden = false; lbImg.src = img.src; lbImg.alt = img.alt;
    }
    lbTitle.textContent = fig.querySelector('figcaption b').textContent;
    lbLabel.textContent = fig.querySelector('figcaption .label').textContent;
    var st = z.querySelector('.story'); lbStory.textContent = st ? st.textContent : '';
    lbStory.hidden = !lbStory.textContent; document.querySelector('.lb-text .rule').hidden = !lbStory.textContent;
  }
  function open(z) { opener = z; show(z); lb.hidden = false; document.body.style.overflow = 'hidden'; document.getElementById('lb-close').focus(); }
  function close() { lbVid.pause(); lb.hidden = true; document.body.style.overflow = ''; if (opener) opener.focus(); }
  function step(d) { var list = zoomables(), i = list.indexOf(current); show(list[(i + d + list.length) % list.length]); }
  document.querySelectorAll('.zoom').forEach(function (z) {
    z.addEventListener('click', function () { open(z); });
    z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(z); } });
  });
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', function () { step(-1); });
  document.getElementById('lb-next').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-inner')) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  });

  // ---------- inquiry form (opens the visitor's email app, addressed to Amber) ----------
  var copy = document.getElementById('copy');
  var notice = document.getElementById('notice');
  var addr = document.getElementById('addr');
  function selectAddr() {
    var r = document.createRange(); r.selectNodeContents(addr);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    notice.textContent = 'Email selected. Press Ctrl+C or ⌘C to copy.';
  }
  var TO = 'abartistry03@gmail.com';
  var send = document.getElementById('send');
  var note = document.getElementById('form-note');
  var ready = document.getElementById('ready');
  function v(id) { return document.getElementById(id).value.trim(); }
  function message() {
    return 'Name: ' + v('name') + '\nEmail: ' + v('email') + '\nProject: ' + v('kind') +
      (v('place') ? '\n' + document.getElementById('place-label').textContent + ': ' + v('place') : '') + '\n\n' + v('idea');
  }
  function update() {
    send.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(v('kind') + ' inquiry from ' + (v('name') || 'your site')) +
      '&body=' + encodeURIComponent(message());
  }
  var FIELDS = {
    'Tattoo': ['Placement & size', 'Inner forearm, about 10 cm', 'Symbols, references, the feeling you want it to hold'],
    'Mural': ['Wall size & location', 'Living room wall, about 3 × 2 m', 'The space, colors you love, how you want the room to feel'],
    'Artwork': ['Size & timeline', 'Painting about 60 × 90 cm, by spring', 'The subject, colors and feeling you would like the piece to hold'],
    'Web & Branding': ['Business & timeline', 'Yoga studio, launching in spring', 'What you need (logo, website, full brand), your style, sites you admire'],
    'Something else': ['Details', 'Size, timeline, location', 'Tell me what you have in mind']
  };
  var kind = document.getElementById('kind');
  function setKind() {
    var f = FIELDS[kind.value] || FIELDS['Something else'];
    document.getElementById('place-label').textContent = f[0];
    document.getElementById('place').placeholder = f[1];
    document.getElementById('idea').placeholder = f[2];
  }
  kind.addEventListener('change', function () { setKind(); update(); });
  setKind();
  document.getElementById('inquiry').addEventListener('input', update);
  document.getElementById('inquiry').addEventListener('submit', function (e) { e.preventDefault(); send.click(); });
  update();
  send.addEventListener('click', function (e) {
    var em = v('email');
    if (!v('name') || em.indexOf('@') < 1 || !v('idea')) {
      e.preventDefault();
      note.textContent = 'Add your name, email and a few words about your idea.';
      return;
    }
    update();
    note.textContent = 'Your email app should open with the message ready. Press send there to reach Amber.';
    ready.hidden = false;
  });
  document.getElementById('copy-msg').addEventListener('click', function () {
    var text = 'To: ' + TO + '\n\n' + message();
    try {
      navigator.clipboard.writeText(text).then(function () { note.textContent = 'Message copied. Paste it into an email to ' + TO + '.'; },
        function () { note.textContent = 'Copying is blocked here. Email ' + TO + ' directly.'; });
    } catch (err) { note.textContent = 'Copying is blocked here. Email ' + TO + ' directly.'; }
  });

  // ---------- copy email ----------
  copy.addEventListener('click', function () {
    try {
      navigator.clipboard.writeText(addr.textContent.trim()).then(function () { notice.textContent = 'Email copied.'; }, selectAddr);
    } catch (e) { selectAddr(); }
  });
})();
