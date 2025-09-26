import React, { useState, useRef, useEffect } from 'react';
import rough from 'roughjs/bin/rough';

interface TabContent {
  id: string;
  title: string;
  content?: string;
  skills?: {
    category: string;
    items: string[];
  }[];
}

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('me');
  const [fontLoaded, setFontLoaded] = useState(false);
  const rectangleCanvasRef = useRef<HTMLCanvasElement>(null);
  const circleCanvasRef = useRef<HTMLCanvasElement>(null);

  const tabs: TabContent[] = [
    {
      id: 'me',
      title: 'Me',
      content: "I'm a final-year B.Tech student specializing in Computer Science, passionate about integrating AI/ML into full-stack and mobile development. With over 500+ coding problems solved and award-winning hackathon experience, I strive to build robust, scalable apps that address real-world challenges."
    },
    {
      id: 'experience',
      title: 'Experience',
      content: "As a Computer Science student at VIT Bhopal, I've built impactful projects including an AI-powered ingredient scanner achieving 95% accuracy, deep learning stock prediction models with 98.05% R² accuracy, and collaboration platforms serving 100+ users. My hackathon victories demonstrate quick thinking and technical leadership, while my AWS and AI engineering certifications showcase hands-on expertise in scalable solutions."
    },
    {
      id: 'education',
      title: 'Education',
      content: "Currently pursuing B.Tech in Computer Science and Engineering at VIT Bhopal, with a focus on AI/ML integration and practical applications. My academic journey is enriched by hands-on projects, successful hackathon participations, and continuous learning in emerging technologies. I'm preparing to transition into a full-time role as an AI/ML Engineer or Full-stack Developer."
    },
    {
      id: 'skills',
      title: 'Skills',
      skills: [
        {
          category: 'Programming Languages',
          items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'HTML5', 'CSS3']
        },
        {
          category: 'Frameworks & Libraries',
          items: ['React.js', 'Next.js', 'React Native', 'Expo', 'Node.js', 'Express.js', 'Flask', 'FastAPI']
        },
        {
          category: 'AI/ML & Data Science',
          items: ['TensorFlow', 'Keras', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy']
        },
        {
          category: 'Databases',
          items: ['MongoDB', 'MySQL', 'Firebase']
        },
        {
          category: 'Tools & DevOps',
          items: ['Git', 'GitHub', 'Docker', 'VS Code', 'CI/CD', 'WebSockets']
        },
        {
          category: 'Cloud Services',
          items: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'Firebase']
        }
      ]
    }
  ];

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
      } catch (error) {
        console.warn('Font loading failed, using fallback');
        setFontLoaded(true);
      }
    };
    loadFont();
  }, []);

  // Draw rough.js rectangle background
  useEffect(() => {
    const canvas = rectangleCanvasRef.current;
    if (!canvas || !fontLoaded) return;

    const canvasWidth = 350;  // Increased size
    const canvasHeight = 420; // Increased size
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rc = rough.canvas(canvas);
    
    // Draw the sketchy rectangle background (lighter green)
    rc.rectangle(10, 10, canvasWidth - 20, canvasHeight - 20, {
      fill: '#a7f3d0', // Lighter green to match reference
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 1.2,
      bowing: 2,
    });
  }, [fontLoaded]);

  // Draw rough.js circle overlay
  useEffect(() => {
    const canvas = circleCanvasRef.current;
    if (!canvas || !fontLoaded) return;

    const canvasWidth = 280;
    const canvasHeight = 280;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rc = rough.canvas(canvas);
    
    // Draw the sketchy circle overlay (lighter yellow)
    rc.circle(canvasWidth / 2, canvasHeight / 2, 240, { // Increased circle size
      fill: '#fde68a', // Lighter yellow to match reference
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: 3,
      roughness: 1.2,
      bowing: 2,
    });
  }, [fontLoaded]);

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <section className="section bg-white py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="px-8 sm:px-6 lg:px-8" style={{ marginBottom: '20px' }}>
          <h2 className="font-lilita text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-8">
            About
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-12">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-lilita text-lg sm:text-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.title}
                </button>
                {index < tabs.length - 1 && (
                  <span className="font-lilita text-lg sm:text-xl text-gray-400">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6">
              {currentTab.content ? (
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {currentTab.content}
                </p>
              ) : currentTab.skills ? (
                <div className="space-y-8">
                  {currentTab.skills.map((skillCategory, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-4">
                      <h4 className="font-lilita text-xl text-gray-800 border-b-2 border-orange-200 pb-2">
                        {skillCategory.category}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {skillCategory.items.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-2 bg-blue-50 text-blue-800 text-sm font-medium rounded-lg border border-blue-100 hover:bg-blue-100 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Overlapping Images - Right Side */}
          <div className="lg:w-1/2">
            <div className="relative flex justify-center items-center min-h-[450px]">
              {/* Rectangle Background (Green) */}
              <div className="absolute z-10 top-0 right-0">
                <canvas
                  ref={rectangleCanvasRef}
                  className="transition-all duration-300 hover:scale-105"
                  style={{ 
                    width: '350px',
                    height: '420px',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'
                  }}
                />
              </div>

              {/* Circle Overlay (Yellow) */}
              <div className="absolute z-20 bottom-0 left-0">
                <canvas
                  ref={circleCanvasRef}
                  className="transition-all duration-300 hover:scale-105"
                  style={{ 
                    width: '280px',
                    height: '280px',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
