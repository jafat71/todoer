/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { KANBAN_COLUMNS } from '@/constants';
import { fetchExampleTasks, fetchUserTasks } from '@/services/actions';
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

    const setNoLoggeKanbanBoard =  async (columns = KANBAN_COLUMNS) => {
        setisLoading(true)
        try {
            let data = []
            data = await fetchExampleTasks(); 
            console.log(data)
            const transformedData = await transformDatafromAPI(columns, data); 
            console.log(transformedData)
            setKanbanObject(transformedData); 
        } catch (error) {
            console.error("Error fetching tasks:", error);
            const fallbackData = transformDatafromAPI(columns, []);
            setKanbanObject(fallbackData);
        } finally {
            setTimeout(() => {
                setisLoading(false)
                
            }, 1000);
        }
    }

    const setKanbanBoard = async (data = [], columns = KANBAN_COLUMNS) => {
        try {
            const transformedData = await transformDatafromAPI(columns, data); 
            setKanbanObject(transformedData); 
        } catch (error) {
            const fallbackData = transformDatafromAPI(columns, []);
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
            dates,
            daysRemaining,
            period,
            kanbanObject,
            setKanbanObject,
            isLoading,
            setKanbanBoard,
            setNoLoggeKanbanBoard,
        }}>
            {children}
        </TodoerContext.Provider>
    );
};

export const useTodoerContext = () => {
    return useContext(TodoerContext);
};
