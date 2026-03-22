const MAX_SIZE = 200; // px — resize images to save DB space

/**
 * Read an image File, resize it to a square thumbnail, and return a
 * base64 data-URL string that can be stored directly in the Realtime Database.
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Not an image file"));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = MAX_SIZE;
        canvas.height = MAX_SIZE;
        const ctx = canvas.getContext("2d")!;

        // Center-crop to square
        const min = Math.min(img.width, img.height);
        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;
        ctx.drawImage(img, sx, sy, min, min, 0, 0, MAX_SIZE, MAX_SIZE);

        resolve(canvas.toDataURL("image/webp", 0.8));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Read an image File, resize it to fit within maxW×maxH (keeping aspect ratio),
 * and return a base64 data-URL. Good for banners / cards.
 */
export function fileToBannerDataUrl(
  file: File,
  maxW = 800,
  maxH = 450,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Not an image file"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxW) { h = Math.round(h * (maxW / w)); w = maxW; }
        if (h > maxH) { w = Math.round(w * (maxH / h)); h = maxH; }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/webp", 0.75));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
