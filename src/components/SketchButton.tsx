import React, { useRef, useEffect, useState } from 'react';
import rough from 'roughjs/bin/rough';

interface SketchButtonProps {
  text: string;
  fillColor?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
}

const SketchButton: React.FC<SketchButtonProps> = ({
  text,
  fillColor = '#fbbf24',
  width = 200,
  height = 80,
  onClick,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

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

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fontLoaded) return;

    const canvasWidth = width;
    const canvasHeight = height;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rc = rough.canvas(canvas);
    
    // Draw the sketchy rectangle background with more rounded vertices
    rc.rectangle(10, 10, canvasWidth - 20, canvasHeight - 20, {
      fill: fillColor,
      fillStyle: 'solid',
      stroke: '#000',
      strokeWidth: isHovered ? 3 : 2.5,
      roughness: 1, // Reduced from 1.4 for smoother, more rounded vertices
      bowing: 2,    // Reduced from 3 for smoother curves
    });

    // Draw text with Lilita One font
    ctx.font = 'normal 400 20px "Lilita One", cursive, sans-serif';
    ctx.fillStyle = '#111827';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Smooth text scaling on hover
    if (isHovered) {
      ctx.save();
      ctx.scale(1.02, 1.02); // Reduced scale for smoother effect
      ctx.fillText(text.toUpperCase(), (canvasWidth / 2) / 1.02, (canvasHeight / 2) / 1.02);
      ctx.restore();
    } else {
      ctx.fillText(text.toUpperCase(), canvasWidth / 2, canvasHeight / 2);
    }
  }, [isHovered, fontLoaded, text, fillColor, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={`cursor-pointer transition-all duration-300 ease-out ${className}`}
      style={{ 
        width: `${width * 0.96}px`, // Slightly smaller display size
        height: `${height * 0.8}px`,
        transform: isHovered ? 'scale(1.03) translateY(-2px)' : 'scale(1) translateY(0px)',
        filter: isHovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default SketchButton; 