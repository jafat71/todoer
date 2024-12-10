export const KANBAN_COLUMNS = ["TODO","DOING","DONE"]
export const PRIORITY_OPTIONS = ["HIGH", "MEDIUM", "LOW"]

export const getPriorityColor = (priority) => {
    switch (priority) {
        case PRIORITY_OPTIONS[0]:
            return "bg-[#ff073a]";
        case PRIORITY_OPTIONS[1]:
            return "bg-[#fffc33]";
        case PRIORITY_OPTIONS[2]:
            return "bg-[#89f336]";
    }
}
