import JoinUsSectionOne from "@/components/JoinUs/JoinUsSectionOne";
import JoinUsSectionTwo from "@/components/JoinUs/JoinUsSectionTwo"; // Corrected import name
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

// --- METADATA AND TITLE UPDATE ---
export const metadata: Metadata = {
  title: "Join Us | Nirmaan - The Civil Engineering Club of IIT Mandi",
  description: "Become a member of Nirmaan. Explore the benefits of joining and apply to be a part of our innovative community.",
};

// --- COMPONENT NAME UPDATE ---
const JoinUsPage = () => {
  return (
    <>
      {/* --- BREADCRUMB UPDATE --- */}
      <Breadcrumb
        pageName="Join Our Team"
        description="We are always looking for passionate and driven students to join our community. Discover the perks of being a Nirmaan member and apply below."
      />
      
      {/* --- Corrected component names are now used --- */}
      <JoinUsSectionOne />
      <JoinUsSectionTwo />
    </>
  );
};

export default JoinUsPage;