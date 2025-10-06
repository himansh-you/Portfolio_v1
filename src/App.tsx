import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Certificates from './components/Certificates';
import AllProjects from './pages/AllProjects';
import RecentPosts from './components/RecentPosts';
import Contacts from './components/Contacts';

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
    
    <section id="contact" className="scroll-offset">
      <Contacts />
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