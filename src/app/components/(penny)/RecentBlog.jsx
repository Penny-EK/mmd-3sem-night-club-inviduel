// this component is called by the homepage to display the 3 most recent blog posts

// next components
import Link from "next/link";
import Image from "next/image";

// react imports
import { Suspense } from "react";

// other imports
import ImageHover from "@/app/components/(bjorn)/ImageHover";

const RecentBlog = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="md:grid md:grid-cols-3 md:gap-8">
        <FetchPosts />
      </div>
    </Suspense>
  );
};

// fetches blog posts
const FetchPosts = async () => {
  const url = "http://localhost:4000/blogposts";
  const response = await fetch(url);
  const posts = await response.json();
  const postsList = posts.slice(0, 3); // Get only the 3 most recent posts

  // map through posts and return article for each post
  return Promise.all(
    postsList.map(async (post) => {
      // Fetch comments to get count for each post
      const commentsResponse = await fetch(
        `http://localhost:4000/comments?blogpostId=${post.id}`,
      );
      const comments = await commentsResponse.json();
      // if comments is an array, get its length, otherwise set to 0
      const commentCount = Array.isArray(comments) ? comments.length : 0;

      // render article
      return (
        <article key={post.id} className="grid max-md:mb-12 md:mb-0">
          <Link href={`/blog-post/${post.id}`}>
            <ImageHover
              imgSrc={post.asset.url}
              imgAlt={post.title}
              imgWidth={459}
              imgHeight={240}
              imgClass="mb-4 h-[221px] w-full object-cover md:mb-0 md:max-h-60"
              topChildren={
                <p
                  href="#"
                  className="tracking-2pct bg-accent cursor-pointer rounded-sm px-6 py-3 font-medium capitalize self-end translate-y-1/2"
                >
                  Go to Post
                </p>
              }
            />

            <div className="md:pt-12">
              <h2 className="mt-4 text-2xl font-medium tracking-[0.48px] uppercase">
                {/* if post.title is longer than 16 then crop it and add "..." in the end */}
                {post.title.length > 16
                  ? post.title.substring(0, 16) + "..."
                  : post.title}
              </h2>
              <p className="text-accent mt-4 font-medium tracking-[0.36px] uppercase">
                BY: {post.author} / {commentCount} comments
              </p>
              <p className="mt-4 line-clamp-3 overflow-hidden text-[16px] leading-6 font-medium tracking-[0.32px]">
                {post.content}
              </p>
            </div>
          </Link>
        </article>
      );
    }),
  );
};

export default RecentBlog;
