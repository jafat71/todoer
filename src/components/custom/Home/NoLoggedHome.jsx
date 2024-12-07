import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext"
import Kanban from "../KanbanBoard/Kanban"
import { useEffect } from "react";

const NoLoggedHome = () => {
  const {setNoLoggeKanbanBoard} = useTodoerContext()
useEffect(() => {
    (async () =>  {
        await setNoLoggeKanbanBoard()
    })()     
}, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center ">
      <div className="p-6 w-full lg:w-3/4 h-full md:h-[480px]">
        <Kanban/>
      </div>
      <div className="flex flex-col items-center p-4">
          <div className="flex lg:hidden text-4xl font-extrabold my-5">KNBNN</div>
          <div className="grid grid-cols-2">
              <div className="h-24 w-24 rounded-lg bg-fgreen"/>
              <div className="h-24 w-24 rounded-lg bg-white translate-x-3 rotate-6 "/>
              <div className="h-24 w-24 rounded-lg bg-white "/>
              <div className="h-24 w-24 rounded-lg bg-f2green"/>
          </div>
          <div className="text-4xl font-extrabold text-center">Tracking your work made easy</div>
          <button className="p-4 text-2xl mt-4
          font-bold
          shadow-sm shadow-f2green
          text-voidBlack bg-gradient-to-r from-fgreen to-f2green my-2 rounded-lg
          hover:scale-110 transition-all duration-300
          ">
            Create your own Kanban Board
          </button>
      </div>
    </div>
  )
}

export default NoLoggedHome