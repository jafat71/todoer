import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { LucideEdit, LucideDelete, LucidePlus } from 'lucide-react';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [editingNote, setEditingNote] = useState(null);
    const [editText, setEditText] = useState('');
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleAddNote = () => {
        if (newNote.trim() !== '') {
            setNotes([...notes, { id: Date.now(), text: newNote }]);
            setNewNote('');
            setOpenAddDialog(false); // Cerrar el diálogo después de agregar la nota
        }
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setEditText(note.text);
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setNotes(notes.map(note => note.id === editingNote.id ? { ...note, text: editText } : note));
        setEditingNote(null);
        setEditText('');
        setOpenEditDialog(false);
    };

    return (
        <Card className="w-full bg-gray-100">
            <CardHeader>
                <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-start mb-4">
                    <AlertDialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                        <AlertDialogTrigger asChild>
                            <Button variant="primary">
                                <LucidePlus size={20} className="mr-1" />
                                Crear Nota
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <h3 className="text-lg font-semibold">Crear Nueva Nota</h3>
                            </AlertDialogHeader>
                            <Input
                                type="text"
                                placeholder="Escribe tu nota"
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                className="mb-4"
                            />
                            <AlertDialogFooter>
                                <AlertDialogAction onClick={handleAddNote}>Añadir</AlertDialogAction>
                                <Button onClick={() => setOpenAddDialog(false)} variant="outline">Cancelar</Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <ul className="space-y-2">
                    {notes.map((note) => (
                        <li
                            key={note.id}
                            className="flex flex-col md:flex-row items-center justify-between p-2 bg-white rounded-md shadow-sm"
                        >
                            <span>{note.text}</span>
                            <div className="flex">
                                <Button onClick={() => handleEditNote(note)} variant="outline" className="mr-2">
                                    <LucideEdit size={16} />
                                </Button>
                                <Button onClick={() => handleDeleteNote(note.id)} variant="outline">
                                    <LucideDelete size={16} />
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>

            {/* AlertDialog para editar una nota */}
            <AlertDialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <h3 className="text-lg font-semibold">Editar Nota</h3>
                    </AlertDialogHeader>
                    <Input
                        type="text"
                        placeholder="Edita tu nota"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="mb-4"
                    />
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleSaveEdit}>Guardar</AlertDialogAction>
                        <Button onClick={() => setOpenEditDialog(false)} variant="outline">Cancelar</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default Notes;
