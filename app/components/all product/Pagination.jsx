"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ currentPage, totalPages, totalProducts, limit }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-gray-200">
      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * parseInt(limit) + 1} to{" "}
        {Math.min(currentPage * parseInt(limit), totalProducts)} of{" "}
        {totalProducts} results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <Link
          href={createPageURL(currentPage - 1)}
          className={`flex items-center px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-purple-600"
          }`}
          aria-disabled={currentPage === 1}
          tabIndex={currentPage === 1 ? -1 : undefined}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Link>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers[0] > 1 && (
            <>
              <Link
                href={createPageURL(1)}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:text-purple-600 transition-colors"
              >
                1
              </Link>
              {pageNumbers[0] > 2 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </>
          )}
          
          {pageNumbers.map((page) => (
            <Link
              key={page}
              href={createPageURL(page)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-purple-600"
              }`}
            >
              {page}
            </Link>
          ))}
          
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <Link
                href={createPageURL(totalPages)}
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:text-purple-600 transition-colors"
              >
                {totalPages}
              </Link>
            </>
          )}
        </div>

        {/* Next button */}
        <Link
          href={createPageURL(currentPage + 1)}
          className={`flex items-center px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-purple-600"
          }`}
          aria-disabled={currentPage === totalPages}
          tabIndex={currentPage === totalPages ? -1 : undefined}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}