const mainContent = document.getElementById("mainContent");
const navButtons = [...document.querySelectorAll(".nav-button")];
const modal = document.getElementById("exploreModal");
const toast = document.getElementById("toast");
let currentPage = "home";
let quizIndex = 0;
let quizScore = 0;
let answeredQuiz = false;
let toastTimer;

const pages = {
  home: {
    eyebrow: "YOUR FUTURE STARTS HERE",
    title: 'The future starts with <em>curiosity.</em>',
    description: "Big ideas begin with small questions. Explore the science behind our world, discover how AI is changing everyday life, and find inspiring ways to shape a brighter, smarter and more sustainable future.",
    stats: [["07", "worlds to explore"], ["∞", "ideas to imagine"], ["01", "future to shape"]],
    cards: []
  },
  science: {
    eyebrow: "UNDERSTAND THE UNIVERSE",
    title: 'Wonder more. <em>Discover why.</em>',
    description: "From the tiniest building blocks of matter to the farthest galaxies, science helps us ask better questions and understand how our world works.",
    highlight: ["Science starts with a question", "Observe closely, test an idea, learn from the result. Every discovery begins with curiosity."],
    cards: [
      ["⚛","The Tiny World of Atoms","Everything around us—from the air we breathe to the stars above—is made from atoms and their building blocks.","Explore the building blocks of matter."],
      ["☄","Space & Distant Galaxies","The universe is filled with stars, planets, nebulae and galaxies, each telling a story about cosmic history.","Look beyond our own planet."],
      ["🧬","DNA: Life's Instruction Book","DNA stores biological instructions that help living things grow, function and pass traits to the next generation.","Discover the code inside life."],
      ["🌈","Light & Colour","Light travels as electromagnetic waves, and the colours we see depend on wavelength and how materials interact with light.","See everyday things differently."],
      ["🌋","Earth's Moving Planet","Earth's crust is divided into moving tectonic plates. Their movement helps shape mountains, volcanoes and ocean floors.","Our planet is always changing."],
      ["🧠","The Amazing Human Brain","The brain processes information, supports memory and helps coordinate movement, emotion and decision-making.","Explore the organ that helps us explore."],
      ["🦠","The Invisible Universe","Microscopic organisms live in soil, water and on our bodies. Many support ecosystems and human health.","Meet life too small to see."],
      ["⚡","Energy All Around Us","Energy can move between objects and change form—from sunlight to electricity to the motion of a bicycle.","Follow the energy trail."]
    ]
  },
  technology: {
    eyebrow: "TOOLS THAT CHANGE TOMORROW",
    title: 'Technology is how ideas <em>take flight.</em>',
    description: "Explore the digital tools, smart systems and creative inventions changing how we learn, communicate, travel and solve problems.",
    highlight: ["Technology is more than a screen", "The best technology solves real problems, helps people and is designed with care."],
    cards: [
      ["⌘","Artificial Intelligence","AI systems can recognise patterns, generate content and help people work through complex tasks when used thoughtfully.","Meet the tools learning from data."],
      ["🤖","Robots in Real Life","Robots can perform repetitive, precise or hazardous tasks in factories, hospitals, farms and research labs.","Where could a robot lend a hand?"],
      ["🌐","The Internet of Things","Connected sensors let devices share information—helping homes, cities and industries respond to changing conditions.","A world of connected objects."],
      ["🛡","Cyber Safety","Strong passwords, software updates, careful sharing and critical thinking can help protect your digital identity.","Make smart choices online."],
      ["🖨","3D Printing","3D printers create objects layer by layer, supporting rapid prototypes, customised parts and creative designs.","Turn a digital design into an object."],
      ["🛰","Satellites & GPS","Satellites support navigation, weather forecasts, communication and observation of changes across our planet.","Technology with a view from space."],
      ["🥽","Virtual & Augmented Reality","Immersive tools can place learners inside simulations or add digital information to the world around them.","Learn by stepping into an experience."],
      ["🔋","The Next Battery","Researchers are exploring ways to store energy more efficiently to support electric transport and renewable power.","Power a cleaner, more flexible future."]
    ]
  },
  innovation: {
    eyebrow: "IMAGINE. DESIGN. IMPROVE.",
    title: 'Every breakthrough begins with <em>“what if?”</em>',
    description: "Innovation turns curiosity into useful change. Meet creative approaches that rethink old problems and open up new possibilities.",
    highlight: ["A simple innovation loop", "Notice a problem → imagine options → build a small prototype → test it → improve it."],
    cards: [
      ["💡","Design Thinking","Understand people’s needs before jumping to solutions. Test early ideas and improve them using real feedback.","Start with people, not assumptions."],
      ["🧩","Biomimicry","Designers study nature’s patterns—from leaf surfaces to termite mounds—to find ideas for efficient systems.","Nature has been experimenting for ages."],
      ["🚲","Rethinking Everyday Things","Small changes to packaging, transport or household tools can make everyday routines easier and reduce waste.","Improve something you use daily."],
      ["🧪","The Power of Prototypes","A rough model can reveal what works and what needs changing before a final product is built.","Make a version you can learn from."],
      ["🏙","Smarter Cities","Thoughtful public transport, green spaces, accessible streets and responsive infrastructure can improve urban life.","Design cities for people."],
      ["📦","Circular Product Design","Products designed to be repaired, reused or recycled can keep materials useful for longer.","Waste can be a design problem."],
      ["🎨","Creative Coding","Code can become interactive art, playful learning tools, simulations and experiences that respond to users.","Mix logic with imagination."],
      ["🤝","Ideas That Include Everyone","Inclusive design considers different abilities, languages, ages and needs from the beginning.","Better design welcomes more people."]
    ]
  },
  sustainability: {
    eyebrow: "SMALL ACTIONS. SHARED PLANET.",
    title: 'A greener future is a future we <em>build together.</em>',
    description: "Discover practical ways to care for our shared home—from clean energy and biodiversity to everyday habits that save resources.",
    highlight: ["Progress is made from repeatable actions", "Choose one practical change, make it a habit, and invite others to join in."],
    cards: [
      ["☀","Solar Power","Solar panels turn sunlight into electricity, helping homes and communities generate energy without burning fuel at the point of use.","Catch a little sunshine."],
      ["🌬","Wind Energy","Wind turbines convert the movement of air into electricity, providing a renewable source of power in suitable locations.","Let moving air do useful work."],
      ["💧","Save Every Drop","Fixing leaks, collecting rainwater where appropriate and using water thoughtfully can help protect local supplies.","Water is a resource, not an endless supply."],
      ["🌳","Biodiversity Matters","Different plants, animals and microorganisms help ecosystems function and can make them more resilient to change.","Make room for living things."],
      ["♻","Rethink Waste","Refusing unnecessary items, reusing what you have, repairing and recycling correctly can reduce waste.","Use resources more thoughtfully."],
      ["🚶","Cleaner Journeys","Walking, cycling, public transport and shared rides can reduce emissions when they are safe and practical options.","Rethink the daily commute."],
      ["🥬","Food with Less Waste","Planning meals, storing food well and using leftovers safely can reduce the resources lost when food is thrown away.","Let good food get eaten."],
      ["🐝","Pollinators & Plants","Bees, butterflies and other pollinators support many flowering plants and crops. Native plants can provide helpful habitat.","Make your space pollinator-friendly."]
    ]
  },
  "future-tech": {
    eyebrow: "PEEK BEYOND THE PRESENT",
    title: 'Tomorrow is being imagined <em>today.</em>',
    description: "Explore emerging ideas that could change healthcare, transport, exploration and how humans work with intelligent machines.",
    highlight: ["The future is not guaranteed", "New technologies create opportunities and challenges. Good questions and responsible choices matter."],
    cards: [
      ["🧬","Personalised Medicine","Healthcare may increasingly use a person’s biology and health information to help guide prevention and treatment decisions.","Care designed around individual needs."],
      ["🚀","Reusable Spacecraft","Reusable launch systems aim to bring parts of rockets back for inspection and reuse, potentially changing the economics of spaceflight.","Make space access more reusable."],
      ["🧠","Brain–Computer Interfaces","These systems translate certain brain signals into commands, with research exploring ways to support communication and mobility.","A new kind of human-computer link."],
      ["🚗","Autonomous Mobility","Sensors and software help automated vehicles perceive surroundings and plan movement, but reliability and safety remain essential.","How could transport evolve?"],
      ["⚛","Quantum Computing","Quantum computers use quantum effects to approach certain specialised problems in ways different from ordinary computers.","A different way to compute."],
      ["🏗","Buildings That Adapt","Smart sensors and efficient design can help buildings respond to occupancy, weather and energy needs.","Spaces that use resources wisely."],
      ["🌊","Ocean Exploration","New sensors, remotely operated vehicles and mapping tools help researchers study deep-sea habitats and ocean change.","Discover the blue unknown."],
      ["🌱","Carbon Capture Ideas","Different methods aim to capture carbon dioxide from industrial sources or air; their benefits depend on energy, cost and safe storage.","Explore the challenges of carbon removal."]
    ]
  },
  contact: {
    eyebrow: "LET'S SPARK AN IDEA",
    title: 'Your curiosity belongs <em>here.</em>',
    description: "Have a question, a topic you want us to explore, or an idea that could make Future Spark better? This space is for curious minds and future builders.",
    highlight: ["Good ideas grow when they are shared", "Use the message form below to draft your note. This demo does not send messages to a server yet."],
    cards: [
      ["✉","Share a Topic","Tell us what you would love to learn about next—space, climate, AI, design or something completely unexpected.","Suggest the next discovery."],
      ["💬","Ask a Question","Curiosity starts with asking. Write a question and turn it into a learning mission.","No question is too small."],
      ["🌟","Share an Idea","Have an activity, challenge or feature in mind? Describe how it could help visitors explore.","Help shape the next version."],
      ["🤝","Learn Together","Invite classmates or friends to explore a topic, compare ideas and build a small project together.","Better ideas can be collaborative."]
    ]
  }
};

