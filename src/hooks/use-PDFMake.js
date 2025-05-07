import jsPDF from 'jspdf';
import LogoSvg from "@/assets/logo.svg";
import { useTodoerContext } from '@/contexts/TodoerContext/TodoerContext';

export const usePDFMake = (board) => {
    const {
        daysRemaining,
        period,
        kanbanObject
    } = useTodoerContext();

    // Función para dividir texto en múltiples líneas
    const splitTextIntoLines = (text, maxWidth, doc) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const testWidth = doc.getTextWidth(testLine);

            if (testWidth > maxWidth) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    };

    const generarPDF = async () => {
        const doc = new jsPDF();
        const imgData = await convertirSvgAImagen(LogoSvg);
        doc.addImage(imgData, "PNG", 10, 10, 25, 25); // Logo
        doc.setFontSize(22);
        doc.text("KNBNN", 45, 20); // Título
        doc.setFontSize(12);
        doc.text("Interactive Kanban Board Manager", 45, 30); // Subtítulo
        
        // Agregar fecha y hora actual
        const now = new Date();
        const dateTimeStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        doc.text("Inform generated on: " + dateTimeStr, 10, 50);

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
        const maxTextWidth = columnWidth - 10; // Ancho máximo para el texto
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
                    // Dividir el título de la tarea en múltiples líneas si es necesario
                    const taskLines = splitTextIntoLines(`${taskIndex + 1}. ${task.title}`, maxTextWidth, doc);
                    
                    taskLines.forEach(line => {
                        doc.setFontSize(12);
                        doc.text(line, startX + 5, taskStartY);
                        taskStartY += 7;
                    });

                    doc.text(`Priority: ${task.priority}`, startX + 5, taskStartY);
                    taskStartY += 10;

                    priorityCounts[task.priority] = (priorityCounts[task.priority] || 0) + 1;
                });
            } else {
                doc.setFontSize(12);
                doc.text(`No hay tareas en ${estado}.`, startX + 5, taskStartY);
                taskStartY += 10;
            }

            startX += columnWidth;

            if (startX > (columnWidth * estados.length)) {
                startX = 10;
                startY += Math.max(taskStartY - startY + 20, 50);

                if (startY > 280) {
                    doc.addPage();
                    startY = 20;
                }
            }
        });

        startX = 10;
        startY += Math.max(estados.length * (totalTasks > 0 ? (totalTasks * 10 + 30) : (50)), 50);

        if (startY > 280) {
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
            const pageText = `Page ${i} of ${pageCount}`;
            const pageWidth = doc.getTextWidth(pageText);
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.text(pageText, doc.internal.pageSize.getWidth() - pageWidth - 10, pageHeight - 10);
        }

        doc.save(`informe_proyecto_${board.title.replace(/\s+/g, '_')}_${now.toISOString().replace(/[:.]/g, '-')}.pdf`);
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
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = (error) => reject(error);
        });
    };

    return { generarPDF };
}

export default usePDFMake;