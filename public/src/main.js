import { renderSidebar } from "./layout/sidebar.js";
import { renderHeader } from "./layout/header.js";
import { initRouter } from "./app/router.js";

function initImageModal() {
  const modal = document.getElementById("image-modal");
  if (!modal) return;

  const modalImg = modal.querySelector(".image-modal__image");
  const backdrop = modal.querySelector(".image-modal__backdrop");

  const open = (src) => {
    modalImg.src = src;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  };

  const close = () => {
    modal.hidden = true;
    modalImg.src = "";
    document.body.classList.remove("modal-open");
  };

  backdrop.addEventListener("click", close);
  modalImg.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });

  // делегирование по всему документу
  document.addEventListener("click", (e) => {
    const img = e.target.closest("img.js-zoomable");
    if (!img) return;
    const fullSrc = img.dataset.fullSrc || img.src;
    open(fullSrc);
  });
}

function initApp() {
  const sidebarRoot = document.getElementById("sidebar");
  const headerRoot = document.getElementById("header");

  renderSidebar(sidebarRoot);
  renderHeader(headerRoot);

  initRouter();
  initImageModal();
}

document.addEventListener("DOMContentLoaded", initApp);
