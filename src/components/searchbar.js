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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        authContext.getSubmissions({ username: searchText });
        inputRef.current.blur();
      }
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        // select all the text in the input field
        inputRef.current.select();
        inputRef.current.focus();
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchText, authContext]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log(searchText);
  };

  return (
    <div className="m-12 flex flex-col justify-center items-center sm:px-6">
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
          <div className="flex flex-col justify-center items-center gap-3">
            <img className="w-auto h-24" src={Anime} alt="" />
            <l-line-wobble
              size="80"
              stroke="5"
              bg-opacity="0"
              speed="1.75"
              color="gray"
            ></l-line-wobble>
          </div>
        </div>
      )}
    </div>
  );
}
