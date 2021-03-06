import "./styles/styles.css";

import { BoardView } from "./view.js";

const board = new BoardView(document.getElementById("board"), 20);

board.createGrid();

const UIelements = {
  autoplay: document.getElementById("autoplay"),
  modal: document.getElementById("modal"),
  openModal: document.getElementById("open-modal"),
  closeModal: document.getElementById("close-modal")
};

UIelements.autoplay.addEventListener("change", function() {
  if (this.checked) {
    this.nextElementSibling.textContent = "Stop";
    board.autoplay = this.checked;
    board.next();
  } else {
    this.nextElementSibling.textContent = "Go!";
    clearTimeout(board.timer);
  }
});

UIelements.openModal.addEventListener("click", () => {
  UIelements.modal.style.display = "block";
});

UIelements.closeModal.addEventListener("click", () => {
  UIelements.modal.style.display = "none";
});

self.addEventListener("click", e => {
  if (e.target === UIelements.modal) {
    UIelements.modal.style.display = "none";
  }
});
