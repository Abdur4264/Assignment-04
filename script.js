// grab elements
const cardGrid     = document.querySelector(".card-grid");
const allCards     = () => document.querySelectorAll(".card-grid > [data-status]");

const totalCountEl     = document.querySelector(".total-count");
const interviewCountEl = document.querySelector(".interview-count");
const rejectedCountEl  = document.querySelector(".rejected-count");
const jobCountEl       = document.querySelector(".job-count");

const btnAll       = document.getElementById("filter-all");
const btnInterview = document.getElementById("filter-interview");
const btnRejected  = document.getElementById("filter-rejected");

let activeFilter = "all";

//Empty state
const emptyState = document.createElement("div");
emptyState.id = "empty-state";
emptyState.className = "col-span-5 hidden flex-col items-center justify-center py-24 text-center";
emptyState.innerHTML = `
  <div class="mb-5">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="8" width="46" height="60" rx="6" fill="#BFDBFE"/>
      <path d="M46 8L58 20H46V8Z" fill="#93C5FD"/>
      <rect x="20" y="30" width="30" height="5" rx="2.5" fill="white" opacity="0.85"/>
      <rect x="20" y="40" width="30" height="5" rx="2.5" fill="white" opacity="0.85"/>
      <rect x="20" y="50" width="20" height="5" rx="2.5" fill="white" opacity="0.85"/>
    </svg>
  </div>
  <h2 class="text-[#002C5C] text-[22px] font-bold mb-2">No jobs available</h2>
  <p class="text-[#64748B] text-[15px]">Check back soon for new job opportunities</p>
`;
cardGrid.appendChild(emptyState);

//Filter button styles
const ACTIVE_BTN   = ["bg-[#3B82F6]", "text-white"];
const INACTIVE_BTN = ["bg-white", "text-[#64748B]", "shadow"];

function setActiveButton(btn) {
  [btnAll, btnInterview, btnRejected].forEach((b) => {
    b.classList.remove(...ACTIVE_BTN);
    b.classList.add(...INACTIVE_BTN);
  });
  btn.classList.remove(...INACTIVE_BTN);
  btn.classList.add(...ACTIVE_BTN);
}

//Counters
function updateCounters() {
  const cards = allCards();
  let total = cards.length;
  let interview = 0;
  let rejected = 0;

  cards.forEach((card) => {
    if (card.dataset.status === "interview") interview++;
    if (card.dataset.status === "rejected")  rejected++;
  });

  totalCountEl.textContent     = total;
  interviewCountEl.textContent = interview;
  rejectedCountEl.textContent  = rejected;
}

//job count label + empty state 
function updateJobCount() {
  const cards = allCards();
  let visible = 0;
  cards.forEach((c) => { if (c.style.display !== "none") visible++; });

  jobCountEl.textContent = `${visible} job${visible !== 1 ? "s" : ""}`;

  if (visible === 0) {
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
  }
}

//apply filter
function applyFilter(filter) {
  activeFilter = filter;
  const cards  = allCards();

  cards.forEach((card) => {
    const status = card.dataset.status; 
    if (filter === "all") {
      card.style.display = "";
    } else if (filter === "interview") {
      card.style.display = status === "interview" ? "" : "none";
    } else if (filter === "rejected") {
      card.style.display = status === "rejected" ? "" : "none";
    }
  });

  updateJobCount();
}

//Update a card's status badge 
function setStatusBadge(card, status) {
  const badge = card.querySelector(".status-badge");
  if (!badge) return;

  badge.className = "status-badge px-6 py-2.5 font-medium rounded-[5px]";

  if (status === "interview") {
    badge.classList.add("bg-[#D1FAE5]", "text-[#10B981]");
    badge.textContent = "INTERVIEW";
  } else if (status === "rejected") {
    badge.classList.add("bg-[#FEE2E2]", "text-[#EF4444]");
    badge.textContent = "REJECTED";
  } else {
    badge.classList.add("bg-[#EEF4FF]", "text-[#002C5C]");
    badge.textContent = "NOT APPLIED";
  }
}

//highlight active interview / rejected button on a card
function highlightCardButtons(card, status) {
  const iBtn = card.querySelector(".interview-btn");
  const rBtn = card.querySelector(".rejected-btn");

  //Reset 
  if (iBtn) {
    iBtn.className = "border border-[#10B981] text-[#10B981] px-6 py-2.5 font-medium rounded-[5px] shadow interview-btn";
  }
  if (rBtn) {
    rBtn.className = "border border-[#EF4444] text-[#EF4444] px-6 py-2.5 font-medium rounded-[5px] shadow rejected-btn";
  }

  if (status === "interview" && iBtn) {
    iBtn.classList.add("bg-[#10B981]", "text-white");
    iBtn.classList.remove("text-[#10B981]");
  }
  if (status === "rejected" && rBtn) {
    rBtn.classList.add("bg-[#EF4444]", "text-white");
    rBtn.classList.remove("text-[#EF4444]");
  }
}

//Delegate click events on the card grid
 cardGrid.addEventListener("click", (e) => {
  const card = e.target.closest("[data-status]");
  if (!card) return;

  // Delete
  if (e.target.closest(".delete-btn")) {
    card.remove();
    updateCounters();
    applyFilter(activeFilter);
    return;
  }

  //Interview
  if (e.target.closest(".interview-btn")) {
    const current = card.dataset.status;
    const newStatus = current === "interview" ? "none" : "interview";
    card.dataset.status = newStatus;
    setStatusBadge(card, newStatus);
    highlightCardButtons(card, newStatus);
    updateCounters();
    applyFilter(activeFilter);
    return;
  }

  //Reject
  if (e.target.closest(".rejected-btn")) {
    const current = card.dataset.status;
    const newStatus = current === "rejected" ? "none" : "rejected";
    card.dataset.status = newStatus;
    setStatusBadge(card, newStatus);
    highlightCardButtons(card, newStatus);
    updateCounters();
    applyFilter(activeFilter);
    return;
  }
 });

 btnAll.addEventListener("click", () => {
  setActiveButton(btnAll);
  applyFilter("all");
 });

 btnInterview.addEventListener("click", () => {
  setActiveButton(btnInterview);
  applyFilter("interview");
});

 btnRejected.addEventListener("click", () => {
  setActiveButton(btnRejected);
  applyFilter("rejected");
});


 document.addEventListener("DOMContentLoaded", () => {
  updateCounters();
  updateJobCount();
 });


 updateCounters();
 updateJobCount();
