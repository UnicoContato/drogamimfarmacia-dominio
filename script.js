const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const closeLightbox = document.querySelector("[data-lightbox-close]");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-src]").forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.getAttribute("data-src");
    if (!src || !lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightbox.hidden = false;
    closeLightbox?.focus();
  });
});

const hideLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightboxImage.src = "";
};

closeLightbox?.addEventListener("click", hideLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) hideLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    hideLightbox();
  }
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
