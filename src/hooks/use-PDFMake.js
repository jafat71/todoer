import jsPDF from 'jspdf';
import LogoSvg from "@/assets/logo.svg";
import { useTodoerContext } from '@/contexts/TodoerContext/TodoerContext';

export const usePDFMake = (board) => {

    const {
        daysRemaining,
        period,
        kanbanObject
    } = useTodoerContext();

    const generarPDF = async () => {
        const doc = new jsPDF();
        const imgData = await convertirSvgAImagen(LogoSvg);
        doc.addImage(imgData, "PNG", 10, 10, 25, 25); // Logo
        doc.setFontSize(22);
        doc.text("KNBNN", 45, 20); // Título
        doc.setFontSize(12);
        doc.text("Interactive Kanban Board Manager", 45, 30); // Subtítulo
        doc.text("Inform generated on: " + new Date().toLocaleDateString(), 10, 50);
        doc.setFontSize(16);
        doc.text("Project Information", 10, 70);
        doc.setFontSize(12);
        doc.text("Project: " + board.title, 10, 80);
        doc.text("Start Date: " + board.from_date.split("T")[0], 10, 90);
        doc.text("End Date: " + board.to_date.split("T")[0], 10, 100);

        let status = board.completed ? "Completed" : "In Progress";
        doc.text("Status: " + status, 10, 110);
        doc.text("Total Project Days: " + period, 10, 130);
        doc.text("Days Remaining: " + daysRemaining, 10, 140);

        const estados = ["TODO", "DOING", "DONE"];

        const columnWidth = 60;
        let startX = 10;
        let startY = 150;

        const totalTasks = Object.values(kanbanObject).reduce((acc, estado) => acc + estado.tasks.length, 0);

        let priorityCounts = { LOW: 0, MEDIUM: 0, HIGH: 0 };

        estados.forEach((estado) => {
            const tasks = kanbanObject[estado]?.tasks || [];

            const percentage = totalTasks > 0 ? ((tasks.length / totalTasks) * 100).toFixed(2) : '0.00';

            doc.setFontSize(16);
            doc.text(`${estado} (${percentage}%)`, startX, startY);

            let taskStartY = startY + 10;

            if (tasks.length > 0) {
                tasks.forEach((task, taskIndex) => {
                    const taskText = `${taskIndex + 1}. ${task.title}`;
                    const priorityText = `Priority: ${task.priority}`;

                    doc.setFontSize(12);
                    doc.text(taskText, startX + 5, taskStartY);
                    taskStartY += 10;

                    doc.text(priorityText, startX + 5, taskStartY);
                    taskStartY += 5;

                    priorityCounts[task.priority] = (priorityCounts[task.priority] || 0) + 1;
                });
            } else {
                doc.setFontSize(12);
                doc.text(`No hay tareas en ${estado}.`, startX + 5, taskStartY);
            }

            startX += columnWidth;

            if (startX > (columnWidth * estados.length)) {
                startX = 10;
                startY += Math.max(taskStartY - startY + 20, 50);

                if (startY > 300) {
                    doc.addPage();
                    startY = 20;
                }
            }
        });

        startX = 10;
        startY += Math.max(estados.length * (totalTasks > 0 ? (totalTasks * 10 + 30) : (50)), 50);

        if (startY > 300) {
            doc.addPage();
            startY = 20;
        }

        const completedTasks = kanbanObject["DONE"]?.tasks.length || 0;
        const inProgressTasks = kanbanObject["TODO"]?.tasks.length + kanbanObject["DOING"]?.tasks.length || 0;

        const totalCompletedPercentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : '0.00';

        doc.setFontSize(16);
        doc.text("Overall Progress", startX, startY);

        doc.setFontSize(12);
        doc.text(`Total Tasks: ${totalTasks}`, startX, startY + 10);
        doc.text(`Completed Tasks: ${completedTasks}`, startX, startY + 20);
        doc.text(`In Progress Tasks: ${inProgressTasks}`, startX, startY + 30);
        doc.text(`Completed Tasks Percentage: ${totalCompletedPercentage}%`, startX, startY + 40);

        const lowPercentage = totalTasks > 0 ? ((priorityCounts.LOW || 0) / totalTasks * 100).toFixed(2) : '0.00';
        const mediumPercentage = totalTasks > 0 ? ((priorityCounts.MEDIUM || 0) / totalTasks * 100).toFixed(2) : '0.00';
        const highPercentage = totalTasks > 0 ? ((priorityCounts.HIGH || 0) / totalTasks * 100).toFixed(2) : '0.00';

        doc.text(`Low Priority Tasks: ${priorityCounts.LOW} (${lowPercentage}%)`, startX, startY + 50);
        doc.text(`Medium Priority Tasks: ${priorityCounts.MEDIUM} (${mediumPercentage}%)`, startX, startY + 60);
        doc.text(`High Priority Tasks: ${priorityCounts.HIGH} (${highPercentage}%)`, startX, startY + 70);

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(`Page ${i} of ${pageCount}`, 10, doc.internal.pageSize.getHeight() - 10); // Pie de página
        }

        doc.save(`informe_proyecto_${board.title.replace(/\s+/g, '_')}_${new Date().toLocaleDateString()}.pdf`);
    };


    // Función para convertir SVG a imagen
    const convertirSvgAImagen = (svgUrl) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = svgUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png')); // Devuelve la imagen en formato PNG
            };
            img.onerror = (error) => reject(error);
        });
    };

    return { generarPDF };
}

export default usePDFMake;
