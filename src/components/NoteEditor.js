import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteDispatchContext } from "../App";

import Header from "./Header";
import Button from "./Button";

import { stringDate } from "./../util/date";

function NoteEditor({ isEdit, oldData }) {
  const goalInputRef = useRef();
  const contentInputRef = useRef();

  const [date, setDate] = useState(stringDate(new Date()));
  const [goal, setGoal] = useState("");
  const [content, setContent] = useState("");

  const { onCreate, onEdit } = useContext(NoteDispatchContext);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (goal.length < 1) {
      goalInputRef.current.focus();
      return;
    }

    if (content.length < 1) {
      contentInputRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit
          ? "기록을 수정하시겠어요? :)"
          : "새로운 기록을 작성하시겠어요? :)"
      )
    ) {
      if (!isEdit) {
        onCreate(date, goal, content);
      } else {
        onEdit(oldData.id, date, goal, content);
      }
    }

    navigate("/", { replace: true });
  };

  //Edit 페이지에서 작용
  useEffect(() => {
    if (isEdit) {
      setDate(stringDate(new Date(parseInt(oldData.date))));
      setGoal(oldData.goal);
      setContent(oldData.content);
    }
  }, [isEdit, oldData]);

  return (
    <div className="NoteEditor">
      <Header
        title={isEdit ? "기록 수정" : "새 기록"}
        leftSide={<Button text={"<"} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은?</h4>
          <div className="input_wrapper">
            <input
              className="input input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>📝 현재 진행중인 목표</h4>
          <div className="input_wrapper">
            <input
              className="input input_goal"
              name="goal"
              ref={goalInputRef}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              type="text"
              placeholder="어떤 목표를 향해 달려가나요?"
            />
          </div>
        </section>
        <section>
          <h4>어제보다 오늘 발전한 점은 무엇인가요?</h4>
          <div>
            <textarea
              className="input"
              name="content"
              ref={contentInputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="어제보다 오늘 발전한 점은 무엇인가요?"
            />
          </div>
        </section>
        <section>
          <div className="btn_box">
            <Button text={"작성"} type={"positive"} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default NoteEditor;
