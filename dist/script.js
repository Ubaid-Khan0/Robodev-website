(() => {
  const root = document.documentElement;
  document.querySelectorAll('img[src="assets/robodevlearn-app-home.jpeg"]').forEach(image => { image.src = 'assets/robodevlearn-app-updated.jpeg'; });
  document.querySelectorAll('img[src="assets/robodevlearn-app-projects.jpeg"]').forEach(image => { image.src = 'assets/robodevlearn-app-projects-branded.png'; });
  document.querySelectorAll('a[href="assets/robodevlearn-app-home.jpeg"]').forEach(link => { link.href = 'assets/robodevlearn-app-updated.jpeg'; });
  document.querySelectorAll('a[href="assets/robodevlearn-app-projects.jpeg"]').forEach(link => { link.href = 'assets/robodevlearn-app-projects-branded.png'; });
  const themeButton = document.querySelector('.theme-toggle');
  const syncThemeButton = () => {
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = dark ? '#07111f' : '#f8fbff';
  };
  syncThemeButton();
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('robodevlearn-theme', root.dataset.theme);
    syncThemeButton();
  });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const journeyIcons = [
    '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="3"/><path d="M12 2.5v2M21.5 12h-2M12 21.5v-2M2.5 12h2"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none"><path d="M4 5.5c3-.8 5.7-.25 8 1.6v12.4c-2.3-1.85-5-2.4-8-1.6zM20 5.5c-3-.8-5.7-.25-8 1.6v12.4c2.3-1.85 5-2.4 8-1.6z"/><path d="M7 9.5h2M15 9.5h2"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3 4.5 7.2v9.6L12 21l7.5-4.2V7.2zM4.5 7.2 12 12l7.5-4.8M12 12v9"/><path d="m9 5 7.5 4.5"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none"><path d="M19.5 8.5A8 8 0 1 0 20 15M19.5 4v4.5H15"/><path d="m9 12 2 2 4-4"/></svg>'
  ];
  const journeyStepIcons = document.querySelectorAll('.journey .step-icon');
  if (journeyStepIcons.length) {
    journeyStepIcons.forEach((icon, index) => {
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = journeyIcons[index] || journeyIcons[0];
    });
    const journeyIconStyles = document.createElement('style');
    journeyIconStyles.textContent = `.journey .step-icon{position:relative;display:grid;place-items:center;width:62px;height:62px;margin:1.6rem 0;border:1px solid color-mix(in srgb,var(--cyan) 38%,var(--line));border-radius:18px;background:linear-gradient(145deg,color-mix(in srgb,var(--cyan) 15%,var(--panel)),var(--panel));box-shadow:inset 0 1px rgba(255,255,255,.08),0 12px 30px color-mix(in srgb,var(--cyan) 10%,transparent);transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .3s ease,box-shadow .3s ease}.journey .step-icon:after{content:"";position:absolute;inset:7px;border:1px solid color-mix(in srgb,var(--cyan) 14%,transparent);border-radius:12px}.journey .step-icon svg{position:relative;z-index:1;width:31px;height:31px;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.journey li:hover .step-icon{transform:translateY(-6px) rotate(-3deg);border-color:var(--cyan);box-shadow:0 16px 36px color-mix(in srgb,var(--cyan) 18%,transparent)}.journey li:nth-child(even):hover .step-icon{transform:translateY(-6px) rotate(3deg)}[data-theme="light"] .journey .step-icon{background:linear-gradient(145deg,#fff,#e7f3ff);box-shadow:0 12px 28px rgba(29,78,216,.1)}@media(max-width:600px){.journey .step-icon{width:54px;height:54px;border-radius:15px}.journey .step-icon svg{width:27px;height:27px}}`;
    document.head.appendChild(journeyIconStyles);
  }
  const rotatingIdea = document.querySelector('.rotating-idea');
  if (rotatingIdea && !reduced) {
    const ideas = ['Build the circuit.', 'Code the behavior.', 'Debug the design.', 'Invent the future.'];
    let ideaIndex = 0;
    const showIdea = (idea) => {
      const words = idea.split(' ');
      const firstLine = document.createElement('span');
      const secondLine = document.createElement('span');
      firstLine.className = secondLine.className = 'idea-line';
      firstLine.textContent = words.slice(0, 2).join(' ');
      secondLine.textContent = words.slice(2).join(' ');
      rotatingIdea.replaceChildren(firstLine, secondLine);
    };
    setInterval(() => {
      rotatingIdea.classList.add('is-changing');
      setTimeout(() => {
        ideaIndex = (ideaIndex + 1) % ideas.length;
        showIdea(ideas[ideaIndex]);
        rotatingIdea.classList.remove('is-changing');
      }, 300);
    }, 3200);
  }
  const reveals = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('in-view'));
  else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    reveals.forEach(el => observer.observe(el));
  }

  const form = document.querySelector('.waitlist-form');
  const email = document.querySelector('#email');
  const status = document.querySelector('#form-status');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    status.className = 'form-status';
    if (!email.value.trim()) {
      email.setAttribute('aria-invalid', 'true'); status.textContent = 'Enter an email address to continue.'; status.classList.add('error'); email.focus(); return;
    }
    if (!email.validity.valid) {
      email.setAttribute('aria-invalid', 'true'); status.textContent = 'That email format does not look quite right.'; status.classList.add('error'); email.focus(); return;
    }
    email.removeAttribute('aria-invalid'); status.textContent = 'You’re on the demo list locally—nothing was sent or stored.'; form.reset();
  });
  if (email) email.addEventListener('input', () => { email.removeAttribute('aria-invalid'); if (status.classList.contains('error')) status.textContent = ''; });
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const contactStatus = contactForm.querySelector('.form-status');
    const required = [...contactForm.querySelectorAll('[required]')];
    const invalid = required.find(field => !field.checkValidity());
    if (invalid) { invalid.setAttribute('aria-invalid', 'true'); contactStatus.textContent = 'Please complete the highlighted field correctly.'; contactStatus.className = 'form-status error'; invalid.focus(); return; }
    required.forEach(field => field.removeAttribute('aria-invalid'));
    contactStatus.textContent = 'Demo complete—your message was not sent or stored.';
    contactStatus.className = 'form-status'; contactForm.reset();
  });
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  if (!document.getElementById('top')) document.body.id = 'top';
  let backToTop = document.querySelector('.back-top');
  if (!backToTop) {
    backToTop = document.createElement('a');
    backToTop.className = 'back-top';
    backToTop.href = '#top';
    document.body.appendChild(backToTop);
  }
  backToTop.innerHTML = '<span>Back to top</span><b aria-hidden="true">↑</b>';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.classList.add('floating-back-top');
  const syncBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 420);
  backToTop.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
  window.addEventListener('scroll', syncBackToTop, { passive: true });
  syncBackToTop();
  const expandedContent = {
    'about.html': `<section class="detail-section"><div class="section-heading"><p class="eyebrow">WHAT GUIDES THE PRODUCT</p><h2>Principles behind every learning experience.</h2></div><div class="content-grid"><article class="info-card"><span class="card-kicker">CLARITY</span><h3>Explain before asking</h3><p>Learners should understand the purpose behind an activity before connecting components.</p></article><article class="info-card"><span class="card-kicker">CONNECTION</span><h3>One continuous path</h3><p>The app, book, and kit reinforce one another.</p></article><article class="info-card"><span class="card-kicker">CURIOSITY</span><h3>Leave room to wonder</h3><p>Guidance builds confidence while leaving space for new questions.</p></article><article class="info-card"><span class="card-kicker">PRACTICE</span><h3>Learn through iteration</h3><p>Testing, observing, and improving are meaningful parts of learning.</p></article><article class="info-card"><span class="card-kicker">ACCESSIBILITY</span><h3>Support different learners</h3><p>Readable interfaces, keyboard access, and reduced motion help more learners participate.</p></article><article class="info-card"><span class="card-kicker">TRUST</span><h3>Share confirmed details</h3><p>Claims and specifications are published when verified.</p></article></div><div class="section-heading detail-heading"><p class="eyebrow">DEVELOPMENT APPROACH</p><h2>How the ecosystem comes together.</h2></div><ol class="data-timeline"><li><span>01</span><div><h3>Define the learning goal</h3><p>Start with what a learner should understand.</p></div></li><li><span>02</span><div><h3>Connect the formats</h3><p>Give each product a supporting role.</p></div></li><li><span>03</span><div><h3>Build the experience</h3><p>Move from explanation to hands-on work.</p></div></li><li><span>04</span><div><h3>Review and refine</h3><p>Check instructions, accessibility, and learning value.</p></div></li></ol></section>`,
    'features.html': `<section class="detail-section"><div class="section-heading"><p class="eyebrow">FEATURE MAP</p><h2>What each part contributes.</h2></div><div class="data-table-wrap"><table class="data-table"><thead><tr><th>Component</th><th>Primary role</th><th>Learner activity</th><th>Connection</th></tr></thead><tbody><tr><td>Mobile application</td><td>Guided introduction</td><td>Follow lessons and prepare</td><td>Points toward reading and projects</td></tr><tr><td>Companion book</td><td>Visual reference</td><td>Review explanations</td><td>Supports lessons and hands-on work</td></tr><tr><td>Sensor kit</td><td>Physical experimentation</td><td>Assemble, test, and adjust</td><td>Turns concepts into visible results</td></tr></tbody></table></div><div class="section-heading detail-heading"><p class="eyebrow">EXPERIENCE DETAILS</p><h2>Designed beyond the three products.</h2></div><div class="content-grid"><article class="info-card"><span class="card-kicker">FLOW</span><h3>Clear next steps</h3><p>Each stage makes the next activity understandable.</p></article><article class="info-card"><span class="card-kicker">FEEDBACK</span><h3>Observe and respond</h3><p>Compare expected and actual results.</p></article><article class="info-card"><span class="card-kicker">FLEXIBILITY</span><h3>Ways to revisit</h3><p>Meet a concept through several connected formats.</p></article><article class="info-card"><span class="card-kicker">ACCESS</span><h3>Device-aware layouts</h3><p>Use phones, tablets, and desktop screens.</p></article><article class="info-card"><span class="card-kicker">COMFORT</span><h3>User preferences</h3><p>Theme, focus, and motion controls support comfort.</p></article><article class="info-card"><span class="card-kicker">STATUS</span><h3>In development</h3><p>Specifications and availability remain unannounced.</p></article></div></section>`,
    'projects.html': `<section class="detail-section"><div class="section-heading"><p class="eyebrow">PROJECT METHOD</p><h2>A repeatable way to approach every build.</h2></div><ol class="data-timeline"><li><span>01</span><div><h3>Read the goal</h3><p>Identify what the project demonstrates.</p></div></li><li><span>02</span><div><h3>Prepare</h3><p>Gather listed materials and clear the workspace.</p></div></li><li><span>03</span><div><h3>Build in stages</h3><p>Complete and check one stage at a time.</p></div></li><li><span>04</span><div><h3>Test and record</h3><p>Compare the result with intended behavior.</p></div></li><li><span>05</span><div><h3>Change one variable</h3><p>Make effects easier to understand.</p></div></li><li><span>06</span><div><h3>Reflect</h3><p>Summarize what worked and what comes next.</p></div></li></ol><div class="section-heading detail-heading"><p class="eyebrow">LEARNING RECORD</p><h2>Questions to carry through a project.</h2></div><div class="content-grid"><article class="info-card"><span class="card-kicker">BEFORE</span><h3>What do I predict?</h3><p>Write what you expect and why.</p></article><article class="info-card"><span class="card-kicker">DURING</span><h3>What can I observe?</h3><p>Record changes and unexpected behavior.</p></article><article class="info-card"><span class="card-kicker">AFTER</span><h3>What would I change?</h3><p>Suggest one modification or new question.</p></article></div><p class="safety-note"><strong>Project note:</strong> Follow official instructions. Age-appropriate adult supervision may be needed depending on the activity and tools.</p></section>`,
    'blogs.html': `<section class="detail-section"><div class="section-heading"><p class="eyebrow">LEARNING NOTES</p><h2>Practical ideas for better project sessions.</h2></div><div class="editorial-grid"><article class="blog-entry"><span class="article-meta">01 • PREPARATION</span><h3>Set up for focused building</h3><p>Clear the work surface and organize only the materials needed for the current stage.</p><p>Ask the learner to describe the goal in their own words.</p></article><article class="blog-entry"><span class="article-meta">02 • OBSERVATION</span><h3>Turn problems into evidence</h3><p>Check one connection at a time. Several simultaneous changes can hide the cause.</p><p>Note what was expected, what happened, and what changed.</p></article><article class="blog-entry"><span class="article-meta">03 • REFLECTION</span><h3>End with one better question</h3><p>Ask what was surprising and what the learner would change next time.</p><p>A new question is evidence of genuine curiosity.</p></article><article class="blog-entry"><span class="article-meta">04 • SUPPORT</span><h3>Guide without taking over</h3><p>Adults can ask focused questions while the learner controls the reasoning.</p><p>When safety requires help, explain why before stepping in.</p></article></div></section>`
  };
  const pageName = location.pathname.split('/').pop() || 'index.html';
  const pageHero = document.querySelector('.page-hero');
  const pageContent = document.querySelector('.page-content');
  if (pageName === 'about.html' && pageHero && pageContent) {
    document.title = 'About Nexum Global Solutions — RoboDevLearn';
    pageHero.querySelector('.eyebrow').textContent = 'THE COMPANY BEHIND ROBODEVLEARN';
    pageHero.querySelector('h1').textContent = 'About Nexum Global Solutions.';
    pageHero.querySelector('p:last-child').textContent = 'RoboDevLearn is an education product from Nexum Global Solutions, a business solutions company bringing technology, people, and processes together to help organizations grow.';
    pageContent.innerHTML = `<div class="section-heading"><p class="eyebrow">NEXUM GLOBAL SOLUTIONS</p><h2>A connected partner for modern business operations.</h2><p>Nexum Global Solutions supports organizations through technology, customer experience, healthcare operations, logistics, marketing, analytics, and security services.</p><p><a class="button" href="https://nexumglobal.solutions/about" target="_blank" rel="noopener">Visit Nexum’s official About page ↗</a></p></div><div class="content-grid"><article class="info-card"><span class="card-kicker">WHO WE ARE</span><h2>People, technology, and process.</h2><p>Nexum works with organizations to strengthen operations, support customers, and scale with clearer visibility.</p></article><article class="info-card"><span class="card-kicker">WHAT WE DO</span><h2>Services across core domains.</h2><p>Its work spans digital transformation, customer support, healthcare and logistics operations, marketing, analytics, and security.</p></article><article class="info-card"><span class="card-kicker">HOW WE WORK</span><h2>Designed around business needs.</h2><p>Engagements can include planning, delivery teams, technology workflows, reporting, and ongoing improvement.</p></article></div><aside class="project-preview"><div><p class="eyebrow">A NEXUM PRODUCT</p><h3>RoboDevLearn</h3><p>An upcoming learning experience connecting an application, companion book, and hands-on kit.</p></div><a class="button" href="features.html">Explore RoboDevLearn features →</a></aside>`;
  }
  if (pageName === 'blogs.html' && pageHero && pageContent) {
    document.title = 'Nexum Global Solutions — Company Blog';
    pageHero.querySelector('.eyebrow').textContent = 'NEXUM GLOBAL SOLUTIONS • INSIGHTS';
    pageHero.querySelector('h1').textContent = 'Ideas behind better business operations.';
    pageHero.querySelector('p:last-child').textContent = 'Company-focused articles on technology, customer experience, operational delivery, and the work behind Nexum Global Solutions.';
    pageContent.innerHTML = `<div class="content-grid"><article class="info-card wide-card"><span class="article-meta">COMPANY • OVERVIEW</span><h2>How Nexum brings people, platforms, and processes together</h2><p>A look at Nexum Global Solutions’ connected approach to business operations, customer support, and technology-enabled growth.</p><a href="https://nexumglobal.solutions/about" target="_blank" rel="noopener">About Nexum Global Solutions ↗</a></article><article class="info-card"><span class="article-meta">TECHNOLOGY • DIGITAL TRANSFORMATION</span><h2>Making technology serve the operation</h2><p>Digital tools are most useful when they fit real workflows, help teams work with better visibility, and support the outcomes a business needs.</p></article><article class="info-card"><span class="article-meta">CUSTOMER EXPERIENCE • OPERATIONS</span><h2>Designing support around the customer</h2><p>Reliable customer experience depends on clear processes, capable teams, and useful feedback—not just the channel a customer chooses.</p></article><article class="info-card"><span class="article-meta">DELIVERY • CONTINUOUS IMPROVEMENT</span><h2>Why delivery should keep learning</h2><p>Reviewing results, listening to teams, and refining workflows helps organizations adapt as their customers and operations change.</p></article><article class="info-card"><span class="article-meta">PRODUCT • ROBODEVLEARN</span><h2>Introducing a learning product from Nexum</h2><p>RoboDevLearn brings guided lessons, a companion book, and a hands-on kit into one robotics-learning journey.</p><a href="features.html">Explore the product features →</a></article></div>`;
  }
  if (pageName === 'projects.html' && pageHero && pageContent) {
    pageContent.innerHTML = `<div class="section-heading"><p class="eyebrow">THREE PROJECT LEVELS</p><h2>Choose a challenge that fits your next step.</h2><p>Project listings are being prepared. The levels below describe the intended progression; individual project difficulty will be identified when confirmed.</p></div><div class="content-grid"><article class="info-card"><span class="card-kicker">LEVEL 01</span><h2>Beginner</h2><p>Start with guided builds that introduce core ideas, basic components, and following a sequence of steps.</p><p><strong>Project listings are being prepared.</strong></p></article><article class="info-card"><span class="card-kicker">LEVEL 02</span><h2>Intermediate</h2><p>Connect concepts across a build, interpret results, and make deliberate changes to improve or extend a project.</p><p><strong>Project listings are being prepared.</strong></p></article><article class="info-card"><span class="card-kicker">LEVEL 03</span><h2>Expert</h2><p>Take on more open-ended challenges that call for planning, combining ideas, testing, and independent refinement.</p><p><strong>Project listings are being prepared.</strong></p></article></div><aside class="project-preview"><div><p class="eyebrow">ROBODEVLEARN KIT</p><h3>See what is inside the kit</h3><p>Explore the boards, sensors, motors, wires, and other components shown on the kit package.</p></div><a class="button" href="kit.html">Explore the RoboDevLearn Kit →</a></aside>`;
  }
  if (pageName === 'features.html' && pageContent) {
    const featureIcons = [
      '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="2.75" width="12" height="18.5" rx="2.5"/><path d="M9.5 6.5h5M10.5 17.5h3M9 10h6M9 13.5h4"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none"><path d="M3.5 5.25c3.2-.85 6-.3 8.5 1.65v13c-2.5-1.95-5.3-2.5-8.5-1.65zM20.5 5.25c-3.2-.85-6-.3-8.5 1.65v13c2.5-1.95 5.3-2.5 8.5-1.65z"/><path d="M7 9h2.25M7 12h2.25M14.75 9H17M14.75 12H17"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="7" width="16" height="10" rx="2"/><circle cx="9" cy="12" r="2.25"/><circle cx="15" cy="12" r="2.25"/><path d="M7 4v3M12 4v3M17 4v3M7 17v3M12 17v3M17 17v3"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none"><path d="M20 8a8 8 0 0 0-13.6-2L4 8.5M4 4v4.5h4.5M4 16a8 8 0 0 0 13.6 2l2.4-2.5M20 20v-4.5h-4.5"/><circle cx="12" cy="12" r="2.25"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="4.5" r="1.75"/><path d="M5 8.5h14M12 8.5v5M8.5 20l3.5-6.5 3.5 6.5M7 11.5l5 2 5-2"/></svg>'
    ];
    pageContent.querySelectorAll('.feature-row > span').forEach((icon, index) => {
      icon.classList.add('feature-icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = featureIcons[index] || featureIcons[0];
    });
    const featureIconStyles = document.createElement('style');
    featureIconStyles.textContent = `.feature-row{position:relative;border-radius:14px;padding-inline:1rem;transition:background .3s ease,transform .3s cubic-bezier(.22,1,.36,1)}.feature-row:hover{background:color-mix(in srgb,var(--panel) 78%,transparent);transform:translateX(5px)}.feature-row>span.feature-icon{position:relative;width:56px;height:56px;border-radius:16px;background:linear-gradient(145deg,color-mix(in srgb,var(--cyan) 16%,var(--panel)),var(--panel));border-color:color-mix(in srgb,var(--cyan) 35%,var(--line));box-shadow:inset 0 1px rgba(255,255,255,.08),0 10px 28px color-mix(in srgb,var(--cyan) 10%,transparent)}.feature-icon:after{content:"";position:absolute;inset:6px;border:1px solid color-mix(in srgb,var(--cyan) 14%,transparent);border-radius:11px}.feature-icon svg{position:relative;z-index:1;width:29px;height:29px;stroke:currentColor;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round;transition:transform .35s cubic-bezier(.22,1,.36,1)}.feature-row:hover .feature-icon svg{transform:scale(1.12) rotate(-3deg)}[data-theme="light"] .feature-row>span.feature-icon{background:linear-gradient(145deg,#fff,#e6f2ff);box-shadow:0 10px 25px rgba(29,78,216,.1)}@media(max-width:600px){.feature-row{grid-template-columns:48px 1fr;padding-inline:.4rem}.feature-row>span.feature-icon{width:46px;height:46px;border-radius:13px}.feature-icon svg{width:24px;height:24px}.feature-row:hover{transform:none}}`;
    document.head.appendChild(featureIconStyles);
    pageContent.querySelector('.feature-list')?.insertAdjacentHTML('afterend', `<div class="section-heading detail-heading"><p class="eyebrow">CONNECTED PRODUCT FEATURES</p><h2>Everything learners use, in one connected experience.</h2><p>The application, companion book, and robotics kit each support a different stage of learning.</p></div><div class="content-grid"><article class="info-card"><span class="card-kicker">01 • DIGITAL LEARNING</span><h2>Guided application</h2><p>Step-by-step lessons, project discovery, and clear learning levels help learners understand each idea before building.</p><a href="application.html">See application features →</a></article><article class="info-card"><span class="card-kicker">02 • VISUAL REFERENCE</span><h2>Companion book</h2><p>Illustrated explanations, coding concepts, patterns, sequences, and project guidance make ideas easier to revisit.</p><a href="book.html">See book features →</a></article><article class="info-card"><span class="card-kicker">03 • HANDS-ON BUILDING</span><h2>Robotics kit</h2><p>Sensors, boards, motors, LEDs, and practical experiments turn digital lessons into observable real-world results.</p><a href="kit.html">See kit features →</a></article></div>`);
  }
  if (!['about.html', 'blogs.html', 'projects.html', 'features.html'].includes(pageName) && expandedContent[pageName]) pageContent?.insertAdjacentHTML('beforeend', expandedContent[pageName]);
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (textWalker.nextNode()) {
    textWalker.currentNode.textContent = textWalker.currentNode.textContent
      .replace(/Nexum Global Solution(?!s)/g, 'Nexum Global Solutions');
  }
  const microcopy = document.querySelector('.microcopy');
  if (microcopy) microcopy.textContent = 'A learning product by Nexum Global Solutions.';
  const calendlyUrl = 'https://calendly.com/ubaid102020/30min';
  document.querySelectorAll('.nav-actions .button-small').forEach((button) => {
    button.href = calendlyUrl;
    button.target = '_blank';
    button.rel = 'noopener';
    button.textContent = 'Book a demo';
    button.setAttribute('aria-label', 'Book a 30-minute demo meeting');
  });
  if (!document.querySelector('.ambient-runner')) document.body.insertAdjacentHTML('afterbegin','<div class="ambient-runner" aria-hidden="true"></div>');
  if (pageName === 'index.html') {
    [['.product-card.app','application.html','Explore RoboDevLearn Application'],['.product-card.book','book.html','Explore RoboDevLearn Book'],['.product-card.kit','kit.html','Explore RoboDevLearn Kit']].forEach(([selector, href, label]) => {
      const card = document.querySelector(selector);
      if (card) card.insertAdjacentHTML('beforeend', `<a class="card-link" href="${href}">${label} <span aria-hidden="true">→</span></a>`);
    });
  }

  const nav = document.querySelector('.nav');
  const navLinks = nav?.querySelector('.nav-links');
  if (nav && navLinks) {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    navLinks.innerHTML = `<a href="features.html"${currentPage === 'features.html' ? ' aria-current="page"' : ''}>Features</a><a href="projects.html"${currentPage === 'projects.html' ? ' aria-current="page"' : ''}>Projects</a><a href="pricing.html"${currentPage === 'pricing.html' ? ' aria-current="page"' : ''}>Pricing</a><a href="blogs.html"${currentPage === 'blogs.html' ? ' aria-current="page"' : ''}>Blogs</a><a href="about.html"${currentPage === 'about.html' ? ' aria-current="page"' : ''}>About</a>`;
    const footerLinks = document.querySelector('.inner-footer-links');
    if (footerLinks) footerLinks.innerHTML = `<a href="features.html">Features</a><a href="projects.html">Projects</a><a href="pricing.html"${currentPage === 'pricing.html' ? ' aria-current="page"' : ''}>Pricing</a><a href="blogs.html">Blogs</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="${calendlyUrl}" target="_blank" rel="noopener">Book a demo ↗</a>`;
    const toggle = document.createElement('button');
    toggle.className = 'mobile-toggle'; toggle.type = 'button'; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open navigation'); toggle.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(toggle, nav.querySelector('.nav-actions'));
    toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded',String(!open)); toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation'); navLinks.classList.toggle('mobile-open',!open); });
  }
})();
