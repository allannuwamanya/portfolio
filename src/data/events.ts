import { CommunityEvent } from "@/types";

/**
 * Workshops, conferences, meetups and talks.
 *
 * Add an object per event — the page, the sitemap entry and the nav link are
 * already wired, so nothing else needs changing. Newest first.
 *
 * Photos live in the R2 bucket under `events/` and are referenced by path (see
 * NEXT_PUBLIC_ASSETS_URL). A missing or broken file is handled gracefully: the
 * card renders without it rather than showing a broken frame.
 *
 *   {
 *     id: "evt-slug",
 *     title: "Building Reliable Speech Pipelines",
 *     host: "Data Science Africa",
 *     kind: "Workshop",          // Workshop | Conference | Meetup | Hackathon | Talk | Training
 *     role: "spoke",             // attended | spoke | mentored
 *     date: "2025-03",           // YYYY-MM or YYYY-MM-DD; omit if not confirmed yet
 *     endDate: "2025-03-05",     // optional, for multi-day events
 *     location: "Kampala, Uganda",
 *     format: "In person",       // optional: In person | Virtual | Hybrid
 *     images: [                  // optional; the first is the cover, all open in a lightbox
 *       { src: "/events/speech-pipelines.jpg", alt: "Speaking at the Data Science Africa workshop" },
 *     ],
 *     summary: "One line on what the event was.",
 *     takeaway: "What it changed in your work.",   // optional but worth writing
 *     link: "https://...",       // optional: slides or write-up
 *   }
 */
export const eventsData: CommunityEvent[] = [
  {
    id: "gender-inclusion-meetup-2026",
    title: "Gender Inclusion Meetup",
    host: "Mbarara University of Science & Technology",
    kind: "Meetup",
    role: "attended",
    date: "2026-03",
    pinned: true,
    location: "Mbarara University of Science & Technology, Mbarara, Uganda",
    format: "In person",
    images: [
      {
        src: "/events/gender-inclusion-group.jpg",
        alt: "Group photo of the Gender Inclusion Meetup attendees outside the venue at Mbarara University of Science & Technology.",
      },
      {
        src: "/events/gender-inclusion-1.jpg",
        alt: "With a fellow attendee outside the venue after the meetup.",
      },
      {
        src: "/events/gender-inclusion-2.jpg",
        alt: "With two fellow attendees outside the venue after the meetup.",
      },
    ],
    summary:
      "A strategy session rather than a talk, sponsored by IUC-UCoBS, on the real-world barriers women face in the tech industry and the actions that can remove them. I joined members of the Mbarara University Computing Students Association working on a more equitable Ugandan tech ecosystem.",
    takeaway:
      "The barrier named was bias, and the strategy that follows is awareness and sensitisation, then turning those plans into practice.",
  },
  {
    id: "must-python-training-2026",
    title: "Python Programming Training",
    host: "Faculty of Computing & Informatics, Mbarara University of Science & Technology · IUC-UCoBS",
    kind: "Training",
    role: "attended",
    date: "2026-04-13",
    endDate: "2026-04-17",
    location: "Computer Lab 3, Kihumuro Campus, Mbarara, Uganda",
    format: "In person",
    images: [
      {
        src: "/events/python-training-facilitators.jpg",
        alt: "Group photo with the Ghent University facilitators after the Python training.",
      },
      {
        src: "/events/python-training-class.jpg",
        alt: "Participants working through exercises on their laptops during a Python training session.",
      },
      {
        src: "/events/python-training-poster.jpg",
        alt: "The programme poster for the Python Programming Training, 13th to 17th April 2026, listing nine lessons from the basics of Python to plotting with Matplotlib.",
      },
    ],
    summary:
      "A five-day introduction to Python run by IUC-UCoBS Sub Project 6 at Mbarara University of Science & Technology with VLIR-UOS, and taught by Dr. Joris Mattheijssens and Dr. Thomas Van Giel of Ghent University. It covered core Python, scientific computing with NumPy and Matplotlib, and hands-on work in Jupyter Notebooks and Google Colab.",
    takeaway:
      "A working toolkit for research-style data work, from core Python to NumPy and plotting, ready to apply to real research and innovation problems.",
  },
  {
    id: "ieee-spax-must-2026",
    title: "IEEE SPAx: How to Benefit from IEEE?",
    host: "IEEE Students · Mbarara University of Science & Technology",
    kind: "Meetup",
    role: "attended",
    date: "2026-02-28",
    location: "CITT Workspace, Kihumuro Campus, Mbarara University of Science & Technology, Uganda",
    format: "In person",
    images: [
      {
        src: "/events/ieee-spax-banner.jpg",
        alt: "Attendees of the IEEE SPAx event in front of the \"How to Benefit from IEEE?\" banner.",
      },
      {
        src: "/events/ieee-spax-group-2.jpg",
        alt: "Group photo of IEEE SPAx organisers and participants outside the venue.",
      },
      {
        src: "/events/ieee-spax-group-1.jpg",
        alt: "Close group photo of participants in IEEE Students shirts.",
      },
    ],
    summary:
      "A student session on getting more out of IEEE, with speakers Eng. Vincent Olema and Vicent Rutagangibwa on career development, professional networking, and global innovation. It also set up collaboration between the IEEE Uganda Section and the Mbarara University Computing Students Association.",
    takeaway:
      "A clearer picture of how to use IEEE as a launchpad for a career in STEM: its academic and professional benefits, and the network behind it.",
  },
  {
    id: "chainlink-must",
    title: "Chainlink Community Event",
    host: "Chainlink · Mbarara University of Science & Technology",
    kind: "Meetup",
    role: "attended",
    location: "Faculty of Applied Sciences & Technology, Mbarara University of Science & Technology, Uganda",
    format: "In person",
    images: [
      {
        src: "/events/chainlink-crowd.jpg",
        alt: "A crowd of students in matching event T-shirts gathered around a Chainlink banner outside the Faculty of Applied Sciences & Technology.",
      },
      {
        src: "/events/chainlink-team-1.jpg",
        alt: "Five attendees posing in front of a Chainlink banner.",
      },
      {
        src: "/events/chainlink-team-2.jpg",
        alt: "Five attendees in event T-shirts standing in front of the Chainlink banner.",
      },
      {
        src: "/events/chainlink-pair.jpg",
        alt: "Two attendees at the Chainlink banner.",
      },
      {
        src: "/events/chainlink-trio.jpg",
        alt: "Three attendees in event T-shirts in front of the faculty building.",
      },
    ],
    summary:
      "A Chainlink community event on the Mbarara University campus, where students gathered around Chainlink's developer resources (docs.chain.link).",
  },
];
