const modalTag = document.getElementById("modal-tag");
const modalBio = document.getElementById("modal-bio");

// eslint-disable-next-line no-unused-vars
const viewClicked = (tag, bio) => {
  modalBio.innerHTML = bio;
  modalTag.innerHTML = tag;
};
