import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteEditor from "../components/NoteEditor";
import { NoteStateContext } from "../App";

function NoteEditPage() {
  const [oldData, setOldData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const noteList = useContext(NoteStateContext);

  //Edit가 mount가 될 때 실행
  useEffect(() => {
    if (noteList.length !== 0) {
      const clickedNote = noteList.find(
        (note) => parseInt(note.id) === parseInt(id)
      );

      if (clickedNote) {
        setOldData(clickedNote);
      } else {
        //뒤로가기 막기
        navigate("/", { replace: true });
      }
    }
  }, [id, noteList]);

  return (
    <div> {oldData && <NoteEditor isEdit={true} oldData={oldData} />}</div>
  );
}

export default NoteEditPage;
