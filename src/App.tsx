import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Certificates from './components/Certificates';
import AllProjects from './pages/AllProjects';
import RecentPosts from './components/RecentPosts';


// Home page component
const HomePage = () => (
  <>
    <section id="hero" className="scroll-offset">
      <Hero />
    </section>
    
    <section id="projects" className="scroll-offset">
      <Projects />
    </section>
    
    <section id="about" className="scroll-offset">
      <About />
    </section>

    <section id="certificates" className="scroll-offset">
      <Certificates />
    </section>

    <section id="recent-posts" className="scroll-offset">
      <RecentPosts username="heyhimanshyou" />
    </section>
    
    <section id="contact" className="scroll-offset min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-lilita text-4xl text-gray-900 mb-4">Contact Section</h1>
        <p className="text-gray-600">This will be the contact component</p>
      </div>
    </section>
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<AllProjects />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;