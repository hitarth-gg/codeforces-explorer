import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Code, TextField } from "@radix-ui/themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchBar() {
  function extractIdAndIndex(url) {
    const regex = /(\d+|[A-Za-z]\d+).*\/([A-Za-z]\d*)$/;
    const match = url.match(regex);
    if (match) {
      return { number: match[1], index: match[2].toUpperCase() };
    }
    return null;
  }

  const x = useParams();
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (x.id) setSearchText(x.id);
    else if (x.contest && x.index) setSearchText(`${x.contest}/${x.index}`);
    else setSearchText("");
  }, [x.contest, x.id, x.index]);

  console.log(searchText);
  
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    // console.log(event.target.value);
  };
  const handleSearchText = useCallback(
    function handleSearchText(text) {
      if (text === "") {
        toast.error("Invalid search query", {
          icon: <MagnifyingGlassIcon height="16" width="16" color="#ffffff" />,
          description: "Please enter a valid search query",
        });
        return;
      }
      if (text.indexOf("/") === -1) {
        const currentURL = window.location.href.split("/");
        // console.log(currentURL);
        // navigate(`/user/${text}`);
        // if (currentURL.includes(`/user/${text}`)) navigate(0);
        if (currentURL.includes(text) && currentURL.includes("user")) navigate(0);
        else navigate(`/user/${text}`);
      } else {
        const problem = extractIdAndIndex(text);
        if (problem === null) {
          toast.error("Invalid search query", {
            icon: (
              <MagnifyingGlassIcon height="16" width="16" color="#ffffff" />
            ),
            description: "Please enter a valid search query",
          });
          return;
        }
        // console.log(text);
        // console.log(problem);

        const currentURL = window.location.href;
        // console.log(currentURL);
        // navigate(`/problem/${problem.number}/${problem.index}`);
        if (currentURL.includes(`/problem/${problem.number}/${problem.index}`))
          navigate(0);
        navigate(`/problem/${problem.number}/${problem.index}`);
      }
    },
    [navigate],
  );

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (
        event.key === "Enter" &&
        inputRef.current === document.activeElement
      ) {
        handleSearchText(searchText);
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
  }, [handleSearchText, searchText]);

  return (
    <div>
      <TextField.Root
        placeholder={"Search for a user / problem"}
        onInput={handleSearchChange}
        ref={inputRef}
        type="text"
        value={searchText}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Slot
          className="transition-all duration-100 ease-in-out hover:cursor-pointer hover:bg-[#5a5e6750]"
          onClick={() => handleSearchText(searchText)}
        >
          <Code size={"1"} color="gray" variant="outline">
            ctrl
          </Code>
          <Code size={"1"} color="gray" variant="outline">
            k
          </Code>
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}
