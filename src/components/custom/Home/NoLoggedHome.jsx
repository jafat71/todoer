import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext"
import { useEffect } from "react";
import PrimaryButton from "../CTA/PrimaryButton";
import { LucideAperture, LucideArrowRight } from "lucide-react";
import SecondaryButton from "../CTA/SecondaryButton";
import heroImage from "@/assets/hero.png"
import blurBackground from "@/assets/blurs.png"
import glow1 from "@/assets/glow1.png"
import glow2 from "@/assets/glow2.png"
import Features from "../Features/Features";
import Kanban from "../KanbanBoard/Kanban";
import aboutImage from "@/assets/about.png"

const NoLoggedHome = () => {
  const { setNoLoggeKanbanBoard } = useTodoerContext()
  useEffect(() => {
    (async () => {
      await setNoLoggeKanbanBoard()
    })()
  }, []);

  return (
    <div className="relative w-full">
      {/* Background Blur */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${blurBackground})` }}
      />

      {/* Hero Section */}
      <section className="relative w-full">
        <div className="relative z-10 flex flex-col items-center pt-32">
          <div className="flex flex-col items-center px-4 md:px-10">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center">Track your work</div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center">made easy</div>
            </div>

            <p className="text-center text-lg my-10">
              Plan, prioritize and visualize your tasks with our powerful Kanban boards.
            </p>

            <div className="flex flex-row gap-4">
              <PrimaryButton icon={<LucideArrowRight className="animate-pulse" />} text="Start now" link="/auth" />
              <SecondaryButton icon={<LucideAperture className="animate-pulse" />} text="Try it out" link="/auth" />
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="relative mt-16 md:mt-24 lg:mt-32 px-4 w-full max-w-6xl">
            {/* Left Glow */}
            <div
              className="absolute -left-72 top-1/2 -translate-y-full w-[400px] h-[400px] pointer-events-none"
              style={{ backgroundImage: `url(${glow2})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
            />

            {/* Board Image */}
            <img src={heroImage} alt="Hero Board" className="w-full h-auto object-contain relative z-10 pointer-events-none scale-150" />

            {/* Right Glow */}
            <div
              className="absolute -right-72 top-1/2 -translate-y-full w-[400px] h-[400px] pointer-events-none"
              style={{ backgroundImage: `url(${glow1})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative w-full mt-32">
        <Features />
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative w-full mt-32">
        <div className="max-w-7xl mx-auto">
          <Kanban demo={true} />
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="relative w-full mt-32">
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