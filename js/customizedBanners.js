// customizedBannerGenerator.js
import { dom } from "./constants.js";
import { infoEvent } from "./constants.js";
import { createElement } from "./utils.js";
import { createTitleSocialsContainer } from "./utils.js";
import { createDownloadButton } from "./utils.js";

export const generateImage = async (format, logoImg, hallNumber, standNumber) => {
    const scaleFactor = 2;
    const [originalWidth, originalHeight] = format.dimensions;
    const scaledWidth = originalWidth * scaleFactor;
    const scaledHeight = originalHeight * scaleFactor;
  
    const highResCanvas = createElement('canvas', { width: scaledWidth, height: scaledHeight });
    const highResCtx = highResCanvas.getContext('2d');
  
    try {
      await document.fonts.load(format.font);
    } catch (err) {
      console.error('Font failed to load:', err);
    }
  
    const templateImg = new Image();
    templateImg.src = document.documentElement.lang === 'en' ? format.templateEN : format.templateFR;
    await new Promise(resolve => templateImg.onload = resolve);
  
    highResCtx.drawImage(templateImg, 0, 0, scaledWidth, scaledHeight);
  
    const [logoCenterX, logoCenterY] = format.logoCenter;
    const [maxLogoWidth, maxLogoHeight] = format.maxLogoSize;
    const logoScaleFactor = Math.min((maxLogoWidth * scaleFactor) / logoImg.width, (maxLogoHeight * scaleFactor) / logoImg.height);
    const scaledLogoWidth = logoImg.width * logoScaleFactor;
    const scaledLogoHeight = logoImg.height * logoScaleFactor;
    const logoX = logoCenterX * scaleFactor - scaledLogoWidth / 2;
    const logoY = logoCenterY * scaleFactor - scaledLogoHeight / 2;
  
    highResCtx.drawImage(logoImg, logoX, logoY, scaledLogoWidth, scaledLogoHeight);
  
    highResCtx.fillStyle = '#010000';
    highResCtx.font = `${parseInt(format.font) * scaleFactor}px CA Mechano`;
    highResCtx.textAlign = 'center';
    highResCtx.fillText(format.nameEN === 'LinkedIn Banner' || format.nameEN === 'Email signature' ? standNumber : `BOOTH N. ${standNumber}`, format.standNumberPosition[0] * scaleFactor, format.standNumberPosition[1] * scaleFactor);
  
    const finalCanvas = createElement('canvas', { width: originalWidth, height: originalHeight });
    const finalCtx = finalCanvas.getContext('2d');
    finalCtx.drawImage(highResCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, originalWidth, originalHeight);
  
    const imageURL = finalCanvas.toDataURL('image/png');
    const imgElement = createElement('img', { src: imageURL, alt: `Generated ${format.name}` });
  
    const imageContainer = createElement('li', { className: 'image-container' });
    const titleSocialsContainer = createTitleSocialsContainer(document.documentElement.lang === 'en' ? format.nameEN : format.nameFR, format.description, format.socials);
    imageContainer.append(titleSocialsContainer, imgElement, createDownloadButton(imageURL, document.documentElement.lang === 'en' ? `${infoEvent.abreviation} ${format.nameEN}.png` : `${infoEvent.abreviation} ${format.nameFR}.png`, format.dataId));
    dom.imagesContainer.appendChild(imageContainer);
  
    return { imageURL, fileName: document.documentElement.lang === 'en' ? `${infoEvent.abreviation} ${format.nameEN}.png` : `${infoEvent.abreviation} ${format.nameFR}.png` };
  };
  
