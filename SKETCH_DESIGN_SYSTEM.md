# Sketch Design System Documentation

## 🎨 Overview

Your portfolio uses a unique **Excalidraw-inspired sketch aesthetic** powered by **RoughJS**, creating a playful, hand-crafted vibe that contrasts beautifully with modern glassmorphism. This system provides reusable sketch utilities, animations, and patterns.

---

## 📦 Available Sketch Components

### **1. SketchDivider**
Animated section dividers with various sketch styles.

**Import:**
```tsx
import SketchDivider from './components/SketchDivider';
```

**Props:**
- `type`: `'wavy' | 'zigzag' | 'straight' | 'dashed' | 'scribble'` (default: `'wavy'`)
- `color`: Hex color string (default: `'#000000'`)
- `strokeWidth`: Number (default: `2`)
- `roughness`: Number 0-3 (default: `1.5`)
- `className`: Additional CSS classes

**Usage:**
```tsx
<SketchDivider type="wavy" color="#f97316" strokeWidth={2.5} />
<SketchDivider type="scribble" color="#fbbf24" strokeWidth={2} />
<SketchDivider type="zigzag" color="#3b82f6" />
```

**Features:**
- Auto-plays draw-in animation on scroll into view
- Intersection Observer for performance
- Responsive width

---

### **2. SketchBorder**
Wraps content with animated sketch borders.

**Import:**
```tsx
import SketchBorder from './components/SketchBorder';
```

**Props:**
- `children`: React nodes to wrap
- `color`: Border color (default: `'#000000'`)
- `strokeWidth`: Border thickness (default: `2.5`)
- `roughness`: Sketch roughness (default: `1.5`)
- `fillColor`: Optional fill color
- `padding`: CSS padding (default: `'1.5rem'`)
- `className`: Additional classes
- `hoverEffect`: Enable hover animation (default: `true`)

**Usage:**
```tsx
<SketchBorder color="#f97316" strokeWidth={3} hoverEffect={true}>
  <h3>Wrapped Content</h3>
  <p>This card has a sketchy border!</p>
</SketchBorder>

<SketchBorder color="#3b82f6" fillColor="#dbeafe" padding="2rem">
  <div>Filled sketch card</div>
</SketchBorder>
```

**Features:**
- Draw-in animation on scroll
- Hover lift effect (optional)
- Auto-adjusts to content size
- ResizeObserver for dynamic sizing

---

### **3. SketchHighlight**
Decorative sketch elements for emphasis.

**Import:**
```tsx
import SketchHighlight from './components/SketchHighlight';
```

**Props:**
- `type`: `'underline' | 'circle' | 'arrow-right' | 'arrow-down' | 'star' | 'checkmark'`
- `color`: Highlight color (default: `'#f97316'`)
- `strokeWidth`: Line thickness (default: `2.5`)
- `className`: Additional classes
- `delay`: Animation delay in ms (default: `0`)

**Usage:**
```tsx
{/* Underline important text */}
<h2>
  Key Feature <SketchHighlight type="underline" color="#f97316" />
</h2>

{/* Circle around elements */}
<div className="relative inline-block">
  <span>Important!</span>
  <SketchHighlight type="circle" color="#fbbf24" className="absolute" />
</div>

{/* Arrow pointing to CTA */}
<SketchHighlight type="arrow-right" color="#10b981" />
<button>Click Here</button>

{/* Checkmark for completed items */}
<SketchHighlight type="checkmark" color="#10b981" delay={300} />
```

**Features:**
- Scroll-triggered animations
- Staggered delays for sequential reveals
- Multiple decorative shapes

---

## 🎭 CSS Utility Classes

### **Typography**

```tsx
{/* Handwritten font for accents */}
<p className="font-handwritten text-2xl">Handwritten note!</p>

{/* Sketch underline */}
<h3 className="sketch-underline">Underlined Title</h3>
```

### **Animations**

```tsx
{/* Pulse effect */}
<div className="sketch-pulse">Pulsing element</div>

{/* Wiggle animation */}
<div className="sketch-wiggle">Wiggling icon</div>

{/* Hover lift */}
<div className="sketch-hover-lift">Lifts on hover</div>
```

### **Backgrounds**

```tsx
{/* Scribble background pattern */}
<section className="sketch-scribble-bg">
  <h2>Content with sketch bg</h2>
</section>

{/* Sketch shadow effect */}
<div className="sketch-shadow rounded-lg p-4">
  Card with sketch shadow
</div>
```

### **Decorative Elements**

```tsx
{/* Arrow decoration */}
<a href="#" className="sketch-arrow-right">
  Learn More {/* Arrow appears on hover */}
</a>
```

### **Color Variants**

```tsx
<div className="sketch-orange">Orange sketch</div>
<div className="sketch-yellow">Yellow sketch</div>
<div className="sketch-blue">Blue sketch</div>
<div className="sketch-pink">Pink sketch</div>
<div className="sketch-green">Green sketch</div>
```

