import React, { useEffect, useState } from "react";

function MainWin() {
  const [mainColor, setMainColor] = useState<"#FFF" | "green">("#FFF");
  const [secSize, setSecSize] = useState<1 | 2 | 0.5>(1);

  useEffect(() => {
    //@ts-ignore
    window.colors.changeMainBackgroundColor(mainColor);
  }, [mainColor]);
  useEffect(() => {
    //@ts-ignore
    window.size.changeMainSize(secSize);
  }, [secSize]);
  return (
    <>
      <button
        onClick={() => {
          setMainColor((prev) => (prev === "#FFF" ? "green" : "#FFF"));
        }}
      >
        change color
      </button>
      <button
        onClick={() =>
          setSecSize((prev) => {
            if (prev === 1) return 2;
            else {
              if (prev === 2) return 0.5;
              return 2;
            }
          })
        }
      >
        change size
      </button>
    </>
  );
}

export default MainWin;
