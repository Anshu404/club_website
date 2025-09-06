"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import TeamCard from "@/components/Team/TeamCard";
import { teamData } from "@/components/Team/teamData";

const TeamPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Coordinator", "Faculty Advisor","Senior Advisor",  "Core", "Past Member"];

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };

  const filteredData =
    activeFilter === "All"
      ? teamData
      : teamData.filter((item) => item.category === activeFilter);

  return (
    <>
      <Breadcrumb
        pageName="Our Team"
        description="Meet the dedicated individuals who form the backbone of the Nirmaan Club at IIT Mandi."
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

          {/* Grid of Team Cards */}
          <div className="-mx-4 flex flex-wrap justify-center">
            {filteredData.length > 0 ? (
              filteredData.map((member) => (
                // --- THIS IS THE ONLY LINE I CHANGED ---
                <div
                  key={member.slug}
                  // Cards are now smaller: 4 on laptops (lg) and 5 on desktops (xl)
                  className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/5 mb-10"
                >
                  <TeamCard member={member} />
                </div>
              ))
            ) : (
              <div className="w-full py-12 text-center">
                <p className="text-lg text-body-color dark:text-gray-400">
                  No members found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;
