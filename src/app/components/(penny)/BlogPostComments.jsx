//this component is called on the blog post page (singleview) to fetch and display comments for a specific blog post

// react imports
import { Suspense } from "react";

const BlogPostComments = ({ id, commentCount }) => {
  return (
    <>
      <h2 className="mt-[89px] mb-11 pl-3 text-[32px] font-bold uppercase">
        {/* change comment header based on how many comments there is */}
        {commentCount} comment{commentCount !== 1 ? "s" : ""}
      </h2>
      {/* suspense for loading state */}
      <Suspense fallback={<div>Loading comments...</div>}>
        <ul>
          {/* makes sure its only the comments from the right id that gets fetched */}
          <FetchComments id={id} />
        </ul>
      </Suspense>
    </>
  );
};

const FetchComments = async ({ id }) => {
  const url = `http://localhost:4000/comments?blogpostId=${id}`;
  // disable caching to always get latest comments
  const response = await fetch(url, { cache: "no-store" });
  const comments = await response.json();

  // if no comments, show message
  if (!Array.isArray(comments) || comments.length === 0) {
    return <div>No comments yet</div>;
  }

  // format date to dd mm yyyy
  return comments.map((post) => {
    const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return (
      // each comment
      <li key={post.id} className="mb-[48px] pb-8">
        <h3 className="mb-6 text-[18px] font-medium tracking-[0.36px]">
          {post.name} -
          <span className="text-accent text-[16px] tracking-[0.32px]">
            {" "}
            {formattedDate}
          </span>
        </h3>
        <p className="text-[16px] font-medium tracking-[0.32px]">
          {post.content}
        </p>
      </li>
    );
  });
};

export default BlogPostComments;
