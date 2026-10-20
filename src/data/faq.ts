/**
 * Question-and-answer pairs shown on the home page and published as FAQPage
 * structured data. Each answer stands on its own, in plain sentences, and only
 * states facts that are also visible elsewhere on the site.
 */
export const faqData: { question: string; answer: string; link: { label: string; href: string } }[] = [
  {
    question: "Who is Allan Nuwamanya?",
    answer:
      "Allan Nuwamanya, who uses the handle allannuwamanya on GitHub, is a software developer from Uganda who builds web applications, digital systems and AI tools. Allan is a co-founder of Langratia, a custom software studio, and is studying for a BSc in Software Engineering at Mbarara University of Science & Technology, graduating in 2027.",
    link: { label: "See Allan's experience and education", href: "/experience" },
  },
  {
    question: "What is Langratia?",
    answer:
      "Langratia is a custom software and enterprise engineering studio that designs and builds digital products, operational systems and secure infrastructure for businesses. Allan Nuwamanya is one of its co-founders. The studio publishes its work at langratia.com.",
    link: { label: "Visit the Langratia website", href: "https://langratia.com/" },
  },
  {
    question: "What projects has Allan built?",
    answer:
      "Public projects include LingualDub, an open speech-AI framework for low-resource languages that starts with Luganda; Open Data Uganda, a clearinghouse of standardised public datasets; Saccade, an AI engine for truth-anchored LaTeX résumés; and Twill, a desktop interface for command-line coding agents. Each has source links.",
    link: { label: "Browse all projects", href: "/projects" },
  },
  {
    question: "Which technologies does Allan use?",
    answer:
      "Across public GitHub repositories, the main languages are TypeScript, JavaScript and Python. Typical tools include Next.js and React for the web, FastAPI and Node.js for backends, and PyTorch for machine learning. Projects also use PostgreSQL, Temporal and automated CI checks.",
    link: { label: "View the full skills list", href: "/skills" },
  },
  {
    question: "What certifications does Allan hold?",
    answer:
      "Allan holds an Introduction to Python Programming certificate from Mbarara University of Science & Technology, Elements of AI from the University of Helsinki and MinnaLearn, AI Career Essentials from ALX Africa, and the 2025 Tech-Preneurship Bootcamp certificate.",
    link: { label: "See the certifications", href: "/certifications" },
  },
  {
    question: "How is Allan ranked among GitHub developers in Uganda?",
    answer:
      "As of October 2026, the GitHub account allannuwamanya ranks 12th on committers.app's list of top GitHub committers in Uganda. The list orders Ugandan GitHub users by commit count and changes as it is refreshed, so the position can move.",
    link: { label: "View the Uganda committers ranking", href: "https://committers.app/uganda" },
  },
  {
    question: "What are Allan Nuwamanya's official profiles?",
    answer:
      "Allan Nuwamanya uses the handle allannuwamanya on GitHub (github.com/allannuwamanya) and LinkedIn (linkedin.com/in/allannuwamanya), and allannuwamanya_ on X. This website, allannuwamanya.tech, is the personal site that links to all of them.",
    link: { label: "Open Allan's GitHub profile", href: "https://github.com/allannuwamanya" },
  },
  {
    question: "Where is Allan based and how can I get in touch?",
    answer:
      "Allan is based in Kampala, Uganda, studies in Mbarara, and works remotely. The Contact page has a message form, and Allan can also be reached through GitHub, LinkedIn and X, which are linked in the footer of every page.",
    link: { label: "Contact Allan", href: "/contact" },
  },
];
