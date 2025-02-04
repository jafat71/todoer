import { fetchUserBoards } from "@/services/actions"
import { useEffect, useState } from "react"
import UserBoard from "./UserBoard"
import { SquareDashedKanban } from "lucide-react"
import { useNavigate } from "react-router-dom"

const LoggedHome = () => {
  const [boards, setBoards] = useState([])
  useEffect(() => {
    fetchUserBoards().then(res => setBoards(res.boards))
  }, [])

  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-start w-full">

      <div className="w-1/2 flex flex-col items-center justify-center px-4">
        <div className="text-2xl font-bold">My Boards</div>
        {boards?.map((board) => (
          <UserBoard key={board.id} board={board} />
        ))}
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center px-4">
        <div className="text-2xl font-bold">Create a new board</div>
          <SquareDashedKanban className="text-fgreen" size={100} />
          <button 
          onClick={() => navigate("/create")}
          className="p-4 text-2xl mt-4
          font-bold w-full
          shadow-sm shadow-f2green
          text-voidBlack bg-gradient-to-r from-fgreen to-f2green my-2 rounded-lg
          hover:scale-105 transition-all duration-300
          ">
            +
          </button>
      </div>

    </div>
  )
}

export default LoggedHome