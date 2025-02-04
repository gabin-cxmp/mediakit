// DOM Elements
const logoUpload = document.getElementById('logoUpload');
const standLetterInput = document.getElementById('standLetter');
const standNumberInput = document.getElementById('standNumber');
const generatedImagesSection = document.querySelector('.generated-images');
const imagesContainer = document.querySelector('.images-container');
const fileNameDisplay = document.querySelector('.file-name');

// Socials Data
const SOCIALS = [
  { name: 'instagram', url: 'assets/socials/instagram.svg' },
  { name: 'facebook', url: 'assets/socials/facebook.svg' },
  { name: 'x', url: 'assets/socials/x.svg' },
  { name: 'tiktok', url: 'assets/socials/tiktok.svg' },
  { name: 'linkedin', url: 'assets/socials/linkedin.svg' }
];

// Image Formats
const FORMATS = [
  { nameEN: 'Square format', nameFR:'Format carré', templateEN: 'assets/instagram-template.jpg', templateFR: 'assets/instagram-template.jpg', description: '(1080x1060)', socials: ['instagram', 'facebook', 'linkedin'], dimensions: [1080, 1060], logoCenter: [386, 762], standLetterPosition: [569, 778], maxLogoSize: [210, 120], font: '800 56px Inter' },
  { nameEN: 'LinkedIn Banner', nameFR: 'Bannière Linkedin', templateEN: 'assets/linkedin-template.jpg', templateFR: 'assets/linkedin-template.jpg', description: '(1584x396)', socials: ['linkedin'], dimensions: [1584, 396], logoCenter: [1269, 102], standLetterPosition: [1369, 114], maxLogoSize: [120, 88], font: '800 36px Inter' },
  { nameEN: 'X Banner', nameFR: 'Bannière X', templateEN: 'assets/x-template.jpg', templateFR: 'assets/x-template.jpg', description: '(1500x500)', socials: ['x'], dimensions: [1500, 500], logoCenter: [1185, 98], standLetterPosition: [1285, 110], maxLogoSize: [120, 88], font: '800 36px Inter' },
  { nameEN: 'Story format', nameFR: 'Format story', templateEN: 'assets/story-template.png', templateFR: 'assets/story-template.png', description: '(1080x1920)', socials: ['instagram', 'facebook', 'tiktok'], dimensions: [1080, 1920], logoCenter: [387, 1192], standLetterPosition: [569, 1210], maxLogoSize: [200, 100], font: '800 56px Inter' },
  { nameEN: 'Facebook banner', nameFR: 'Bannière facebook', templateEN: 'assets/facebook-template.png', templateFR: 'assets/facebook-template.png', description: '(820x312)', socials: ['facebook'], dimensions: [820, 312], logoCenter: [614, 65], standLetterPosition: [679, 72], maxLogoSize: [80, 60], font: '800 25px Inter' }
];

function validateInput(input) {
  // Remove non-numeric characters
  input.value = input.value.replace(/\D/g, '');
  
  // Limit input to 3 characters
  if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
  }
}

document.querySelectorAll("nav a").forEach(link => {
  if (link.href === window.location.href) {
      link.classList.add("active");
  }
});

// Utility Functions
const getSocialByName = (name) => SOCIALS.find(social => social.name === name);

// Create social media icons container
const createSocialsContainer = (socials) => {
  const container = document.createElement('div');
  container.classList.add('image-socials-container');
  socials.forEach(name => {
    const social = getSocialByName(name);
    if (social) {
      const img = document.createElement('img');
      img.src = social.url;
      img.alt = social.name;
      container.appendChild(img);
    }
  });
  return container;
};

// Create download button
const createDownloadButton = (imageURL, fileName) => {
  const button = document.createElement('a');
  button.href = imageURL;
  button.download = fileName;
  button.textContent = 'Download';
  button.classList.add('download-button-small');
  return button;
};

// Create title and description for the image
const createImageTitleAndDescription = (title, description) => {
  const container = document.createElement('div');
  container.classList.add('image-title-container');
  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;
  container.append(titleElement, descriptionElement);
  return container;
};