---

## 🎨 Recommended Color Palette

Use your brand colors for sketch elements:

| Color | Hex | Usage |
|-------|-----|-------|
| Orange | `#f97316` | Primary sketch accents, highlights |
| Yellow | `#fbbf24` | Secondary accents, warm highlights |
| Blue | `#3b82f6` | Cool accents, professional elements |
| Pink | `#ec4899` | Blog, creative sections |
| Green | `#10b981` | Success, contact elements |

---

## 📝 Usage Examples

### **Project Cards with Sketch Borders**

```tsx
import SketchBorder from './components/SketchBorder';

<SketchBorder color="#f97316" strokeWidth={3}>
  <div className="p-6">
    <h3 className="font-lilita text-2xl">Project Name</h3>
    <p>Project description...</p>
  </div>
</SketchBorder>
```

### **Section Headers with Highlights**

```tsx
import SketchHighlight from './components/SketchHighlight';

<div className="flex items-center gap-4">
  <h2 className="font-lilita text-5xl">About Me</h2>
  <SketchHighlight type="arrow-down" color="#fbbf24" />
</div>
```

### **Handwritten Notes/Annotations**

```tsx
<div className="relative">
  <img src="project.png" alt="Project" />
  <div className="absolute top-4 right-4 font-handwritten text-3xl text-orange-500 rotate-12">
    Check this out! →
  </div>
</div>
```

### **Interactive Contact Cards**

```tsx
import SketchBorder from './components/SketchBorder';

<SketchBorder 
  color="#10b981" 
  fillColor="rgba(16, 185, 129, 0.05)"
  className="cursor-pointer"
>
  <div className="text-center">
    <h4 className="font-handwritten text-2xl">Get in Touch</h4>
    <p>your.email@example.com</p>
  </div>
</SketchBorder>
```

---

## 🚀 Advanced Techniques

### **Layered Sketch Effects**

```tsx
<div className="relative sketch-scribble-bg">
  <SketchBorder color="#f97316" className="sketch-hover-lift">
    <div className="p-8">
      <h3 className="sketch-underline font-lilita">
        Layered Design
      </h3>
      <SketchHighlight type="star" color="#fbbf24" />
    </div>
  </SketchBorder>
</div>
```

### **Sequential Animations**

```tsx
<div className="space-y-4">
  <SketchHighlight type="checkmark" delay={0} />
  <SketchHighlight type="checkmark" delay={200} />
  <SketchHighlight type="checkmark" delay={400} />
</div>
```

### **Themed Section Breaks**

```tsx
{/* Alternate divider styles between sections */}
<SketchDivider type="wavy" color="#f97316" />
<section>Content</section>
<SketchDivider type="scribble" color="#fbbf24" />
<section>Content</section>
<SketchDivider type="zigzag" color="#3b82f6" />
```

---

## ♿ Accessibility

All sketch elements are decorative and:
- Use `pointer-events: none` where appropriate
- Don't interfere with screen readers
- Maintain WCAG color contrast on text
- Preserve keyboard navigation

---

## 🎯 Design Philosophy

**"A modern glassmorphic portfolio layered with playful sketch-like doodles, animated highlights, and hand-crafted icons—reflecting a developer's creative process, authenticity, and dynamic energy."**

### **Key Principles:**
1. **Contrast**: Sketch roughness vs. glass smoothness
2. **Movement**: Draw-in animations create energy
3. **Color**: Brand colors unify the aesthetic
4. **Playfulness**: Hand-drawn feel shows personality
5. **Subtlety**: Effects enhance, don't overwhelm

---

## 🔧 Performance Tips

1. **Lazy Loading**: Sketch elements animate only on scroll into view
2. **Throttling**: Intersection Observers prevent excessive re-renders
3. **SVG Optimization**: RoughJS generates lightweight paths
4. **CSS Animations**: Hardware-accelerated transforms
5. **Canvas Cleanup**: Proper unmounting prevents memory leaks

---

## 📚 Resources

- **RoughJS Docs**: https://roughjs.com/
- **Excalidraw**: https://excalidraw.com/
- **Caveat Font**: Google Fonts
- **Lilita One Font**: Google Fonts

---

## 🎨 Quick Reference

```tsx
// Section dividers
<SketchDivider type="wavy" color="#f97316" />

// Card borders
<SketchBorder color="#3b82f6">Content</SketchBorder>

// Highlights
<SketchHighlight type="arrow-right" color="#10b981" />

// Text utilities
<p className="font-handwritten">Note</p>
<h3 className="sketch-underline">Title</h3>

// Animations
<div className="sketch-pulse">Pulse</div>
<div className="sketch-wiggle">Wiggle</div>
<div className="sketch-hover-lift">Lift</div>
```

---

**Happy Sketching! ✨**

