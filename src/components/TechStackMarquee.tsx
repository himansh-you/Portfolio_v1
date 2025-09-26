import React, { useRef, useEffect } from 'react';
import rough from 'roughjs/bin/rough';

const TechStackMarquee: React.FC = () => {
  // Simplified tech stack array - just names
  const techStack = [
    // Programming Languages
    'Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'HTML5', 'CSS3',
    
    // Frameworks/Libraries
    'React.js', 'Next.js', 'React Native', 'Expo', 'Tailwind CSS', 'Bootstrap', 
    'Node.js', 'Express.js', 'Flask', 'FastAPI',
    
    // ML Libraries
    'TensorFlow', 'Keras', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
    
    // Tools
    'Git', 'GitHub', 'CI/CD', 'Docker', 'VS Code', 'Google OAuth', 'WebSockets',
    
    // Databases
    'MongoDB', 'MySQL', 'Firebase',
    
    // Cloud
    'AWS EC2', 'AWS S3', 'AWS Lambda'
  ];

  // Duplicate the array to create seamless infinite loop
  const duplicatedTechStack = [...techStack, ...techStack];

  // Canvas refs for sketchy lines
  const topLineCanvasRef = useRef<HTMLCanvasElement>(null);
  const bottomLineCanvasRef = useRef<HTMLCanvasElement>(null);

  // Draw top sketchy line
  useEffect(() => {
    const canvas = topLineCanvasRef.current;
    if (!canvas) return;

    const canvasWidth = 1600; // Increased width for full page span
    const canvasHeight = 20;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rc = rough.canvas(canvas);
    
    // Draw sketchy line across full width
    rc.line(0, canvasHeight / 2, canvasWidth, canvasHeight / 2, {
      stroke: '#000000',
      strokeWidth: 3,
      roughness: 1.2,
      bowing: 1,
    });
  }, []);

  // Draw bottom sketchy line
  useEffect(() => {
    const canvas = bottomLineCanvasRef.current;
    if (!canvas) return;

    const canvasWidth = 1600; // Increased width for full page span
    const canvasHeight = 20;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rc = rough.canvas(canvas);
    
    // Draw sketchy line across full width
    rc.line(0, canvasHeight / 2, canvasWidth, canvasHeight / 2, {
      stroke: '#000000',
      strokeWidth: 3,
      roughness: 1.2,
      bowing: 1,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        {/* <h2 className="font-lilita text-3xl md:text-4xl text-center text-gray-900 mb-4">
          Tech Stack & Skills
        </h2> */}
      </div>
      
      {/* Top Sketchy Line */}
      <div className="relative flex justify-center mb-6 overflow-hidden">
        {/* Gradient overlays for fade effect on top line */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-50 via-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent z-10"></div>
        
        <canvas
          ref={topLineCanvasRef}
          className="opacity-100"
          style={{ 
            width: '100vw', 
            height: '20px'
          }}
        />
      </div>
      
      {/* Infinite Scrolling Marquee */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-50 via-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent z-10"></div>
        
        <div className="flex animate-marquee whitespace-nowrap gap-6">
          {duplicatedTechStack.map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex-shrink-0"
            >
              <span className="font-semibold text-gray-800 whitespace-nowrap hover:drop-shadow-lg transition-all duration-300">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sketchy Line */}
      <div className="relative flex justify-center mt-6 overflow-hidden">
        {/* Gradient overlays for fade effect on bottom line */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-50 via-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent z-10"></div>
        
        <canvas
          ref={bottomLineCanvasRef}
          className="opacity-100"
          style={{ 
            width: '100vw', 
            height: '20px'
          }}
        />
      </div>
    </div>
  );
};

export default TechStackMarquee; 