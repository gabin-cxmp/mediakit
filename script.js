// Get references to DOM elements 
const logoUpload = document.getElementById('logoUpload');
const standNumberInput = document.getElementById('standNumber');
const generatedImagesSection = document.querySelector('.generated-images');
const imagesContainer = document.querySelector('.images-container');
const fileInput = document.getElementById('logoUpload');
const fileNameDisplay = document.querySelector('.file-name');

fileInput.addEventListener('change', function () {
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = '(No file chosen)';
  }
});

// Define image formats and their corresponding templates
const FORMATS = [
  {
    name: 'Instagram Post WSN',
    template: 'assets/instagram-template.jpg',
    title: 'Instagram Post',
    description: '(1080x1060)',
    width: 1080,
    height: 1060,
    logoCenterX: 386,
    logoCenterY: 762,
    standNumberX: 569,
    standNumberY: 778,
    maxLogoWidth: 210,
    maxLogoHeight: 120,
    font: '800 56px Inter'
  },
  {
    name: 'LinkedIn Banner',
    template: 'assets/linkedin-template.jpg',
    title: 'LinkedIn Banner',
    description: '(1584x396)',
    width: 1584,
    height: 396,
    logoCenterX: 1269,
    logoCenterY: 102,
    standNumberX: 1369,
    standNumberY: 114,
    maxLogoWidth: 120,
    maxLogoHeight: 88,
    font: '800 36px Inter'
  },

  {
    name: 'X Banner',
    template: 'assets/x-template.jpg',
    title: 'X Banner',
    description: '(1500x500)',
    width: 1500,
    height: 500,
    logoCenterX: 1185,
    logoCenterY: 98,
    standNumberX: 1285,
    standNumberY: 110,
    maxLogoWidth: 120,
    maxLogoHeight: 88,
    font: '800 36px Inter'
  },
  {
    name: 'Portrait/story format',
    template: 'assets/story-template.png',
    title: 'Portrait/story format',
    description: '(1080x1920)',
    width: 1080,
    height: 1920,
    logoCenterX: 387,
    logoCenterY: 1192,
    standNumberX: 569,
    standNumberY: 1210,
    maxLogoWidth: 200,
    maxLogoHeight: 100,
    font: '800 56px Inter'
  },
  {
    name: 'Facebook banner',
    template: 'assets/facebook-template.png',
    title: 'Facebook banner',
    description: '(820x312)',
    width: 820,
    height: 312,
    logoCenterX: 614,
    logoCenterY: 65,
    standNumberX: 679,
    standNumberY: 72,
    maxLogoWidth: 80,
    maxLogoHeight: 60,
    font: '800 25px Inter'
  }
  
];

// Function to create a download button for an image
function createDownloadButton(imageURL, fileName) {
  const downloadButton = document.createElement('a');
  downloadButton.href = imageURL;
  downloadButton.download = fileName;
  downloadButton.textContent = 'Download';
  downloadButton.classList.add('download-button');
  return downloadButton;
}

// Function to create a title for the image
function createImageTitle(title) {
  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  return titleElement;
}

function createImageDescription(description){
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;
  return descriptionElement;
}

// Function to generate an image for a specific format
function generateImage(format, logoImg, standNumber) {
  return new Promise(async resolve => {
    const canvas = document.createElement('canvas');
    canvas.width = format.width;
    canvas.height = format.height;
    const ctx = canvas.getContext('2d');

    // Wait for the font to load
    try {
      await document.fonts.load(format.font);
    } catch (err) {
      console.error('Font failed to load:', err);
    }

    // Load the template image
    const templateImg = new Image();
    templateImg.src = format.template;
    templateImg.onload = function () {
      // Draw the template as the background
      ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

      // Get the original dimensions of the logo
      const originalLogoWidth = logoImg.width;
      const originalLogoHeight = logoImg.height;

      // Calculate the scaled dimensions
      const scaleFactor = Math.min(
        format.maxLogoWidth / originalLogoWidth,
        format.maxLogoHeight / originalLogoHeight
      );
      const scaledWidth = originalLogoWidth * scaleFactor;
      const scaledHeight = originalLogoHeight * scaleFactor;

      // Calculate the position to center the logo
      const logoX = format.logoCenterX - scaledWidth / 2;
      const logoY = format.logoCenterY - scaledHeight / 2;

      // Draw the logo with scaled dimensions
      ctx.drawImage(logoImg, logoX, logoY, scaledWidth, scaledHeight);

      // Draw the stand number
      ctx.fillStyle = '#FFFFFF';
      ctx.font = format.font;
      ctx.textAlign = 'left';
      ctx.fillText(standNumber.toUpperCase(), format.standNumberX, format.standNumberY);

      // Convert canvas to image and add to container
      const imageURL = canvas.toDataURL('image/png');
      const imgElement = document.createElement('img');
      imgElement.src = imageURL;
      imgElement.alt = `Generated ${format.name}`;

      // Create a container for the image, title, and download button
      const titleContainer = document.createElement('div');
      titleContainer.classList.add('image-title-container');
      const imageContainer = document.createElement('li');
      imageContainer.classList.add('image-container');

      // Add the title, image, and download button to the container
      
      titleContainer.appendChild(createImageTitle(format.title));
      titleContainer.appendChild(createImageDescription(format.description));
      imageContainer.appendChild(titleContainer);
      imageContainer.appendChild(imgElement);
      imageContainer.appendChild(createDownloadButton(imageURL, `${format.name}.png`));

      // Add the container to the images container
      imagesContainer.appendChild(imageContainer);

      // Resolve promise after image is added
      resolve({ imageURL, fileName: `${format.name}.png` });
    };
  });
}

// Handle the Submit button click
document.getElementById('submitButton').addEventListener('click', async function () {
  const logoFile = logoUpload.files[0];
  const standNumber = standNumberInput.value;

  // Check if a logo is uploaded
  if (!logoFile) {
    alert('Please upload a logo.');
    return;
  }

  // Check if stand number is entered
  if (!standNumber) {
    alert('Please enter your stand number.');
    return;
  }

  // Clear previous generated images
  imagesContainer.innerHTML = '';

  // Add a loading spinner
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';
  generatedImagesSection.appendChild(loadingSpinner);

  // Show generated images section and scroll
  generatedImagesSection.style.display = 'block';

  // Load the uploaded logo
  const logoImg = new Image();
  logoImg.src = URL.createObjectURL(logoFile);
  logoImg.onload = async function () {
    const imageData = [];
    // Generate images sequentially
    for (const format of FORMATS) {
      const data = await generateImage(format, logoImg, standNumber);
      imageData.push(data); // Collect image data
    }
  
    // Remove loading spinner
    generatedImagesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    loadingSpinner.remove();

    const downloadAllButton = document.getElementById('downloadAllButton');
    downloadAllButton.style.display = 'block';
    downloadAllButton.addEventListener('click', () => downloadAllImages(imageData));
  };
});

function downloadAllImages(imageData) {
  const zip = new JSZip();
  const folder = zip.folder('generated_images');

  // Add each image to the ZIP file
  imageData.forEach((data, index) => {
    const base64Data = data.imageURL.split(',')[1]; // Remove the data URL prefix
    folder.file(data.fileName, base64Data, { base64: true });
  });

  // Generate the ZIP file and trigger download
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, 'my-wsn-media-kit.zip'); // Trigger download using FileSaver.js
  });
}