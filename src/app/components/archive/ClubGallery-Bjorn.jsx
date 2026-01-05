import DataFetcher from "@/app/components/(bjorn)/DataFetcher";
import Image from "next/image";

function GalleryView({ data, displayFull = false }) {
  return (
    <div className="col-[1/4] mb-12 grid">
      <div className="grid grid-cols-[1.33fr_1fr_1.33fr_1fr] *:h-full *:w-full *:object-cover max-md:grid-cols-1">
        <Image
          src={data[0]?.asset?.url || "/placeholder.webp"}
          alt={data[0]?.description || "Placeholder img of cat"}
          width={970}
          height={560}
          unoptimized
        />
        <Image
          src={data[1]?.asset?.url || "/placeholder.webp"}
          alt={data[1]?.description || "Placeholder img of cat"}
          width={970}
          height={560}
        />
        <Image
          src={data[2]?.asset?.url || "/placeholder.webp"}
          alt={data[2]?.description || "Placeholder img of cat"}
          width={970}
          height={560}
        />
        <Image
          src={data[3]?.asset?.url || "/placeholder.webp"}
          alt={data[3]?.description || "Placeholder img of cat"}
          width={970}
          height={560}
        />
      </div>
      <div className="grid grid-cols-[1.33fr_1.66fr_1.66fr] *:h-full *:w-full *:object-cover max-md:grid-cols-1">
        <Image
          src={data[4]?.asset?.url || "/placeholder.webp"}
          alt={data[4]?.description || "Placeholder img of cat"}
          width={970}
          height={560}
        />
        <Image
          src={data[5]?.asset?.url || "/placeholder.webp"}
          alt={data[5]?.description || "Placeholder img of cat"}
          width={970}
          height={560}
        />
        <Image
          src={data[6]?.asset?.url || "/placeholder.webp"}
          alt={data[6]?.description || "Placeholder img of cat"}
          width={970}
          height={560}
        />
      </div>
      {displayFull && (
        <>
          {/* <div className="grid grid-cols-[1fr_1.33fr_1fr_1.33fr] *:h-full *:w-full *:object-cover max-md:grid-cols-1">
            <Image
              src={data[7]?.asset?.url || "/placeholder.webp"}
              alt={data[7]?.description || "Placeholder img of cat"}
              width={970}
              height={560}
              
            />
            <Image
              src={data[8]?.asset?.url || "/placeholder.webp"}
              alt={data[8]?.description || "Placeholder img of cat"}
              width={970}
              height={560}
              
            />
            <Image
              src={data[9]?.asset?.url || "/placeholder.webp"}
              alt={data[9]?.description || "Placeholder img of cat"}
              width={970}
              height={560}
              
            />
            <Image
              src={data[10]?.asset?.url || "/placeholder.webp"}
              alt={data[10]?.description || "Placeholder img of cat"}
              width={970}
              height={560}
              
            />
          </div> */}
          <div className="grid grid-cols-[1.66fr_1.66fr_1.33fr] *:h-full *:w-full *:object-cover max-md:grid-cols-1">
            <Image
              src={data[11]?.asset?.url || "/placeholder.webp"}
              alt={data[11]?.description || "Placeholder img of cat"}
              width={970}
              height={560}
            />
            <Image
              src={data[12]?.asset?.url || "/placeholder.webp"}
              alt={data[12]?.description || "Placeholder img of cat"}
              width={970}
              height={560}
            />
            <Image
              src={data[13]?.asset?.url || "/placeholder.webp"}
              alt={data[13]?.description || "Placeholder img of cat"}
              width={970}
              height={560}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function ClubGallery({ displayFull = false }) {
  return (
    <DataFetcher endpoint="gallery">
      {(endpointData) => (
        <GalleryView data={endpointData} displayFull={displayFull} />
      )}
    </DataFetcher>
  );
}
