import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext"
import { useEffect, useRef } from "react";
import PrimaryButton from "../CTA/PrimaryButton";
import { LucideAperture, LucideArrowRight } from "lucide-react";
import SecondaryButton from "../CTA/SecondaryButton";
import heroImage from "@/assets/hero.svg"
import blurBackground from "@/assets/blurs.webp"
import glow1 from "@/assets/glow1.webp"
import glow2 from "@/assets/glow2.webp"
import Features from "../Features/Features";
import Kanban from "../KanbanBoard/Kanban";
import aboutImage from "@/assets/about.webp"
import Stats from "../Stats";
import companyLogo from "@/assets/demo.webp"
import "./NoLoggedHome.css"

const NoLoggedHome = () => {
  const { setNoLoggeKanbanBoard } = useTodoerContext()
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const demoRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToDemo = (e) => {
    e.preventDefault();
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    (async () => {
      await setNoLoggeKanbanBoard()
    })()

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          if (section === heroRef.current) {
            const elements = section.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('show');
              }, index * 200);
            });
          } else {
            section.classList.add('show');
          }
          observer.unobserve(section);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (demoRef.current) observer.observe(demoRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      {/* Background Blur */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${blurBackground})` }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full">
        <div className="relative z-10 flex flex-col items-center pt-32">
          <div className="flex flex-col items-center px-4 md:px-10">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center animate-on-scroll fade-in">Track your work</div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center animate-on-scroll fade-in">made easy</div>
            </div>

            <p className="text-center text-lg my-10 animate-on-scroll fade-in">
              Plan, prioritize and visualize your tasks with our powerful Kanban boards.
            </p>

            <div className="flex flex-row gap-4 animate-on-scroll fade-in">
              <PrimaryButton icon={<LucideArrowRight className="animate-pulse" />} text="Start now" link="/auth" />
              <SecondaryButton icon={<LucideAperture className="animate-pulse" />} text="Try it out" onClick={scrollToDemo} />
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="relative mt-16 md:mt-24 lg:mt-32 px-4 w-full max-w-6xl">
            <div
              className="absolute -left-12 -top-10 lg:-top-76 sm:-left-28 md:-left-32 -translate-y-full w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] pointer-events-none animate-on-scroll slide-in-left"
              style={{ backgroundImage: `url(${glow2})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
            />

            <div
              className="relative w-full max-w-6xl mx-auto px-4 animate-on-scroll scale-in"
              style={{
                perspective: '1000px',
                perspectiveOrigin: 'center',
              }}
            >
              <div
                className="w-full flex items-center justify-center min-h-[320px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden rounded-2xl"
                style={{
                  transform: 'rotateX(20deg) scale(1.05)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s ease',
                  boxShadow: '0 0 50px rgba(0, 255, 100, 0.2)',
                  backgroundColor: 'rgba(0, 255, 100, 0.05)', // reemplazo de `bg-f2green/30`
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div
                  className="w-full h-auto max-w-[90%] ring-1 rounded-2xl overflow-hidden shadow-xl"
                  style={{
                    backgroundColor: 'rgba(0, 255, 100, 0.05)', 
                    borderColor: 'rgba(0, 255, 100, 0.7)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                >
                  <img
                    src={heroImage}
                    alt="Kanban Hero"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
            {/* Right Glow */}
            <div
              className="absolute -right-12 top-44 lg:-top-16 sm:-right-28 md:-right-32 
              -translate-y-full w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] pointer-events-none animate-on-scroll slide-in-right"
              style={{ backgroundImage: `url(${glow1})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="relative w-full mt-32 section-fade-in">
        <Features />
      </section>

      {/* Demo Section */}
      <section ref={demoRef} id="demo" className="relative w-full mt-24 md:px-4 section-fade-in">
        <div className="text-center text-2xl font-semibold mb-4">
          <div className="font-thin">Track your <span className="text-fgreen">projects</span> or just your daily tasks</div>
        </div>
        <div className="bg-voidBlack border-2 border-fgreen max-w-7xl mx-auto rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch w-full h-full p-4 gap-4">
            {/* Logo Section */}
            <div className="md:w-1/6 flex flex-col items-center justify-between gap-4 py-4">
              <img
                src={companyLogo}
                alt="Company Logo"
                className="w-32 h-32 object-contain"
              />
              <div className="space-y-2">
                <div className="w-2 h-2 rounded-full bg-fgreen"></div>
                <div className="w-2 h-2 rounded-full bg-fgreen"></div>
                <div className="w-2 h-2 rounded-full bg-fgreen"></div>
              </div>
            </div>

            {/* Kanban Board */}
            <div className="md:w-4/6">
              <Kanban demo={true} />
            </div>

            {/* Stats */}
            <div className="md:w-1/6 flex items-center justify-center">
              <Stats />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="relative w-full mt-32 section-fade-in">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            {/* Image Container */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={aboutImage}
                alt="About"
                className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] h-auto object-contain relative z-10 pointer-events-none"
              />
            </div>

            {/* Content Container */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
              <div className="flex flex-col items-center md:items-end text-center md:text-right">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
                  Start tracking your
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
                  projects now
                </h2>
              </div>

              <div className="flex flex-row gap-4 mt-8">
                <PrimaryButton
                  icon={<LucideArrowRight className="animate-pulse" />}
                  text="Start now"
                  link="/auth"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NoLoggedHome