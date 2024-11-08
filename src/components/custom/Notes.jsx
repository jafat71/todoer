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
    const [openDialog, setOpenDialog] = useState(false);

    const handleAddNote = () => {
        if (newNote.trim() !== '') {
            setNotes([...notes, { id: Date.now(), text: newNote }]);
            setNewNote('');
        }
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setEditText(note.text);
        setOpenDialog(true);
    };

    const handleSaveEdit = () => {
        setNotes(notes.map(note => note.id === editingNote.id ? { ...note, text: editText } : note));
        setEditingNote(null);
        setEditText('');
        setOpenDialog(false);
    };

    return (
        <Card className="max-w-lg mx-auto w-full bg-gray-100">
            <CardHeader>
                <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex mb-4 space-x-2">
                    <Input
                        type="text"
                        placeholder="Enter a new note"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="flex-grow"
                    />
                    <Button onClick={handleAddNote} variant="primary">
                        <LucidePlus size={20} className="mr-1" />
                        Add
                    </Button>
                </div>

                <ul className="space-y-2">
                    {notes.map((note) => (
                        <li
                            key={note.id}
                            className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm"
                        >
                            <span>{note.text}</span>
                            <div className="flex space-x-2">
                                <Button onClick={() => handleEditNote(note)} variant="outline">
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

            {/* AlertDialog for editing a note */}
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <h3 className="text-lg font-semibold">Edit Note</h3>
                    </AlertDialogHeader>
                    <Input
                        type="text"
                        placeholder="Edit your note"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="mb-4"
                    />
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleSaveEdit}>Save</AlertDialogAction>
                        <Button onClick={() => setOpenDialog(false)} variant="outline">Cancel</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default Notes;
