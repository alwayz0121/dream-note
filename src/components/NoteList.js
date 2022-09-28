import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteStateContext } from "./../App";

import Button from "./Button";
import NoteItem from "./NoteItem";

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
});

function NoteList({ noteList }) {
  const navigate = useNavigate();
  const noteData = useContext(NoteStateContext);

  //최신순 or 오래된순 type 저장할 state
  const [sortType, setSortType] = useState("latest");
  //goal의 현재 상태를 저장할 state
  const [goalFilter, setGoalFilter] = useState("all");

  const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된순" },
  ];

  const goalAll = [...noteData].map((note) => {
    return {
      value: note.goal,
      name: note.goal,
    };
  });

  //객체 배열에서 중복 제거
  //https://ko.code-paper.com/javascript/examples-remove-duplicate-values-in-js-array-object
  const goalList = (array, key) => {
    return array.reduce((arr, item) => {
      const removed = arr.filter((i) => i[key] !== item[key]);
      return [...removed, item];
    }, []);
  };

  const goalFilterOptionList = [
    ...goalList(goalAll, "value"),
    { value: "all", name: "목표별 보기" },
  ];

  //최신순 or 오래된순 정렬
  const processedNoteList = () => {
    //객체로 이뤄진 배열 정리
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyNoteList = [...noteList];

    //필터링해서 정렬해서 리스트를 반환하도록
    const filteredList =
      goalFilter === "all"
        ? copyNoteList
        : copyNoteList.filter((list) => goalFilter === list.goal);

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="NoteList">
      <div className="menu_wrapper">
        <div className="left-col">
          {/* <h3>기록 {noteList.length}개</h3> */}
        </div>
        <div className="right-col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={goalFilter}
            onChange={setGoalFilter}
            optionList={goalFilterOptionList}
          />
        </div>
      </div>

      {processedNoteList().map((noteItem) => (
        <NoteItem key={noteItem.id} {...noteItem} />
      ))}

      <div className="menu_wrapper">
        <div className="bottom_col">
          <Button
            type={"positive"}
            text={"새 기록 작성"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
    </div>
  );
}

NoteList.defaultProps = {
  noteList: [],
};

export default NoteList;
