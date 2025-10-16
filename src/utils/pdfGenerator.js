import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const waitForImages = (rootEl, timeout = 5000) =>
  new Promise((resolve) => {
    try {
      const imgs = Array.from(rootEl.querySelectorAll('img'));
      if (!imgs.length) return resolve();

      let loaded = 0;
      const onFinish = () => {
        loaded++;
        if (loaded >= imgs.length) resolve();
      };

      imgs.forEach((img) => {
        if (img.complete && img.naturalWidth !== 0) {
          onFinish();
        } else {
          const handler = () => {
            img.removeEventListener('load', handler);
            img.removeEventListener('error', handler);
            onFinish();
          };
          img.addEventListener('load', handler);
          img.addEventListener('error', handler);
        }
      });
      setTimeout(resolve, timeout);
    } catch (e) {
      resolve();
    }
  });
export const generatePdf = async (containerElement, data) => {
  if (!containerElement) {
    throw new Error('PDF Template element not found.');
  }
  await waitForImages(containerElement);

  const pageEls = Array.from(containerElement.querySelectorAll('.pdf-page'));
  if (!pageEls.length) {
    throw new Error('No .pdf-page elements found inside the container.');
  }

  const canvases = [];
  const scale = Math.max(1.6, window.devicePixelRatio || 1);

  for (let i = 0; i < pageEls.length; i++) {
    const el = pageEls[i];
    const prevBg = el.style.backgroundColor;
    el.style.backgroundColor = el.style.backgroundColor || '#ffffff';

    const canvas = await html2canvas(el, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
    });

    el.style.backgroundColor = prevBg;
    canvases.push(canvas);
  }

  const combinedWidth = canvases[0].width;
  const combinedHeight = canvases.reduce((sum, c) => sum + c.height, 0);
  const combinedCanvas = document.createElement('canvas');
  combinedCanvas.width = combinedWidth;
  combinedCanvas.height = combinedHeight;
  const ctx = combinedCanvas.getContext('2d');

  let dy = 0;
  for (const c of canvases) {
    ctx.drawImage(c, 0, dy);
    dy += c.height;
  }

  const pdf = new jsPDF('p', 'mm', 'a4');
  const mmWidth = 210; // A4 width in mm
  const mmHeight = 297; // A4 height in mm

  const pxPerMm = combinedCanvas.width / mmWidth;
  const pagePxHeight = Math.floor(mmHeight * pxPerMm);

  const totalPages = Math.ceil(combinedCanvas.height / pagePxHeight);

  for (let p = 0; p < totalPages; p++) {
    const sliceHeightPx = Math.min(pagePxHeight, combinedCanvas.height - p * pagePxHeight);
    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = combinedCanvas.width;
    sliceCanvas.height = sliceHeightPx;
    const sctx = sliceCanvas.getContext('2d');

    sctx.drawImage(
      combinedCanvas,
      0,
      p * pagePxHeight,
      combinedCanvas.width,
      sliceHeightPx,
      0,
      0,
      combinedCanvas.width,
      sliceHeightPx
    );

    const imgData = sliceCanvas.toDataURL('image/jpeg', 0.95);
    const sliceMmHeight = sliceHeightPx / pxPerMm;

    if (p > 0) pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, 0, mmWidth, sliceMmHeight, undefined, 'FAST');
  }

  const safeTitle = (data?.general?.tripTitle || 'itinerary').replace(/[^\w\-_. ]+/g, '_');
  const filename = `${safeTitle}_Itinerary_Merged.pdf`;
  pdf.save(filename);
  return true;
};

export default generatePdf;
