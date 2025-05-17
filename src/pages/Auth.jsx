import { Loader2 } from "lucide-react";
import { useState } from "react";
import AuthForm from "@/components/custom/AuthForm/AuthForm";
import blurBackground from "@/assets/blurs.webp"
import onboardImage from "@/assets/onboard.webp"
const Auth = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex items-center justify-center p-4 lg:p-8">
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${blurBackground})` }}
      />
      <div className="relative z-10 flex flex-col-reverse lg:flex-row max-w-8xl max-h-[1400px] rounded-xl overflow-hidden shadow-xl bg-black/60 backdrop-blur-lg">
        <div className="order-2 lg:order-1 w-full lg:w-1/2  flex items-center justify-center">
          <AuthForm />
        </div>

        <div className="order-1 lg:order-2 w-full lg:w-2/3 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Loader2 className="w-8 h-8 animate-spin text-f2green" />
            </div>
          )}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <img
              src={onboardImage}
              alt="Onboarding illustration"
              className={`w-full h-full object-cover object-center transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
