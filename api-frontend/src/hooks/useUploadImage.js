export async function useUploadImage(files) {
  files = Array.from(files);
  const Api = process.env.REACT_APP_API_URL;
  if (!Api) return null;

  // Do fetch + parse JSON in a single step
  const allImageUrls = await Promise.all(
    files.map((file) => {
      const formData = new FormData();
      formData.append("image", file);
      return fetch(`${Api}/upload-image`, {
        method: "POST",
        body: formData,
      }).then((res) => res.json()); // ✅ directly return parsed JSON
    })
  );
  return allImageUrls;
}
