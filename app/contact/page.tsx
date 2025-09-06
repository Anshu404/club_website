import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Nirmaan Club",
  description: "Get in touch with the Nirmaan team at IIT Mandi. We're here to answer your questions about events, projects, or membership.",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="We're always excited to connect with students, faculty, and potential partners. Reach out with any questions you may have."
      />

      <Contact />
    </>
  );
};

export default ContactPage;

