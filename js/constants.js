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

export const infoEvent = {
  name: 'Premiere Classe 2025',
  abreviation: 'PC25'
}

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
      dataId:'customized-square-format',
      templateEN: 'assets/templates/1080x1080.png', 
      templateFR: 'assets/templates/1080x1080.png', 
      description: '(1080x1080)', 
      socials: ['instagram', 'facebook', 'x'], 
      dimensions: [1080, 1080], 
      logoCenter: [171.07, 1008], 
      standLetterPosition: [711.27, 1037], 
      maxLogoSize: [220, 124], 
      font: '88px CA Mechano' 
    },
    { 
      nameEN: 'Story format', 
      nameFR: 'Format story', 
      dataId:'customized-story-format',
      templateEN: 'assets/templates/1080x1920.png', 
      templateFR: 'assets/templates/1080x1920.png', 
      description: '(1080x1920)', 
      socials: ['instagram', 'facebook', 'tiktok'], 
      dimensions: [1080, 1920], 
      logoCenter: [170.65, 1845], 
      standLetterPosition: [711.27, 1874], 
      maxLogoSize: [220, 124], 
      font: '88px CA Mechano' 
    },
    { 
      nameEN: 'Portrait format', 
      nameFR: 'Format portrait', 
      dataId:'customized-portrait-format',
      templateEN: 'assets/templates/1080x1350.png', 
      templateFR: 'assets/templates/1080x1350.png', 
      description: '(1080x1350)', 
      socials: ['facebook', 'instagram'], 
      dimensions: [1080, 1350], 
      logoCenter: [170.74, 1276], 
      standLetterPosition: [711.27, 1305], 
      maxLogoSize: [220, 124], 
      font: '88px CA Mechano' 
    },
    { 
      nameEN: 'LinkedIn Banner', 
      nameFR: 'Bannière Linkedin',
      dataId:'customized-linkedin-banner', 
      templateEN: 'assets/templates/1584x396.png', 
      templateFR: 'assets/templates/1584x396.png', 
      description: '(1584x396)', 
      socials: ['linkedin'], 
      dimensions: [1584, 396], 
      logoCenter: [1479.5, 94.45], 
      standLetterPosition: [1479.15, 333.98], 
      maxLogoSize: [167, 124], 
      font: '62px CA Mechano'
     },
    { 
      nameEN: 'Email signature', 
      nameFR: 'Signature Email', 
      dataId:'customized-email-signature',
      templateEN: 'assets/templates/600x140.png', 
      templateFR: 'assets/templates/600x140.png', 
      description: '(600x140)', 
      socials: ['mail'], 
      dimensions: [600, 140], 
      logoCenter: [563.06, 33.39], 
      standLetterPosition: [562.96, 118.72], 
      maxLogoSize: [59.04, 43.84], 
      font: '22.6px CA Mechano'
     },
    { 
      nameEN: 'Small banner', 
      nameFR: 'Petite bannière',
      dataId:'customized-small-banner', 
      templateEN: 'assets/templates/300x250.png', 
      templateFR: 'assets/templates/300x250.png', 
      description: '(300x250)', 
      socials: ['google-ads', 'meta'], 
      dimensions: [300, 250], 
      logoCenter: [47.03, 229.44], 
      standLetterPosition: [197.15, 237.28], 
      maxLogoSize: [60.83, 34.44], 
      font: '24.5px CA Mechano'
     },
    { 
      nameEN: 'Landscape format', 
      nameFR: 'Format paysage', 
      dataId:'customized-landscape-format',
      templateEN: 'assets/templates/1200x628.png', 
      templateFR: 'assets/templates/1200x628.png', 
      description: '(1200x628)', 
      socials: ['facebook', 'instagram', 'x'], 
      dimensions: [1200, 628], 
      logoCenter: [305.16, 567.98], 
      standLetterPosition: [715.16, 591.05], 
      maxLogoSize: [177.63, 100.58], 
      font: '71.25px CA Mechano'
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
