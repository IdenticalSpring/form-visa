import { MouseEvent, useEffect, useState } from "react";
import PageInput from "./page-input";

interface PaginationProps {
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ totalPages, onChange }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (e: MouseEvent<HTMLLIElement>) => {
    setCurrentPage(Number(e.currentTarget.dataset.id));
    onChange(Number(e.currentTarget.dataset.id) - 1);
  };

  const handleInputPage = (page: number) => {
    if (page > totalPages) {
      setCurrentPage(totalPages);
      onChange(totalPages - 1);
      return;
    }

    if (page < 1) {
      setCurrentPage(1);
      onChange(0);
      return;
    }
    setCurrentPage(page);
    onChange(page - 1);
  };

  return (
    <div className=" min-h-[50px] w-full bg-cyan-400/0 select-none">
      <ul className="flex h-full w-full flex-wrap items-center gap-4 text-white justify-end">
        <li
          onClick={handleChangePage}
          data-id={1}
          className={`pagination-active rounded-lg ${
            currentPage === 1
              ? "bg-primary hover:bg-primary/60"
              : "bg-gray-400 hover:bg-gray-300"
          } py-2 px-4 font-secondary  transition-all hover:cursor-pointer `}
        >
          1
        </li>

        {currentPage > 4 && (
          <PageInput setCurrentPage={handleInputPage} totalPages={totalPages} />
        )}

        {[
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ].map((number) => {
          if (number > 1 && number < totalPages)
            return (
              <li
                key={number}
                onClick={handleChangePage}
                data-id={number}
                className={`pagination-active rounded-lg ${
                  number === currentPage
                    ? "bg-primary hover:bg-primary/60"
                    : "bg-gray-400 hover:bg-gray-300"
                } py-2 px-4 font-secondary  transition-all hover:cursor-pointer hover:bg-highlight/25`}
              >
                {number}
              </li>
            );
        })}

        {totalPages - currentPage > 3 && (
          <PageInput setCurrentPage={handleInputPage} totalPages={totalPages} />
        )}
        {totalPages > 1 && (
          <li
            onClick={handleChangePage}
            data-id={totalPages}
            className={`pagination-active rounded-lg ${
              currentPage === totalPages
                ? "bg-primary hover:bg-primary/60"
                : "bg-gray-400 hover:bg-gray-300"
            } py-2 px-4 font-secondary  transition-all hover:cursor-pointer hover:bg-highlight/25`}
          >
            {totalPages}
          </li>
        )}
      </ul>
    </div>
  );
}