const activityPages = {
  quiz: {
    eyebrow:"QUICK QUIZ", title:"Give your curiosity a quick workout.",
    description:"Five bite-sized questions. Take your best guess, learn from the answer and see how many sparks you collect."
  },
  facts: {
    eyebrow:"DID YOU KNOW?", title:"A few facts to make you look twice.",
    description:"The world is full of details that sound surprising because nature and science are wonderfully inventive."
  },
  impact: {
    eyebrow:"MAKE A DIFFERENCE", title:"Small habits can add up.",
    description:"You do not need to change everything at once. Start with a practical action you can repeat."
  },
  challenge: {
    eyebrow:"FUTURE CHALLENGE", title:"Design one idea for a better tomorrow.",
    description:"Use your imagination to solve a real-world problem. The first draft can be simple; the thinking is what matters."
  }
};

const quizQuestions = [
  {q:"Which star is closest to Earth?", a:["Sirius","The Sun","Polaris","Proxima Centauri"], correct:1, why:"The Sun is our closest star. Proxima Centauri is the closest star beyond our solar system."},
  {q:"What do plants absorb from the atmosphere for photosynthesis?", a:["Oxygen","Helium","Carbon dioxide","Hydrogen"], correct:2, why:"Plants use carbon dioxide, water and light energy to make sugars during photosynthesis."},
  {q:"Which material is commonly used to make most modern solar cells?", a:["Silicon","Cotton","Limestone","Rubber"], correct:0, why:"Silicon is a semiconductor widely used in photovoltaic solar cells."},
  {q:"What does GPS help a device estimate?", a:["Its location","Its battery chemistry","Its screen size","Its password"], correct:0, why:"GPS uses signals from satellites to help a receiver estimate its position and time."},
  {q:"Which action generally helps reduce waste?", a:["Throwing away repairable items","Using single-use items more often","Repairing and reusing items","Buying duplicates without need"], correct:2, why:"Repairing and reusing items can extend their useful life and reduce demand for new materials."}
];

