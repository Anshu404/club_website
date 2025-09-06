import JoinUsSectionOne from "@/components/JoinUs/JoinUsSectionOne";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import JoinUsSectionTwo from "@/components/JoinUs/JoinUsSectionTwo";
import TeamPreview from "@/components/Team/TeamPreview";

// --- STEP 1: IMPORT THE NEW ACTIVITY PREVIEW COMPONENT ---
import ActivityPreview from "@/components/Activities/ActivityPreview";


export const metadata: Metadata = {
  title: "Nirmaan | The Civil Engineering Club of IIT Mandi",
  description: "Official website for Nirmaan, the Civil Engineering student club at IIT Mandi.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <TeamPreview />
      <ActivityPreview />
      <JoinUsSectionOne />
      {/* <JoinUsSectionTwo /> */}
      <Testimonials />
      
      {/* --- STEP 2: PLACE THE NEW COMPONENT HERE --- */}
      
      {/* <Pricing /> */}
      <Contact />
    </>
  );
}
