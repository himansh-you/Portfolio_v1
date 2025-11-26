import React, { useRef, useEffect, useState } from 'react';
import rough from 'roughjs/bin/rough'; 
import profileImage from '../assets/images/profile.png';
import TechStackMarquee from './TechStackMarquee';
import SketchButton from './SketchButton';

const Hero: React.FC = () => {
  // Typing identifiers
  const identifiers = [
    'Full-Stack Developer',
    'AI/ML Engineer',
    'Mobile App Developer',
    'B.Tech CSE Student'
  ];
  
  // Typing animation states
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(100);

  // Blob hover state
  const [isBlobHovered, setIsBlobHovered] = useState(false);

  // Refs for RoughJS (blob only)
  const blobCanvasRef = useRef<HTMLCanvasElement>(null);
  const outlineCanvasRef = useRef<HTMLCanvasElement>(null);

  // Typing effect
  useEffect(() => {
    const handleTyping = () => {
      const fullText = identifiers[currentIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypeSpeed(80);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypeSpeed(65);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((idx) => (idx + 1) % identifiers.length);
        setTypeSpeed(50);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, typeSpeed]);

  // Blob canvas drawing effect
  useEffect(() => {
    const canvas = blobCanvasRef.current;
    if (!canvas) return;

    const canvasWidth = 640;
    const canvasHeight = 640;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, '#fb923c');
    gradient.addColorStop(0.5, '#fdba74');
    gradient.addColorStop(1, '#fbbf24');
    
    // Create blob path
    const scale = 3.2;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    
    const blobPath = `M ${centerX + 58.5 * scale} ${centerY - 56.4 * scale} ` +
      `C ${centerX + 73.4 * scale} ${centerY - 43.7 * scale}, ${centerX + 81.3 * scale} ${centerY - 21.8 * scale}, ${centerX + 81.7 * scale} ${centerY + 0.4 * scale} ` +
      `C ${centerX + 82.1 * scale} ${centerY + 22.7 * scale}, ${centerX + 75.1 * scale} ${centerY + 45.4 * scale}, ${centerX + 60.3 * scale} ${centerY + 57.1 * scale} ` +
      `C ${centerX + 45.4 * scale} ${centerY + 68.8 * scale}, ${centerX + 22.7 * scale} ${centerY + 69.4 * scale}, ${centerX + 1.5 * scale} ${centerY + 68 * scale} ` +
      `C ${centerX - 19.8 * scale} ${centerY + 66.5 * scale}, ${centerX - 39.6 * scale} ${centerY + 62.9 * scale}, ${centerX - 48.2 * scale} ${centerY + 51.2 * scale} ` +
      `C ${centerX - 56.9 * scale} ${centerY + 39.6 * scale}, ${centerX - 54.4 * scale} ${centerY + 19.8 * scale}, ${centerX - 53.6 * scale} ${centerY + 0.8 * scale} ` +
      `C ${centerX - 52.8 * scale} ${centerY - 18.2 * scale}, ${centerX - 53.7 * scale} ${centerY - 36.4 * scale}, ${centerX - 45 * scale} ${centerY - 49.1 * scale} ` +
      `C ${centerX - 36.4 * scale} ${centerY - 61.8 * scale}, ${centerX - 18.2 * scale} ${centerY - 69 * scale}, ${centerX + 1.8 * scale} ${centerY - 70.8 * scale} ` +
      `C ${centerX + 21.8 * scale} ${centerY - 72.6 * scale}, ${centerX + 43.7 * scale} ${centerY - 69.1 * scale}, ${centerX + 58.5 * scale} ${centerY - 56.4 * scale} Z`;

    // Apply rotation and fill with gradient only
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(-5 * Math.PI / 180);
    ctx.translate(-centerX, -centerY);
    
    ctx.fillStyle = gradient;
    ctx.fill(new Path2D(blobPath));
    
    ctx.restore();
  }, [isBlobHovered]); // Still depend on hover for potential future gradient changes

  // Outline canvas effect
  useEffect(() => {
    const canvas = outlineCanvasRef.current;
    if (!canvas) return;

    const canvasWidth = 640;
    const canvasHeight = 640;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rc = rough.canvas(canvas);
    
    // Create blob path (same as background)
    const scale = 3.2;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    
    const blobPath = `M ${centerX + 58.5 * scale} ${centerY - 56.4 * scale} ` +
      `C ${centerX + 73.4 * scale} ${centerY - 43.7 * scale}, ${centerX + 81.3 * scale} ${centerY - 21.8 * scale}, ${centerX + 81.7 * scale} ${centerY + 0.4 * scale} ` +
      `C ${centerX + 82.1 * scale} ${centerY + 22.7 * scale}, ${centerX + 75.1 * scale} ${centerY + 45.4 * scale}, ${centerX + 60.3 * scale} ${centerY + 57.1 * scale} ` +
      `C ${centerX + 45.4 * scale} ${centerY + 68.8 * scale}, ${centerX + 22.7 * scale} ${centerY + 69.4 * scale}, ${centerX + 1.5 * scale} ${centerY + 68 * scale} ` +
      `C ${centerX - 19.8 * scale} ${centerY + 66.5 * scale}, ${centerX - 39.6 * scale} ${centerY + 62.9 * scale}, ${centerX - 48.2 * scale} ${centerY + 51.2 * scale} ` +
      `C ${centerX - 56.9 * scale} ${centerY + 39.6 * scale}, ${centerX - 54.4 * scale} ${centerY + 19.8 * scale}, ${centerX - 53.6 * scale} ${centerY + 0.8 * scale} ` +
      `C ${centerX - 52.8 * scale} ${centerY - 18.2 * scale}, ${centerX - 53.7 * scale} ${centerY - 36.4 * scale}, ${centerX - 45 * scale} ${centerY - 49.1 * scale} ` +
      `C ${centerX - 36.4 * scale} ${centerY - 61.8 * scale}, ${centerX - 18.2 * scale} ${centerY - 69 * scale}, ${centerX + 1.8 * scale} ${centerY - 70.8 * scale} ` +
      `C ${centerX + 21.8 * scale} ${centerY - 72.6 * scale}, ${centerX + 43.7 * scale} ${centerY - 69.1 * scale}, ${centerX + 58.5 * scale} ${centerY - 56.4 * scale} Z`;

    // Draw only the sketchy outline
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(-5 * Math.PI / 180);
    ctx.translate(-centerX, -centerY);
    
    rc.path(blobPath, {
      fill: 'none',
      stroke: '#000',
      strokeWidth: isBlobHovered ? 10 : 8,
      roughness: isBlobHovered ? 2 : 1.6,
      bowing: isBlobHovered ? 2.5 : 1.8,
      strokeLineDash: [],
      strokeLineDashOffset: 0,
      preserveVertices: true,
    });
    
    ctx.restore();
  }, [isBlobHovered]);

  const handleResumeDownload = () => {
    window.open('/HimanshuGupta_CV.pdf', '_blank');
  };

  return (
    <>
      <section className="section bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
            
            {/* Left Column - Text Content */}
            <div className="flex flex-col space-y-6 text-center lg:text-left">
              <h1 className="font-lilita text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
                Hey There,<br />
                This is Himanshu,
              </h1>

              {/* Animated Professional Identifier */}
              <div className="min-h-[60px] flex items-center justify-center lg:justify-start">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700">
                  and I am a{' '}
                  <span className="font-semibold text-orange-600 relative">
                    {currentText}
                    <span className="animate-pulse text-orange-500">|</span>
                  </span>
                </p>
              </div>

              {/* Resume Button using SketchButton Component */}
              <div className="flex justify-center lg:justify-start">
                <SketchButton
                  text="Resume"
                  fillColor="#fbbf24"
                  onClick={handleResumeDownload}
                />
              </div>
            </div>

            {/* Right Column - Profile Image with Layered Blob */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[520px] h-[520px]">
                
                {/* Hover-sensitive Blob Area */}
                <div 
                  className="absolute left-1/2 top-1/2 w-[440px] h-[440px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out cursor-pointer rounded-full"
                  style={{
                    transform: isBlobHovered ? 'scale(1.02)' : 'scale(1)'
                  }}
                  onMouseEnter={() => setIsBlobHovered(true)}
                  onMouseLeave={() => setIsBlobHovered(false)}
                >
                  {/* Layer 1: Blob Background Canvas */}
                  <canvas
                    ref={blobCanvasRef}
                    className="absolute left-1/2 top-1/2 w-[640px] h-[640px] -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl transition-all duration-300"
                    style={{ 
                      zIndex: 0,
                      filter: isBlobHovered ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))' : 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))'
                    }}
                  />

                  {/* Layer 2: Profile Image Clipped to Blob Shape */}
                  <svg
                    viewBox="0 0 200 200"
                    className="absolute left-1/2 top-1/2 w-[640px] h-[640px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                    style={{ 
                      transform: isBlobHovered ? 'rotate(-5deg) scale(1.01)' : 'rotate(-5deg)', 
                      zIndex: 1, 
                      pointerEvents: 'none' 
                    }}
                  >
                    <defs>
                      <clipPath id="blobImageClip">
                        <path
                          d="M58.5,-56.4C73.4,-43.7,81.3,-21.8,81.7,0.4C82.1,22.7,75.1,45.4,60.3,57.1C45.4,68.8,22.7,69.4,1.5,68C-19.8,66.5,-39.6,62.9,-48.2,51.2C-56.9,39.6,-54.4,19.8,-53.6,0.8C-52.8,-18.2,-53.7,-36.4,-45,-49.1C-36.4,-61.8,-18.2,-69,1.8,-70.8C21.8,-72.6,43.7,-69.1,58.5,-56.4Z"
                          transform="translate(100 100) scale(1.08)"
                        />
                      </clipPath>
                    </defs>
                    <image
                      href={profileImage}
                      width="150"
                      height="200"
                      x="20"
                      y="20"
                      clipPath="url(#blobImageClip)"
                      style={{ transform: 'scale(0.91)', transformOrigin: '100px 100px' }}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </svg>

                  {/* Layer 3: Sketchy Outline Canvas */}
                  <canvas
                    ref={outlineCanvasRef}
                    className="absolute left-1/2 top-1/2 w-[640px] h-[640px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
                    style={{ 
                      zIndex: 2
                    }}
                  />
                </div>

                {/* Decorative Accents - Responsive to Blob Hover but Don't Trigger It */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-yellow-300 opacity-60 transition-all duration-300 pointer-events-none" 
                  style={{
                    borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
                    transform: isBlobHovered ? 'rotate(35deg) scale(1.05)' : 'rotate(25deg)',
                    zIndex: 3
                  }}
                />

                <div className="absolute -top-4 -left-6 text-gray-700 opacity-30 transition-all duration-300 pointer-events-none">
                  <svg 
                    width="24" 
                    height="24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    style={{ 
                      transform: isBlobHovered ? 'rotate(-25deg) scale(1.05)' : 'rotate(-15deg)' 
                    }}
                  >
                    <path d="M3 7 L9 3 M7 11 L13 7" strokeLinecap="round" />
                  </svg>
                </div>
                
                <div className="absolute -bottom-2 -right-4 w-8 h-8 bg-orange-200 opacity-40 transition-all duration-300 pointer-events-none"
                  style={{
                    borderRadius: '40% 60% 30% 70% / 60% 30% 70% 40%',
                    transform: isBlobHovered ? 'rotate(-30deg) scale(1.05)' : 'rotate(-20deg)',
                    zIndex: 3
                  }}
                />
                
                <div className="absolute top-4 -left-2 w-4 h-4 border-2 border-gray-600 rounded-full opacity-20 transition-all duration-300 pointer-events-none"
                  style={{ 
                    transform: isBlobHovered ? 'rotate(20deg) scale(1.05)' : 'rotate(10deg)',
                    zIndex: 3
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Tech Stack Marquee - Positioned within hero section */}
        <div className="mt-16">
          <TechStackMarquee />
        </div>
      </section>
    </>
  );
};

export default Hero;
