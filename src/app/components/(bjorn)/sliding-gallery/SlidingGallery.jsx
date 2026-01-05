import DataFetcher from "@/app/components/(bjorn)/DataFetcher";

import GalleryContent from "./GalleryContent";

export default function SlidingGallery() {
  return (
    <DataFetcher endpoint="events">
      {(data) => <GalleryContent data={data} />}
    </DataFetcher>
  );
}
