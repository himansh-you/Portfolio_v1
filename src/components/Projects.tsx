import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import rough from 'roughjs/bin/rough';
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
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const canvasRefs = useRef<Record<number, HTMLCanvasElement | null>>({});

  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: "Labelly",
      description: "AI-powered mobile app that scans food ingredient labels with 95% accuracy. Built with React Native and Flask, featuring real-time safety scoring and allergen detection through Perplexity API integration.",
      technologies: ["React Native", "Expo", "Flask", "Firebase", "Sonar API"],
      githubUrl: "https://github.com/himansh-you/Labelly.git",
      liveUrl: "https://labelly--40iw2plma1.expo.app/onboarding",
      imageUrl: "/src/assets/images/labelly_mockup.png"
    },
    {
      id: 2,
      title: "BSE Stock Predictor",
      description: "Deep learning stock prediction model using Bidirectional LSTM with 98.05% R² accuracy. Processes 3.4M+ data points combining historical stock data with news sentiment analysis for market forecasting.",
      technologies: ["Python", "TensorFlow", "Keras", "Pandas", "NumPy", "scikit-learn"],
      githubUrl: "https://github.com/himansh-you/BSE_stock_predictor.git",
      liveUrl: "",
      imageUrl: "/src/assets/images/BSE_pred_mockup.png"
    },
    {
      id: 3,
      title: "CollabSphere",
      description: "Full-stack collaboration platform serving 100+ users with partner search optimization. Features RESTful APIs, real-time WebSocket communication, and Google OAuth authentication for seamless project collaboration.",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "WebSocket", "Google OAuth"],
      githubUrl: "https://github.com/himansh-you/CollabSphere.git",
      liveUrl: "",
      imageUrl: "/src/assets/images/Collabshpere_mockup.png"
    }
  ], []);



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

  // Font loading effect
  useEffect(() => {
    const loadFont = async () => {
      try {
        if ('fonts' in document) {
          await document.fonts.load('400 20px "Lilita One"');
          setFontLoaded(true);
        } else {
          setTimeout(() => setFontLoaded(true), 300);
        }
      } catch {
        console.warn('Font loading failed, using fallback');
        setFontLoaded(true);
      }
    };
    loadFont();
  }, []);

  // Draw rough.js border for each project with simple rectangles
  useEffect(() => {
    if (!fontLoaded) return;

    const drawBorders = () => {
      projects.forEach((project) => {
        const canvas = canvasRefs.current[project.id];
        if (!canvas) return;

        // Get the actual container dimensions
        const container = canvas.parentElement;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const canvasWidth = rect.width;
        const canvasHeight = rect.height;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const rc = rough.canvas(canvas);

        // Draw simple rectangle outline like the buttons
        rc.rectangle(8, 8, canvasWidth - 16, canvasHeight - 16, {
          stroke: '#000',
          strokeWidth: 4,
          roughness: 1.8,
          bowing: 1,
          seed: hoveredProject === project.id ? 2 : 1,
        });
      });
    };

    drawBorders();
    
    // Redraw on window resize
    window.addEventListener('resize', drawBorders);
    return () => window.removeEventListener('resize', drawBorders);
  }, [fontLoaded, hoveredProject, projects]);

  return (
    <section className="section bg-transparent py-24">
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
                    <div 
                      className="relative aspect-video transform transition-all duration-300 hover:scale-[1.02]"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      {/* Image Container */}
                      <div className="absolute inset-0 z-0" style={{ padding: '8px' }}>
                        <div className="relative w-full h-full bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden shadow-2xl">
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
                      
                      {/* Rough.js outline on top */}
                      <canvas
                        ref={(el) => {
                          canvasRefs.current[project.id] = el;
                        }}
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{ 
                          width: '100%',
                          height: '100%',
                          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'
                        }}
                      />
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
