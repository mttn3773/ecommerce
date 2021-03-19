export const validateImages = (files: File[], images: File[]) => {
  const newImages: File[] = [];
  let err = "";
  let num = 0;
  if (files.length === 0) {
    err = "Files don't exist ";
  }
  files.forEach((file) => {
    if (file.size > 1024 * 1024) {
      return (err = "The largest size is 1mb ");
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png")
      return (err = "Image format is incorrect.");

    num += 1;
    if (num <= 5) newImages.push(file);
    return newImages;
  });

  const imgCount = images.length;
  if (imgCount + newImages.length > 5) err = "Select up to 5 images";
  return { error: err, newImages };
};
