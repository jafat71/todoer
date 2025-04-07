import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext/UserContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCustomToast } from "@/hooks/useCustomToast";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { loginUser, registerUser, sendResetEmail, resetPasswordWithCode } from "@/services/auth-actions";

const AuthForm = () => {
  const [authMode, setAuthMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsLogged } = useUserContext();
  const toast = useCustomToast();

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const resp = await loginUser(data.email, data.password);
      if (resp.success) {
        toast.success("Inicio de sesión exitoso", "¡Bienvenido!");
        setIsLogged(true);
        setUser(resp.user);
        navigate("/home");
      }
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Error al iniciar sesión";
      toast.error(errorMessage, "Error de autenticación");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      const resp = await registerUser(data.username, data.email, data.password);
      if (resp.success) {
        toast.success("Tu cuenta ha sido creada exitosamente.", "¡Cuenta creada!");
        setIsLogged(true);
        setUser(resp.user);
        navigate("/home");
      }
    } catch (e) {
      toast.error(e || "Error al crear la cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (data) => {
    setIsLoading(true);
    try {
      if (data.step === 'email') {
        await sendResetEmail(data.email);
        toast.success("Código de verificación enviado", "¡Correo enviado!");
      } else {
        await resetPasswordWithCode(data.code, data.password);
        toast.success("Contraseña actualizada exitosamente");
        setAuthMode("login");
      }
    } catch (error) {
      toast.error(
        error.message || 
        (data.step === 'email' 
          ? "Error al enviar el código" 
          : "Error al restablecer la contraseña")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="rounded-2xl shadow-lg p-6 bg-black/40 backdrop-blur-sm border-slate-800 min-h-[500px] flex flex-col">
        <CardHeader className="flex-none">
          <CardTitle className="text-3xl font-bold text-center text-white">
            {authMode === "login" ? "Welcome Back" : 
             authMode === "register" ? "Create Account" : 
             "Forgot Password"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          {authMode === "login" && (
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              onRegisterClick={() => setAuthMode("register")}
              onResetClick={() => setAuthMode("reset")}
            />
          )}
          
          {authMode === "register" && (
            <RegisterForm
              onSubmit={handleRegister}
              isLoading={isLoading}
              onBackToLogin={() => setAuthMode("login")}
            />
          )}
          
          {authMode === "reset" && (
            <ResetPasswordForm
              onSubmit={handleReset}
              isLoading={isLoading}
              onBackToLogin={() => setAuthMode("login")}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm; 