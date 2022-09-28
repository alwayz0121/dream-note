import { useContext, useEffect, useState } from "react";
import Header from "./../components/Header";
import Button from "./../components/Button";
import { NoteStateContext } from "./../App";
import NoteList from "../components/NoteList";

function LandingPage() {
  const noteList = useContext(NoteStateContext);

  //월별로 작성된 기록을 필터링 해서 보여주기
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const title = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 기록`;

  //날짜가 이동되면 현재 달에 해당되는 기록만 보여주기
  useEffect(() => {
    if (noteList.length >= 1) {
      const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        noteList.filter((note) => firstDay <= note.date && note.date <= lastDay)
      );
    }
  }, [noteList, currentDate]);

  const increaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };

  const decreaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      )
    );
  };

  return (
    <div>
      <Header
        title={title}
        leftSide={<Button text={"<"} onClick={decreaseMonth} />}
        rightSide={<Button text={">"} onClick={increaseMonth} />}
      />
      <NoteList noteList={data} />
    </div>
  );
}

export default LandingPage;
