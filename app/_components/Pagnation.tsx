"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={currentPage === 1}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
