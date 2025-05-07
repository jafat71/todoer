import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-voidBlack flex items-center justify-center animate-in fade-in duration-300">
      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-lg bg-fgreen animate-pulse" />
            <div className="absolute h-32 w-32 rounded-lg border-2 border-f2green animate-[radar_2s_ease-in-out_infinite]" />
            <div className="absolute h-40 w-40 rounded-lg border-2 border-fgreen animate-[radar_2s_ease-in-out_infinite_0.5s]" />
            <div className="absolute h-48 w-48 rounded-lg border-2 border-f2green animate-[radar_2s_ease-in-out_infinite_1s]" />
          </div>
          <div className="relative">
            <Loader2 className="w-24 h-24 animate-spin text-f2green" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 