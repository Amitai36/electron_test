import React, { useEffect, useState } from "react";

function SecWin() {
  const [secColor, setSecColor] = useState<"yellow" | "blue">("yellow");
  const [secSize, setSecSize] = useState<1 | 2 | 0.5>(1);
  useEffect(() => {
    //@ts-ignore
    window.colors.changeSecondBackgroundColor(secColor);
  }, [secColor]);
  useEffect(() => {
    //@ts-ignore
    window.size.changeSecondSize(secSize);
  }, [secSize]);

  return (
    <>
      <button
        onClick={() => {
          setSecColor((prev) => (prev === "yellow" ? "blue" : "yellow"));
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

export default SecWin;
