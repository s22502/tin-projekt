"use client";
import React, { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemsPerPage: number;
  totalItems: number;
}

const Pagination: React.FC<Props> = ({ itemsPerPage, totalItems }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number: number) => {
    setCurrentPage(number);

    router.push(pathname + "?" + createQueryString("page", number.toString()));
  };

  return (
    <nav>
      <ul className="flex items-center justify-center gap-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`hover:cursor-pointer ${
              currentPage === number ? "font-bold text-yellow-700" : ""
            }`}
            onClick={() => handleClick(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
