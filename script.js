const backToTopButton = document.querySelector(".back-to-top");

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealTargets = document.querySelectorAll(
  ".profile-panel, .like-card, .photo-card, .timeline-item, .note-card, .fun-card"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    observer.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const photoModal = document.querySelector(".photo-modal");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector("#photo-modal-title");
const modalNote = document.querySelector(".modal-note");
const modalCloseButton = document.querySelector(".modal-close");
let lastFocusedElement = null;

function openPhotoModal(card) {
  if (!photoModal || !modalImage || !modalTitle || !modalNote) return;

  lastFocusedElement = document.activeElement;
  modalImage.src = card.dataset.full;
  modalImage.alt = card.querySelector("img")?.alt || card.dataset.title || "照片预览";
  modalTitle.textContent = card.dataset.title || "照片";
  modalNote.textContent = card.dataset.note || "这个瞬间值得放大看看。";
  photoModal.classList.add("is-open");
  photoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalCloseButton?.focus();
}

function closePhotoModal() {
  if (!photoModal || !modalImage) return;

  photoModal.classList.remove("is-open");
  photoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalImage.removeAttribute("src");
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => openPhotoModal(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPhotoModal(card);
    }
  });
});

modalCloseButton?.addEventListener("click", closePhotoModal);

photoModal?.addEventListener("click", (event) => {
  if (event.target === photoModal) {
    closePhotoModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && photoModal?.classList.contains("is-open")) {
    closePhotoModal();
  }
});

const surpriseToast = document.querySelector(".surprise-toast");
let toastTimer = null;

function showSurprise(message) {
  if (!surpriseToast) return;

  surpriseToast.textContent = message;
  surpriseToast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    surpriseToast.hidden = true;
  }, 3200);
}

document.querySelectorAll(".surprise-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    showSurprise(trigger.dataset.surprise || "这是一个认真藏起来的小惊喜。");
  });
});

const funCopy = {
  praise: [
    "今日夸夸：她不是普通好看，是让粉色都显得更合理。",
    "今日夸夸：认真时很靠谱，笑起来又很犯规。",
    "今日夸夸：建议把她列入今日重点保护对象，理由是太可爱。"
  ],
  snack: [
    "零食理由：今天已经很努力了，奖励一口是合理流程。",
    "零食理由：快乐需要补货，小零食属于基础设施。",
    "零食理由：喜欢的味道要及时吃掉，别让快乐过期。"
  ],
  travel: [
    "出门玩申请：天气、心情、照片库存都需要更新，批准。",
    "出门玩申请：目的地不限，重点是她要开心，批准。",
    "出门玩申请：理由充分，路线可以慢慢想，先批准。"
  ]
};

const funResult = document.querySelector(".fun-result");

document.querySelectorAll(".fun-card").forEach((button) => {
  button.addEventListener("click", () => {
    const options = funCopy[button.dataset.fun] || [];
    const message = options[Math.floor(Math.random() * options.length)];
    if (funResult && message) {
      funResult.textContent = message;
    }
  });
});

const secretToggle = document.querySelector(".secret-toggle");
const secretNote = document.querySelector("#secret-note");

secretToggle?.addEventListener("click", () => {
  if (!secretNote) return;

  const willOpen = secretNote.hidden;
  secretNote.hidden = !willOpen;
  secretToggle.setAttribute("aria-expanded", String(willOpen));
  secretToggle.textContent = willOpen ? "已经打开" : "偷偷打开";
});