// Create title-socials container to wrap title and social icons
const createTitleSocialsContainer = (title, description, socials) => {
  const container = document.createElement('div');
  container.classList.add('image-title-socials-container');

  const titleAndDescription = createImageTitleAndDescription(title, description);
  const socialsContainer = createSocialsContainer(socials);

  container.append(titleAndDescription, socialsContainer);
  return container;
};

// Generate image for a specific format
const generateImage = async (format, logoImg, standLetter, standNumber) => {
  const [width, height] = format.dimensions;
  const [logoCenterX, logoCenterY] = format.logoCenter;
  const [standLetterX, standLetterY] = format.standLetterPosition;
  const [maxLogoWidth, maxLogoHeight] = format.maxLogoSize;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  try {
    await document.fonts.load(format.font);
  } catch (err) {
    console.error('Font failed to load:', err);
  }

  const templateImg = new Image();
  templateImg.src = document.documentElement.lang == 'en' ? format.templateEN : format.templateFR;
  await new Promise(resolve => templateImg.onload = resolve);

  ctx.drawImage(templateImg, 0, 0, width, height);

  const scaleFactor = Math.min(maxLogoWidth / logoImg.width, maxLogoHeight / logoImg.height);
  const scaledWidth = logoImg.width * scaleFactor;
  const scaledHeight = logoImg.height * scaleFactor;
  const logoX = logoCenterX - scaledWidth / 2;
  const logoY = logoCenterY - scaledHeight / 2;

  ctx.drawImage(logoImg, logoX, logoY, scaledWidth, scaledHeight);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = format.font;
  ctx.textAlign = 'left';
  ctx.fillText(`${standLetter.toUpperCase()}. ${standNumber}`, standLetterX, standLetterY);

  const imageURL = canvas.toDataURL('image/png');
  const imgElement = document.createElement('img');
  imgElement.src = imageURL;
  imgElement.alt = `Generated ${format.name}`;

  const imageContainer = document.createElement('li');
  imageContainer.classList.add('image-container');
  const titleSocialsContainer = createTitleSocialsContainer(document.documentElement.lang == 'en' ? format.nameEN : format.nameFR, format.description, format.socials);

  imageContainer.append(titleSocialsContainer, imgElement, createDownloadButton(imageURL, `${format.name}.png`));
  imagesContainer.appendChild(imageContainer);

  return { imageURL, fileName: `${format.name}.png` };
};

// Handle logo upload and generation
logoUpload.addEventListener('change', () => {
  if (logoUpload.files.length > 0) fileNameDisplay.textContent = logoUpload.files[0].name;
  else fileNameDisplay.textContent = '(No file chosen)';
});

document.getElementById('submitButton').addEventListener('click', async () => {
  const logoFile = logoUpload.files[0];
  const standLetter = standLetterInput.value;
  const standNumber = standNumberInput.value;

  if (!logoFile) return alert(document.documentElement.lang == 'en' ? 'Please upload a logo.' : 'Veuillez ajouter un logo');
  if (!standLetter) return alert(document.documentElement.lang == 'en' ? 'Please enter your stand letter.' : 'Veuillez remplir la lettre du stand');
  if (!standNumber) return alert(document.documentElement.lang == 'en' ? 'Please enter your stand number.' : 'Veuillez remplir le numéro du stand');

  imagesContainer.innerHTML = '';
  generatedImagesSection.style.display = 'block';
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';
  generatedImagesSection.appendChild(loadingSpinner);

  const logoImg = new Image();
  logoImg.src = URL.createObjectURL(logoFile);
  await new Promise(resolve => logoImg.onload = resolve);

  const imageData = [];
  for (const format of FORMATS) {
    const data = await generateImage(format, logoImg, standLetter, standNumber);
    imageData.push(data);
  }

  loadingSpinner.remove();
  generatedImagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const downloadAllButton = document.getElementById('downloadAllButton');
  downloadAllButton.style.display = 'block';
  downloadAllButton.addEventListener('click', () => downloadAllImages(imageData));
});

// Download all images as a zip file
const downloadAllImages = (imageData) => {
  const zip = new JSZip();
  const folder = zip.folder('generated_images');
  imageData.forEach(({ imageURL, fileName }) => {
    const base64Data = imageURL.split(',')[1];
    folder.file(fileName, base64Data, { base64: true });
  });
  zip.generateAsync({ type: 'blob' }).then(content => saveAs(content, 'my-wsn-media-kit.zip'));
};
