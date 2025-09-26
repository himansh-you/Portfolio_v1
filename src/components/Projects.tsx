import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SketchButton from './SketchButton';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

// Constants for better maintainability
const CONSTANTS = {
  BUTTON_DIMENSIONS: { width: 160, height: 60 },
  COLORS: {
    GITHUB: '#fbbf24',
    DEMO: '#f97316'
  },
  ANIMATION_DURATION: 300
} as const;

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const projects: Project[] = [
    {
      id: 1,
      title: "Labelly",
      description: "AI-powered mobile app that scans food ingredient labels with 95% accuracy. Built with React Native and Flask, featuring real-time safety scoring and allergen detection through Perplexity API integration.",
      technologies: ["React Native", "Expo", "Flask", "Firebase", "Sonar API"],
      githubUrl: "https://github.com/himansh-you/Labelly.git",
      liveUrl: "https://labelly--40iw2plma1.expo.app/onboarding",
      imageUrl: "/src/assets/images/placeholder.png"
    },
    {
      id: 2,
      title: "BSE Stock Predictor",
      description: "Deep learning stock prediction model using Bidirectional LSTM with 98.05% R² accuracy. Processes 3.4M+ data points combining historical stock data with news sentiment analysis for market forecasting.",
      technologies: ["Python", "TensorFlow", "Keras", "Pandas", "NumPy", "scikit-learn"],
      githubUrl: "https://github.com/himansh-you/BSE_stock_predictor.git",
      liveUrl: "",
      imageUrl: "/src/assets/images/placeholder.png"
    },
    {
      id: 3,
      title: "CollabSphere",
      description: "Full-stack collaboration platform serving 100+ users with partner search optimization. Features RESTful APIs, real-time WebSocket communication, and Google OAuth authentication for seamless project collaboration.",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "WebSocket", "Google OAuth"],
      githubUrl: "https://github.com/himansh-you/CollabSphere.git",
      liveUrl: "",
      imageUrl: "/src/assets/images/placeholder.png"
    }
  ];



  // Safe fallback component instead of innerHTML
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
    <section className="section bg-white py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="px-8 sm:px-6 lg:px-8" style={{ marginBottom: '20px' }}>
          <h2 className="font-lilita text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-8">
            My Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <div key={project.id}>
              {/* Project Card - Now transparent with no shadow */}
              <div 
                data-testid={`project-card-${project.id}`}
                className="bg-transparent rounded-3xl p-8 lg:p-12 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                  {/* Project Image - Always on left with drop shadow and constrained scaling */}
                  <div className="lg:w-1/2">
                    <div className="relative aspect-video bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl overflow-hidden border-4 border-gray-900 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
                      {/* Loading State */}
                      {imageLoading[project.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
                          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      
                      {/* Image or Fallback */}
                      {imageErrors[project.id] ? (
                        <ProjectImageFallback title={project.title} />
                      ) : (
                        <img 
                          src={project.imageUrl} 
                          alt={`Screenshot showcasing the ${project.title} project interface and features`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onLoad={() => handleImageLoad(project.id)}
                          onError={() => handleImageError(project.id)}
                          onLoadStart={() => handleImageStart(project.id)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Project Details - Always on right */}
                  <div className="lg:w-1/2 space-y-8">
                    {/* Project Header */}
                    <div className="space-y-4">
                      <h3 className="font-lilita text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-tight">
                        {project.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies Section */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-all duration-200 shadow-sm"
                            style={{ 
                              marginTop: '0.5rem',
                              paddingLeft: '0.5rem', 
                              paddingRight: '0.5rem',  
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>




                    {/* Action Buttons */}
                    <div className="pt-10">
                      <div className="flex flex-col sm:flex-row gap-4" style={{ marginTop: '0.5rem' }}>
                        <SketchButton
                          text="Github"
                          fillColor={CONSTANTS.COLORS.GITHUB}
                          width={CONSTANTS.BUTTON_DIMENSIONS.width}
                          height={CONSTANTS.BUTTON_DIMENSIONS.height}
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          aria-label={`View source code for ${project.title} on GitHub`}
                        />
                        
                        <SketchButton
                          text="Live Demo"
                          fillColor={CONSTANTS.COLORS.DEMO}
                          width={CONSTANTS.BUTTON_DIMENSIONS.width}
                          height={CONSTANTS.BUTTON_DIMENSIONS.height}
                          onClick={() => window.open(project.liveUrl, '_blank')}
                          aria-label={`View live demo of ${project.title}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Separator (except for last project) */}
              {index < projects.length - 1 && (
                <div className="flex justify-center mt-16">
                  <div className="flex items-center space-x-2">
                    <div className="h-5"></div>
                    <div className="h-5"></div>
                    <div className="h-5"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* More Projects Button */}
        <div className="flex justify-center mt-32" style={{ marginTop: '20px' }}>
          <SketchButton
            text="More Projects"
            fillColor="#f97316"
            width={180}
            height={70}
            onClick={() => navigate('/projects')}
          />
        </div>
        
      </div>
    </section>
  );
};

export default Projects;
