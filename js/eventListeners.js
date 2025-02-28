// eventListeners.js

import { dom } from './constants.js';
import { infoEvent } from './constants.js';
import { createElement } from './utils.js';
import { FORMATS_CUSTOMIZED_BANNERS } from './constants.js';
import { LOGOS } from './constants.js';
import { generateImage } from './customizedBanners.js';
import { generatePictures } from './bannersWithPicture.js';

let croppieInstance; 

dom.logoUpload.addEventListener('change', () => {
    dom.fileNameDisplay.textContent = document.documentElement.lang === 'en' ? dom.logoUpload.files[0]?.name || '(No file chosen)' : dom.logoUpload.files[0]?.name || '(Aucun fichier choisi)';
  });

dom.pictureUpload.addEventListener('change', () => {
    dom.fileNamePictures.textContent = document.documentElement.lang === 'en' ? dom.logoUpload.files[0]?.name || '(No file chosen)' : dom.logoUpload.files[0]?.name || '(Aucun fichier choisi)';
});
  
dom.submitButton.addEventListener('click', async () => {
    const { logoUpload, /*standLetterInput,*/ standNumberInput, generatedImagesSection, imagesContainer } = dom;
    const logoFile = logoUpload.files[0];
    //const standLetter = standLetterInput.value;
    const standNumber = standNumberInput.value;
  
    if (!logoFile || /*!standLetter ||*/ !standNumber) {
      return alert(document.documentElement.lang === 'en' ? 'Please fill all fields.' : 'Veuillez remplir tous les champs.');
    }
  
    imagesContainer.innerHTML = '';
    generatedImagesSection.style.display = 'block';
    const loadingSpinner = createElement('div', { className: 'loading-spinner' });
    generatedImagesSection.appendChild(loadingSpinner);
  
    const logoImg = new Image();
    logoImg.src = URL.createObjectURL(logoFile);
    await new Promise(resolve => logoImg.onload = resolve);
  
    const imageData = await Promise.all(FORMATS_CUSTOMIZED_BANNERS.map(format => generateImage(format, logoImg, /*standLetter,*/ standNumber)));
  
    loadingSpinner.remove();
    generatedImagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
    dom.downloadAllButton.style.display = 'block';
    dom.downloadAllButton.onclick = () => downloadAllImages(imageData);
});
  
const downloadAllImages = (imageData) => {
    const zip = new JSZip();
    const folder = zip.folder('generated_images');
    imageData.forEach(({ imageURL, fileName }) => {
      const base64Data = imageURL.split(',')[1];
      folder.file(fileName, base64Data, { base64: true });
    });
    zip.generateAsync({ type: 'blob' }).then(content => saveAs(content, document.documentElement.lang === 'en' ? `My-Customized-Logo-${infoEvent.abreviation}-Kit.zip` : `Mon-Kit-${infoEvent.abreviation}-avec-Logo.zip`));
};

const downloadAllPictures = (imageData) => {
  const zip = new JSZip();
  const folder = zip.folder('generated_pictures');
  imageData.forEach(({ imageURL, fileName }) => {
    const base64Data = imageURL.split(',')[1];
    folder.file(fileName, base64Data, { base64: true });
  });
  zip.generateAsync({ type: 'blob' }).then(content => saveAs(content, document.documentElement.lang === 'en' ? `My-Customized-Picture-${infoEvent.abreviation}-Kit.zip` : `Mon-Kit-${infoEvent.abreviation}-avec-Image.zip`));
};
  
dom.genericDownloadAll.onclick = async () => {
    const zip = new JSZip();
    await Promise.all([...document.querySelectorAll('.generic-banners')].map(async img => 
      zip.file(`${img.alt}.png`, await (await fetch(img.src)).blob())
    ));
    saveAs(await zip.generateAsync({ type: 'blob' }), document.documentElement.lang === 'en' ? `My-Generic-${infoEvent.abreviation}-Kit.zip` : `Mon-Kit-${infoEvent.abreviation}-Generique.zip` );
};

dom.downloadAllLogos.onclick = async () => {
  const zip = new JSZip();
  for (const { name, src } of LOGOS) {
    const response = await fetch(src);
    const blob = await response.blob();
    zip.file(`${name}`, blob); // Ensure file format is preserved
  }
  zip.generateAsync({ type: 'blob' }).then(content => saveAs(content, 'PC2025-logos.zip'));
};


document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        const tabId = button.getAttribute('data-tab');
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
      });
    });
  });


// Initialize Croppie when an image is uploaded
dom.pictureUpload.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (croppieInstance) {
        croppieInstance.destroy(); // Destroy existing instance if any
      }
      // Initialize Croppie
      croppieInstance = new Croppie(dom.croppieContainer, {
        viewport: { width: 290.14, height: 254.5, type: 'square' }, // Cropping area
        boundary: { width: 320, height: 300 }, // Container size
        enableOrientation: true // Allow rotation
      });
      // Bind the uploaded image to Croppie
      croppieInstance.bind({
        url: e.target.result
      });
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
});

dom.submitButtonPictures.addEventListener('click', async () => {
  if (!croppieInstance) return alert(document.documentElement.lang === 'en' ? 'Please upload and crop an image first' : "Veuillez d'abord importer et recadrer une image" );
  
  const standNumber = dom.standNumberPictures.value.trim();
  if (!standNumber) return alert(document.documentElement.lang === 'en' ? 'Please enter a stand number' : 'Veuillez saisir un numéro de stand');
  
  const standLetter = dom.standLetterPictures.value.trim();
  if (!standLetter) return alert(document.documentElement.lang === 'en' ? 'Please enter an Aisle letter' : "Veuillez saisir une la lettre de allée de votre stand");
  
  dom.picturesContainer.innerHTML = '';
  dom.generatePicturesSection.style.display = "block";
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';
  dom.picturesContainer.appendChild(loadingSpinner);
  
  // Get the cropped image as a base64 string
  const croppedImgData = await croppieInstance.result({ type: 'base64', size: {width:1293.75 , height: 1145.25}});
  console.log(croppedImgData); // Should log a base64 string

  // Create an image element from the base64 string
  const croppedImg = new Image();
  croppedImg.src = croppedImgData;
  await new Promise(resolve => croppedImg.onload = resolve);

  // Now, generate pictures using the cropped image
  const imageData = await generatePictures(croppedImg, standLetter, standNumber);
  
  loadingSpinner.remove();
  dom.picturesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

  dom.downloadAllPicturesButton.style.display = 'block';
  dom.downloadAllPicturesButton.onclick = () => downloadAllPictures(imageData);
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-button-id]');
  if (button) {
    const buttonId = button.getAttribute('data-button-id');
    
    // Optional: prevent navigation for <a> tags if needed
    if (button.tagName === 'A' && !button.hasAttribute('download')) {
      event.preventDefault(); 
    }
    
    // Send event to GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'downloadButtonClick',
      buttonId: buttonId
    });

  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Sélectionnez le formulaire
  const form = document.querySelector('.stand-number-form'); // Adaptez le sélecteur si nécessaire

  // Ajoutez un écouteur d'événement pour le submit
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérez la valeur de l'input de type number
    const standNumberInput = document.getElementById('standNumber').value;

    // Envoyez les données à GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'formSubmit', // Nom de l'événement
      standNumberInput: standNumberInput // Valeur de l'input
    });

    // Soumettez le formulaire si nécessaire
    // form.submit();
  });
});


  
