import { Blog } from "@/types/blog";

// FINAL LIST - Purani website se saara data merge aur clean karke yahan daal diya gaya hai.
const activityData: Blog[] = [
  // --- YEH AAPKE NAYE EVENTS HAIN (Example ke liye rakha hai) ---
  {
    slug: "autocad-learning-series-2025",
    title: "AutoCAD Learning Series Competition",
    paragraph: "Master the basics of AutoCAD and bring designs to life digitally",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Event" },
    tags: ["CAD", "Workshop", "Competition"],
    publishDate: "2025-11-05",
    category: "Event",
    imageGallery: {
      folder: "autocad-learning-series-2025",
      count: 0,
      fileType: "jpg",
    },
    content: `
      <h2>About the Learning Series</h2>
      <p> This session introduces students to the fundamentals of AutoCAD, one of the most widely used tools in civil engineering design and drafting. Participants learn how to create precise 2D drawings, understand essential commands, and develop skills that form the foundation for advanced design projects. The session is aimed at helping students bridge the gap between classroom concepts and professional applications.
      </p>
    `,
  },

  // --- MERGED & UNIQUE EVENTS FROM YOUR LIST (PLACEHOLDERS) ---
  // TODO: In sabhi events ki date, count, paragraph aur content ko update karein.
  {
    slug: "viaduct-event",
    title: "VIADUCT",
    paragraph: "An engaging event focused on structural engineering challenges and solutions. More details to come.",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Event" },
    tags: ["Event", "Structural"],
    publishDate: "2024-03-15", // Placeholder Date
    category: "Event",
    imageGallery: {
      folder: "viaduct-event",
      count: 8, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Event</h3><p>Viaduct is a hands-on structural design competition where students construct models of civil engineering structures using ice cream sticks. Once built, these models are tested for load-bearing capacity and earthquake resistance. The event encourages creativity, practical application of engineering concepts, and teamwork, giving participants a deeper understanding of structural stability in real-world scenarios
    </p>`,
  },
  {
    slug: "adhyayan-case-study",
    title: "ADHYAYAN",
    paragraph: "Explore structural engineering principles behind real-world and iconic designs",
    author: { name: "Research Wing", image: "/images/logo/logo.svg", designation: "Case Study" },
    tags: ["Case Study", "Research"],
    publishDate: "2024-03-10", // Placeholder Date
    category: "Case Study",
    imageGallery: {
      folder: "adhyayan-case-study",
      count: 1, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Case Study</h3><p>Adhyan is a knowledge-focused session where students explore the structural engineering principles behind iconic and practical structures. Through detailed discussions and analyses, participants gain insights into design philosophies, material behavior, and real-world engineering challenges. The event bridges theory with practice, fostering a deeper appreciation of how structures stand strong in diverse conditions.
    </p>`,
  },
  {
    slug: "briquest-case-study",
    title: "Briquest",
    paragraph: "A competitive case study challenging participants with real-world construction and design problems.",
    author: { name: "Research Wing", image: "/images/logo/logo.svg", designation: "Case Study" },
    tags: ["Case Study", "Competition"],
    publishDate: "2024-02-20", // Placeholder Date
    category: "Case Study",
    imageGallery: {
      folder: "briquest-case-study",
      count: 1, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Case Study</h3><p>Details for this case study will be updated soon.</p>`,
  },
    {
    slug: "cadx-event",
    title: "CadX",
    paragraph: "Compete in designing precise structures in CAD by following specified dimensions and requirements",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Event" },
    tags: ["Event", "CAD", "Competition"],
    publishDate: "2024-02-15", // Placeholder Date
    category: "Event",
    imageGallery: {
      folder: "cadx-event",
      count: 1, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Event</h3><p>CADX is a competitive design event that challenges participants to showcase their skills in computer-aided design (CAD).
    Given specific dimensions and project requirements, students create precise digital models, demonstrating accuracy, creativity, and understanding of engineering principles.</p>`,
  },
  {
    slug: "plot-it-event",
    title: "Plot It",
    paragraph: "Survey, design, and plan your own civil engineering project from concept to layout.",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Event" },
    tags: ["Event", "Surveying", "Planning"],
    publishDate: "2024-01-25", // Placeholder Date
    category: "Event",
    imageGallery: {
      folder: "plot-it-event",
      count: 1, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Event</h3><p>Plot It is a hands-on event that immerses participants in the core aspects of civil engineering project planning. Students survey a given plot, design layouts, and develop detailed plans, applying concepts of measurement, spatial analysis, and structural considerations.
    </p>`,
  },
  {
    slug: "construction-photography-event",
    title: "Construction Photography",
    paragraph: "Capture the beauty, detail, and engineering behind civil structures through your lens.",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Event" },
    tags: ["Event", "Photography", "Creative"],
    publishDate: "2024-01-10", // Placeholder Date
    category: "Event",
    imageGallery: {
      folder: "construction-photography-event",
      count: 1, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Event</h3><p>Construction Photography is an event that encourages participants to explore civil engineering through the art of photography. Students capture images of structures, construction sites, and engineering marvels, focusing on design, materials, and structural aesthetics. The event promotes creativity while enhancing awareness of engineering details that often go unnoticed.
    </p>`,
  },
    {
    slug: "scavenger-hunt-event",
    title: "Scavenger Hunt",
    paragraph: "Solve riddles to identify famous civil engineering structures in a fun challenge.",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Event" },
    tags: ["Event", "Fun"],
    publishDate: "2023-12-10", // Placeholder Date
    category: "Event",
    imageGallery: {
      folder: "scavenger-hunt-event",
      count: 1, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Event</h3><p>The Scavenger Hunt is an interactive event designed to blend fun with learning. Participants solve riddles and clues that lead them to identify famous civil engineering structures. The activity encourages teamwork, quick thinking, and awareness of landmark designs, all while adding a playful twist to engineering knowledge.
    </p>`,
  },
  {
    slug: "civiz-event",
    title: "CIVIZ",
    paragraph: "An exciting quiz event testing the knowledge of civil engineering enthusiasts.",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Event" },
    tags: ["Event", "Quiz"],
    publishDate: "2023-11-20", // Placeholder Date
    category: "Event",
    imageGallery: {
      folder: "civiz-event",
      count: 1, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Event</h3><p>Civiz is a dynamic quiz competition designed for civil engineering enthusiasts to challenge and showcase their knowledge. Participants answer questions covering structural engineering, design principles, construction methods, and landmark projects.
    </p>`,
  },
  {
    slug: "appraisal-talk",
    title: "Appraisal Talk on Disaster Risk Reduction: Landslides",
    paragraph: "An expert talk focusing on the challenges and mitigation strategies for landslides.",
    author: { name: "Guest Speaker", image: "/images/logo/logo.svg", designation: "Talk" },
    tags: ["Talk", "Disaster Management", "Geotechnical"],
    publishDate: "2023-11-05", // Placeholder Date
    category: "Talk",
    imageGallery: {
      folder: "appraisal-talk",
      count: 4, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Talk</h3><p>Appraisal Talk is a knowledge-sharing session where participants delve into various aspects of civil engineering, from emerging technologies to career pathways. Experts or senior members lead discussions, offering insights into practical applications, industry trends, and innovative solutions.
    </p>`,
  },
  {
    slug: "dam-visits",
    title: "Dam Visits",
    paragraph: "Educational visits to nearby dam sites to understand large-scale hydraulic structures.",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Site Visit" },
    tags: ["Site Visit", "Hydraulics", "Dam"],
    publishDate: "2023-10-25", // Placeholder Date
    category: "Site Visit",
    imageGallery: {
      folder: "dam-visits",
      count: 1, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Visit</h3><p>Dam Visits take students on an exciting journey to explore some of the most remarkable civil engineering feats. Participants observe the design, construction, and functioning of dams, gaining hands-on understanding of water management, structural integrity, and environmental considerations.
    </p>`,
  },
  {
    slug: "atal-tunnel-visit",
    title: "Atal Tunnel Site Visit",
    paragraph: "Experience one of the engineering marvels of the Himalayas up close and get inspired",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Site Visit" },
    tags: ["Site Visit", "Tunnelling", "Geotechnical"],
    publishDate: "2023-10-15", // Placeholder Date
    category: "Site Visit",
    imageGallery: {
      folder: "atal-tunnel-visit",
      count: 0, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Visit</h3><p>The Atal Tunnel Visit gives students a firsthand look at one of the world’s highest highway tunnels and a marvel of modern civil engineering.The visit combines technical learning with the thrill of seeing a large-scale infrastructure project up close, leaving students inspired by both the scale of engineering achievement and the breathtaking Himalayan surroundings.
    </p>`,
  },
  {
    slug: "parashar-visit",
    title: "Parashar Visit",
    paragraph: "Explore the scenic Parashar Lake and Temple while enjoying a mix of adventure and relaxation",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Site Visit" },
    tags: ["Site Visit", "Exploration"],
    publishDate: "2023-09-20", // Placeholder Date
    category: "Site Visit",
    imageGallery: {
      folder: "parashar-visit",
      count: 0, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Visit</h3><p>The Parashar Visit takes students to one of the most beautiful and popular destinations around IIT Mandi. Participants experience the serenity of Parashar Lake, admire the iconic temple, and enjoy the natural surroundings while bonding with fellow students. Beyond sightseeing, the trip encourages appreciation for local culture, environmental awareness, and the joy of exploring the outdoors.
    </p>`,
  },
  {
    slug: "spt-visit-mandi",
    title: "SPT Visit, Mandi",
    paragraph: "Explore the workings of the Standard Penetration Test and understand soil behavior firsthand",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Site Visit" },
    tags: ["Site Visit", "Geotechnical", "Testing"],
    publishDate: "2023-09-05", // Placeholder Date
    category: "Site Visit",
    imageGallery: {
      folder: "spt-visit-mandi",
      count: 0, // Placeholder Count
      fileType: "jpg",
    },
    content: `<h3>About the Visit</h3><p>SPT Visit in Mandi offers students a practical, on-site experience with the Standard Penetration Test, a key method in geotechnical engineering for assessing soil properties. Participants observe the testing procedure, analyze results, and understand how soil characteristics influence foundation design and construction decisions.</p>`,
  },

  // --- OLDER, DETAILED EVENTS ---
  {
    slug: "bridge-building-contest-2022",
    title: "Bridge Building Competition",
    paragraph: "A flagship event testing practical skills in structural engineering by building bridges with limited materials like popsicle sticks.",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Competition" },
    tags: ["Structural", "Competition", "Hands-on"],
    publishDate: "2022-10-22",
    category: "Event",
    imageGallery: {
      folder: "bridge-building-contest-2022",
      count: 0,
      fileType: "jpg",
    },
    content: `
      <h3>About the Event</h3>
      <p>Nirmaan Club organized its flagship event, the Bridge Building Competition, on the 22nd and 23rd of October 2022. The competition aimed to test the practical skills and structural knowledge of the participants. Teams were tasked with building a bridge using a limited amount of materials, primarily popsicle sticks, and the bridges were then tested for their load-bearing capacity.</p>
    `,
  },
  {
    slug: "talk-on-concrete-2022",
    title: "Talk on Concrete by Dr. Sandeep Kumar",
    paragraph: "An expert talk on the recent advances and future scope in the field of concrete technology and sustainable materials.",
    author: { name: "Dr. Sandeep Kumar", image: "/images/logo/logo.svg", designation: "Guest Speaker" },
    tags: ["Concrete", "Talk", "Materials"],
    publishDate: "2022-09-16",
    category: "Talk",
    imageGallery: {
      folder: "talk-on-concrete-2022",
      count: 0,
      fileType: "jpg",
    },
    content: `
      <h3>About the Talk</h3>
      <p>A talk on concrete was delivered by Dr. Sandeep Kumar, Assistant Professor in the School of Engineering, IIT Mandi. The session covered recent developments in concrete technology, including sustainable materials, advanced testing methods, and the future scope of research in this domain. It was an insightful session for all civil engineering enthusiasts.</p>
    `,
  },
  {
    slug: "autocad-workshop-2022",
    title: "3-Day AutoCAD Workshop",
    paragraph: "A comprehensive hands-on workshop covering the fundamentals of 2D drafting and design using AutoCAD software.",
    author: { name: "Nirmaan Club", image: "/images/logo/logo.svg", designation: "Workshop" },
    tags: ["CAD", "Workshop", "Software"],
    publishDate: "2022-09-09",
    category: "Event",
    imageGallery: {
      folder: "autocad-workshop-2022",
      count: 4,
      fileType: "jpg",
    },
    content: `
      <h3>Workshop Overview</h3>
      <p>Nirmaan Club conducted a 3-day hands-on workshop on AutoCAD from September 9th to 11th, 2022. The workshop was designed for beginners to learn the essential tools and techniques for 2D drafting. Participants were guided through practical exercises to create precise and professional drawings.</p>
    `,
  },
];

// --- Automatic Sorting ---
// Yeh line apne aap sabse naye event ko top par rakhegi.
const sortedActivityData = [...activityData].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

export { sortedActivityData as activityData };

