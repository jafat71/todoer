export const transformDatafromAPI = async (columns, tasks) => {
    try {
        const initialColumns = {};

        columns.forEach((column) => {
            let filteredTasks = [];
            switch (column) {
                case "TODO":
                    filteredTasks = tasks.filter((task) => !task.doing && !task.done);
                    break;
                case "DOING":
                    filteredTasks = tasks.filter((task) => task.doing && !task.done);
                    break;
                case "DONE":
                    filteredTasks = tasks.filter((task) => task.done);
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