import { useState } from "react";
import { useUserContext } from "@/contexts/UserContext/UserContext";
import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Loader2, Pencil, Save, X, AlertTriangle, User, Mail, Calendar, Palette } from "lucide-react";
import { useCustomToast } from "@/hooks/useCustomToast";
import settingsImage from "@/assets/config.webp";
import { updateUserInfo } from "@/services/actions";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { inactivateUser } from "@/services/auth-actions";
import blurBackground from "@/assets/blurs.webp";

// Schema de validación para el username
const usernameSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
});

const SettingsPage = () => {
  const { user, setUser, logout } = useUserContext();
  const { theme, changeTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [error, setError] = useState("");
  const toast = useCustomToast();

  const validateUsername = (username) => {
    try {
      usernameSchema.parse({ username });
      setError("");
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const handleUpdateUsername = async () => {
    if (!validateUsername(newUsername)) {
      return;
    }

    if (newUsername === user.username) {
      setIsEditing(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await updateUserInfo(user.id, newUsername);
      if (response === 200) {
        setUser({...user, username: newUsername});
        setIsEditing(false);
        toast.success("Username updated successfully", "Changes saved");
      }
    } catch (error) {
      toast.error(error.message || "Error updating username", "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewUsername(user?.username || "");
    setError("");
  };

  const handleDeactivateAccount = async () => {
    try {
      setIsLoading(true);
      const response = await inactivateUser(user.id);
      if (response.success) {
        toast.success("Account deactivated successfully", response.message);
        await logout();
      }
    } catch (error) {
      toast.error(error.message || "Error deactivating account", "Deactivation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const colors = [
    { name: "Dark", value: "voidBlack" },
    { name: "Gray", value: "voidGray" },
  ];

  if (!user) return null;
  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      {/* Background Blur */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${blurBackground})` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl font-light text-white mb-8">Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - User Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-black/30 backdrop-blur-sm border border-f2green rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-light text-white flex items-center gap-2">
                  <User className="h-6 w-6 text-f2green" />
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <User className="h-5 w-5 text-f2green" />
                    <span className="font-light">Username</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <Input
                            value={newUsername}
                            onChange={(e) => {
                              setNewUsername(e.target.value);
                              validateUsername(e.target.value);
                            }}
                            className={`bg-black/20 border-f2green text-white ${
                              error ? "border-red-500" : ""
                            }`}
                            placeholder="Enter new username"
                          />
                          <Button
                            onClick={handleUpdateUsername}
                            className="bg-f2green hover:bg-fgreen text-black font-medium"
                            disabled={isLoading || !!error}
                          >
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            className="bg-black/20 border-f2green text-f2green hover:bg-f2green/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <span className="text-white font-light">{user.username}</span>
                          <Button
                            onClick={() => setIsEditing(true)}
                            className="bg-black/20 border-f2green text-f2green hover:bg-f2green/10"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                    {error && (
                      <span className="text-red-500 text-sm">{error}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <Mail className="h-5 w-5 text-f2green" />
                    <span className="font-light">Email</span>
                  </div>
                  <div className="text-slate-400 font-light">{user.email}</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="h-5 w-5 text-f2green" />
                    <span className="font-light">Account Created</span>
                  </div>
                  <div className="text-slate-400 font-light">
                    {format(new Date(user.created_at), "MMMM d, yyyy")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-sm border border-f2green rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-light text-white flex items-center gap-2">
                  <Palette className="h-6 w-6 text-f2green" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <Palette className="h-5 w-5 text-f2green" />
                    <span className="font-light">Background Color</span>
                  </div>
                  <div className="flex gap-4">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => changeTheme(color.value)}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          theme === color.value
                            ? "border-f2green scale-110"
                            : "border-transparent hover:scale-105"
                        }
                        bg-${color.value}
                        `}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-sm border border-red-500/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-light text-red-500 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <p className="text-slate-400 font-light">
                    Once you deactivate your account, you will not be able to access your data or boards.
                    This action can be reversed within 30 days.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="bg-red-500/10 text-red-500 border-red-500 hover:bg-red-500/20 font-medium"
                      >
                        Deactivate Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black/30 backdrop-blur-sm border-red-500/50">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500 font-light">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400 font-light">
                          This action will deactivate your account. You will not be able to access your data or boards.
                          This action can be reversed within 30 days by logging in again.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-black/20 border-f2green text-f2green hover:bg-f2green/10 font-medium">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeactivateAccount}
                          className="bg-red-500 text-white hover:bg-red-600 font-medium"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 mr-2" />
                          )}
                          Yes, deactivate my account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Image */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-black/30 backdrop-blur-sm border border-f2green rounded-2xl p-6">
                <img
                  src={settingsImage}
                  alt="Settings illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;