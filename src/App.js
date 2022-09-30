import React, { useEffect, useReducer, useRef, useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import NewPage from "./pages/NewPage";
import NoteEditPage from "./pages/NoteEditPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoadingPage from "./pages/LoadingPage";

//데이터 생성, 수정, 삭제는 모두 reducer 거쳐서 수행되므로,
//reducer에서 newNoteData가 변화할 때마다 localStorage에 값을 넣어준다.
const noteReducer = (oldNoteData, action) => {
  let newNoteData = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newNoteData = [action.data, ...oldNoteData];
      break;
    }
    case "REMOVE": {
      newNoteData = oldNoteData.filter((note) => note.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newNoteData = oldNoteData.map((note) =>
        note.id === action.data.id ? { ...action.data } : note
      );
      break;
    }
    default:
      return oldNoteData;
  }

  localStorage.setItem("note", JSON.stringify(newNoteData));
  return newNoteData;
};

export const NoteStateContext = React.createContext();
export const NoteDispatchContext = React.createContext();

function App() {
  //노트 data 관리 state
  const [noteData, noteDispatch] = useReducer(noteReducer, []);

  //LoadingPage.js
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("note");
    if (localData) {
      const noteList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (noteList.length >= 1) {
        dataId.current = parseInt(noteList[0].id) + 1;
        noteDispatch({ type: "INIT", data: noteList });
      }
    }
  }, []);

  const dataId = useRef(0); //id 값
  //CREATE
  const onCreate = (date, goal, content) => {
    noteDispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        goal,
        content,
      },
    });
    dataId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) => {
    noteDispatch({
      type: "REMOVE",
      targetId,
    });
  };
  //EDIT
  const onEdit = (targetId, date, goal, content) => {
    noteDispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        goal,
        content,
      },
    });
  };

  return (
    <NoteStateContext.Provider value={noteData}>
      <NoteDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {isLoading ? (
                <Route path="/" element={<LoadingPage />} />
              ) : (
                <Route path="/" element={<LandingPage />} />
              )}
              <Route path="/new" element={<NewPage />} />
              <Route path="/edit/:id" element={<NoteEditPage />} />
              <Route path="/detail/:id" element={<NoteDetailPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteDispatchContext.Provider>
    </NoteStateContext.Provider>
  );
}

export default App;
