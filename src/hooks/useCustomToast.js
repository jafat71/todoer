import { useToast } from "@/components/ui/use-toast";

export const useCustomToast = () => {
  const { toast } = useToast();

  const showToast = ({
    type = "success",
    title,
    message,
    duration = 3000,
  }) => {
    const toastTypes = {
      success: {
        title: title || "¡Éxito!",
        className: "bg-f2green border-none text-black font-medium",
      },
      error: {
        title: title || "Error",
        variant: "destructive",
      },
      warning: {
        title: title || "Advertencia",
        className: "bg-yellow-500 border-none text-black font-medium",
      },
      info: {
        title: title || "Información",
        className: "bg-fblue border-none text-white font-medium",
      },
    };

    const toastConfig = toastTypes[type];

    toast({
      ...toastConfig,
      description: message,
      duration,
    });
  };

  return {
    showToast,
    // Helpers específicos
    success: (message, title) => showToast({ type: "success", message, title }),
    error: (message, title) => showToast({ type: "error", message, title }),
    warning: (message, title) => showToast({ type: "warning", message, title }),
    info: (message, title) => showToast({ type: "info", message, title }),
  };
}; 