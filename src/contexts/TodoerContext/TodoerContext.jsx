/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { KANBAN_COLUMNS } from '@/constants';
import { fetchExampleTasks, fetchUserTasks } from '@/lib/actions';
import { getDifferenceBetweenDates } from '@/utils';
import { createContext, useContext, useEffect, useState } from 'react';
import { transformDatafromAPI } from './TodoerContextActions';

const TodoerContext = createContext();

export const TodoerProvider = ({ children }) => {
    const [dates, setDates] = useState();
    const [period, setPeriod] = useState(0);
    const [daysRemaining, setDaysRemaining] = useState(0);
    const [kanbanObject, setKanbanObject] = useState({});
    const [isLoading, setisLoading] = useState(true);

    const setNoLoggeKanbanBoard =  async () => {
        setisLoading(true)
        try {
            let data = []
            data = await fetchExampleTasks(); 
            const transformedData = await transformDatafromAPI(KANBAN_COLUMNS, data); 
            setKanbanObject(transformedData); 
        } catch (error) {
            console.error("Error fetching tasks:", error);
            const fallbackData = transformDatafromAPI(KANBAN_COLUMNS, []);
            setKanbanObject(fallbackData);
        } finally {
            setTimeout(() => {
                setisLoading(false)
                
            }, 1000);
        }
    }

    const setKanbanBoard = async (data = []) => {
        try {
            const transformedData = await transformDatafromAPI(KANBAN_COLUMNS, data); 
            setKanbanObject(transformedData); 
        } catch (error) {
            const fallbackData = transformDatafromAPI(KANBAN_COLUMNS, []);
            setKanbanObject(fallbackData);
        }finally {
            setTimeout(() => {
                setisLoading(false)
            }, 1000);
        }
    }

    const calculatePeriod = () => {
        (dates)
            ? setPeriod((getDifferenceBetweenDates(dates.fromDate, dates.toDate)))
            : setPeriod(0)
    }

    const calculateRemain = () => {
        (dates)
            ? setDaysRemaining((getDifferenceBetweenDates(new Date(), dates.toDate)))
            : setDaysRemaining(0)
    }


    useEffect(() => {
        //Fetch dates from api
        calculatePeriod()
        calculateRemain()
    }, [dates]);

    return (
        <TodoerContext.Provider value={{
            setDates,
            daysRemaining,
            period,
            kanbanObject,
            setKanbanObject,
            isLoading,
            setKanbanBoard,
            setNoLoggeKanbanBoard
        }}>
            {children}
        </TodoerContext.Provider>
    );
};

export const useTodoerContext = () => {
    return useContext(TodoerContext);
};