function makeSparkField() {
  const field = document.getElementById("sparkField");
  for (let i=0;i<24;i++) {
    const dot = document.createElement("span");
    dot.className = "spark";
    dot.style.left = `${Math.random()*100}%`;
    dot.style.top = `${50+Math.random()*60}%`;
    dot.style.animationDuration = `${14+Math.random()*18}s`;
    dot.style.animationDelay = `${-Math.random()*24}s`;
    dot.style.opacity = `${.18+Math.random()*.3}`;
    const size = 2+Math.random()*4;
    dot.style.width = `${size}px`; dot.style.height = `${size}px`;
    field.appendChild(dot);
  }
}

function cardMarkup(card, i) {
  return `<article class="content-card hex-card" style="--accent:var(--page-accent);animation-delay:${Math.min(i*55,350)}ms">
    <div class="card-topline"><span class="card-number">DISCOVERY / ${String(i+1).padStart(2,"0")}</span><span class="card-icon">${card[0]}</span></div>
    <h3>${card[1]}</h3><p>${card[2]}</p>
    <button class="card-link" data-toast="${escapeAttr(card[3] || card[2])}">Explore this idea <span>↗</span></button>
  </article>`;
}
function escapeAttr(value) {
  return String(value).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function homeMarkup() {
  return `<section class="hero">
    <div class="hero-copy">
      <div class="eyebrow"><span class="eyebrow-line"></span>${pages.home.eyebrow}</div>
      <h1>${pages.home.title}</h1>
      <p class="hero-description">${pages.home.description}</p>
      <div class="hero-actions"><button class="primary-btn" id="openExplore">Explore More <span>↗</span></button><span class="hero-note">7 topics · endless possibilities</span></div>
    </div>
    <div class="hero-art" aria-label="Decorative honeycomb illustration">
      <div class="orbit orbit-three"></div><div class="orbit orbit-two"></div><div class="orbit"></div>
      <div class="core-hex"><div class="core-inner"><span class="core-symbol">✦</span></div></div>
      <div class="orbit-label label-top">IDEAS IN MOTION<small>Think beyond today</small></div>
      <div class="orbit-label label-bottom">STAY CURIOUS<small>Every question matters</small></div>
    </div>
  </section>
  <section class="stats-strip" aria-label="Future Spark highlights">
    ${pages.home.stats.map((s,i)=>`<div class="stat"><span class="stat-icon">${["⬡","✧","✦"][i]}</span><div><strong>${s[0]}</strong><span>${s[1]}</span></div></div>`).join("")}
  </section>
  <section class="section-block">
    <div class="section-top"><div><div class="section-kicker">A LITTLE LOOK AHEAD</div><h2>Find your next <span style="color:#D69A18">spark.</span></h2></div><p>Curiosity can take you from the smallest particle to the biggest questions about tomorrow. Choose a world below and start exploring.</p></div>
    <div class="feature-row">
      <div class="feature-banner"><span class="feature-tag">✦ THE FUTURE IS A WORK IN PROGRESS</span><h3>Big change begins with one bright idea.</h3><p>Learn something new, challenge an assumption, or find one small way to make a difference today.</p></div>
      <div class="feature-side">
        <div class="mini-feature"><span class="mini-symbol">⚛</span><div><h3>Ask why.</h3><p>Science helps us understand the world around us.</p></div></div>
        <div class="mini-feature"><span class="mini-symbol">✧</span><div><h3>Imagine how.</h3><p>Creative thinking turns questions into possibilities.</p></div></div>
      </div>
    </div>
    <div class="section-top"><div><div class="section-kicker">CHOOSE YOUR PATH</div><h2>Seven worlds. <span style="color:#D69A18">One curious mind.</span></h2></div><p>Tap a hexagon in the floating navigation bar to open a topic. Each world is packed with bite-sized ideas to explore.</p></div>
    <div class="card-grid">${[
      ["⚛","Science","Explore atoms, space, living systems and the forces shaping our universe.","science"],
      ["⌘","Technology & AI","Meet intelligent tools, connected devices and the technologies changing daily life.","technology"],
      ["✧","Innovation","Learn how design, experimentation and fresh perspectives turn ideas into useful solutions.","innovation"],
      ["❋","Sustainability","Discover renewable energy, biodiversity and everyday actions that help protect our planet.","sustainability"],
      ["◈","Future Tech","Look at emerging technologies and the questions they raise for tomorrow.","future-tech"],
      ["✉","Contact & Ideas","Share a question, suggest a topic or sketch an idea for the Future Spark community.","contact"]
    ].map((c,i)=>`<article class="content-card hex-card" style="--accent:${["#4D9FFF","#35C9D0","#FFB347","#61B86B","#A68AFF","#F4B942"][i]};animation-delay:${i*60}ms"><div class="card-topline"><span class="card-number">YOUR PATH / 0${i+1}</span><span class="card-icon">${c[0]}</span></div><h3>${c[1]}</h3><p>${c[2]}</p><button class="card-link" data-goto="${c[3]}">Open this world <span>↗</span></button></article>`).join("")}</div>
    <div class="cta-band"><div><h3>Ready for a little surprise?</h3><p>Try a quick quiz, collect a curious fact, or take on a future-focused challenge.</p></div><button class="primary-btn" id="openExploreBottom">Explore More <span>↗</span></button></div>
  </section>`;
}
function pageMarkup(key) {
  const page = pages[key];
  document.documentElement.style.setProperty("--page-accent", navButtons.find(b=>b.dataset.page===key)?.dataset.accent || "#F4B942");
  return `<section class="page-heading"><div class="eyebrow"><span class="eyebrow-line"></span>${page.eyebrow}</div><h1>${page.title}</h1><p>${page.description}</p></section>
    <div class="page-highlight"><span class="highlight-icon">✦</span><div><strong>${page.highlight[0]}</strong><p>${page.highlight[1]}</p></div></div>
    <section class="section-block"><div class="section-top"><div><div class="section-kicker">EXPLORE THE COLLECTION</div><h2>Ideas worth <span style="color:var(--page-accent)">discovering.</span></h2></div><p>Start with a card that catches your attention. Every big idea becomes easier to understand one small discovery at a time.</p></div>
    <div class="card-grid">${page.cards.map(cardMarkup).join("")}</div>
    <div class="cta-band"><div><h3>Keep your curiosity moving.</h3><p>Want a different kind of discovery? Try one of the Explore More activities.</p></div><button class="primary-btn" id="openExploreBottom">Explore More <span>↗</span></button></div></section>`;
}
function renderPage(key) {
  currentPage = key;
  const nav = navButtons.find(b=>b.dataset.page===key);
  navButtons.forEach(b=>{ b.classList.toggle("active",b===nav); b.style.setProperty("--accent",b.dataset.accent); });
  document.documentElement.style.setProperty("--accent", nav?.dataset.accent || "#F4B942");
  mainContent.innerHTML = key==="home" ? homeMarkup() : pageMarkup(key);
  bindDynamicButtons();
  window.scrollTo({top:0,behavior:"smooth"});
}
function bindDynamicButtons() {
  document.querySelectorAll("#openExplore,#openExploreBottom").forEach(b=>b.addEventListener("click",openModal));
  document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>renderPage(b.dataset.goto)));
  document.querySelectorAll("[data-toast]").forEach(b=>b.addEventListener("click",()=>showToast(b.dataset.toast)));
}
function openModal() { modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.getElementById("closeModal").focus(); }
function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); }
document.getElementById("closeModal").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
navButtons.forEach(button=>button.addEventListener("click",()=>renderPage(button.dataset.page)));
document.querySelectorAll("[data-home]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();renderPage("home");}));
document.querySelectorAll("[data-activity]").forEach(button=>button.addEventListener("click",()=>{closeModal();renderActivity(button.dataset.activity);}));

function renderActivity(key) {
  const a=activityPages[key];
  let body="";
  if(key==="quiz") {
    quizIndex=0;quizScore=0;answeredQuiz=false;
    body=quizMarkup();
  } else if(key==="facts") {
    body=`<div class="fact-list">
      <div class="fact-item"><span class="fact-mark">✦</span><p><strong>A day on Venus is longer than its year.</strong>Venus rotates very slowly, taking longer to spin once than to orbit the Sun.</p></div>
      <div class="fact-item"><span class="fact-mark">✦</span><p><strong>Octopuses have three hearts.</strong>Two pump blood toward the gills, while another pumps it to the rest of the body.</p></div>
      <div class="fact-item"><span class="fact-mark">✦</span><p><strong>Some bamboo species grow incredibly quickly.</strong>Under suitable conditions, certain species can grow many centimetres in a day.</p></div>
      <div class="fact-item"><span class="fact-mark">✦</span><p><strong>Lightning is hotter than the surface of the Sun.</strong>A lightning channel can briefly heat the surrounding air to temperatures of roughly 30,000°C.</p></div>
      <div class="fact-item"><span class="fact-mark">✦</span><p><strong>Earth is not a perfect sphere.</strong>Its rotation makes it slightly wider around the equator than from pole to pole.</p></div>
      <div class="fact-item"><span class="fact-mark">✦</span><p><strong>Honeybees communicate with movement.</strong>A waggle dance can help other bees find the direction and distance of a food source.</p></div>
    </div><button class="primary-btn activity-action" id="factNext">Give me another spark <span>↗</span></button>`;
  } else if(key==="impact") {
    body=`<div class="action-list">
      <div class="action-item"><span class="fact-mark">01</span><p><strong>Carry a reusable bottle or cup.</strong>Use it when practical to avoid some single-use packaging.</p></div>
      <div class="action-item"><span class="fact-mark">02</span><p><strong>Switch off what you are not using.</strong>Turn off lights and devices when they are not needed, while keeping essential systems on.</p></div>
      <div class="action-item"><span class="fact-mark">03</span><p><strong>Give an item a second life.</strong>Repair, donate, share or reuse things that are still useful.</p></div>
      <div class="action-item"><span class="fact-mark">04</span><p><strong>Make space for local nature.</strong>Where appropriate, grow native plants and avoid disturbing wildlife.</p></div>
      <div class="action-item"><span class="fact-mark">05</span><p><strong>Plan before buying food.</strong>Check what you have, plan meals and store ingredients well to help prevent food waste.</p></div>
      <div class="action-item"><span class="fact-mark">06</span><p><strong>Share one helpful idea.</strong>Invite a friend or family member to join a small, realistic action with you.</p></div>
    </div><div class="challenge-prompt"><strong>Your mini mission:</strong> Pick one action you can repeat this week. Consistency beats a one-day burst.</div><button class="primary-btn activity-action" id="impactDone">I picked my action <span>✓</span></button>`;
  } else {
    body=`<div class="challenge-prompt"><strong>Challenge:</strong> Imagine your school, neighbourhood or city in 2040. What is one problem you would like to solve—wasted energy, traffic, plastic waste, access to learning, or something else? Design a simple idea that could help.</div>
      <textarea class="challenge-input" id="challengeAnswer" maxlength="700" placeholder="My future idea is…&#10;It helps by…&#10;My first small step would be…"></textarea>
      <div class="hero-actions"><button class="primary-btn" id="saveChallenge">Save my idea on this page <span>✓</span></button><span class="hero-note">This demo saves only in this open page.</span></div><p class="feedback" id="challengeFeedback"></p>`;
  }
  mainContent.innerHTML=`<section class="activity-panel"><button class="back-link" id="backToExplore">← Back to Explore More</button><div class="eyebrow"><span class="eyebrow-line"></span>${a.eyebrow}</div><h1>${a.title}</h1><p>${a.description}</p>${key==="quiz"?`<div class="activity-box" id="quizBox">${body}</div>`:`<div class="activity-box">${body}</div>`}</section>`;
  document.getElementById("backToExplore").addEventListener("click",()=>{renderPage("home");setTimeout(openModal,100);});
  if(key==="quiz")bindQuiz();
  if(key==="facts")document.getElementById("factNext").addEventListener("click",()=>showToast("Spark collected! Try another topic from the navigation."));
  if(key==="impact")document.getElementById("impactDone").addEventListener("click",()=>showToast("Great choice. Small actions grow when we repeat them!"));
  if(key==="challenge")document.getElementById("saveChallenge").addEventListener("click",()=>{
    const val=document.getElementById("challengeAnswer").value.trim();
    document.getElementById("challengeFeedback").textContent=val ? "Idea captured in this page. Keep refining it—your first draft is a start!" : "Write a few words about your idea first.";
  });
  window.scrollTo({top:0,behavior:"smooth"});
}
function quizMarkup() {
  const q=quizQuestions[quizIndex];
  return `<div class="question-count">QUESTION ${quizIndex+1} OF ${quizQuestions.length} · SCORE ${quizScore}</div><div class="question">${q.q}</div><div class="answer-list">${q.a.map((v,i)=>`<button class="answer-btn" data-answer="${i}">${String.fromCharCode(65+i)}. ${v}</button>`).join("")}</div><p class="feedback" id="quizFeedback">Choose the answer you think is right.</p><button class="primary-btn activity-action" id="quizNext" style="display:none">Next question <span>→</span></button>`;
}
function bindQuiz() {
  document.querySelectorAll("[data-answer]").forEach(b=>b.addEventListener("click",()=>{
    if(answeredQuiz)return;answeredQuiz=true;
    const q=quizQuestions[quizIndex], chosen=Number(b.dataset.answer);
    document.querySelectorAll("[data-answer]").forEach(btn=>{btn.disabled=true;if(Number(btn.dataset.answer)===q.correct)btn.classList.add("correct");});
    if(chosen===q.correct){quizScore++;b.classList.add("correct");document.getElementById("quizFeedback").textContent="Correct! "+q.why;}
    else {b.classList.add("wrong");document.getElementById("quizFeedback").textContent="Not quite. "+q.why;}
    const next=document.getElementById("quizNext");next.style.display="inline-flex";next.textContent=quizIndex===quizQuestions.length-1?"See my result →":"Next question →";
  }));
  document.getElementById("quizNext").addEventListener("click",()=>{
    if(quizIndex<quizQuestions.length-1){quizIndex++;answeredQuiz=false;document.getElementById("quizBox").innerHTML=quizMarkup();bindQuiz();}
    else {document.getElementById("quizBox").innerHTML=`<div class="question-count">QUIZ COMPLETE</div><div class="question">You collected ${quizScore} out of ${quizQuestions.length} sparks!</div><p class="feedback">${quizScore===5?"Brilliant work—your curiosity is switched on.":quizScore>=3?"Nice work! Every question is a chance to learn.":"Keep exploring. Curiosity grows with every new fact."}</p><button class="primary-btn activity-action" id="retryQuiz">Try again <span>↻</span></button>`;document.getElementById("retryQuiz").addEventListener("click",()=>renderActivity("quiz"));}
  });
}
function showToast(message) {
  toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);
}
makeSparkField();
renderPage("home");
