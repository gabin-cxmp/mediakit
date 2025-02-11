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
  { name: 'linkedin', url: 'assets/socials/linkedin.svg' },
  { name: 'meta', url: 'assets/socials/meta.svg'},
  { name: 'mail', url: 'assets/socials/mail.svg'},
  { name: 'google-ads', url: 'assets/socials/google-ads.svg'}
];

// Image Formats
const FORMATS = [
  { nameEN: 'Square format', nameFR:'Format carré', templateEN: 'assets/templates/square-template.png', templateFR: 'assets/templates/square-template.png', description: '(1080x1080)', socials: ['instagram', 'facebook', 'x'], dimensions: [1080, 1080], logoCenter: [631, 823], standLetterPosition: [595, 720], maxLogoSize: [146, 146], font: '52px CA Mechano' },
  { nameEN: 'Story format', nameFR: 'Format story', templateEN: 'assets/templates/story-template.png', templateFR: 'assets/templates/story-template.png', description: '(1080x1920)', socials: ['instagram', 'facebook', 'tiktok'], dimensions: [1080, 1920], logoCenter: [634.9, 1273.5], standLetterPosition: [599, 1170.9], maxLogoSize: [146, 146], font: '52px CA Mechano' },
  { nameEN: 'Portrait format', nameFR: 'Format portrait', templateEN: 'assets/templates/portrait-template.png', templateFR: 'assets/templates/portrait-template.png', description: '(1080x1350)', socials: ['facebook', 'instagram'], dimensions: [1080, 1350], logoCenter: [634.9, 933.2], standLetterPosition: [599.2, 830.2], maxLogoSize: [146, 146], font: '52px CA Mechano' },
  { nameEN: 'LinkedIn Banner', nameFR: 'Bannière Linkedin', templateEN: 'assets/templates/linkedin-template.png', templateFR: 'assets/templates/linkedin-template.png', description: '(1584x396)', socials: ['linkedin'], dimensions: [1584, 396], logoCenter: [1233, 279], standLetterPosition: [1205, 199], maxLogoSize: [108, 108], font: '41px CA Mechano' },
  { nameEN: 'Email signature', nameFR: 'Signature Email', templateEN: 'assets/templates/email-signature-template.png', templateFR: 'assets/templates/email-signature-template.png', description: '(600x140)', socials: ['mail'], dimensions: [600, 140], logoCenter: [471.3, 93.7], standLetterPosition: [461.6, 64.9], maxLogoSize: [42, 42], font: '14.75px CA Mechano' },
  { nameEN: 'Small banner', nameFR: 'Petit bannière', templateEN: 'assets/templates/small-banner-template.png', templateFR: 'assets/templates/small-banner-template.png', description: '(300x250)', socials: ['google-ads', 'meta'], dimensions: [300, 250], logoCenter: [203.3, 167.9], standLetterPosition: [195.6, 145.3], maxLogoSize: [33, 33], font: '11.25px CA Mechano' },
  { nameEN: 'Landscape format', nameFR: 'Format paysage', templateEN: 'assets/templates/landscape-template.png', templateFR: 'assets/templates/landscape-template.png', description: '(1200x628)', socials: ['facebook', 'instagram', 'x'], dimensions: [1200, 628], logoCenter: [847.7, 473.4], standLetterPosition: [820, 393.45], maxLogoSize: [115, 115], font: '40.5px CA Mechano' }
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
  // Définir la taille du canvas à une résolution plus élevée (2x)
  const scaleFactor = 2; // Facteur d'échelle pour la haute résolution
  const [originalWidth, originalHeight] = format.dimensions;
  const scaledWidth = originalWidth * scaleFactor;
  const scaledHeight = originalHeight * scaleFactor;

  // Créer un canvas temporaire avec la haute résolution
  const highResCanvas = document.createElement('canvas');
  highResCanvas.width = scaledWidth;
  highResCanvas.height = scaledHeight;
  const highResCtx = highResCanvas.getContext('2d');

  try {
    await document.fonts.load(format.font);
  } catch (err) {
    console.error('Font failed to load:', err);
  }

  // Charger l'image de fond (template)
  const templateImg = new Image();
  templateImg.src = document.documentElement.lang == 'en' ? format.templateEN : format.templateFR;
  await new Promise(resolve => templateImg.onload = resolve);

  // Dessiner l'image de fond sur le canvas haute résolution
  highResCtx.drawImage(templateImg, 0, 0, scaledWidth, scaledHeight);

  // Activer le lissage pour une meilleure qualité de redimensionnement
  highResCtx.imageSmoothingEnabled = true;
  highResCtx.imageSmoothingQuality = 'high';

  // Redimensionner et positionner le logo
  const [logoCenterX, logoCenterY] = format.logoCenter;
  const [maxLogoWidth, maxLogoHeight] = format.maxLogoSize;
  const logoScaleFactor = Math.min(
    (maxLogoWidth * scaleFactor) / logoImg.width,
    (maxLogoHeight * scaleFactor) / logoImg.height
  );
  const scaledLogoWidth = logoImg.width * logoScaleFactor;
  const scaledLogoHeight = logoImg.height * logoScaleFactor;
  const logoX = logoCenterX * scaleFactor - scaledLogoWidth / 2;
  const logoY = logoCenterY * scaleFactor - scaledLogoHeight / 2;

  highResCtx.drawImage(logoImg, logoX, logoY, scaledLogoWidth, scaledLogoHeight);

  // Dessiner le texte
  highResCtx.fillStyle = '#010000';
  highResCtx.font = `${parseInt(format.font) * scaleFactor}px CA Mechano`; // Ajuster la taille de la police
  highResCtx.textAlign = 'left';
  highResCtx.fillText(
    `${standLetter.toUpperCase()}. ${standNumber}`,
    format.standLetterPosition[0] * scaleFactor,
    format.standLetterPosition[1] * scaleFactor
  );

  // Créer un canvas final avec la taille souhaitée (moitié de la haute résolution)
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = originalWidth;
  finalCanvas.height = originalHeight;
  const finalCtx = finalCanvas.getContext('2d');

  // Redimensionner le canvas haute résolution vers la taille finale
  finalCtx.imageSmoothingEnabled = true;
  finalCtx.imageSmoothingQuality = 'high';
  finalCtx.drawImage(highResCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, originalWidth, originalHeight);

  // Exporter l'image finale
  const imageURL = finalCanvas.toDataURL('image/png'); // Exporter en PNG pour une qualité maximale
  const imgElement = document.createElement('img');
  imgElement.src = imageURL;
  imgElement.alt = `Generated ${format.name}`;

  const imageContainer = document.createElement('li');
  imageContainer.classList.add('image-container');
  const titleSocialsContainer = createTitleSocialsContainer(
    document.documentElement.lang == 'en' ? format.nameEN : format.nameFR,
    format.description,
    format.socials
  );

  imageContainer.append(titleSocialsContainer, imgElement, createDownloadButton(imageURL, `${format.nameEN} PC.png`));
  imagesContainer.appendChild(imageContainer);

  return { imageURL, fileName: `${format.nameEN} PC.png` };
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
  zip.generateAsync({ type: 'blob' }).then(content => saveAs(content, 'my-pc-media-kit.zip'));
};
