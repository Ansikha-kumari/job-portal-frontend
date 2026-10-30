import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_TAGS = [
    { text: "Remote Jobs", background: "#1B211A" },
    { text: "Verified Jobs", background: "#628141" },
    { text: "Easy Apply", background: "#EBD5AB", color: "#333" },
    { text: "Top Companies", background: "#2F5755" },
];

export default function HeroScrollVideoPinReveal({
    videoSrc = "https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4",
    tags = DEFAULT_TAGS,
}) {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const videoBoxRef = useRef(null);
    const tagRefs = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const videoBox = videoBoxRef.current;

        if (!section || !videoBox) return;

        const ctx = gsap.context(() => {
            gsap.set(videoBox, {
                clipPath: "circle(8% at 50% 50%)",
            });

            gsap.fromTo(
                tagRefs.current,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    },
                }
            );

            gsap.to(videoBox, {
                clipPath: "circle(150% at 50% 50%)",
                ease: "none",
                scrollTrigger: {
                    trigger: videoBox,
                    start: "top top",
                    end: "+=1800",
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => { });
        }
    }, []);

    return (
        <div
            ref={sectionRef}
            className="w-full overflow-x-hidden bg-[#0d0f0d] text-white"
        >
            {/* HERO */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-5">
                <p className="text-sm sm:text-base text-zinc-400 mb-5 tracking-widest uppercase">
                    Welcome to your next opportunity
                </p>

                <h1 className="text-[clamp(3rem,8vw,7rem)] font-extrabold leading-none tracking-tight">
                    Find Your
                    <br />
                    <span className="text-[#EBD5AB]">Dream Job</span>
                </h1>

                <p className="max-w-2xl mt-8 text-base sm:text-xl text-zinc-400">
                    Discover the right opportunity, connect with top companies
                    and build your career.
                </p>

                {/* SEARCH */}
                <div className="w-full max-w-4xl mt-10 bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        placeholder="Job title, skills or company"
                        className="flex-1 px-5 py-4 rounded-xl text-black outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        className="flex-1 px-5 py-4 rounded-xl text-black outline-none"
                    />

                    <button className="px-8 py-4 rounded-xl bg-[#628141] text-white font-bold hover:bg-[#4f6d34] transition">
                        Search Jobs
                    </button>
                </div>

                <p className="mt-6 text-sm text-zinc-500">
                    Thousands of jobs are waiting for you
                </p>
            </section>

            {/* BENEFITS */}
            <section className="min-h-[120vh] px-5 py-24">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-zinc-400 mb-5 uppercase tracking-widest text-sm">
                        One platform. More possibilities.
                    </p>

                    <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-tight">
                        Your career
                        <br />
                        starts <span className="text-[#628141]">here.</span>
                    </h2>

                    <div className="flex flex-wrap justify-center gap-3 mt-12">
                        {tags.map((tag, index) => (
                            <div
                                key={tag.text}
                                ref={(el) => {
                                    tagRefs.current[index] = el;
                                }}
                                className="px-6 py-3 rounded-full font-semibold text-base sm:text-lg"
                                style={{
                                    backgroundColor: tag.background,
                                    color: tag.color || "#fff",
                                }}
                            >
                                {tag.text}
                            </div>
                        ))}
                    </div>

                    <p className="max-w-xl mx-auto mt-10 text-zinc-400 text-lg">
                        From your first application to your next big career move,
                        Job Portal makes finding opportunities simple.
                    </p>
                </div>

                {/* VIDEO */}
                <div className="relative mt-24 w-full">
                    <div
                        ref={videoBoxRef}
                        className="w-full h-screen overflow-hidden relative"
                    >
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover"
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>

                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center">
                                <span className="text-2xl">▶</span>
                            </div>
                        </div>

                        <div className="absolute bottom-10 left-5 right-5 text-center">
                            <h3 className="text-3xl sm:text-5xl font-bold">
                                Your next opportunity is closer than you think.
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOTTOM */}
            <section className="min-h-screen flex items-center justify-center text-center px-5">
                <div>
                    <p className="text-zinc-400 mb-5 uppercase tracking-widest">
                        Start today
                    </p>

                    <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-tight">
                        Work.
                        <br />
                        Grow.
                        <br />
                        <span className="text-[#EBD5AB]">Succeed.</span>
                    </h2>
                </div>
            </section>
        </div>
    );
}