// NextJS Components
import Image from "next/image";
// Asset Imports
import FooterBg from "@/app/assets/bg/footerbg.jpg";
import Logo from "@/app/assets/Logo.png";
import Link from "next/link";
// React-Icons Imports
import { LuTwitter } from "react-icons/lu";
import { LuFacebook } from "react-icons/lu";
import { IoLogoSnapchat } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";

const FooterBox = () => {
  return (
    <footer
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${FooterBg.src})` }}
    >
      <div className="bg-background-alpha grid grid-cols-(--grid-col-desktop) gap-y-40 px-6 pt-20 pb-14 max-lg:place-items-center max-lg:gap-y-14 max-md:grid-cols-(--grid-col-mobile)">
        <div className="col-start-2 grid grid-cols-3 max-lg:block">
          <div className="max-lg:grid max-lg:place-items-center max-lg:text-center">
            <Image src={Logo} alt="Company logo" className="object-cover" />
            <address className="mt-14 not-italic">
              <div>
                <span className="text-accent tracking-2pct text-2xl font-medium uppercase">
                  Location
                </span>
                <p className="tracking-2pct mt-3 text-lg leading-8">
                  Kompagnistræde 278
                  <br />
                  1265 Købehavn K
                </p>
              </div>
              <div className="mt-8">
                <span className="text-accent tracking-2pct text-2xl font-medium uppercase">
                  Opening Hours
                </span>
                <p className="tracking-2pct mt-3 text-lg leading-8 uppercase">
                  Wed - Thu 10:30 PM to 3 AM
                  <br />
                  Sat - Sun: 11 PM to 5 AM
                </p>
              </div>
            </address>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid gap-x-8 max-lg:hidden">
            <div className="row-span-3 grid grid-rows-subgrid">
              <span className="tracking-2pct text-accent text-2xl font-medium uppercase">
                Recent posts
              </span>
              <FetchPosts />
            </div>
            <div className="row-span-3 grid grid-rows-subgrid">
              <span className="tracking-2pct text-accent text-2xl font-medium uppercase">
                Recent tweets
              </span>
              <div className="mt-12 flex gap-x-6">
                <LuTwitter className="text-accent fill-accent h-6 w-6 shrink-0" />
                <div>
                  <p className="tracking-2pct text-lg font-medium">
                    It is a long established fact that a reader will be
                    distracted by the readable...
                  </p>
                  <span className="text-accent tracking-2pct mt-3 block text-base font-medium">
                    5 hours ago
                  </span>
                </div>
              </div>
              <div className="mt-20 flex gap-x-6">
                <LuTwitter className="text-accent fill-accent h-6 w-6 shrink-0" />
                <div>
                  <p className="tracking-2pct text-lg font-medium">
                    It is a long established fact that a reader will be
                    distracted by the readable...
                  </p>
                  <span className="text-accent tracking-2pct mt-3 block text-base font-medium">
                    5 hours ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-2 row-start-2 grid grid-cols-[1fr_auto_1fr] place-items-center max-lg:grid-flow-row max-lg:grid-cols-none max-lg:text-center">
          <p className="tracking-2pct justify-self-start text-lg font-medium max-lg:order-2 max-lg:mt-14 max-lg:max-w-[22ch] max-lg:justify-self-auto max-lg:leading-8">
            Night Club PSD Template <span className="max-lg:hidden">-</span> All
            Rights Reserved
          </p>
          <div className="grid grid-flow-row gap-y-4 max-lg:order-1">
            <p className="tracking-2pct text-lg font-medium">
              Stay Connected With Us{" "}
            </p>
            <ul className="flex gap-x-6 max-lg:justify-between max-lg:gap-x-0">
              <li>
                <a href="https://facebook.com" target="_blank" className="outline-foreground grid aspect-square w-12 place-content-center outline-2 outline-solid">
                  <LuFacebook className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a href="https://snapchat.com" target="_blank" className="outline-foreground grid aspect-square w-12 place-content-center outline-2 outline-solid">
                  <IoLogoSnapchat className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" className="outline-foreground grid aspect-square w-12 place-content-center outline-2 outline-solid">
                  <LuInstagram className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>
          <p className="tracking-2pct justify-self-end text-lg font-medium max-lg:order-3 max-lg:mt-6 max-lg:justify-self-auto">
            Copyright © NightClub
          </p>
        </div>
      </div>
    </footer>
  );
};

const FetchPosts = async () => {
  const url = "http://localhost:4000/blogposts";
  const response = await fetch(url);
  const posts = await response.json();

  return posts.slice(0, 2).map((post, index) => {
    return (
      <Link key={post.id} href={`/blog-post/${post.id}`}>
        <div className={`flex gap-x-6 ${index === 0 ? "mt-12" : "mt-20"}`}>
          <Image
            src={post.asset.url}
            alt="Recent Post"
            className="h-[120px] w-[120px] shrink-0 object-cover"
            width={120}
            height={120}
          />
          <div>
            <p className="tracking-2pct text-lg font-medium">
              {post.content.substring(0, 50)}...
            </p>
            <span className="text-accent tracking-2pct mt-3 block text-base font-medium">
              April 17, 2018
            </span>
          </div>
        </div>
      </Link>
    );
  });
};

export default FooterBox;
