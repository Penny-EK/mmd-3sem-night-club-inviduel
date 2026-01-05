import GalleryClient from "./GalleryClient";

export default async function ClubGallery({ displayFull = false }) {
  const res = await fetch("http://localhost:4000/gallery", 
    );

  if (!res.ok) {
 
    throw new Error("Gallery not found");
  }

  const data = await res.json();

  return <GalleryClient data={data} />;
}
