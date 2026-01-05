// this component is used in the WelcomeSection on the homepage

// component imports
import CornerElem from "../(bjorn)/CornerElem";
import LogoGuy from "@/app/assets/icon/logoGuy.svg";

// icon imports
import { LuMartini } from "react-icons/lu";
import { PiBowlFood } from "react-icons/pi";

// next imports
import Image from "next/image";


// recieves header, text and children as props
const WelcomeSectionImages = ({ header, text, children, variant }) => {
  const renderIcon = () => {
    // makes sure header is lowercase for easier comparison
    const headerLower = header?.toLowerCase();
    // return icon based on header prop
    if (headerLower === "restaurant") {
      return <PiBowlFood className="text-accent" size={40} />;
    } else if (headerLower === "bar") {
      return <LuMartini className="text-accent" size={40} />;
    } else {
      return <Image src={LogoGuy} alt="Logo Guy Icon" width={40} />;
    }
  };

  return (
    <>
      <div className="group grid grid-cols-1 grid-rows-1">
        <div className="-col-start-1 row-start-1">{children}</div>
        {/* hover content */}
        <div className="group-hover:border-accent pointer-events-none relative -col-start-1 row-start-1 max-w-sm bg-black p-6 text-white opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:border-t group-hover:border-b group-hover:opacity-100">
          <CornerElem topLeft={true} className="w-11" />
          <div className="align-center flex h-full flex-col justify-center">
            <div className="border-accent mx-auto mb-4 flex aspect-square w-24 items-center justify-center rounded-2xl border-2 p-4">
              {renderIcon()}
            </div>

            <h3 className="text-accent mt-4 translate-x-8 text-center text-2xl font-medium tracking-[0.48px] uppercase opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100">
              {header || "facilities"}
            </h3>
            {/* uses placeholder text if "text" prop is empty */}
            <p className="mt-4 translate-x-8 text-center font-medium tracking-[0.36px] opacity-0 transition-all delay-150 duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-100">
              {text ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet rem enim commodi consequatur ducimus quaerat molestiae quisquam vitae placeat distinctio illum magnam unde odio sequi eius, nemo alias "}
            </p>
          </div>
          <CornerElem
            bottomRight={true}
            className="absolute right-0 bottom-0 w-11"
          />
        </div>
      </div>
    </>
  );
};

export default WelcomeSectionImages;
