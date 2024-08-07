import React from "react";

export default function Visits() {
  return (
    <div className="flex flex-col text-[12px] gap-2 justify-center items-center">
      <div className="flex gap-1 justify-center items-center">
        Visits:{" "}
        <a
          href="https://www.cutercounter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.cutercounter.com/hits.php?id=hxpokcf&nd=6&style=2"
            alt="counter for blog"
          />
        </a>
      </div>
      <div className="flex gap-1 justify-center items-center">
        Unique:
        <a
          href="https://www.cutercounter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.cutercounter.com/hits.php?id=hrvxpokcn&nd=6&style=2"
            border="0"
            alt="blog counter"
          ></img>
        </a>
      </div>
    </div>
  );
}
