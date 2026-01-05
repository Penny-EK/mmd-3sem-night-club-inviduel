import Image from "next/image";
import CornerElem from "./CornerElem";

/*

Sample use case:

<ImageHover
  imgSrc={item?.asset?.url}
  imgAlt={item?.title}
  imgWidth={570}
  imgHeight={403}
  topChildren={
    <Link
      href="#"
      className="tracking-2pct bg-accent cursor-pointer rounded-sm px-6 py-3 font-medium capitalize"
    >
      Book now
    </Link>
  }
  bottomChildren={
    <>
      <span className="tracking-2pct place-self-start text-lg font-medium capitalize">
        {item?.title}
      </span>
      <span className="tracking-2pct mt-2 text-base font-light">
        {item.description.split(".").slice(0, 4).join(". ") + "."}
      </span>
    </>
  }
  topCSS={"hoverToBottom"}
  bottomCSS={"hoverToTop"}
/>;

*/



export default function ImageHover({
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
  imgClass,
  topChildren,
  bottomChildren,
  topCSS,
  bottomCSS
}) {
  return (
    <div className="hoverContainer group">
      <Image
        src={imgSrc || "/placeholder.webp"}
        alt={imgAlt || "Placeholder img of cat"}
        width={imgWidth || 570}
        height={imgHeight || 403}
        className={`${imgClass}`}
      />
      <div className="group">
        <div className={`hoverChild absolute top-0 bottom-1/2 left-0 grid w-full place-items-center ${topCSS}`}>
          <CornerElem topLeft={true} className="w-15" />
          {topChildren}
        </div>
        <div className={`hoverChild absolute top-1/2 bottom-0 left-0 grid w-full place-items-center ${bottomCSS}`}>
          {bottomChildren && (
            <div className="bg-background py-2 px-4 grid place-items-center self-end justify-self-stretch">
              {bottomChildren}
            </div>
          )}
          <CornerElem bottomRight={true} className="w-15" />
        </div>
      </div>
    </div>
  );
}
