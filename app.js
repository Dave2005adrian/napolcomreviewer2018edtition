const subjects = [
  {
    id: "constitution",
    title: "Philippine Constitution",
    summary: "Rights, citizenship, government structure, and public accountability.",
    chapters: [
      {
        id: "bill-rights",
        title: "Bill of Rights",
        body: [
          "The Bill of Rights limits government power and protects individual liberty. For law enforcement examinations, focus on due process, equal protection, lawful arrest, search and seizure, and rights of persons under investigation.",
          "A useful review habit is to connect every right to a police scenario. Ask whether the officer has legal authority, whether the citizen received proper protection, and whether evidence may be affected by the action."
        ],
        note: "High-yield terms: due process, probable cause, warrant, custodial investigation, counsel."
      },
      {
        id: "accountability",
        title: "Public Accountability",
        body: [
          "Public office is a public trust. Officers and employees are expected to serve with responsibility, integrity, loyalty, and efficiency.",
          "In reviewer form, this topic often appears as situational questions about ethical conduct, conflicts of interest, misuse of authority, and standards of public service."
        ],
        note: "Remember the standard: public interest comes before personal interest."
      }
    ],
    questions: [
      {
        text: "Which principle best explains why public officials must act for the benefit of citizens?",
        choices: ["Public office is a public trust", "Separation of powers", "Fiscal autonomy", "Local autonomy"],
        answer: 0,
        explanation: "The constitutional principle is that public office is a public trust."
      },
      {
        text: "In a lawful search, what is commonly required before a warrant is issued?",
        choices: ["Probable cause", "Public apology", "Prior conviction", "Media notice"],
        answer: 0,
        explanation: "A search warrant generally requires probable cause personally determined by a judge."
      }
    ]
  },
  {
    id: "police-admin",
    title: "Police Administration",
    summary: "Organization, command, patrol operations, leadership, and discipline.",
    chapters: [
      {
        id: "organization",
        title: "Police Organization",
        body: [
          "Police administration deals with planning, organizing, directing, coordinating, and controlling police resources. The goal is effective public safety service.",
          "For exam review, separate management terms from field operations. Management questions usually ask who plans, supervises, delegates, evaluates, or corrects performance."
        ],
        note: "The classic management functions are planning, organizing, staffing, directing, and controlling."
      },
      {
        id: "patrol",
        title: "Patrol Operations",
        body: [
          "Patrol is a visible police function intended to prevent crime, respond quickly, provide assistance, and reassure the community.",
          "Questions may compare foot patrol, mobile patrol, directed patrol, and community-oriented deployment."
        ],
        note: "Patrol visibility can deter crime, but intelligence-led deployment improves focus."
      }
    ],
    questions: [
      {
        text: "Which police function is most associated with visible crime prevention and quick response?",
        choices: ["Patrol", "Budget audit", "Records archiving", "Procurement"],
        answer: 0,
        explanation: "Patrol places officers in the field for prevention, visibility, and response."
      },
      {
        text: "Which management function involves assigning tasks and arranging resources?",
        choices: ["Organizing", "Interrogating", "Booking", "Patrolling"],
        answer: 0,
        explanation: "Organizing arranges people, tasks, and resources to execute a plan."
      }
    ]
  },
  {
    id: "criminal-law",
    title: "Criminal Law",
    summary: "General principles, felonies, liability, penalties, and common offenses.",
    chapters: [
      {
        id: "felonies",
        title: "Felonies",
        body: [
          "Criminal law questions often test the elements of an offense. Read each fact pattern slowly and identify the act, intent, victim, qualifying circumstance, and result.",
          "Do not rely only on the name of the crime. A single changed fact can change liability, penalty, or the proper offense."
        ],
        note: "Element spotting is the safest way to handle legal scenario questions."
      },
      {
        id: "liability",
        title: "Criminal Liability",
        body: [
          "Criminal liability may arise from intentional acts or from negligence where the law punishes the resulting harm.",
          "Review justifying, exempting, mitigating, aggravating, and alternative circumstances as separate categories."
        ],
        note: "Circumstances affect whether liability exists and how penalty is imposed."
      }
    ],
    questions: [
      {
        text: "What is the best first step when answering a criminal law scenario?",
        choices: ["Identify the elements", "Guess the penalty", "Ignore intent", "Choose the longest answer"],
        answer: 0,
        explanation: "Elements determine whether the facts match the offense."
      },
      {
        text: "Which type of circumstance may reduce the penalty but does not erase the offense?",
        choices: ["Mitigating", "Exempting", "Justifying", "Repealing"],
        answer: 0,
        explanation: "Mitigating circumstances can reduce penalty while liability remains."
      }
    ]
  },
  {
    id: "criminal-investigation",
    title: "Criminal Investigation",
    summary: "Evidence handling, interviewing, crime scenes, reports, and case build-up.",
    chapters: [
      {
        id: "crime-scene",
        title: "Crime Scene Procedure",
        body: [
          "Crime scene work begins with safety, preservation, documentation, collection, and proper turnover of evidence.",
          "The scene should be protected from contamination. Notes, sketches, photos, labels, and chain-of-custody records support credibility."
        ],
        note: "Preserve first, document carefully, collect methodically."
      },
      {
        id: "interview",
        title: "Interview and Interrogation",
        body: [
          "An interview gathers information, while interrogation focuses on a suspect. Rights and voluntariness matter whenever a person is under custodial investigation.",
          "Good questions are clear, non-confusing, and tied to facts that can be verified."
        ],
        note: "Statements should be lawful, voluntary, and properly documented."
      }
    ],
    questions: [
      {
        text: "Why is chain of custody important?",
        choices: ["It shows evidence integrity", "It replaces court testimony", "It decides the sentence", "It creates probable cause automatically"],
        answer: 0,
        explanation: "Chain of custody documents who handled evidence and helps prove integrity."
      },
      {
        text: "What should be done first at a crime scene after safety concerns are addressed?",
        choices: ["Secure and preserve the scene", "Move all items", "Invite bystanders", "Clean the area"],
        answer: 0,
        explanation: "Preservation prevents contamination and loss of evidence."
      }
    ]
  }
];

