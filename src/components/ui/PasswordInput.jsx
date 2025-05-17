import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ field, placeholder = "••••••••", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      <Input 
        {...field} 
        {...props}
        type={showPassword ? "text" : "password"} 
        placeholder={placeholder}
        className="pl-10 pr-10 bg-black/20 border-f2green text-white" 
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-f2green" />
        ) : (
          <Eye className="h-5 w-5 text-f2green" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput; 