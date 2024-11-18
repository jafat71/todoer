/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { fetchTasks } from '@/lib/actions';
import { getDifferenceBetweenDates } from '@/utils';
import { createContext, useContext, useEffect, useState } from 'react';

const TodoerContext = createContext();

export const TodoerProvider = ({ children }) => {
    const [dates, setDates] = useState();
    const [period, setPeriod] = useState(0);
    const [daysRemaining, setDaysRemaining] = useState(0);
    const [taks, setTasks] = useState([]);

    //TODO:fetch from backend - GO :=
    useEffect(() => {
        fetchTasks()
            .then(data=>{
                setTasks(data)
            })
            .catch(e=>{
                console.log(e)
                setTasks([])
            })
    }, []);

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
        calculatePeriod()
        calculateRemain()
    }, [dates]);

    return (
        <TodoerContext.Provider value={{
            setDates,
            daysRemaining,
            period
        }}>
            {children}
        </TodoerContext.Provider>
    );
};

export const useTodoerContext = () => {
    return useContext(TodoerContext);
};
