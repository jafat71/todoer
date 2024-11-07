import CalendarForm from "@/components/custom/CalendarForm";
import DayCounter from "@/components/custom/DayCounter";
import TaskCalendar from "@/components/custom/TaskCalendar";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4">TODOER</h2>
            <div
                className="grid grid-cols-2 md:grid-cols-4 border-2 
        border-slate-200 p-4 rounded-lg
      "
            >
                <CalendarForm />
                <TaskCalendar />
                <CalendarForm />
                <DayCounter />
                <CalendarForm />
                <CalendarForm />

            </div>
        </div>
    );
};

export default Home;
