import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteDispatchContext } from "./../App.js";

import Button from "./Button";

// NoteList.js : 작성 List
const NoteItem = ({ id, goal, content, date }) => {
  const [dropdown, setDropdown] = useState(false);
  const btnEl = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!btnEl.current?.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.body.addEventListener("click", onClick);
    return () => {
      document.body.removeEventListener("click", onClick);
    };
  }, []);

  const navigate = useNavigate();
  const noteDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/detail/${id}`);
  };

  const onEdit = () => {
    navigate(`/edit/${id}`);
  };

  const { onRemove, onCreate } = useContext(NoteDispatchContext);
  const handleRemove = () => {
    if (window.confirm("기록을 삭제하시겠어요? :(")) {
      onRemove(id);
    }
    onCreate();
  };

  return (
    <div className="NoteItemWrapper">
      <div className="NoteItem">
        <div className="note_wrapper" onClick={goDetail}>
          <div className="note_date">{noteDate}</div>
          <div className="note_goal" onClick={goDetail}>
            {goal}
          </div>
        </div>

        <div className="btn_wrapper" ref={btnEl}>
          <Button text={"📝"} onClick={() => setDropdown((cur) => !cur)} />
          {dropdown && (
            <div className="correction_delete">
              <ul>
                <li onClick={onEdit}>수정</li>
                <li onClick={handleRemove}>삭제</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div onClick={goDetail} className="note_content">
        <div className="note_content_preview">
          {content.length <= 30 ? content : `${content.slice(0, 30)} ...`}
        </div>
      </div>
    </div>
  );
};

export default React.memo(NoteItem);
