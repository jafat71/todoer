import { fetchUserBoards } from "@/services/actions"
import { useEffect, useState } from "react"
import UserBoard from "./UserBoard"
import { SquareDashedKanban, Plus, Search, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "@/contexts/UserContext/UserContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const LoggedHome = () => {
  const [boards, setBoards] = useState([])
  const [filteredBoards, setFilteredBoards] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { user, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate();
  
  useEffect(() => {
    // Si el usuario está cargando o no hay usuario, no hacemos nada
    if (isUserLoading || !user || !user.id) {
      return;
    }
    
    const loadBoards = async () => {
      try {
        setIsLoading(true);
        const res = await fetchUserBoards(user.id);
        setBoards(res.boards || []);
        setFilteredBoards(res.boards || []);
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

  // Si el usuario está cargando o no hay usuario, mostramos un estado de carga
  if (isUserLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-f2green mx-auto mb-4" />
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Bienvenido, {user.username}</h1>
        <p className="text-neutral-400">Gestiona tus tableros Kanban y organiza tus tareas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search and filters panel */}
        <div className="lg:col-span-1 bg-voidBlack/50 p-6 rounded-lg border border-fgreen/20">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Crear nuevo tablero</h2>
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-voidBlack to-neutral-900 rounded-lg border border-f2green">
              <SquareDashedKanban className="text-fgreen mb-4" size={60} />
              <Button 
                onClick={() => navigate("/newboard")}
                className="w-full bg-gradient-to-r from-fgreen to-f2green text-black font-bold py-2 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Nuevo Tablero
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Buscar tableros</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-fgreen/70" />
              <Input 
                type="text" 
                placeholder="Buscar por nombre..." 
                className="pl-10 bg-black/20 border-fgreen text-white focus:border-f2green focus:ring-f2green/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Boards list */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Mis Tableros</h2>
            <div className="text-neutral-400 text-sm">
              {filteredBoards.length} de {boards.length} tableros
            </div>
          </div>

          {isLoading ? (
            <div className="bg-voidBlack/50 p-8 rounded-lg border border-fgreen/20 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-f2green mx-auto mb-4" />
              <p className="text-white">Cargando tableros...</p>
            </div>
          ) : filteredBoards.length === 0 ? (
            <div className="bg-voidBlack/50 p-8 rounded-lg border border-fgreen/20 text-center">
              <SquareDashedKanban className="text-fgreen/60 mx-auto mb-4" size={60} />
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron tableros</h3>
              <p className="text-neutral-400 mb-4">
                {searchTerm ? "Ningún tablero coincide con tu búsqueda" : "Aún no has creado ningún tablero"}
              </p>
              <Button 
                onClick={() => navigate("/newboard")}
                className="bg-gradient-to-r from-fgreen to-f2green text-black font-bold py-2 rounded-lg hover:opacity-90 transition-all duration-300"
              >
                Crear mi primer tablero
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBoards.map((board) => (
          <UserBoard key={board.id} board={board} />
        ))}
      </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoggedHome