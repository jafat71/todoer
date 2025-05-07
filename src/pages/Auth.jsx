import { Loader2 } from "lucide-react";
import { useState } from "react";
import onboardImage from "@/assets/onboard.png";
import AuthForm from "@/components/custom/AuthForm/AuthForm";

const Auth = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-f2green flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row rounded-xl overflow-hidden bg-voidBlack backdrop-blur-sm">
        <div className="w-full lg:w-1/3 sm:py-2 flex items-center justify-center">
          <div className="w-full max-w-md">
            <AuthForm />
          </div>
        </div>

        <div className="w-full lg:w-2/3 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Loader2 className="w-8 h-8 animate-spin text-f2green" />
            </div>
          )}
          <div className="relative w-full h-[40vh] lg:h-[80vh] overflow-hidden">
            <img
              src={onboardImage}
              alt="Onboarding illustration"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
