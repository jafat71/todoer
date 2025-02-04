import CalendarForm from '@/components/custom/CalendarForm';

const NewKanbanBoard = () => {
        return(
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white">
                <h1 className="text-4xl font-bold my-4">New Kanban Board</h1>

                <CalendarForm />

            </div>
        );
};

export default NewKanbanBoard;