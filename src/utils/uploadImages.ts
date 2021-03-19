export const uploadImages = async (images: any[]) => {
  const newImages = images.filter((img) => !img.url);
  const oldImages = images.filter((img) => img.url);
  if (newImages.length <= 0) return [];
  const imgArr: any[] = [];
  for (const image of images) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Ecommerce");
    const res = await fetch(process.env.CLOUDINARY_UPLOAD_URL!, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    console.log(imgArr);

    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }

  return [...oldImages, ...imgArr];
};
