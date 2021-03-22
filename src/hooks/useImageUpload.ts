import { useEffect, useState } from "react";
export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progressIndicator, setProgressIndicator] = useState<
    [number, number] | null
  >(null);

  const upload = async (images: any[]) => {
    try {
      setIsUploading(true);
      const newImages = images.filter((img) => !img.url);
      const oldImages = images.filter((img) => img.url);
      setProgressIndicator([0, newImages.length]);
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
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
        setProgressIndicator((prev) => prev && [prev[0] + 1, prev[1]]);
      }
      setIsUploading(false);
      return [...oldImages, ...imgArr];
    } catch (error) {
      setProgressIndicator(null);
      setIsUploading(false);
      return [];
    }
  };
  useEffect(() => {
    if (isUploading) return;
    setProgressIndicator(null);
  }, [isUploading]);
  return { upload, isUploading, progressIndicator };
};
