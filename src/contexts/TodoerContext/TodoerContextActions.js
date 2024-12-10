//cambio 
export const transformDatafromAPI = async (columns, tasks) => {
    try {
        const initialColumns = {};

        columns.forEach((column) => {
            let filteredTasks = [];
            switch (column) {
                case columns[0]:
                    filteredTasks = tasks.filter((task) => task.status === columns[0]);
                    break;
                case columns[1]:
                    filteredTasks = tasks.filter((task) => task.status === columns[1]);
                    break;
                case columns[2]:
                    filteredTasks = tasks.filter((task) => task.status === columns[2]);
                    break;
                default:
                    break;
            }

            initialColumns[column] = {
                title: column,
                tasks: filteredTasks,
            };
        });

        return initialColumns; // Devuelve los datos transformados
    } catch (error) {
        console.error("Error transforming data:", error);
        return {};
    }
};