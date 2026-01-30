import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  RiMenu3Line,
  RiCloseLine,
  RiCodeSSlashLine,
  RiPaletteLine,
  RiUserSmileLine,
  RiTerminalBoxLine,
  RiLayoutMasonryLine,
  RiBugLine,
  RiInstagramFill,
  RiLinkedinFill,
  RiWhatsappFill,
  RiTelegramLine,
  RiPhoneLine,
  RiGithubFill,
  RiArrowRightLine,
  RiDownloadLine,
  RiBriefcaseLine,
} from 'react-icons/ri';
import './index.css';

// Custom Cursor
const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = `${clientX}px`;
        cursorDotRef.current.style.top = `${clientY}px`;
        cursorOutlineRef.current.animate({ left: `${clientX}px`, top: `${clientY}px` }, { duration: 500, fill: "forwards" });
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-outline" ref={cursorOutlineRef}></div>
    </>
  );
};

// Moving Shapes Background
const Background = () => (
  <div className="bg-animation">
    <div className="blob blob-1"></div>
    <div className="blob blob-2"></div>
    <div className="blob blob-3"></div>
  </div>
);

// Typewriter Effect
const Typewriter = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === texts[index].length ? 1000 : 150, parseInt(Math.random() * 350)));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return <span className="text-gradient">{`${texts[index].substring(0, subIndex)}${blink ? "|" : " "}`}</span>;
};

// Skill Bar Component
const SkillBar = ({ skill, percentage, delay }) => (
  <motion.div
    className="skill-bar-container"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
  >
    <div className="skill-info">
      <span>{skill}</span>
      <span>{percentage}%</span>
    </div>
    <div className="skill-track">
      <motion.div
        className="skill-progress"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: delay + 0.2 }}
      />
    </div>
  </motion.div>
);