const state = {
  view: "dashboard",
  subjectId: localStorage.getItem("napolcom.subject") || subjects[0].id,
  chapterId: localStorage.getItem("napolcom.chapter") || subjects[0].chapters[0].id,
  bookmarks: JSON.parse(localStorage.getItem("napolcom.bookmarks") || "[]"),
  completed: JSON.parse(localStorage.getItem("napolcom.completed") || "[]"),
  practiceStats: JSON.parse(localStorage.getItem("napolcom.practice") || '{"right":0,"total":0}'),
  bestMock: Number(localStorage.getItem("napolcom.bestMock") || 0),
  practiceIndex: 0,
  mockQuestions: [],
  mockIndex: 0,
  mockRight: 0,
  mockTimer: null,
  mockSeconds: 900
};

const els = {
  sidebar: document.getElementById("sidebar"),
  menuButton: document.getElementById("menuButton"),
  searchInput: document.getElementById("searchInput"),
  subjectList: document.getElementById("subjectList"),
  subjectGrid: document.getElementById("subjectGrid"),
  chapterList: document.getElementById("chapterList"),
  readerArticle: document.getElementById("readerArticle"),
  practiceSelect: document.getElementById("practiceSelect"),
  practiceBox: document.getElementById("practiceBox"),
  practiceSubject: document.getElementById("practiceSubject"),
  practiceTitle: document.getElementById("practiceTitle"),
  mockBox: document.getElementById("mockBox"),
  mockTitle: document.getElementById("mockTitle"),
  timer: document.getElementById("timer"),
  bookmarkList: document.getElementById("bookmarkList"),
  progressStat: document.getElementById("progressStat"),
  bookmarkStat: document.getElementById("bookmarkStat"),
  bestScoreStat: document.getElementById("bestScoreStat"),
  accuracyStat: document.getElementById("accuracyStat"),
  viewEyebrow: document.getElementById("viewEyebrow"),
  viewTitle: document.getElementById("viewTitle")
};

