// this component is called by the blog page to display a list of blog posts with pagination

// import next components
import Link from "next/link";
import Image from "next/image";

// component imports
import Paginator from "./Paginator";
import ReadMore from "@/app/components/(meleese)/buttons/ReadMore";

// Fetch all posts once
const url = "http://localhost:4000/blogposts";
const response = await fetch(url);
let posts = await response.json();
// make sure page is only 3 posts long
const pageSize = 3;
const totalPages = Math.ceil(posts.length / pageSize);
// get paginated posts based on search param page
const BlogList = async ({ searchParams }) => {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ul>
        <FetchPosts page={currentPage} />
      </ul>

      <div className="flex w-full justify-center py-8">
        <ul className="flex w-[120px] justify-around">
          {/* paginator */}
          <Paginator totalPages={totalPages} />
        </ul>
      </div>
    </>
  );
};

const FetchPosts = async ({ page }) => {
  // paginate posts based on page and pageSize
  const paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);

  return Promise.all(
    paginatedPosts.map(async (post, index) => {
      // Fetch comments to get count for each post
      const commentsResponse = await fetch(
        `http://localhost:4000/comments?blogpostId=${post.id}`,
      );
      const comments = await commentsResponse.json();

      const commentCount = Array.isArray(comments) ? comments.length : 0;
      // determine if <li> is even or odd for layout
      const isEven = (index + 1) % 2 === 0;

      return (
        <li key={post.id} className="pb-8 md:pb-0">
          {/* image row that breaks out */}
          <div className="full-bleed bg-background md:grid md:grid-cols-2">
            <Image
              src={post.asset.url}
              alt={post.title}
              width={960}
              height={530}
              className={`h-[221px] w-full object-cover md:h-full md:max-h-[530px] ${
                isEven ? "md:order-2" : ""
              }`}
            />

            {/* text column */}
            <div
              className={`mb-8 px-4 md:px-10 md:pt-12 md:pl-10 ${
                isEven ? "md:order-1" : ""
              }`}
            >
              <h2 className="mt-4 text-2xl font-medium tracking-[0.48px] uppercase">
                {post.title}
              </h2>
              <p className="text-accent mt-4 font-medium tracking-[0.36px]">
                BY: {post.author} / {commentCount} comments
              </p>
              <p className="mt-4 line-clamp-6 overflow-hidden text-[16px] leading-6 font-medium tracking-[0.32px]">
                {post.content}
              </p>

              <div className="flex items-center justify-center pt-6 md:justify-end">
                <Link href={`/blog-post/${post.id}`}>
                  <ReadMore />
                </Link>
              </div>
            </div>
          </div>
        </li>
      );
    }),
  );
};

export default BlogList;
