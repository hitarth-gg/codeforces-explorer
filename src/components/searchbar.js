import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Code, TextField } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import Anime from "../images/anime.gif";

import { grid, lineWobble } from "ldrs";

// Default values shown

export default function SearchBar() {
  lineWobble.register();
  const [searchText, setSearchText] = useState("");

  const authContext = useAuth();
  const inputRef = useRef(null);

  function extractIdAndIndex(url) {
    const regex = /(\d+).*\/([A-Z])$/;
    const match = url.match(regex);
    if (match) {
        return { number: match[1], index: match[2] };
    }
    return null;
}

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (
          searchText.indexOf("/") !== -1
        ) {
          const idx = extractIdAndIndex(searchText);
          const contestId = idx.number; 
          const problemIndex = idx.index;
          authContext.getSolutions(contestId, problemIndex);
        } else {
          authContext.getSubmissions({ username: searchText });
          inputRef.current.blur();
        }
      }
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        inputRef.current.select();
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchText, authContext]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log(searchText);
  };

  return (
    <div className="my-8 flex flex-col justify-center items-center sm:px-6">
      <TextField.Root
        className="md:w-96 "
        placeholder="Search for a username..."
        onInput={handleSearchChange}
        ref={inputRef}
        type="text"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Slot>
          {/* <MagnifyingGlassIcon height="16" width="16" /> */}
          <Code size={"1"} color="gray" variant="outline">
            ctrl
          </Code>
          <Code size={"1"} color="gray" variant="outline">
            k
          </Code>
        </TextField.Slot>
      </TextField.Root>

      {authContext.loading && (
        <div className="mt-4 absolute top-[20rem] ">
          <div className="flex flex-col justify-center items-center gap-y-3">
            <img className="w-auto h-24" src={Anime} alt="" />
            <l-line-wobble
              style={{ right: "7%", position: "relative  " }}
              size="80"
              stroke="5"
              bg-opacity="0"
              speed="1.75"
              color="#e5bc94"
            ></l-line-wobble>
          </div>
        </div>
      )}
    </div>
  );
}