function saveState() {
  localStorage.setItem("napolcom.subject", state.subjectId);
  localStorage.setItem("napolcom.chapter", state.chapterId);
  localStorage.setItem("napolcom.bookmarks", JSON.stringify(state.bookmarks));
  localStorage.setItem("napolcom.completed", JSON.stringify(state.completed));
  localStorage.setItem("napolcom.practice", JSON.stringify(state.practiceStats));
  localStorage.setItem("napolcom.bestMock", String(state.bestMock));
}

function subject() {
  return subjects.find((item) => item.id === state.subjectId) || subjects[0];
}

function chapter() {
  const current = subject();
  return current.chapters.find((item) => item.id === state.chapterId) || current.chapters[0];
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".view").forEach((node) => node.classList.remove("active"));
  document.getElementById(`${view}View`).classList.add("active");
  document.querySelectorAll(".nav-item").forEach((node) => {
    node.classList.toggle("active", node.dataset.view === view);
  });
  const titles = {
    dashboard: ["Dashboard", "Study Overview"],
    reader: ["Reviewer", subject().title],
    practice: ["Practice", "Question Review"],
    mock: ["Mock Exam", "Timed Simulation"],
    bookmarks: ["Bookmarks", "Saved Topics"]
  };
  els.viewEyebrow.textContent = titles[view][0];
  els.viewTitle.textContent = titles[view][1];
  els.sidebar.classList.remove("open");
  render();
}

