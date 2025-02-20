import { FORMATS_BANNERS_WITH_PICTURES } from './constants.js';
import { dom } from './constants.js';
import { infoEvent } from './constants.js';
import { createTitleSocialsContainer, createDownloadButton } from './utils.js';

export const generatePictures = async (croppedImg, standLetter, standNumber) => {
  const generatedImages = [];
  const scaleFactor = 2;

  try {
    // Ensure the font is loaded before proceeding
    await document.fonts.ready;
  } catch (err) {
    console.error('Font failed to load:', err);
  }

  for (const picture of FORMATS_BANNERS_WITH_PICTURES) {
    const [originalWidth, originalHeight] = picture.dimensions;
    const scaledWidth = originalWidth * scaleFactor;
    const scaledHeight = originalHeight * scaleFactor;

    const highResCanvas = document.createElement('canvas');
    highResCanvas.width = scaledWidth;
    highResCanvas.height = scaledHeight;
    const highResCtx = highResCanvas.getContext('2d');

    const templateImg = new Image();
    templateImg.src = document.documentElement.lang === 'en' ? picture.templateEN : picture.templateFR;
    await new Promise(resolve => templateImg.onload = resolve);

    highResCtx.drawImage(templateImg, 0, 0, scaledWidth, scaledHeight);

    const [pictureX, pictureY] = picture.picturePosition;
    const [pictureWidth, pictureHeight] = picture.pictureSize;

    // Draw the cropped image on the canvas
    highResCtx.drawImage(croppedImg, pictureX * scaleFactor, pictureY * scaleFactor, pictureWidth * scaleFactor, pictureHeight * scaleFactor);

    // Add text
    highResCtx.fillStyle = '#010000';
    highResCtx.font = `${parseInt(picture.font) * scaleFactor}px CA Mechano`;
    highResCtx.textAlign = 'left';
    highResCtx.fillText(`${standLetter.toUpperCase()}. ${standNumber}`, picture.standLetterPosition[0] * scaleFactor, picture.standLetterPosition[1] * scaleFactor);

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = originalWidth;
    finalCanvas.height = originalHeight;
    const finalCtx = finalCanvas.getContext('2d');
    finalCtx.drawImage(highResCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, originalWidth, originalHeight);

    const imageURL = finalCanvas.toDataURL('image/png');
    const imgElement = document.createElement('img');
    imgElement.src = imageURL;
    imgElement.alt = `Generated ${picture.nameEN}`;

    const imageContainer = document.createElement('li');
    imageContainer.className = 'image-container';
    const titleSocialsContainer = createTitleSocialsContainer(document.documentElement.lang === 'en' ? picture.nameEN : picture.nameFR, picture.description, picture.socials);
    imageContainer.append(titleSocialsContainer, imgElement, createDownloadButton(imageURL, document.documentElement.lang === 'en' ? `${infoEvent.abreviation} ${picture.nameEN}.png` : `${infoEvent.abreviation} ${picture.nameFR}.png`));
    dom.picturesContainer.appendChild(imageContainer);

    generatedImages.push({ imageURL, fileName: document.documentElement.lang === 'en' ? `${infoEvent.abreviation} ${picture.nameEN}.png` : `${infoEvent.abreviation} ${picture.nameFR}.png`});
  }

  return generatedImages;
};