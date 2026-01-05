// this component is called by the blog list component to display pagination buttons

"use client";

// Next imports
import { useRouter, useSearchParams } from "next/navigation";

export default function Paginator({ totalPages }) {
  // get current page from search params
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Hide paginator if there's only 1 page
  if (totalPages <= 1) {
    return null;
  }
  // navigate to page on click
  function handleClick(pageNum) {
    router.push(`/blog?page=${pageNum}`);
  }

  return (
    <>
      {/* create an a array based on total pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <li key={pageNum}>
          <button
            // navigate to page on click
            onClick={() => handleClick(pageNum)}
            className={`cursor-pointer ${currentPage === pageNum ? "text-accent font-bold" : ""}`}
          >
            {pageNum}
          </button>
        </li>
      ))}

      {/* Next page button */}
      <li>
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage >= totalPages}
          // disable button if on last page
          className={`cursor-pointer ${currentPage >= totalPages ? "cursor-not-allowed opacity-50" : ""}`}
        >
          Next &gt;
        </button>
      </li>
    </>
  );
}
