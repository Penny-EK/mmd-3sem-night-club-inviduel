//this component is called on the blog post page (singleview) to fetch and display comments for a specific blog post

// react imports
import { Suspense } from "react";
import ConfirmationPopUp from "./ConfirmationPopUp";

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
          <div id="comments">
            <FetchComments id={id} />
          </div>
        </ul>
      </Suspense>
    </>
  );
};

const FetchComments = async ({ id }) => {
  const url = `http://localhost:4000/comments?blogpostId=${id}`;
  // disable caching to always get latest comments
  const response = await fetch(url);
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
        <div className="mb-6 flex items-center gap-2">
          <h3 className="text-[18px] font-medium tracking-[0.36px]">
            {post.name} -
            <span className="text-accent text-[16px] tracking-[0.32px]">
              {" "}
              {formattedDate}
            </span>
          </h3>
          <ConfirmationPopUp id={post.id} email={post.email} />
        </div>
        <p className="text-[16px] font-medium tracking-[0.32px]">
          {post.content}
        </p>
      </li>
    );
  });
};

export default BlogPostComments;
