const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image given its URL
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();
    imgElement.src = image.url;

    imgElement.onload = () => {
      resolve(imgElement);
    };

    imgElement.onerror = () => {
      reject(new Error(`Failed to load image's URL: ${image.url}`));
    };
  });
}

// Function to display downloaded images
function displayImages(images) {
  output.innerHTML = ''; // Clear any existing content

  images.forEach((img) => {
    output.appendChild(img);
  });
}

// Event listener for the download button
btn.addEventListener("click", () => {
  const promises = images.map((image) => downloadImage(image));

  Promise.all(promises)
    .then((downloadedImages) => {
      displayImages(downloadedImages);
    })
    .catch((error) => {
      console.error(error);
    });
});
