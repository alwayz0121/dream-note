import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { NoteStateContext } from "./../App";

import { stringDate } from "./../util/date";

function NoteDetailPage() {
  const { id } = useParams();
  const noteList = useContext(NoteStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (noteList.length >= 1) {
      const clickedNote = noteList.find(
        (note) => parseInt(note.id) === parseInt(id)
      );

      if (clickedNote) {
        //기록이 존재할 때
        setData(clickedNote);
      } else {
        //기록이 없을 때
        alert("기록이 존재하지 않습니다 :(");
        navigate("/", { replace: true });
      }
    }
  }, [id, noteList]);

  if (!data) {
    return <div className="NoteDetailPage">로딩중입니다..</div>;
  } else {
    return (
      <div className="NoteDetailPage">
        <Header
          title={`${stringDate(new Date(data.date))} 기록`}
          leftSide={<Button text={"<"} onClick={() => navigate(-1)} />}
          rightSide={
            <Button
              text={"수정"}
              type={"positive"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>📝 현재 진행중인 목표</h4>
            <div className="note_goal_wrapper">
              <p>{data.goal}</p>
            </div>
          </section>
          <section>
            <div className="note_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
}

export default NoteDetailPage;
