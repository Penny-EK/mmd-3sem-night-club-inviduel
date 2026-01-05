// react imports
import Image from "next/image";
import React from "react";
// component imports
import BlogPostComments from "@/app/components/(penny)/BlogPostComments";
import patternBg from "@/app/assets/bg/pattern_bg.jpg";
import CommentForm from "@/app/components/(penny)/CommentReactForm";
import HeaderNav from "@/app/components/(bjorn)/HeaderNav";
import SubHeader from "@/app/components/(meleese)/SubHeader";

// blog post page fetches and displays a single blog post based on the id parameter
const BlogPost = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`http://localhost:4000/blogposts/${id}`);
  const post = await response.json();

  // Fetch comments to get count
  const commentsResponse = await fetch(
    `http://localhost:4000/comments?blogpostId=${id}`,
  );
  const comments = await commentsResponse.json();
  // Determine comment count, if comments is an array - otherwise 0
  const commentCount = Array.isArray(comments) ? comments.length : 0;

  return (
    <div>
      <HeaderNav />
      <SubHeader title="blog post" />

      <main
        style={{ backgroundImage: `url(${patternBg.src})` }}
        className="max-md:grid-cols-subgrid"
      >
        <Image
          src={post.asset.url}
          alt={post.title}
          width={1440}
          height={608}
          className="mb-4 grid h-[221px] w-full object-cover max-md:col-start-1 max-md:col-end-4 md:h-[608px]"
        />
        <div className="pl-1">
          <h2 className="mt-4 text-2xl font-medium tracking-[0.48px] uppercase">
            {post.title}
          </h2>
          <p className="text-accent mt-4 font-medium tracking-[0.36px]">
            BY: {post.author} / {commentCount} Comments
          </p>
          <p className="mt-4 text-[16px] leading-6 font-medium tracking-[0.32px] md:text-[18px]">
            {post.content}
          </p>

          {/* display comments and comment form */}
          <BlogPostComments id={id} commentCount={commentCount} />
          <CommentForm id={id} />
        </div>
      </main>
    </div>
  );
};
export default BlogPost;
