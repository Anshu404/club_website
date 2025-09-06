import Breadcrumb from "@/components/Common/Breadcrumb";
import Features from "@/components/Features";
import Video from "@/components/Video";
import Brands from "@/components/Brands";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nirmaan | The Civil Engineering Club of IIT Mandi",
  description: "Learn about Nirmaan's mission to foster practical innovation, our hands-on workshops, and our connection to the industry.",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Nirmaan"
        description="We are the official technical club of the Civil Engineering Department at IIT Mandi, dedicated to fostering a culture of practical innovation and taking learning beyond the classroom."
      />
      
      {/* --- These are the sections moved from the homepage --- */}
      <Features />
      <Video />
      <Brands />
    </>
  );
};

export default AboutPage;

