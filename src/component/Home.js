import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function LiquidCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let particles = [];
    let pointer = { x: -1000, y: -1000 };
    let animationId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        260,
        Math.max(100, Math.floor((width * height) / 4500))
      );

      particles = Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2,
        radius: 0.2 + Math.random() * 0.8,
        size: 0.7 + Math.random() * 1.7,
        speed: 0.001 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.53;
      const cy = height * 0.46;
      const rx = Math.min(width * 0.35, 270);
      const ry = Math.min(height * 0.34, 220);

      const distance = Math.hypot(pointer.x - cx, pointer.y - cy);
      const influence = Math.max(0, 1 - distance / 300);

      // Soft metallic glow
      const glow = ctx.createRadialGradient(
        cx, cy, 5, cx, cy, Math.max(rx, ry) * 1.5
      );
      glow.addColorStop(0, "rgba(124, 58, 237, 0.17)");
      glow.addColorStop(0.5, "rgba(34, 211, 238, 0.07)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Flowing elliptical particle sculpture
      particles.forEach((p, i) => {
        const angle = p.angle + frame * p.speed;
        const wave = Math.sin(angle * 3 + p.phase + frame * 0.009);
        const ripple = Math.cos(angle * 5 - frame * 0.006);

        let x =
          cx +
          Math.cos(angle) * rx * p.radius +
          Math.sin(angle * 2 + p.phase) * 22 +
          wave * 12;

        let y =
          cy +
          Math.sin(angle) * ry * p.radius +
          ripple * 19 +
          Math.cos(angle * 3 + p.phase) * 12;

        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const d = Math.hypot(dx, dy) || 1;
        const force = Math.max(0, 1 - d / 150) * influence;

        x += (dx / d) * force * 35;
        y += (dy / d) * force * 35;

        const alpha = 0.3 + 0.7 * (1 - p.radius * 0.55);

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          i % 4 === 0
            ? `rgba(103, 232, 249, ${alpha})`
            : i % 3 === 0
              ? `rgba(196, 181, 253, ${alpha})`
              : `rgba(235, 240, 255, ${alpha * 0.8})`;
        ctx.fill();
      });

      // Fine flowing metallic curves
      for (let j = 0; j < 5; j++) {
        ctx.beginPath();

        for (let k = 0; k <= 100; k++) {
          const a = (k / 100) * Math.PI * 2;
          const r = 0.72 + j * 0.065;
          const wave = Math.sin(a * 4 + frame * 0.008 + j) * 9;

          const x = cx + Math.cos(a) * rx * r + wave;
          const y = cy + Math.sin(a) * ry * r + wave * 0.6;

          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.strokeStyle =
          j % 2 === 0
            ? "rgba(167, 139, 250, 0.15)"
            : "rgba(103, 232, 249, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      frame += 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="liquid-canvas" aria-hidden="true" />;
}

const jobs = [
  {
    company: "TCS",
    role: "Frontend Developer",
    location: "Bangalore",
    salary: "₹6–10 LPA",
    type: "Remote",
    color: "tcs",
  },
  {
    company: "Infosys",
    role: "Java Developer",
    location: "Hyderabad",
    salary: "₹4–8 LPA",
    type: "Hybrid",
    color: "infosys",
  },
  {
    company: "Wipro",
    role: "UI/UX Designer",
    location: "Pune",
    salary: "₹5–9 LPA",
    type: "On-site",
    color: "wipro",
  },
];

export default function Home() {
  const startVoice = () => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support voice.");
      return;
    }

    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      "Welcome to Job Portal. Discover new opportunities. Build your career. Create your future. Explore jobs, find opportunities that match your skills, and take the next step in your career. Thank you for visiting Job Portal."
    );

    message.lang = "en-US";
    message.rate = 0.9;
    message.pitch = 1.05;
    message.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (voice) =>
        voice.lang.startsWith("en") &&
        /female|zira|samantha|aria/i.test(voice.name)
    );

    if (preferredVoice) {
      message.voice = preferredVoice;
    }

    window.speechSynthesis.speak(message);
  };
  return (
    <main className="jp-home">
      <div className="jp-grid-bg" />

      <header className="jp-navbar">
        <Link to="/" className="jp-logo">
          <span className="jp-logo-icon">J</span>
          <span>Job<span className="jp-logo-accent">Portal</span></span>
        </Link><nav>
          <a link to="/home" className="jp-nav-link ">Home</a>
          <a link to="/jobs" className="jp-nav-link">Explore Jobs</a>
          <a link to="/about" className="jp-nav-link">About</a>
        </nav>

        <nav className="jp-nav-links">
          <a link to="/about" className="jp-nav-link">About</a>
        
          <a href="#home">Home</a>
          <a href="#jobs">Explore Jobs</a>
          <a href="#about">About</a>
        </nav>

        <div className="jp-nav-actions">
          <Link to="/login" className="jp-login">Log in</Link>
          <Link to="/signup" className="jp-signup">Get Started ↗</Link>
        </div>
      </header>

      <section className="jp-hero" id="home">
        <div className="jp-hero-copy">
          <div className="jp-status">
            <span className="jp-status-dot" />
            YOUR NEXT OPPORTUNITY STARTS HERE
          </div>

          <h1>
            Find work that
            <br />
            moves you <span>forward.</span>
          </h1>

          <p className="jp-hero-description">
            Discover opportunities that match your skills, build your career,
            and take the next step towards your dream job.
          </p>

          <div className="jp-hero-buttons">
            <Link to="/jobs" className="jp-primary-btn">
              Explore Jobs <span>↗</span>
            </Link>
            <Link to="/signup" className="jp-secondary-btn">
              Create Account
            </Link>
            <button
              type="button"
              className="voice-button"
              onClick={startVoice}
            >
              🎙 Listen to Introduction
            </button>
          </div>

          <div className="jp-trust-line">
            <span className="jp-trust-icon">✦</span>
            Opportunities for freshers and experienced professionals
          </div>
        </div>

        <div className="jp-artwork">
          <div className="jp-art-label jp-label-top">
            <span className="jp-label-dot" /> CAREER IN MOTION
          </div>

          <LiquidCanvas />

          <div className="jp-orbit jp-orbit-one" />
          <div className="jp-orbit jp-orbit-two" />

          <div className="jp-float-card jp-float-top">
            <span className="jp-float-icon">✧</span>
            <div>
              <strong>New opportunities</strong>
              <small>Your next chapter awaits</small>
            </div>
          </div>

          <div className="jp-float-card jp-float-bottom">
            <span className="jp-float-icon jp-cyan">↗</span>
            <div>
              <strong>Career growth</strong>
              <small>One step at a time</small>
            </div>
          </div>

          <div className="jp-art-caption">
            <span>01 / DISCOVER</span>
            <span>BUILD YOUR FUTURE</span>
          </div>
        </div>
      </section>

      <section className="jp-jobs-section" id="jobs">
        <div className="jp-section-heading">
          <div>
            <p className="jp-section-kicker">HANDPICKED OPPORTUNITIES</p>
            <h2>Jobs worth <span>exploring.</span></h2>
          </div>
          <Link to="/jobs" className="jp-view-all">
            View all jobs <span>↗</span>
          </Link>
        </div>

        <div className="jp-job-grid">
          {jobs.map((job) => (
            <article className="jp-job-card" key={job.company}>
              <div className="jp-job-top">
                <div className={`jp-company-logo ${job.color}`}>
                  {job.company.charAt(0)}
                </div>
                <span className="jp-job-type">{job.type}</span>
              </div>

              <p className="jp-company-name">{job.company}</p>
              <h3>{job.role}</h3>

              <div className="jp-job-location">
                <span>⌖</span> {job.location}
              </div>

              <div className="jp-job-footer">
                <div>
                  <strong>{job.salary}</strong>
                  <small>Annual salary</small>
                </div>
                <Link
                  to="/jobs"
                  className="jp-job-arrow"
                  aria-label={`Explore ${job.company} jobs`}
                >
                  ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="jp-bottom-cta jp-about-premium" id="about">
        <div className="jp-about-heading">
          <p className="jp-section-kicker">✦ ABOUT OUR PLATFORM</p>

          <h2>
            More Than Jobs.
            <br />
            <span>Your Career Journey.</span>
          </h2>

          <p className="jp-about-description">
            Job Portal is designed to connect job seekers with career
            opportunities. Explore jobs, create your profile, and manage
            your job-search journey in one place.
          </p>

          <div className="jp-about-actions">
            <button
              type="button"
              className="jp-primary-btn jp-about-voice"
              onClick={() => {
                if (!("speechSynthesis" in window)) {
                  alert("Voice is not supported in this browser.");
                  return;
                }

                if (window.speechSynthesis.speaking) {
                  window.speechSynthesis.cancel();
                  return;
                }

                const message = new SpeechSynthesisUtterance(
                  "Welcome to Job Portal. Our platform helps you explore career opportunities, discover jobs, create your profile, and manage your applications. The frontend is built with React and CSS. The backend and database depend on your project configuration. Thank you for exploring Job Portal. Your next career opportunity starts here."
                );

                message.lang = "en-IN";
                message.rate = 0.9;
                message.pitch = 1.05;
                message.volume = 1;

                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(message);
              }}
            >
              🔊 Listen to About
            </button>

            <Link to="/jobs" className="jp-secondary-btn">
              Explore Jobs ↗
            </Link>
          </div>
        </div>

        <div className="jp-about-cards">
          <article className="jp-about-card">
            <span className="jp-about-icon">⌕</span>
            <h3>Explore Jobs</h3>
            <p>Discover opportunities and explore roles that match your interests.</p>
          </article>

          <article className="jp-about-card">
            <span className="jp-about-icon">◎</span>
            <h3>Manage Profile</h3>
            <p>Keep your profile details organized while preparing for your next move.</p>
          </article>

          <article className="jp-about-card">
            <span className="jp-about-icon">▣</span>
            <h3>Applications</h3>
            <p>Use the applications area to manage your job-search activity.</p>
          </article>
        </div>

        <div className="jp-about-tech">
          <p className="jp-section-kicker">BUILT WITH WEB TECHNOLOGY</p>
          <div className="jp-about-tech-list">
            <span>React.js</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>Backend Integration</span>
            <span>Database Integration</span>
          </div>
          <p className="jp-about-note">
            Technology labels describe the platform design. Actual backend
            and database technologies should be confirmed from your project.
          </p>
        </div>

        <div className="jp-about-footer">
          <div>
            <p className="jp-section-kicker">YOUR FUTURE IS WAITING</p>
            <h3>Ready for your next move?</h3>
            <p>Create your profile and start exploring career opportunities.</p>
          </div>

          <Link to="/signup" className="jp-primary-btn">
            Join Job Portal <span>↗</span>
          </Link>
        </div>
      </section>

      <footer className="jp-footer">
        <Link to="/" className="jp-logo">
          <span className="jp-logo-icon">J</span>
          <span>Job<span className="jp-logo-accent">Portal</span></span>
        </Link>
        <p>Find your path. Build your future.</p>
        <span>© {new Date().getFullYear()} Job Portal</span>
      </footer>
    </main>
  );
}