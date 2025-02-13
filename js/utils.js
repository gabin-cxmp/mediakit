// utils.js

import { SOCIALS } from "./constants.js";

document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });
  
  
export const getSocialByName = (name) => SOCIALS.find(social => social.name === name);
  
export const createElement = (tag, attributes = {}) => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element[key] = value);
    return element;
  };
  
export const createSocialsContainer = (socials) => {
    const container = createElement('div', { className: 'image-socials-container' });
    socials.forEach(name => {
      const social = getSocialByName(name);
      if (social) container.appendChild(createElement('img', { src: social.url, alt: social.name }));
    });
    return container;
  };
  
export const createDownloadButton = (imageURL, fileName) => 
    createElement('a', { href: imageURL, download: fileName, textContent: 'Download', className: 'download-button-small' });
  
export const createImageTitleAndDescription = (title, description) => {
    const container = createElement('div', { className: 'image-title-container' });
    container.append(createElement('h3', { textContent: title }), createElement('p', { textContent: description }));
    return container;
  };
  
export  const createTitleSocialsContainer = (title, description, socials) => {
    const container = createElement('div', { className: 'image-title-socials-container' });
    container.append(createImageTitleAndDescription(title, description), createSocialsContainer(socials));
    return container;
  };
  