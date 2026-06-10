const backToTopButton = document.querySelector(".back-to-top");

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealTargets = document.querySelectorAll(
  ".profile-panel, .like-card, .photo-card, .timeline-item, .note-card"
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

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.985)" },
        { transform: "scale(1)" }
      ],
      {
        duration: 220,
        easing: "ease-out"
      }
    );
  });
});
