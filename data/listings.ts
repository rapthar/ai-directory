export interface Listing {
  id: string;
  name: string;
  description: string;
  specialties: string[];
  location: string;
  website: string;
  foundedYear: number;
  teamSize: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  imageUrl: string;
  featured: boolean;
}

export const listings: Listing[] = [
  {
    id: "1",
    name: "NeuraTech Solutions",
    description: "Leading AI development firm specializing in enterprise-scale machine learning solutions and MLOps. Known for delivering robust, production-ready AI systems.",
    specialties: ["AI Development", "Machine Learning", "MLOps", "AI Infrastructure"],
    location: "San Francisco, USA",
    website: "https://example.com/neuratech",
    foundedYear: 2020,
    teamSize: "50-100",
    rating: 4.9,
    reviewCount: 87,
    verified: true,
    imageUrl: "/agencies/1.jpg",
    featured: true
  },
  {
    id: "2",
    name: "VisionAI Labs",
    description: "Pioneering computer vision solutions for retail and manufacturing. Expertise in deep learning and edge AI deployment.",
    specialties: ["Computer Vision", "Deep Learning", "Edge AI", "Retail AI"],
    location: "London, UK",
    website: "https://example.com/visionai",
    foundedYear: 2021,
    teamSize: "20-50",
    rating: 4.8,
    reviewCount: 45,
    verified: true,
    imageUrl: "/agencies/2.jpg",
    featured: false
  },
  {
    id: "3",
    name: "Cognitive Consulting Group",
    description: "Strategic AI consulting firm helping businesses navigate the AI transformation journey with focus on ethics and governance.",
    specialties: ["AI Consulting", "AI Ethics & Governance", "AI Strategy", "AI Integration"],
    location: "Toronto, Canada",
    website: "https://example.com/cognitive",
    foundedYear: 2019,
    teamSize: "10-20",
    rating: 4.7,
    reviewCount: 32,
    verified: true,
    imageUrl: "/agencies/3.jpg",
    featured: false
  },
  {
    id: "4",
    name: "HealthAI Innovations",
    description: "Specialized in developing AI solutions for healthcare, focusing on patient care optimization and medical imaging analysis.",
    specialties: ["Healthcare AI", "Machine Learning", "Data Science", "AI Development"],
    location: "Boston, USA",
    website: "https://example.com/healthai",
    foundedYear: 2022,
    teamSize: "20-50",
    rating: 4.9,
    reviewCount: 28,
    verified: true,
    imageUrl: "/agencies/4.jpg",
    featured: true
  },
  {
    id: "5",
    name: "LangTech AI",
    description: "Expert in natural language processing and conversational AI, building cutting-edge chatbots and language models.",
    specialties: ["Natural Language Processing", "Conversational AI", "AI Development", "Machine Learning"],
    location: "Berlin, Germany",
    website: "https://example.com/langtech",
    foundedYear: 2021,
    teamSize: "10-20",
    rating: 4.6,
    reviewCount: 23,
    verified: true,
    imageUrl: "/agencies/5.jpg",
    featured: false
  },
  {
    id: "6",
    name: "FinAI Solutions",
    description: "Specialized in AI-driven financial technology solutions, from risk assessment to algorithmic trading systems.",
    specialties: ["Financial AI", "Machine Learning", "AI Analytics", "Data Science"],
    location: "Singapore",
    website: "https://example.com/finai",
    foundedYear: 2020,
    teamSize: "20-50",
    rating: 4.8,
    reviewCount: 41,
    verified: true,
    imageUrl: "/agencies/6.jpg",
    featured: false
  },
  {
    id: "7",
    name: "Creative AI Studio",
    description: "Innovative agency focusing on AI-powered content creation and generative AI applications for creative industries.",
    specialties: ["Generative AI", "AI Content Creation", "AI UX/UI", "AI Product Development"],
    location: "Amsterdam, Netherlands",
    website: "https://example.com/creativeai",
    foundedYear: 2023,
    teamSize: "10-20",
    rating: 4.7,
    reviewCount: 19,
    verified: true,
    imageUrl: "/agencies/7.jpg",
    featured: false
  },
  {
    id: "8",
    name: "AutomateAI",
    description: "Leaders in robotics and automation solutions, specializing in manufacturing process optimization using AI.",
    specialties: ["Robotics & Automation", "Manufacturing AI", "AI Development", "Deep Learning"],
    location: "Munich, Germany",
    website: "https://example.com/automate",
    foundedYear: 2021,
    teamSize: "50-100",
    rating: 4.9,
    reviewCount: 35,
    verified: true,
    imageUrl: "/agencies/8.jpg",
    featured: true
  },
  {
    id: "9",
    name: "CloudAI Technologies",
    description: "Specialized in deploying and scaling AI solutions on cloud platforms with focus on security and performance.",
    specialties: ["AI Cloud Solutions", "AI Infrastructure", "AI Security", "MLOps"],
    location: "Sydney, Australia",
    website: "https://example.com/cloudai",
    foundedYear: 2022,
    teamSize: "20-50",
    rating: 4.8,
    reviewCount: 27,
    verified: true,
    imageUrl: "/agencies/9.jpg",
    featured: false
  },
  {
    id: "10",
    name: "MarketAI Experts",
    description: "AI-powered marketing solutions provider, specializing in customer behavior analysis and predictive analytics.",
    specialties: ["AI Marketing", "AI Analytics", "Machine Learning", "Data Science"],
    location: "New York, USA",
    website: "https://example.com/marketai",
    foundedYear: 2021,
    teamSize: "20-50",
    rating: 4.7,
    reviewCount: 38,
    verified: true,
    imageUrl: "/agencies/10.jpg",
    featured: false
  }
];
