import { useState } from "react";
import { useUserContext } from "@/contexts/UserContext/UserContext";
import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Loader2, Pencil, Save, X, AlertTriangle } from "lucide-react";
import { useCustomToast } from "@/hooks/useCustomToast";
import settingsImage from "@/assets/settings.png";
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
    { name: "Green", value: "f2green" },
    { name: "Neon", value: "fgreen" },
  ];

  if (!user) return null;
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-8">
        <div className="lg:w-1/3 flex items-center justify-center">
          <div className="w-full h-full relative">
            <img
              src={settingsImage}
              alt="Settings illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Content Section - 2/3 of the page */}
        <div className="lg:w-2/3 space-y-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          
          <Card className="bg-voidBlack/50 border-fgreen/20">
            <CardHeader>
              <CardTitle className="text-f2green">User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-white">Username</label>
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
                          className={`bg-voidBlack border-f2green text-white ${
                            error ? "border-red-500" : ""
                          }`}
                          placeholder="Enter new username"
                        />
                        <Button
                          onClick={handleUpdateUsername}
                          className="bg-f2green text-voidBlack hover:bg-fgreen"
                          disabled={isLoading || !!error}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                          Save
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          className="bg-voidBlack border-f2green text-f2green hover:bg-f2green/10"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="text-white">{user.username}</span>
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="bg-voidBlack border-f2green text-f2green hover:bg-f2green/10"
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

              <div className="space-y-2">
                <label className="text-white">Email</label>
                <div className="text-neutral-400">{user.email}</div>
              </div>

              <div className="space-y-2">
                <label className="text-white">Account Created</label>
                <div className="text-neutral-400">
                  {format(new Date(user.created_at), "MMMM d, yyyy")}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-voidBlack/50 border-fgreen/20">
            <CardHeader>
              <CardTitle className="text-f2green">Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="text-white">Background Color</label>
                <div className="flex gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => changeTheme(color.value)}
                      className={`w-12 h-12 rounded-full border-2 ${
                        theme === color.value
                          ? "border-f2green"
                          : "border-transparent"
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

          {/* Danger Zone Card */}
          <Card className="bg-voidBlack/50 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-neutral-400">
                  Once you deactivate your account, you will not be able to access your data or boards.
                  This action can be reversed within 30 days.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      className="bg-red-500/10 text-red-500 border-red-500 hover:bg-red-500/20"
                    >
                      Deactivate Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-voidBlack border-red-500/20">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-neutral-400">
                        This action will deactivate your account. You will not be able to access your data or boards.
                        This action can be reversed within 30 days by logging in again.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-voidBlack border-f2green text-f2green hover:bg-f2green/10">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeactivateAccount}
                        className="bg-red-500 text-white hover:bg-red-600"
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
      </div>
    </div>
  );
};

export default SettingsPage;