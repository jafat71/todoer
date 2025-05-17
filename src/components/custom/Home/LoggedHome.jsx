import { fetchUserBoards } from "@/services/actions"
import { useEffect, useState } from "react"
import UserBoard from "./UserBoard"
import { SquareDashedKanban, Plus, Search, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "@/contexts/UserContext/UserContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import "./LoggedHome.css"
import blurBackground from "@/assets/blurs.webp"
const BoardSkeleton = () => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-f2green/30 rounded-2xl p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-f2green/20" />
        <div className="flex-1">
          <div className="h-6 w-3/4 bg-f2green/20 rounded-lg mb-2" />
          <div className="h-4 w-1/2 bg-f2green/20 rounded-lg" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-f2green/20 rounded-lg" />
        <div className="h-4 w-5/6 bg-f2green/20 rounded-lg" />
        <div className="h-4 w-4/6 bg-f2green/20 rounded-lg" />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="h-8 w-24 bg-f2green/20 rounded-lg" />
        <div className="h-8 w-8 bg-f2green/20 rounded-lg" />
      </div>
    </div>
  )
}

const LoggedHome = () => {
  const [boards, setBoards] = useState([])
  const [filteredBoards, setFilteredBoards] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showBoards, setShowBoards] = useState(false)
  const { user, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isUserLoading || !user || !user.id) return;
    
    const loadBoards = async () => {
      try {
        setIsLoading(true);
        setShowBoards(false);
        const res = await fetchUserBoards(user.id);
        setBoards(res.boards || []);
        setFilteredBoards(res.boards || []);
        setTimeout(() => {
          setShowBoards(true);
        }, 100);
      } catch (error) {
        console.error("Error loading boards:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBoards();
  }, [user, isUserLoading]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBoards(boards)
    } else {
      const filtered = boards.filter(board => 
        board.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredBoards(filtered)
    }
  }, [searchTerm, boards]);

  if (isUserLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-f2green mx-auto mb-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${blurBackground})` }}
      />
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-white mb-3">Welcome, {user.username}</h1>
        <p className="text-slate-400 font-light">Manage your Kanban boards and organize your tasks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel */}
        <div className="lg:col-span-1 space-y-8">
          {/* Create Board Card */}
          <div className="bg-black/30 backdrop-blur-sm border border-f2green rounded-2xl p-6">
            <h2 className="text-2xl font-light text-white mb-6">Create new board</h2>
            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-voidBlack/50 to-black/30 rounded-xl border border-f2green/30">
              <SquareDashedKanban className="text-f2green mb-6" size={64} />
              <Button 
                onClick={() => navigate("/newboard")}
                className="w-full bg-f2green hover:bg-fgreen text-black font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                New Board
              </Button>
            </div>
          </div>

          {/* Search Card */}
          <div className="bg-black/30 backdrop-blur-sm border border-f2green rounded-2xl p-6">
            <h2 className="text-2xl font-light text-white mb-6">Search boards</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-f2green/70" />
              <Input 
                type="text" 
                placeholder="Search by name..." 
                className="pl-10 bg-black/20 border-f2green text-white focus:border-f2green focus:ring-f2green/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Boards Section */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-light text-white">My Boards</h2>
            <div className="text-slate-400 text-sm font-light">
              {filteredBoards.length} of {boards.length} boards
            </div>
          </div>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <BoardSkeleton key={index} />
                ))}
              </div>
            ) : filteredBoards.length === 0 ? (
              <div className="bg-black/30 backdrop-blur-sm border border-f2green rounded-2xl p-12 text-center">
                <SquareDashedKanban className="text-f2green/60 mx-auto mb-6" size={64} />
                <h3 className="text-2xl font-light text-white mb-3">No boards found</h3>
                <p className="text-slate-400 mb-6 font-light">
                  {searchTerm ? "No boards match your search" : "You haven't created any boards yet"}
                </p>
                <Button 
                  onClick={() => navigate("/newboard")}
                  className="bg-f2green hover:bg-fgreen text-black font-medium py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Create my first board
                </Button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 boards-container ${showBoards ? 'show' : ''}`}>
                {filteredBoards.map((board, index) => (
                  <div 
                    key={board.id} 
                    className="board-item"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <UserBoard board={board} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoggedHome