import { useEffect } from "react";
import NoteEditor from "./../components/NoteEditor";

function NewPage() {
  useEffect(() => {
    const siteTitle = document.getElementsByTagName("title")[0];
    siteTitle.innerHTML = `새 기록 작성 | Dream Note`;
  });

  return (
    <div>
      <NoteEditor />
    </div>
  );
}

export default NewPage;
