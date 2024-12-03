import LoggedHome from "@/components/custom/Home/LoggedHome";
import NoLoggedHome from "@/components/custom/Home/NoLoggedHome";
import { useUserContext } from "@/contexts/UserContext/UserContext";


const Home = () => {
    const {isLogged} = useUserContext()
    return (
        <>
            <div className="min-h-screen text-white flex flex-col items-center justify-center px-4">
                {
                    isLogged 
                    ?(<LoggedHome/>)
                    : (<NoLoggedHome/>)
                }
            </div>
        </>
    );
};

export default Home;