// Timeline Item
const TimelineItem = ({ data, index }) => (
  <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
    <div className="timeline-dot"></div>
    <motion.div
      className="timeline-content"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <span style={{ color: 'var(--secondary-color)', fontSize: '0.9rem' }}>{data.year}</span>
      <h3 style={{ fontSize: '1.2rem', margin: '5px 0' }}>{data.role}</h3>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{data.company}</p>
      <p style={{ marginTop: '10px', fontSize: '0.95rem' }}>{data.desc}</p>
    </motion.div>
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const services = [
    { icon: <RiPaletteLine />, title: 'UI/UX Design', desc: 'Crafting intuitive and aesthetic user interfaces that drive engagement and satisfaction.' },
    { icon: <RiCodeSSlashLine />, title: 'Frontend Developer', desc: 'Building responsive web apps with React, standard semantic HTML5, and modern CSS.' },
    { icon: <RiTerminalBoxLine />, title: 'Google App Script', desc: 'Automating Google Workspace (Sheet, Docs, Forms) to save time and streamline workflows.' },
    { icon: <RiLayoutMasonryLine />, title: 'Freelance Services', desc: 'Delivering high-quality web solutions on time and within budget for global clients.' },
  ];

  const experience = [
    { year: '2023 - Present', role: 'Frontend Developer', company: 'Freelance', desc: 'Building modern web applications for diverse clients using React and Tailwind.' },
    { year: '2022 - 2023', role: 'Junior Web Designer', company: 'Creative Studio', desc: 'Assisted in designing layouts and implementing responsive UI components.' },
    { year: '2021 - 2022', role: 'Intern', company: 'Tech Solutions', desc: 'Learned the fundamentals of web development and contributed to internal tools.' },
  ];

  const portfolioItems = [
    { src: '/b1.png', title: 'E-Commerce Dashboard', tags: ['React', 'Chart.js'] },
    { src: '/i3.png', title: 'SaaS Platform', tags: ['Next.js', 'Tailwind'] },
    { src: '/i4.png', title: 'Portfolio V1', tags: ['Legacy', 'CSS'] },
    { src: '/i5.jpg', title: 'Future AI System', tags: ['OpenAI', 'React'] },
  ];

  return (
    <>
      <CustomCursor />
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Background />

      <nav className={scrolled || isMenuOpen ? 'scrolled' : ''}>
        <div className="nav__bar">
          <a href="#" className="nav__logo">
            <div className="logo-icon">P</div>
            <span>pragadeesh</span>
          </a>
          <div className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </div>
          <ul className={`nav__links ${isMenuOpen ? 'open' : ''}`}>
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <li key={item}><a href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>{item}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      <header className="section__container header__container" id="home">
        <div className="header__content-wrapper">
          <motion.div
            className="header__content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="hire-badge">Available for Work</div>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', fontWeight: 'bold' }}>HELLO, I'M</h2>
            <h1 style={{ fontSize: '3.5rem', lineHeight: '1.2', margin: '10px 0' }}>
              Pragadeesh<br />
              <span className="text-gradient" style={{ fontSize: '0.8em' }}>
                <Typewriter texts={['Frontend Developer', 'Freelancer']} />
              </span>
            </h1>
            <p className="header__description">
              I am a professional Freelancer and Developer. I build beautiful digital experiences and automate business workflows with Google App Script.
            </p>
            <div className="header__btns">
              <a href="#contact" className="btn btn-primary">Hire Me <RiBriefcaseLine /></a>
              <a href="/Pragadeesh_CV.png" download className="btn btn-secondary">Download CV <RiDownloadLine /></a>
            </div>
          </motion.div>

          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} transitionSpeed={1500}>
            <motion.div
              className="header__image"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-shape"></div>
              <img src="/pragadeesh_new.jpg" alt="Pragadeesh" style={{ borderRadius: '30px', position: 'relative', zIndex: 2 }} />
            </motion.div>
          </Tilt>
        </div>
      </header>

      <section className="section__container about__container" id="about">
        <div>
          <img src="/pragadeesh2.jpg" alt="About Me" style={{ borderRadius: '20px', marginBottom: '2rem', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} />
          <span className="section__subtitle">About Me</span>
          <h2 className="section__title" style={{ marginBottom: '2rem' }}>Technical Proficiency</h2>
          <div className="skills-wrapper">
            <SkillBar skill="Frontend Development (HTML/CSS/JS)" percentage={95} delay={0} />
            <SkillBar skill="Google App Script & Automation" percentage={92} delay={0.2} />
            <SkillBar skill="React.js & Redux" percentage={90} delay={0.4} />
            <SkillBar skill="Freelancing & Client Management" percentage={88} delay={0.6} />
          </div>
        </div>
        <div className="timeline-container-wrapper">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>My Journey</h3>
          <div className="timeline">
            {experience.map((item, index) => (
              <TimelineItem key={index} data={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section__container" id="service">
        <div className="section__header-wrapper">
          <span className="section__subtitle">What I Offer</span>
          <h2 className="section__title">Specialized Services</h2>
        </div>
        <div className="service__grid">
          {services.map((service, index) => (
            <Tilt key={index} tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={1000} scale={1.05}>
              <motion.div
                className="service__card glass"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="service__icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

      <section className="section__container" id="portfolio">
        <div className="section__header-wrapper">
          <span className="section__subtitle">My Work</span>
          <h2 className="section__title">Featured Projects</h2>
        </div>
        <div className="portfolio__grid">
          {portfolioItems.map((item, index) => (
            <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02}>
              <motion.div
                className="portfolio__card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={item.src} alt={item.title} />
                <div className="portfolio__overlay">
                  <h3>{item.title}</h3>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{ background: 'var(--primary-color)', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

      <section className="section__container contact__container" id="contact">
        <span className="section__subtitle">Contact Me</span>
        <h2 className="section__title">Let's Work Together</h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-dim)' }}>
          Always open to discussing product design work or partnership opportunities.
        </p>
        <div className="social__links">
          <a href="https://github.com/pragadeesh1024" target="_blank" rel="noopener noreferrer" className="social__btn"><RiGithubFill /></a>
          <a href="https://www.linkedin.com/in/pragadeesh-waran-t-b732212a3" target="_blank" rel="noopener noreferrer" className="social__btn"><RiLinkedinFill /></a>
          <a href="https://wa.me/917094985957" target="_blank" rel="noopener noreferrer" className="social__btn"><RiWhatsappFill /></a>
          <a href="https://t.me/Potter_1024" className="social__btn"><RiTelegramLine /></a>
          <a href="tel:+917094985957" className="social__btn"><RiPhoneLine /></a>
        </div>
      </section>

      <footer>
        <p>Copyright © 2026. Designed & Built by Pragadeesh.</p>
      </footer>
    </>
  );
}

export default App;
