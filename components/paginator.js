import { useCallback } from "react";
import { useRouter } from "next/router";
import ChevronLIcon from "./icons/chevron-left";
import ChevronRIcon from "./icons/chevron-right";
import ChevronLLIcon from "./icons/chevron-double-left";
import ChevronRRIcon from "./icons/chevron-double-right";
import DotsIcon from "./icons/horizontal-dots";
import { useToggle } from "../lib/hooks/useToggle";
import { joinClasses } from "../lib/utils";

export function MobileButton({ children, ...rest }) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md bg-primary-600 px-4 py-3 text-sm text-white hover:bg-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600"
      {...rest}
    >
      {children}
    </button>
  );
}

export function PageButton({ children, ...rest }) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md px-4 py-2 text-base font-medium text-primary-600 hover:bg-gray-100 hover:text-primary-500 dark:hover:bg-neutral-800"
      {...rest}
    >
      {children}
    </button>
  );
}

export function PageIconButton({ children, ...rest }) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md px-2 py-2 text-base font-medium text-primary-600 hover:bg-gray-100 hover:text-primary-500 dark:hover:bg-neutral-800"
      {...rest}
    >
      {children}
    </button>
  );
}

export default function Paginator({ basePath, currentPage, totalPages }) {
  const [backHovered, , setBackHovered] = useToggle(false);
  const [forwardHovered, , setForwardHovered] = useToggle(false);
  const router = useRouter();

  const goToPage = useCallback(
    (page) => {
      router.push(`${basePath}/${page}`);
    },
    [router, basePath],
  );

  return (
    <div className="flex items-center justify-between py-3">
      <div
        className={joinClasses(
          currentPage > 1 ? "justify-between" : "justify-end",
          "flex flex-auto sm:hidden",
        )}
      >
        {currentPage > 1 && (
          <MobileButton onClick={() => goToPage(currentPage - 1)}>
            <ChevronLIcon />
          </MobileButton>
        )}
        {currentPage < totalPages && (
          <MobileButton onClick={() => goToPage(currentPage + 1)}>
            <ChevronRIcon />
          </MobileButton>
        )}
      </div>
      <div className="hidden items-center justify-center sm:flex sm:flex-1">
        <nav className="inline-flex space-x-1" aria-label="Pagination">
          {currentPage > 1 && (
            <>
              <PageIconButton onClick={() => goToPage(currentPage - 1)}>
                <span className="sr-only">Previous</span>
                <ChevronLIcon />
              </PageIconButton>
              <PageButton onClick={() => goToPage(1)}>1</PageButton>
            </>
          )}
          {currentPage === 5 && (
            <PageButton onClick={() => goToPage(2)}>2</PageButton>
          )}
          {currentPage > 5 && (
            <PageButton
              onClick={() => goToPage(currentPage - 5)}
              onMouseEnter={() => setBackHovered(true)}
              onMouseLeave={() => setBackHovered(false)}
            >
              <span className="sr-only">Back 5</span>
              {backHovered ? <ChevronLLIcon /> : <DotsIcon />}
            </PageButton>
          )}
          {currentPage >= 4 && (
            <PageButton onClick={() => goToPage(currentPage - 2)}>
              {currentPage - 2}
            </PageButton>
          )}
          {currentPage >= 3 && (
            <PageButton onClick={() => goToPage(currentPage - 1)}>
              {currentPage - 1}
            </PageButton>
          )}
          <span
            aria-current="page"
            className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-base font-medium text-gray-200"
          >
            {currentPage}
          </span>
          {totalPages - 2 >= currentPage && (
            <PageButton onClick={() => goToPage(currentPage + 1)}>
              {currentPage + 1}
            </PageButton>
          )}
          {totalPages - 3 >= currentPage && (
            <PageButton onClick={() => goToPage(currentPage + 2)}>
              {currentPage + 2}
            </PageButton>
          )}
          {totalPages - 4 > currentPage && (
            <PageButton
              onClick={() => goToPage(currentPage + 5)}
              onMouseEnter={() => setForwardHovered(true)}
              onMouseLeave={() => setForwardHovered(false)}
            >
              <span className="sr-only">Forward 5</span>
              {forwardHovered ? <ChevronRRIcon /> : <DotsIcon />}
            </PageButton>
          )}
          {totalPages - 4 == currentPage && (
            <PageButton onClick={() => goToPage(totalPages - 1)}>
              {totalPages - 1}
            </PageButton>
          )}
          {totalPages - 1 >= currentPage && (
            <>
              <PageButton onClick={() => goToPage(totalPages)}>
                {totalPages}
              </PageButton>
              <PageIconButton onClick={() => goToPage(currentPage + 1)}>
                <span className="sr-only">Next</span>
                <ChevronRIcon />
              </PageIconButton>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
