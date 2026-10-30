import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function JobPortalHero() {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".jp-hero-content > *", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".jp-video-wrapper", {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".jp-video-wrapper",
                    start: "top 85%",
                    end: "top 40%",
                    scrub: 1,
                },
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="jp-hero" ref={heroRef}>

            <div className="jp-hero-content">

                <div className="jp-badge">
                    ✨ Find your next opportunity
                </div>

                <h1>
                    Find Your
                    <span> Dream Job</span>
                </h1>

                <p>
                    Discover exciting career opportunities from top companies
                    and take the next step toward your future.
                </p>

                <div className="jp-search">

                    <div className="jp-search-field">
                        🔍
                        <input
                            type="text"
                            placeholder="Job title, skills or company"
                        />
                    </div>

                    <div className="jp-search-field">
                        📍
                        <input
                            type="text"
                            placeholder="Location or Remote"
                        />
                    </div>

                    <button>Search Jobs</button>

                </div>

                <div className="jp-tags">
                    <span>Remote Jobs</span>
                    <span>✓ Verified Jobs</span>
                    <span>Easy Apply</span>
                    <span>Top Companies</span>
                </div>

            </div>

            <div className="jp-video-wrapper">

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src="https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4"
                        type="video/mp4"
                    />
                </video>

                <div className="jp-video-overlay">
                    <strong>12,500+</strong>
                    <span>Jobs Available</span>
                </div>

            </div>

        </section>
    );
}

export default JobPortalHero;