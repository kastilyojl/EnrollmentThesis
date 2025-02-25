import React from "react";
import { router } from "@inertiajs/react";

export default function Pagination({
    links,
    currentPage,
    setCurrentPage,
    totalItems,
    itemsPerPage,
}) {
    const handlePageChange = (url) => {
        const pageParam = new URL(url).searchParams.get("page");
        setCurrentPage(pageParam);
        router.get(url, { preserveState: true });
    };

    const page = Number(currentPage) || 1;
    const itemsPerPageValue = Number(itemsPerPage) || 10;
    const totalItemsValue = Number(totalItems) || 0;

    const startItem = (page - 1) * itemsPerPageValue + 1;
    const endItem = Math.min(page * itemsPerPageValue, totalItemsValue);

    return (
        <nav
            aria-label="Page navigation example"
            className="flex items-center justify-between w-full"
        >
            <span className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold text-gray-900 e">
                    {startItem}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900 e">{endItem}</span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 e">
                    {totalItems}
                </span>{" "}
                records
            </span>

            <ul className="pagination flex">
                {links.map((link) => (
                    <li
                        className={`bg-blue-500 px-2 border-[1px] border-gray-300 ${
                            link.active
                                ? "bg-secondary  text-white"
                                : "bg-white "
                        }`}
                        key={link.label}
                    >
                        <a
                            className="page-link"
                            href={link.url}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(link.url);
                            }}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
