import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SketchButton from '../components/SketchButton';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  category: string;
}

const AllProjects: React.FC = () => {
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extended project data with more projects
  const projects: Project[] = [
    {
      id: 1,
      title: "Labelly",
      description: "AI-powered mobile app that scans food ingredient labels with 95% accuracy. Built with React Native and Flask, featuring real-time safety scoring and allergen detection through Perplexity API integration.",
      technologies: ["React Native", "Expo", "Flask", "Firebase", "Sonar API"],
      githubUrl: "https://github.com/yourusername/labelly",
      liveUrl: "https://labelly-demo.vercel.app",
      imageUrl: "@placeholder.png",
      category: "Mobile App"
    },
    {
      id: 2,
      title: "AI-Powered Task Manager",
      description: "An intelligent task management application that uses machine learning to predict task completion times and optimize workflow. Built with React and Python backend.",
      technologies: ["React", "Python", "FastAPI", "PostgreSQL", "TensorFlow", "Docker"],
      githubUrl: "https://github.com/yourusername/ai-task-manager",
      liveUrl: "https://ai-taskmanager-demo.herokuapp.com",
      imageUrl: "@placeholder.png",
      category: "Web App"
    },
    {
      id: 3,
      title: "Mobile Fitness Tracker",
      description: "A React Native mobile application for fitness tracking with real-time workout monitoring, progress analytics, and social features for sharing achievements.",
      technologies: ["React Native", "Firebase", "Redux", "React Navigation", "Chart.js"],
      githubUrl: "https://github.com/yourusername/fitness-tracker",
      liveUrl: "https://fitness-tracker-demo.netlify.app",
      imageUrl: "@placeholder.png",
      category: "Mobile App"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "A comprehensive weather application with detailed forecasts, interactive maps, and weather alerts. Features location-based services and responsive design.",
      technologies: ["TypeScript", "React", "OpenWeather API", "Mapbox", "Chart.js", "PWA"],
      githubUrl: "https://github.com/yourusername/weather-dashboard",
      liveUrl: "https://weather-dashboard-demo.netlify.app",
      imageUrl: "@placeholder.png",
      category: "Web App"
    },
    {
      id: 5,
      title: "Blockchain Voting System",
      description: "A secure, transparent voting platform built on Ethereum blockchain. Features smart contracts for vote integrity and real-time results visualization.",
      technologies: ["Solidity", "React", "Web3.js", "Ethereum", "IPFS", "MetaMask"],
      githubUrl: "https://github.com/yourusername/blockchain-voting",
      liveUrl: "https://blockchain-voting-demo.netlify.app",
      imageUrl: "@placeholder.png",
      category: "Blockchain"
    },
    {
      id: 6,
      title: "Social Media Analytics",
      description: "Advanced analytics dashboard for social media metrics with ML-powered sentiment analysis and automated reporting features.",
      technologies: ["Next.js", "Python", "MongoDB", "Chart.js", "TensorFlow", "AWS"],
      githubUrl: "https://github.com/yourusername/social-analytics",
      liveUrl: "https://social-analytics-demo.vercel.app",
      imageUrl: "@placeholder.png",
      category: "Web App"
    }
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const ProjectImageFallback: React.FC<{ title: string }> = ({ title }) => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-yellow-200">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-orange-400 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
          </svg>
        </div>
        <p className="font-lilita text-lg text-gray-700">{title}</p>
      </div>
    </div>
  );

  const handleImageLoad = (projectId: number) => {
    setImageLoading(prev => ({ ...prev, [projectId]: false }));
  };

  const handleImageError = (projectId: number) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
    setImageLoading(prev => ({ ...prev, [projectId]: false }));
  };

  const handleImageStart = (projectId: number) => {
    setImageLoading(prev => ({ ...prev, [projectId]: true }));
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="font-lilita text-5xl sm:text-6xl lg:text-7xl text-gray-900 mb-6">
              All Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my complete portfolio of projects spanning web development, mobile apps, 
              AI/ML solutions, and blockchain applications.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Project Image */}
              <div className="relative aspect-video bg-gradient-to-br from-orange-100 to-yellow-100">
                {imageLoading[project.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
                    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {imageErrors[project.id] ? (
                  <ProjectImageFallback title={project.title} />
                ) : (
                  <img 
                    src={project.imageUrl} 
                    alt={`Screenshot of ${project.title} project`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onLoad={() => handleImageLoad(project.id)}
                    onError={() => handleImageError(project.id)}
                    onLoadStart={() => handleImageStart(project.id)}
                  />
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-lilita text-xl text-gray-900">{project.title}</h3>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      style={{ 
                        paddingLeft: '0.5rem', 
                        paddingRight: '0.5rem',
                        paddingTop: '0.25rem',
                        paddingBottom: '0.25rem'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-gray-500 text-xs">+{project.technologies.length - 3} more</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <SketchButton
                    text="Code"
                    fillColor="#374151"
                    width={100}
                    height={40}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  />
                  <SketchButton
                    text="Demo"
                    fillColor="#f97316"
                    width={100}
                    height={40}
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects; 