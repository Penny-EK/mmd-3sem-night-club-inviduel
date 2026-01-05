// NextJS Components
import Image from "next/image";
// Components
import HeaderNav from "@/app/components/(bjorn)/HeaderNav";
import SectionElem from "@/app/components/(bjorn)/SectionElem";
import SlidingGallery from "@/app/components/(bjorn)/sliding-gallery/SlidingGallery";
import ClubGalleryAnimated from "./components/(meleese)/gallery/ClubGalleryAnimated";
import MusicPlayer from "@/app/components/(bjorn)/music-player/MusicPlayer";
import VideoPlayer from "./components/(meleese)/VideoPlayer";
import WelcomeSectionImages from "./components/(penny)/WelcomeSectionImages";
import RecentBlog from "./components/(penny)/RecentBlog";
import SubscribeReactForm from "./components/(penny)/SubscribeReactForm";
import TestimonialsElem from "@/app/components/(bjorn)/testimonials-elem/TestimonialsElem";
// Asset Imports
import MainBg from "@/app/assets/bg/pattern_bg.jpg";
import IntroImg1 from "@/app/assets/content-img/thumb1.jpg";
import IntroImg2 from "@/app/assets/content-img/reastaurant_1.jpg";
import IntroImg3 from "@/app/assets/content-img/thumb2.jpg";
import SliderBg from "@/app/assets/bg/slider_bg_overlay.png";
import FooterBg from "@/app/assets/bg/footerbg.jpg";
import HeroBanner from "@/app/components/(bjorn)/HeroBanner";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <HeaderNav />
      <main style={{ backgroundImage: `url(${MainBg.src})` }}>
        <SectionElem title="Welcome in nightclub" className="py-28">
          <div className="mt-8 flex gap-8 max-lg:flex-wrap max-lg:justify-center">
            <WelcomeSectionImages header={"nightclub"}>
              <Image
                src={IntroImg1}
                alt="Restaurant Dishes"
                className="h-full w-full"
              />
            </WelcomeSectionImages>
            <WelcomeSectionImages header={"restaurant"}>
              <Image
                src={IntroImg2}
                alt="Restaurant Dishes"
                className="h-full w-full"
              />
            </WelcomeSectionImages>
            <WelcomeSectionImages header={"bar"}>
              <Image
                src={IntroImg3}
                alt="Restaurant Dishes"
                className="h-full w-full"
              />
            </WelcomeSectionImages>
          </div>
        </SectionElem>
        <SectionElem
          title="Events of the month"
          variant="breakout"
          className="bg-cover bg-center py-16 *:col-start-2"
          backgroundImage={SliderBg.src}
        >
          <SlidingGallery />
        </SectionElem>
        <SectionElem
          title="Night club gallery"
          variant="breakout"
          className="my-12 *:first:col-start-2"
        >
          {/* <ClubGallery displayFull={true}/> */}
          <ClubGalleryAnimated />
        </SectionElem>
        <SectionElem title="Night club track" className="my-12 max-lg:place-content-center">
          <MusicPlayer />
        </SectionElem>
        <SectionElem title="Latest Videos">
          <VideoPlayer />
        </SectionElem>
        <SectionElem
          variant="breakout"
          className="my-12 bg-cover bg-center"
          backgroundImage={FooterBg.src}
        >
          <TestimonialsElem />
        </SectionElem>
        <SectionElem title="Recent blog">
          <RecentBlog />
        </SectionElem>
        <SubscribeReactForm />
      </main>
    </>
  );
}
