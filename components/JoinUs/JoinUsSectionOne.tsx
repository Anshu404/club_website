"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useTheme } from "next-themes";

// --- Inlined SectionTitle Component to resolve import error ---
const SectionTitle = ({
  title,
  paragraph,
  mb = "44px",
}: {
  title: string;
  paragraph: string;
  mb?: string;
}) => {
  return (
    <div
      className={`wow fadeInUp w-full mx-auto`}
      data-wow-delay=".1s"
      style={{ marginBottom: mb }}
    >
      <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
        {title}
      </h2>
      <p className="text-base !leading-relaxed text-body-color md:text-lg dark:text-gray-300">
        {paragraph}
      </p>
    </div>
  );
};


// SVG icon for list items
const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const positions = ["President", "Core Member", "Designer", "Developer", "Event Coordinator"];

// --- Custom Dropdown Component ---
const CustomDropdown = ({ selectedValue, setSelectedValue }: { selectedValue: string, setSelectedValue: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4" ref={dropdownRef}>
      <label htmlFor="position" className="mb-2 block text-sm font-medium text-dark dark:text-white">
        Position you want to apply for
      </label>
      <input type="hidden" name="position" value={selectedValue === "Select your desired position" ? "" : selectedValue} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-md border border-stroke bg-gray-2 px-4 py-3 text-left text-dark focus:border-primary focus:outline-none dark:border-dark-3 dark:bg-dark dark:text-white flex justify-between items-center"
      >
        <span className={selectedValue === "Select your desired position" ? "text-body-color/70 dark:text-gray-400" : ""}>
          {selectedValue}
        </span>
        <span className="h-2 w-2 rotate-45 border-r-2 border-b-2 border-dark dark:border-white"></span>
      </button>
      {isOpen && (
        <div className="absolute top-full z-20 mt-1 w-full rounded-md border border-stroke bg-white py-1 shadow-lg dark:border-dark-3 dark:bg-dark">
          {positions.map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => handleSelect(position)}
              className="block w-full px-4 py-2 text-left text-sm text-dark hover:bg-gray-100 dark:text-white dark:hover:bg-dark-2"
            >
              {position}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const skillsList = [
  "CAD / AutoCAD", "Structural Design", "Project Management", "Surveying",
  "Civil Engineering Software", "Team Collaboration", "Event Management", "Programming / Web Dev"
];

// --- Skills Selector Component ---
const SkillsSelector = ({ selectedSkills, setSelectedSkills }: { selectedSkills: string[], setSelectedSkills: (skills: string[]) => void }) => {
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((s) => s !== skill)
        : [...selectedSkills, skill]
    );
  };

  return (
    <div className="mb-6">
      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
        Relevant Skills for Nirmaan
      </label>
      <div className="flex flex-wrap gap-3">
        {skillsList.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => handleSkillToggle(skill)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              selectedSkills.includes(skill)
                ? "bg-primary text-white"
                // eslint-disable-next-line max-len
                : "bg-gray-2 text-gray-800 hover:bg-gray-3 dark:bg-dark-2 dark:text-gray-300 dark:hover:bg-dark-3"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
      <input type="hidden" name="skills" value={selectedSkills.join(', ')} />
    </div>
  );
};

// --- Main Component Starts Here ---
const JoinUsSectionOne = () => {
  const { theme } = useTheme();
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [selectedPosition, setSelectedPosition] = useState("Select your desired position");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const List = ({ text }: { text: string }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color dark:text-gray-300">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus('submitting');
    setTimeout(() => {
      setSubmissionStatus('success');
    }, 2000);
  };
  
  const getButtonText = () => {
    switch (submissionStatus) {
      case 'submitting': return 'Submitting...';
      case 'success': return 'Application Sent!';
      case 'error': return 'Submission Failed - Try Again';
      default: return 'Submit Application';
    }
  };
  
  // Reusable input class string for consistency
  const inputClasses = "w-full rounded-md border border-stroke bg-gray-2 px-4 py-3 text-dark placeholder-body-color/70 focus:border-primary focus:outline-none dark:border-dark-3 dark:bg-dark dark:text-white dark:placeholder-gray-500";

  return (
    <section id="join-us" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          {/* --- LAYOUT FIX --- 
              Changed "items-center" to "items-start" to align both columns to the top. 
          */}
          <div className="-mx-4 flex flex-wrap items-start">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Why Join Nirmaan?"
                paragraph="We are more than just a club; we are a community dedicated to exploring the vast potential of civil engineering. Our goal is to provide a platform for students to innovate, learn practical skills, and connect with the industry."
                mb="44px"
              />

              <div className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0" data-wow-delay=".15s">
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <List text="Project-Based Learning" />
                    <List text="Industry Connections" />
                    <List text="Technical Skill Development" />
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <List text="Collaborative Environment" />
                    <List text="Career Advancement" />
                    <List text="IIT Mandi's Official CE Club" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="wow fadeInUp relative mx-auto" data-wow-delay=".2s">
                <div
                  className={`rounded-xl ${
                    theme === "dark" ? "bg-dark shadow-lg" : "bg-white shadow-lg"
                  } p-8 sm:p-10`}
                >
                  <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                    Become a Member
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-dark dark:text-white">Full Name</label>
                      <input required type="text" name="name" placeholder="Enter your full name" className={inputClasses}/>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="roll" className="mb-2 block text-sm font-medium text-dark dark:text-white">Roll Number</label>
                      <input required type="text" name="roll" placeholder="e.g., B22001" className={inputClasses}/>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-dark dark:text-white">Student Email ID</label>
                      <input required type="email" name="email" placeholder="your_id@iitmandi.ac.in" className={inputClasses}/>
                    </div>
                    
                    <CustomDropdown selectedValue={selectedPosition} setSelectedValue={setSelectedPosition} />

                    <SkillsSelector selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />

                    <div className="mb-6">
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-dark dark:text-white">Why do you want to join Nirmaan?</label>
                      <textarea required name="message" rows={3} placeholder="Tell us about your interests..." className={inputClasses}></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={submissionStatus === 'submitting' || submissionStatus === 'success'}
                        className={`w-full rounded-md px-6 py-3 text-base font-medium text-white shadow-md transition-all duration-300 ${
                          submissionStatus === 'success' ? 'bg-green-500 cursor-not-allowed' :
                          submissionStatus === 'error' ? 'bg-red-500' :
                          submissionStatus === 'submitting' ? 'bg-primary/80 cursor-wait' :
                          'bg-primary hover:bg-primary/80'
                        }`}
                      >
                        {getButtonText()}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSectionOne;




// "use client";

// import { useState, useRef, useEffect, FormEvent } from "react";
// import { useTheme } from "next-themes";

// // --- Inlined SectionTitle Component to resolve import error ---
// const SectionTitle = ({
//   title,
//   paragraph,
//   mb = "44px",
// }: {
//   title: string;
//   paragraph: string;
//   mb?: string;
// }) => {
//   return (
//     <div
//       className={`wow fadeInUp w-full mx-auto`}
//       data-wow-delay=".1s"
//       style={{ marginBottom: mb }}
//     >
//       <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
//         {title}
//       </h2>
//       <p className="text-base !leading-relaxed text-body-color md:text-lg dark:text-gray-300">
//         {paragraph}
//       </p>
//     </div>
//   );
// };


// // SVG icon for list items
// const checkIcon = (
//   <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
//     <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
//   </svg>
// );

// const positions = ["President", "Core Member", "Designer", "Developer", "Event Coordinator"];

// // --- Custom Dropdown Component ---
// const CustomDropdown = ({ selectedValue, setSelectedValue }: { selectedValue: string, setSelectedValue: (value: string) => void }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (value: string) => {
//     setSelectedValue(value);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative mb-4" ref={dropdownRef}>
//       <label htmlFor="position" className="mb-2 block text-sm font-medium text-dark dark:text-white">
//         Position you want to apply for
//       </label>
//       <input type="hidden" name="position" value={selectedValue === "Select your desired position" ? "" : selectedValue} />
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full rounded-md border border-stroke bg-gray-2 px-4 py-3 text-left text-dark focus:border-primary focus:outline-none dark:border-dark-3 dark:bg-dark dark:text-white flex justify-between items-center"
//       >
//         <span className={selectedValue === "Select your desired position" ? "text-body-color/70 dark:text-gray-400" : ""}>
//           {selectedValue}
//         </span>
//         <span className="h-2 w-2 rotate-45 border-r-2 border-b-2 border-dark dark:border-white"></span>
//       </button>
//       {isOpen && (
//         <div className="absolute top-full z-20 mt-1 w-full rounded-md border border-stroke bg-white py-1 shadow-lg dark:border-dark-3 dark:bg-dark">
//           {positions.map((position) => (
//             <button
//               key={position}
//               type="button"
//               onClick={() => handleSelect(position)}
//               className="block w-full px-4 py-2 text-left text-sm text-dark hover:bg-gray-100 dark:text-white dark:hover:bg-dark-2"
//             >
//               {position}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const skillsList = [
//   "CAD / AutoCAD", "Structural Design", "Project Management", "Surveying",
//   "Civil Engineering Software", "Team Collaboration", "Event Management", "Programming / Web Dev"
// ];

// // --- Skills Selector Component ---
// const SkillsSelector = ({ selectedSkills, setSelectedSkills }: { selectedSkills: string[], setSelectedSkills: (skills: string[]) => void }) => {
//   const handleSkillToggle = (skill: string) => {
//     setSelectedSkills(
//       selectedSkills.includes(skill)
//         ? selectedSkills.filter((s) => s !== skill)
//         : [...selectedSkills, skill]
//     );
//   };

//   return (
//     <div className="mb-6">
//       <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
//         Relevant Skills for Nirmaan
//       </label>
//       <div className="flex flex-wrap gap-3">
//         {skillsList.map((skill) => (
//           <button
//             key={skill}
//             type="button"
//             onClick={() => handleSkillToggle(skill)}
//             className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
//               selectedSkills.includes(skill)
//                 ? "bg-primary text-white"
//                 : "bg-gray-2 text-gray-800 hover:bg-gray-3 dark:bg-dark-2 dark:text-gray-300 dark:hover:bg-dark-3"
//             }`}
//           >
//             {skill}
//           </button>
//         ))}
//       </div>
//       <input type="hidden" name="skills" value={selectedSkills.join(', ')} />
//     </div>
//   );
// };

// // --- Main Component Starts Here ---
// const AboutSectionOne = () => {
//   const { theme } = useTheme();
//   const [submissionStatus, setSubmissionStatus] = useState('idle');
//   const [selectedPosition, setSelectedPosition] = useState("Select your desired position");
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

//   const List = ({ text }: { text: string }) => (
//     <p className="mb-5 flex items-center text-lg font-medium text-body-color dark:text-gray-300">
//       <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
//         {checkIcon}
//       </span>
//       {text}
//     </p>
//   );

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setSubmissionStatus('submitting');
//     setTimeout(() => {
//       setSubmissionStatus('success');
//     }, 2000);
//   };
  
//   const getButtonText = () => {
//     switch (submissionStatus) {
//       case 'submitting': return 'Submitting...';
//       case 'success': return 'Application Sent!';
//       case 'error': return 'Submission Failed - Try Again';
//       default: return 'Submit Application';
//     }
//   };
  
//   // Reusable input class string for consistency
//   const inputClasses = "w-full rounded-md border border-stroke bg-gray-2 px-4 py-3 text-dark placeholder-body-color/70 focus:border-primary focus:outline-none dark:border-dark-3 dark:bg-dark dark:text-white dark:placeholder-gray-500";

//   return (
//     <section id="about" className="pt-16 md:pt-20 lg:pt-28">
//       <div className="container">
//         <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
//           <div className="-mx-4 flex flex-wrap items-center">
//             <div className="w-full px-4 lg:w-1/2">
//               <SectionTitle
//                 title="Why Join Nirmaan?"
//                 paragraph="We are more than just a club; we are a community dedicated to exploring the vast potential of civil engineering. Our goal is to provide a platform for students to innovate, learn practical skills, and connect with the industry."
//                 mb="44px"
//               />

//               <div className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0" data-wow-delay=".15s">
//                 <div className="mx-[-12px] flex flex-wrap">
//                   <div className="w-full px-3 sm:w-1/2">
//                     <List text="Project-Based Learning" />
//                     <List text="Industry Connections" />
//                     <List text="Technical Skill Development" />
//                   </div>
//                   <div className="w-full px-3 sm:w-1/2">
//                     <List text="Collaborative Environment" />
//                     <List text="Career Advancement" />
//                     <List text="IIT Mandi's Official CE Club" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full px-4 lg:w-1/2">
//               <div className="wow fadeInUp relative mx-auto" data-wow-delay=".2s">
//                 <div
//                   className={`rounded-xl ${
//                     theme === "dark" ? "bg-dark shadow-lg" : "bg-white shadow-lg"
//                   } p-8 sm:p-10`}
//                 >
//                   <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
//                     Become a Member
//                   </h3>
//                   <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                       <label htmlFor="name" className="mb-2 block text-sm font-medium text-dark dark:text-white">Full Name</label>
//                       <input required type="text" name="name" placeholder="Enter your full name" className={inputClasses}/>
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="roll" className="mb-2 block text-sm font-medium text-dark dark:text-white">Roll Number</label>
//                       <input required type="text" name="roll" placeholder="e.g., B22001" className={inputClasses}/>
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="email" className="mb-2 block text-sm font-medium text-dark dark:text-white">Student Email ID</label>
//                       <input required type="email" name="email" placeholder="your_id@iitmandi.ac.in" className={inputClasses}/>
//                     </div>
                    
//                     <CustomDropdown selectedValue={selectedPosition} setSelectedValue={setSelectedPosition} />

//                     <SkillsSelector selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />

//                     <div className="mb-6">
//                       <label htmlFor="message" className="mb-2 block text-sm font-medium text-dark dark:text-white">Why do you want to join Nirmaan?</label>
//                       <textarea required name="message" rows={3} placeholder="Tell us about your interests..." className={inputClasses}></textarea>
//                     </div>
//                     <div>
//                       <button
//                         type="submit"
//                         disabled={submissionStatus === 'submitting' || submissionStatus === 'success'}
//                         className={`w-full rounded-md px-6 py-3 text-base font-medium text-white shadow-md transition-all duration-300 ${
//                           submissionStatus === 'success' ? 'bg-green-500 cursor-not-allowed' :
//                           submissionStatus === 'error' ? 'bg-red-500' :
//                           submissionStatus === 'submitting' ? 'bg-primary/80 cursor-wait' :
//                           'bg-primary hover:bg-primary/80'
//                         }`}
//                       >
//                         {getButtonText()}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSectionOne;




// "use client";

// import { useState, useRef, useEffect } from "react";
// import SectionTitle from "../Common/SectionTitle";
// import { useTheme } from "next-themes";

// const checkIcon = (
//   <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
//     <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
//   </svg>
// );

// // --- New Custom Dropdown Component ---
// const positions = ["President", "Core Member", "Designer", "Developer", "Event Coordinator"];

// const CustomDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState("Select your desired position");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (value: string) => {
//     setSelectedValue(value);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative mb-4" ref={dropdownRef}>
//       <label htmlFor="position" className="mb-2 block text-sm font-medium text-dark dark:text-white">
//         Position you want to apply for
//       </label>
//       <input type="hidden" name="position" value={selectedValue === "Select your desired position" ? "" : selectedValue} />
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full rounded-md border border-body-color/20 bg-white px-4 py-3 text-left text-dark focus:border-primary focus:outline-none dark:border-white/20 dark:bg-dark-2 dark:text-white flex justify-between items-center"
//       >
//         <span className={selectedValue === "Select your desired position" ? "text-body-color/70" : ""}>
//           {selectedValue}
//         </span>
//         <span className="h-2 w-2 rotate-45 border-r-2 border-b-2 border-dark dark:border-white"></span>
//       </button>
//       {isOpen && (
//         <div className="absolute top-full z-20 mt-1 w-full rounded-md border border-body-color/20 bg-white py-1 shadow-lg dark:border-white/20 dark:bg-dark-2">
//           {positions.map((position) => (
//             <button
//               key={position}
//               type="button"
//               onClick={() => handleSelect(position)}
//               className="block w-full px-4 py-2 text-left text-sm text-dark hover:bg-gray-100 dark:text-white dark:hover:bg-dark"
//             >
//               {position}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // --- Skills Selector Component ---
// const skillsList = [
//   "CAD / AutoCAD", "Structural Design", "Project Management", "Surveying",
//   "Civil Engineering Software", "Team Collaboration", "Event Management", "Programming / Web Dev"
// ];

// const SkillsSelector = () => {
//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const handleSkillToggle = (skill: string) => {
//     setSelectedSkills((prev) =>
//       prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
//     );
//   };

//   return (
//     <div className="mb-6">
//       <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
//         Relevant Skills for Nirmaan
//       </label>
//       <div className="flex flex-wrap gap-2">
//         {skillsList.map((skill) => (
//           <button
//             key={skill}
//             type="button"
//             onClick={() => handleSkillToggle(skill)}
//             className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
//               selectedSkills.includes(skill)
//                 ? "bg-primary text-white"
//                 : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-dark-2 dark:text-gray-300 dark:hover:bg-dark"
//             }`}
//           >
//             {skill}
//           </button>
//         ))}
//       </div>
//       <input type="hidden" name="skills" value={selectedSkills.join(', ')} />
//     </div>
//   );
// };


// const AboutSectionOne = () => {
//   const { theme } = useTheme();

//   const List = ({ text }: { text: string }) => (
//     <p className="mb-5 flex items-center text-lg font-medium text-body-color dark:text-gray-400">
//       <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
//         {checkIcon}
//       </span>
//       {text}
//     </p>
//   );

//   return (
//     <section id="about" className="pt-16 md:pt-20 lg:pt-28">
//       <div className="container">
//         <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
//           <div className="-mx-4 flex flex-wrap items-center">
//             <div className="w-full px-4 lg:w-1/2">
//               <SectionTitle
//                 title="Why Join Nirmaan?"
//                 paragraph="We are more than just a club; we are a community dedicated to exploring the vast potential of civil engineering. Our goal is to provide a platform for students to innovate, learn practical skills, and connect with the industry."
//                 mb="44px"
//               />

//               <div className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0" data-wow-delay=".15s">
//                 <div className="mx-[-12px] flex flex-wrap">
//                   <div className="w-full px-3 sm:w-1/2">
//                     <List text="Project-Based Learning" />
//                     <List text="Industry Connections" />
//                     <List text="Technical Skill Development" />
//                   </div>
//                   <div className="w-full px-3 sm:w-1/2">
//                     <List text="Collaborative Environment" />
//                     <List text="Career Advancement" />
//                     <List text="IIT Mandi's Official CE Club" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full px-4 lg:w-1/2">
//               <div className="wow fadeInUp relative mx-auto" data-wow-delay=".2s">
//                 <div
//                   className={`rounded-xl ${
//                     theme === "dark" ? "bg-dark shadow-lg" : "bg-white shadow-lg"
//                   } p-8 sm:p-10`}
//                 >
//                   <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
//                     Become a Member
//                   </h3>
//                   <form>
//                     <div className="mb-4">
//                       <label htmlFor="name" className="mb-2 block text-sm font-medium text-dark dark:text-white">Full Name</label>
//                       <input type="text" name="name" placeholder="Enter your full name" className="w-full rounded-md border border-body-color/20 bg-white px-4 py-3 text-dark placeholder-body-color/70 focus:border-primary focus:outline-none dark:border-white/20 dark:bg-dark-2 dark:text-white"/>
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="roll" className="mb-2 block text-sm font-medium text-dark dark:text-white">Roll Number</label>
//                       <input type="text" name="roll" placeholder="e.g., B22001" className="w-full rounded-md border border-body-color/20 bg-white px-4 py-3 text-dark placeholder-body-color/70 focus:border-primary focus:outline-none dark:border-white/20 dark:bg-dark-2 dark:text-white"/>
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="email" className="mb-2 block text-sm font-medium text-dark dark:text-white">Student Email ID</label>
//                       <input type="email" name="email" placeholder="your_id@iitmandi.ac.in" className="w-full rounded-md border border-body-color/20 bg-white px-4 py-3 text-dark placeholder-body-color/70 focus:border-primary focus:outline-none dark:border-white/20 dark:bg-dark-2 dark:text-white"/>
//                     </div>
                    
//                     {/* --- Custom Dropdown Component is used here --- */}
//                     <CustomDropdown />

//                     <SkillsSelector />

//                     <div className="mb-6">
//                       <label htmlFor="message" className="mb-2 block text-sm font-medium text-dark dark:text-white">Why do you want to join Nirmaan?</label>
//                       <textarea name="message" rows={3} placeholder="Tell us about your interests..." className="w-full rounded-md border border-body-color/20 bg-white px-4 py-3 text-dark placeholder-body-color/70 focus:border-primary focus:outline-none dark:border-white/20 dark:bg-dark-2 dark:text-white"></textarea>
//                     </div>
//                     <div>
//                       <button type="submit" className="w-full rounded-md bg-primary px-6 py-3 text-base font-medium text-white shadow-md transition duration-300 hover:bg-primary/80">
//                         Submit Application
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSectionOne;




// import Image from "next/image";
// import SectionTitle from "../Common/SectionTitle";

// const checkIcon = (
//   <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
//     <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
//   </svg>
// );

// const AboutSectionOne = () => {
//   const List = ({ text }: { text: string }) => (
//     <p className="mb-5 flex items-center text-lg font-medium text-body-color">
//       <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
//         {checkIcon}
//       </span>
//       {text}
//     </p>
//   );

//   return (
//     <section id="about" className="pt-16 md:pt-20 lg:pt-28">
//       <div className="container">
//         <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
//           <div className="-mx-4 flex flex-wrap items-center">
//             <div className="w-full px-4 lg:w-1/2">
//               <SectionTitle
//                 title="Why Join Nirmaan?"
//                 paragraph="We are more than just a club; we are a community dedicated to exploring the vast potential of civil engineering. Our goal is to provide a platform for students to innovate, learn practical skills, and connect with the industry."
//                 mb="44px"
//               />

//               <div
//                 className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
//                 data-wow-delay=".15s"
//               >
//                 <div className="mx-[-12px] flex flex-wrap">
//                   <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
//                     <List text="Project-Based Learning" />
//                     <List text="Industry Connections" />
//                     <List text="Technical Skill Development" />
//                   </div>

//                   <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
//                     <List text="Collaborative Environment" />
//                     <List text="Career Advancement" />
//                     <List text="IIT Mandi's Official CE Club" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full px-4 lg:w-1/2">
//               <div
//                 className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
//                 data-wow-delay=".2s"
//               >
//                 <Image
//                   src="/images/about/about-image.svg"
//                   alt="about-image"
//                   fill
//                   className="drop-shadow-three mx-auto max-w-full dark:hidden dark:drop-shadow-none lg:mr-0"
//                 />
//                 <Image
//                   src="/images/about/about-image-dark.svg"
//                   alt="about-image"
//                   fill
//                   className="drop-shadow-three mx-auto hidden max-w-full dark:block dark:drop-shadow-none lg:mr-0"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSectionOne;
