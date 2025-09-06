"use client";

import { useState } from "react";
// --- IMPORT FIX ---
// Inka address ab sahi kar diya gaya hai.
import ActivityCard from "@/components/Activities/ActivityCard";
import { activityData } from "@/components/Activities/activityData";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ActivitiesPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Event", "Case Study", "Talk", "Site Visit"];

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };

  const filteredData =
    activeFilter === "All"
      ? activityData
      : activityData.filter((item) => item.category === activeFilter);

  return (
    <>
      <Breadcrumb
        pageName="Our Activities"
        description="Explore the diverse range of events, case studies, talks, and site visits organized by Nirmaan, the Civil Engineering Club of IIT Mandi."
      />

      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          {/* Filter Buttons Section */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`rounded-full px-5 py-2 text-base font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-primary text-white"
                    : "bg-gray-2 text-dark hover:bg-primary/20 dark:bg-dark-2 dark:text-white dark:hover:bg-primary/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid of Activity Cards */}
          <div className="-mx-4 flex flex-wrap justify-center">
            {filteredData.length > 0 ? (
              // --- KEY FIX ---
              // Ab hum 'index' (0, 1, 2...) ko as a unique key use kar rahe hain.
              filteredData.map((activity, index) => (
                <div
                  key={index}
                  className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-10"
                >
                  <ActivityCard blog={activity} />
                </div>
              ))
            ) : (
              <div className="w-full py-12 text-center">
                <p className="text-lg text-body-color dark:text-gray-400">
                  No activities found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivitiesPage;

