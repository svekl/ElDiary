import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addNote, removeNote, updateNote } from "../store/slices/noteSlice";
import moment from "moment/min/moment-with-locales.min";

const NoteItem = ({ note, deleteNote, editNote }) => {
  return (
    <li style={{ display: "flex", gap: "15px" }}>
      {`Дата: ${note.date}, заметка: ${note.text}`}{" "}
      <button onClick={() => editNote(note.text, note.id)}>Изменить</button>
      <button onClick={() => deleteNote(note.id)}>Удалить</button>
    </li>
  );
};

const Note = () => {
  const { notes, allIds } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const deleteNote = (id) => {
    dispatch(removeNote({ noteId: id }));
  };
  const editNote = (text, id) => {
    const newText = prompt("Отредактируйте запись", text);
    dispatch(updateNote({ noteId: id, data: { text: newText } }));
  };
  const addItem = () => {
    const date = moment();
    dispatch(
      addNote({ id: Date.now(), date: date.format("YYYY-MM-DD"), text: input })
    );
    setInput("");
  };

  return (
    <main className="container">
      <h3>Блокнот</h3>
      <ul>
        {allIds.map((id) => (
          <NoteItem
            key={id}
            note={notes[id]}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(ev) => setInput(ev.target.value)}
      />
      <button
        onClick={() => {
          addItem();
        }}
      >
        Добавить запись
      </button>
    </main>
  );
};
export default Note;
