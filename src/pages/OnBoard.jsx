import NoLoggedHome from "@/components/custom/Home/NoLoggedHome";
import { useUserContext } from "@/contexts/UserContext/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnBoard = () => {
    const {isLogged} = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged) {
            navigate("/home")
        }
    }, [isLogged, navigate])
    return (
        <>
            <div className="min-h-screen text-white flex flex-col items-center justify-center px-4">
                <NoLoggedHome/>
            </div>
        </>
    );
};

export default OnBoard;
