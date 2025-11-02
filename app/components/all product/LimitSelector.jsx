"use client";

import { useRouter } from "next/navigation";

export function LimitSelector({ currentLimit = "20" }) {
  const router = useRouter();

  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    // Update the URL with the new limit parameter
    router.push(`/allproducts?limit=${newLimit}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="limit-select" className="text-sm text-gray-600">
        Show:
      </label>
      <select
        id="limit-select"
        value={currentLimit}
        onChange={handleLimitChange}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      <span className="text-sm text-gray-600">per page</span>
    </div>
  );
}
