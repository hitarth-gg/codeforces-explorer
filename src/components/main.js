import { useState } from "react";
import SearchBar from "./searchbar";
import TabSubmissions from "./tab";
import { useAuth } from "../Auth/AuthContext";
import Duck from "../images/duck.png";
import Pagination from "./pagination";
import { Switch } from "@radix-ui/themes";
import Settings from "./settings";

export default function Main({ setTheme }) {
  const authContext = useAuth();
  return (
    <div className="">
      <div className="flex flex-row items-center font-sans px-14">
        <div className="flex-grow flex justify-center ">
          <SearchBar />
        </div>
        <Settings setTheme={setTheme}/>
      </div>
      {authContext.errorMessage && authContext.errorMessage.length > 0 && (
        <div className="flex flex-col justify-center items-center transition-opacity duration-1000">
          User Not found <img className="size-10" src={Duck} alt="" />
        </div>
      )}

      <div
        className={`md:mx-28 sm:mx-4 transition-all ease-in-out duration-150 ${
          authContext.loading ? "blur-sm opacity-25" : ""
        }`}
      >
        {authContext.questionsSolved.length > 0 ? <TabSubmissions /> : ""}
      </div>
    </div>
  );
}
