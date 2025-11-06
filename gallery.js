const addImageBtn = document.getElementById("addImageBtn");
const imageInput = document.getElementById("imageInput");
const galleryContainer = document.getElementById("galleryContainer");

// === Load saved images from localStorage ===
window.addEventListener("DOMContentLoaded", () => {
  const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
  savedImages.forEach(name => addImageToGallery(name, false));
});

// === Add Image Button ===
addImageBtn.addEventListener("click", () => imageInput.click());

// === Handle Image Upload ===
imageInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    const fileName = file.name;
    addImageToGallery(fileName, true);
  });
  event.target.value = "";
});

// === Function to Add Image ===
function addImageToGallery(name, saveToStorage = true) {
  const imageCard = document.createElement("div");
  imageCard.classList.add("image-card");

  const newImg = document.createElement("img");
  newImg.src = `images/${name}`; // Make sure image is in /images folder
  newImg.alt = "Gallery Image";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "×";

  deleteBtn.addEventListener("click", () => deleteImage(imageCard, name));

  imageCard.appendChild(newImg);
  imageCard.appendChild(deleteBtn);
  galleryContainer.appendChild(imageCard);

  if (saveToStorage) {
    const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
    if (!savedImages.includes(name)) {
      savedImages.push(name);
      localStorage.setItem("galleryImages", JSON.stringify(savedImages));
    }
  }
}

// === Delete Image ===
function deleteImage(card, name) {
  card.remove();
  let savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
  savedImages = savedImages.filter(img => img !== name);
  localStorage.setItem("galleryImages", JSON.stringify(savedImages));
}
