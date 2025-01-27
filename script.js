// Get references to DOM elements 
const logoUpload = document.getElementById('logoUpload');
const standNumberInput = document.getElementById('standNumber');
const previewCanvas = document.getElementById('previewCanvas');
const generatedImagesSection = document.querySelector('.generated-images');
const imagesContainer = document.querySelector('.images-container');

// Define constants for positions and dimensions
const PREVIEW_LOGO_WIDTH = 240; // Default width for the preview logo
const PREVIEW_LOGO_HEIGHT = 120; // Default height for the preview logo
const PREVIEW_LOGO_CENTER_X = 386; // X coordinate for the preview logo center
const PREVIEW_LOGO_CENTER_Y = 762; // Y coordinate for the preview logo center
const PREVIEW_STAND_NUMBER_X = 688; // X coordinate for the preview stand number
const PREVIEW_STAND_NUMBER_Y = 778; // Y coordinate for the preview stand number

// Define image formats and their corresponding templates
const FORMATS = [
  {
    name: 'Instagram Post WSN',
    template: 'assets/instagram-template.jpg',
    title: 'Instagram Post',
    width: 1080,
    height: 1060,
    logoCenterX: 386,
    logoCenterY: 762,
    standNumberX: 569,
    standNumberY: 778,
    maxLogoWidth: 220,
    maxLogoHeight: 120,
    font: '800 56px Inter'
  },
  {
    name: 'LinkedIn Banner WSN',
    template: 'assets/linkedin-template.jpg',
    title: 'LinkedIn Banner',
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
    name: 'X Banner WSN',
    template: 'assets/x-template.jpg',
    title: 'X Banner',
    width: 1500,
    height: 500,
    logoCenterX: 1185,
    logoCenterY: 98,
    standNumberX: 1285,
    standNumberY: 110,
    maxLogoWidth: 120,
    maxLogoHeight: 88,
    font: '800 36px Inter'
  }
];

// Load the preview template image
const previewCtx = previewCanvas.getContext('2d');
const previewTemplate = new Image();
previewTemplate.src = 'assets/instagram-template.jpg';

// Function to draw the preview template with placeholders
function drawPreviewTemplate() {
  previewCtx.drawImage(previewTemplate, 0, 0, previewCanvas.width, previewCanvas.height);

  // Draw the logo placeholder
  const logoPlaceholder = new Image();
  logoPlaceholder.src = 'assets/logo-placeholder.png';
  logoPlaceholder.onload = function () {
    const logoX = PREVIEW_LOGO_CENTER_X - PREVIEW_LOGO_WIDTH / 2;
    const logoY = PREVIEW_LOGO_CENTER_Y - PREVIEW_LOGO_HEIGHT / 2;
    previewCtx.drawImage(logoPlaceholder, logoX, logoY, PREVIEW_LOGO_WIDTH, PREVIEW_LOGO_HEIGHT);
  };

  // Draw the stand number placeholder
  previewCtx.fillStyle = '#FFFFFF';
  previewCtx.font = '800 56px Inter';
  previewCtx.textAlign = 'center';
  previewCtx.letterSpacing = "-0.05em"
  previewCtx.textTransform = 'uppercase'; // Make text uppercase
  previewCtx.fillText('7.2 H. 147', PREVIEW_STAND_NUMBER_X, PREVIEW_STAND_NUMBER_Y);
}

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

// Function to generate an image for a specific format
function generateImage(format, logoImg, standNumber) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    canvas.width = format.width;
    canvas.height = format.height;
    const ctx = canvas.getContext('2d');

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
      ctx.letterSpacing = "-0.05em"
      ctx.fillText(standNumber.toUpperCase(), format.standNumberX, format.standNumberY);

      // Convert canvas to image and add to container
      const imageURL = canvas.toDataURL('image/png');
      const imgElement = document.createElement('img');
      imgElement.src = imageURL;
      imgElement.alt = `Generated ${format.name}`;

      // Create a container for the image, title, and download button
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      // Add the title, image, and download button to the container
      imageContainer.appendChild(createImageTitle(format.title));
      imageContainer.appendChild(imgElement);
      imageContainer.appendChild(createDownloadButton(imageURL, `${format.name}.png`));

      // Add the container to the images container
      imagesContainer.appendChild(imageContainer);

      // Resolve promise after image is added
      resolve();
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
    // Generate images for each format
    await Promise.all(FORMATS.map(format => generateImage(format, logoImg, standNumber)));

    // Remove loading spinner
    generatedImagesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    loadingSpinner.remove();
  };
});

// Initialize the preview template
previewTemplate.onload = drawPreviewTemplate;
