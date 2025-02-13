  // constants.js

export const dom = {
    logoUpload: document.getElementById('logoUpload'),
    standLetterInput: document.getElementById('standLetter'),
    standNumberInput: document.getElementById('standNumber'),
    generatedImagesSection: document.querySelector('.generated-images'),
    imagesContainer: document.querySelector('.images-container'),
    fileNameDisplay: document.querySelector('.file-name'),
    submitButton: document.getElementById('submitButton'),
    downloadAllButton: document.getElementById('downloadAllButton'),
    genericDownloadAll: document.getElementById('generic-downloadAll'),
    fileNamePictures: document.querySelector('.file-name-pictures'),
    submitButtonPictures: document.getElementById('submitButtonPictures'),
    generatePicturesSection : document.querySelector('.generated-pictures'),
    pictureUpload: document.getElementById('pictureUpload'),
    standNumberPictures: document.getElementById('standNumberPictures'),
    standLetterPictures : document.getElementById('standLetterPictures'),
    croppieContainer: document.getElementById('croppie-container'),
    picturesContainer: document.querySelector('.pictures-container'),
    downloadAllPicturesButton: document.getElementById('downloadAllPicturesButton'),
    downloadAllLogos: document.getElementById('downloadAllLogos')

  };

export const SOCIALS = [
    { name: 'instagram', url: 'assets/socials/instagram.svg' },
    { name: 'facebook', url: 'assets/socials/facebook.svg' },
    { name: 'x', url: 'assets/socials/x.svg' },
    { name: 'tiktok', url: 'assets/socials/tiktok.svg' },
    { name: 'linkedin', url: 'assets/socials/linkedin.svg' },
    { name: 'meta', url: 'assets/socials/meta.svg'},
    { name: 'mail', url: 'assets/socials/mail.svg'},
    { name: 'google-ads', url: 'assets/socials/google-ads.svg'}
  ];
  
 export const FORMATS_CUSTOMIZED_BANNERS = [
    { 
      nameEN: 'Square format',
      nameFR:'Format carré', 
      templateEN: 'assets/templates/square-template.png', 
      templateFR: 'assets/templates/square-template.png', 
      description: '(1080x1080)', 
      socials: ['instagram', 'facebook', 'x'], 
      dimensions: [1080, 1080], 
      logoCenter: [631, 823], 
      standLetterPosition: [595, 720], 
      maxLogoSize: [146, 146], 
      font: '52px CA Mechano' 
    },
    { 
      nameEN: 'Story format', 
      nameFR: 'Format story', 
      templateEN: 'assets/templates/story-template.png', 
      templateFR: 'assets/templates/story-template.png', 
      description: '(1080x1920)', 
      socials: ['instagram', 'facebook', 'tiktok'], 
      dimensions: [1080, 1920], 
      logoCenter: [634.9, 1273.5], 
      standLetterPosition: [599, 1170.9], 
      maxLogoSize: [146, 146], 
      font: '52px CA Mechano' 
    },
    { 
      nameEN: 'Portrait format', 
      nameFR: 'Format portrait', 
      templateEN: 'assets/templates/portrait-template.png', 
      templateFR: 'assets/templates/portrait-template.png', 
      description: '(1080x1350)', 
      socials: ['facebook', 'instagram'], 
      dimensions: [1080, 1350], 
      logoCenter: [634.9, 933.2], 
      standLetterPosition: [599.2, 830.2], 
      maxLogoSize: [146, 146], 
      font: '52px CA Mechano' 
    },
    { 
      nameEN: 'LinkedIn Banner', 
      nameFR: 'Bannière Linkedin', 
      templateEN: 'assets/templates/linkedin-template.png', 
      templateFR: 'assets/templates/linkedin-template.png', 
      description: '(1584x396)', 
      socials: ['linkedin'], 
      dimensions: [1584, 396], 
      logoCenter: [1233, 279], 
      standLetterPosition: [1205, 199], 
      maxLogoSize: [108, 108], 
      font: '41px CA Mechano'
     },
    { 
      nameEN: 'Email signature', 
      nameFR: 'Signature Email', 
      templateEN: 'assets/templates/email-signature-template.png', 
      templateFR: 'assets/templates/email-signature-template.png', 
      description: '(600x140)', 
      socials: ['mail'], 
      dimensions: [600, 140], 
      logoCenter: [471.3, 93.7], 
      standLetterPosition: [461.6, 64.9], 
      maxLogoSize: [42, 42], 
      font: '14.75px CA Mechano'
     },
    { 
      nameEN: 'Small banner', 
      nameFR: 'Petit bannière', 
      templateEN: 'assets/templates/small-banner-template.png', 
      templateFR: 'assets/templates/small-banner-template.png', 
      description: '(300x250)', 
      socials: ['google-ads', 'meta'], 
      dimensions: [300, 250], 
      logoCenter: [203.3, 167.9], 
      standLetterPosition: [195.6, 145.3], 
      maxLogoSize: [33, 33], 
      font: '11.25px CA Mechano'
     },
    { 
      nameEN: 'Landscape format', 
      nameFR: 'Format paysage', 
      templateEN: 'assets/templates/landscape-template.png', 
      templateFR: 'assets/templates/landscape-template.png', 
      description: '(1200x628)', 
      socials: ['facebook', 'instagram', 'x'], 
      dimensions: [1200, 628], 
      logoCenter: [847.7, 473.4], 
      standLetterPosition: [820, 393.45], 
      maxLogoSize: [115, 115], 
      font: '40.5px CA Mechano'
     }
  ];
  
export const FORMATS_BANNERS_WITH_PICTURES = [
  { 
    nameEN: 'Landscape format', 
    nameFR:'Format paysage', 
    templateEN: 'assets/banners-with-pictures/picture-template_landscape.png', 
    templateFR: 'assets/banners-with-pictures/picture-template_landscape.png', 
    description: '(1080x1080)', 
    socials: ['instagram', 'facebook', 'x'], 
    dimensions: [1920, 1080], 
    picturePosition: [1280.58, 636.1], 
    standLetterPosition: [1537.8, 605.2], 
    pictureSize: [435.21, 381.75], 
    font: '52'
   },
  { 
    nameEN: 'Landscape format', 
    nameFR:'Format paysage', 
    templateEN: 'assets/banners-with-pictures/picture-template_landscape.png', 
    templateFR: 'assets/banners-with-pictures/picture-template_landscape.png', 
    description: '(1080x1080)', 
    socials: ['instagram', 'facebook', 'x'], 
    dimensions: [1920, 1080], 
    picturePosition: [1280.58, 636.1], 
    standLetterPosition: [1537.8, 605.2], 
    pictureSize: [435.21, 381.75], 
    font: '52'
   },
  { 
    nameEN: 'Story format', 
    nameFR: 'Format story', 
    templateEN: 'assets/banners-with-pictures/picture-template_portrait.png', 
    templateFR: 'assets/banners-with-pictures/picture-template_portrait.png', 
    description: '(1080x1920)', 
    socials: ['instagram', 'facebook', 'tiktok'], 
    dimensions: [1080, 1350], 
    picturePosition: [183.86, 277.46], 
    standLetterPosition: [424.61, 142.89], 
    pictureSize: [473.5, 415.34], 
    font: '52'
   }
]


export const LOGOS = [
  {
    name: 'Logo-Premiere-Classe-2025.png',
    src: '/assets/logos/premiere-classe-logo.png'
  },
  {
    name: 'Logo-Premiere-Classe-2025.svg',
    src: '/assets/logos/premiere-classe-logo.svg'
  }
]