function renderSubjects() {
  els.subjectList.innerHTML = subjects.map((item) => `
    <button class="subject-pill ${item.id === state.subjectId ? "active" : ""}" data-subject="${item.id}">
      ${item.title}
    </button>
  `).join("");

  els.subjectGrid.innerHTML = subjects.map((item) => {
    const done = item.chapters.filter((part) => state.completed.includes(part.id)).length;
    const pct = Math.round((done / item.chapters.length) * 100);
    return `
      <article class="subject-card">
        <h4>${item.title}</h4>
        <p>${item.summary}</p>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="card-actions">
          <button class="primary-button" data-open-subject="${item.id}">Read</button>
          <button class="ghost-button" data-practice-subject="${item.id}">Practice</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderChapters() {
  els.chapterList.innerHTML = subject().chapters.map((item) => `
    <button class="chapter-button ${item.id === state.chapterId ? "active" : ""}" data-chapter="${item.id}">
      ${state.completed.includes(item.id) ? "✓ " : ""}${item.title}
    </button>
  `).join("");
}

function renderReader() {
  const current = chapter();
  const marked = state.bookmarks.includes(current.id);
  els.readerArticle.innerHTML = `
    <div class="reader-tools">
      <button class="primary-button" id="markComplete">${state.completed.includes(current.id) ? "Completed" : "Mark Done"}</button>
      <button class="ghost-button" id="toggleBookmark">${marked ? "Saved" : "Bookmark"}</button>
      <button class="ghost-button" id="practiceThis">Practice Topic</button>
    </div>
    <p class="eyebrow">${subject().title}</p>
    <h3>${current.title}</h3>
    ${current.body.map((text) => `<p>${text}</p>`).join("")}
    <div class="note-box">${current.note}</div>
  `;
}

function renderPracticeSelect() {
  els.practiceSelect.innerHTML = subjects.map((item) => `
    <option value="${item.id}" ${item.id === state.subjectId ? "selected" : ""}>${item.title}</option>
  `).join("");
}

function renderPractice() {
  const current = subject();
  const question = current.questions[state.practiceIndex % current.questions.length];
  els.practiceSubject.textContent = current.title;
  els.practiceTitle.textContent = `Question ${state.practiceIndex + 1} of ${current.questions.length}`;
  els.practiceBox.innerHTML = `
    <p class="question-text">${question.text}</p>
    <div>
      ${question.choices.map((choice, index) => `
        <button class="choice" data-practice-choice="${index}">${choice}</button>
      `).join("")}
    </div>
    <div id="practiceFeedback"></div>
  `;
}

function allQuestions() {
  return subjects.flatMap((item) => item.questions.map((question) => ({
    ...question,
    subject: item.title
  })));
}

function startMock() {
  const pool = allQuestions().sort(() => Math.random() - 0.5);
  state.mockQuestions = pool.concat(pool).slice(0, 10);
  state.mockIndex = 0;
  state.mockRight = 0;
  state.mockSeconds = 900;
  clearInterval(state.mockTimer);
  state.mockTimer = setInterval(() => {
    state.mockSeconds -= 1;
    updateTimer();
    if (state.mockSeconds <= 0) finishMock();
  }, 1000);
  setView("mock");
  renderMock();
}

function updateTimer() {
  const minutes = String(Math.floor(state.mockSeconds / 60)).padStart(2, "0");
  const seconds = String(state.mockSeconds % 60).padStart(2, "0");
  els.timer.textContent = `${minutes}:${seconds}`;
}

function renderMock() {
  updateTimer();
  if (!state.mockQuestions.length) {
    els.mockBox.innerHTML = `
      <div class="empty">Start a mock exam to generate a timed question set.</div>
      <button class="primary-button" id="startMockMain">Start Mock Exam</button>
    `;
    return;
  }
  const question = state.mockQuestions[state.mockIndex];
  els.mockTitle.textContent = `Question ${state.mockIndex + 1} of ${state.mockQuestions.length}`;
  els.mockBox.innerHTML = `
    <p class="eyebrow">${question.subject}</p>
    <p class="question-text">${question.text}</p>
    <div>
      ${question.choices.map((choice, index) => `
        <button class="choice" data-mock-choice="${index}">${choice}</button>
      `).join("")}
    </div>
  `;
}

function finishMock() {
  clearInterval(state.mockTimer);
  const score = Math.round((state.mockRight / Math.max(state.mockQuestions.length, 1)) * 100);
  state.bestMock = Math.max(state.bestMock, score);
  saveState();
  els.mockTitle.textContent = "Mock complete";
  els.mockBox.innerHTML = `
    <div class="stat-card">
      <span>Score</span>
      <strong>${score}%</strong>
    </div>
    <p class="explanation">You answered ${state.mockRight} out of ${state.mockQuestions.length} questions correctly.</p>
    <button class="primary-button" id="startMockMain">Retake Mock Exam</button>
  `;
  state.mockQuestions = [];
  renderStats();
}

function renderBookmarks() {
  const saved = subjects.flatMap((item) => item.chapters.map((part) => ({ ...part, subject: item })))
    .filter((part) => state.bookmarks.includes(part.id));
  els.bookmarkList.innerHTML = saved.length ? saved.map((item) => `
    <article class="bookmark-card">
      <h4>${item.title}</h4>
      <p>${item.subject.title}</p>
      <div class="card-actions">
        <button class="primary-button" data-open-bookmark="${item.subject.id}:${item.id}">Open</button>
      </div>
    </article>
  `).join("") : `<div class="empty">No saved topics yet.</div>`;
}

function renderStats() {
  const totalChapters = subjects.reduce((sum, item) => sum + item.chapters.length, 0);
  const progress = Math.round((state.completed.length / totalChapters) * 100);
  const accuracy = state.practiceStats.total
    ? `${Math.round((state.practiceStats.right / state.practiceStats.total) * 100)}%`
    : "-";
  els.progressStat.textContent = `${progress}%`;
  els.bookmarkStat.textContent = state.bookmarks.length;
  els.bestScoreStat.textContent = state.bestMock ? `${state.bestMock}%` : "-";
  els.accuracyStat.textContent = accuracy;
}

function renderSearch() {
  const term = els.searchInput.value.trim().toLowerCase();
  if (!term) {
    renderSubjects();
    return;
  }
  const results = subjects.flatMap((item) => item.chapters.map((part) => ({ ...part, subject: item })))
    .filter((part) => `${part.title} ${part.body.join(" ")} ${part.note} ${part.subject.title}`.toLowerCase().includes(term));
  els.subjectGrid.innerHTML = results.length ? results.map((item) => `
    <article class="subject-card">
      <h4>${item.title}</h4>
      <p>${item.subject.title}</p>
      <button class="primary-button" data-open-bookmark="${item.subject.id}:${item.id}">Open</button>
    </article>
  `).join("") : `<div class="empty">No matching topics found.</div>`;
}

function render() {
  renderSubjects();
  renderChapters();
  renderReader();
  renderPracticeSelect();
  renderPractice();
  renderMock();
  renderBookmarks();
  renderStats();
  renderSearch();
  saveState();
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches(".nav-item")) setView(target.dataset.view);
  if (target.id === "menuButton") els.sidebar.classList.toggle("open");
  if (target.id === "startMockTop" || target.id === "startMockMain") startMock();
  if (target.id === "continueButton") setView("reader");

  if (target.dataset.subject) {
    state.subjectId = target.dataset.subject;
    state.chapterId = subject().chapters[0].id;
    setView("reader");
  }

  if (target.dataset.openSubject) {
    state.subjectId = target.dataset.openSubject;
    state.chapterId = subject().chapters[0].id;
    setView("reader");
  }

  if (target.dataset.practiceSubject) {
    state.subjectId = target.dataset.practiceSubject;
    state.practiceIndex = 0;
    setView("practice");
  }

  if (target.dataset.chapter) {
    state.chapterId = target.dataset.chapter;
    render();
  }

  if (target.id === "markComplete") {
    if (!state.completed.includes(state.chapterId)) state.completed.push(state.chapterId);
    render();
  }

  if (target.id === "toggleBookmark") {
    const index = state.bookmarks.indexOf(state.chapterId);
    if (index >= 0) state.bookmarks.splice(index, 1);
    else state.bookmarks.push(state.chapterId);
    render();
  }

  if (target.id === "practiceThis") setView("practice");

  if (target.dataset.practiceChoice) {
    const current = subject();
    const question = current.questions[state.practiceIndex % current.questions.length];
    const picked = Number(target.dataset.practiceChoice);
    document.querySelectorAll("[data-practice-choice]").forEach((button) => {
      const choice = Number(button.dataset.practiceChoice);
      button.classList.toggle("correct", choice === question.answer);
      button.classList.toggle("wrong", choice === picked && picked !== question.answer);
      button.disabled = true;
    });
    state.practiceStats.total += 1;
    if (picked === question.answer) state.practiceStats.right += 1;
    document.getElementById("practiceFeedback").innerHTML = `
      <div class="explanation">${question.explanation}</div>
      <button class="primary-button" id="nextPractice">Next Question</button>
    `;
    saveState();
    renderStats();
  }

  if (target.id === "nextPractice") {
    state.practiceIndex = (state.practiceIndex + 1) % subject().questions.length;
    renderPractice();
  }

  if (target.dataset.mockChoice) {
    const question = state.mockQuestions[state.mockIndex];
    if (Number(target.dataset.mockChoice) === question.answer) state.mockRight += 1;
    state.mockIndex += 1;
    if (state.mockIndex >= state.mockQuestions.length) finishMock();
    else renderMock();
  }

  if (target.dataset.openBookmark) {
    const [subjectId, chapterId] = target.dataset.openBookmark.split(":");
    state.subjectId = subjectId;
    state.chapterId = chapterId;
    setView("reader");
  }

  if (target.id === "clearBookmarks") {
    state.bookmarks = [];
    render();
  }

  if (target.id === "increaseFont" || target.id === "decreaseFont") {
    const current = Number(getComputedStyle(document.documentElement).getPropertyValue("--reader-size").replace("px", ""));
    const next = target.id === "increaseFont" ? Math.min(current + 1, 24) : Math.max(current - 1, 15);
    document.documentElement.style.setProperty("--reader-size", `${next}px`);
  }
});

els.practiceSelect.addEventListener("change", (event) => {
  state.subjectId = event.target.value;
  state.practiceIndex = 0;
  render();
});

els.searchInput.addEventListener("input", () => {
  setView("dashboard");
  renderSearch();
});

render();
