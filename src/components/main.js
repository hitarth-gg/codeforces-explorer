import { useState } from "react";
import SearchBar from "./searchbar";
import TabSubmissions from "./tab";
import { useAuth } from "../Auth/AuthContext";
import Duck from "../images/duck.png";
import PixelFlower from "../images/pixelFlower.png";
import Pagination from "./pagination";
import { Switch } from "@radix-ui/themes";
import Settings from "./settings";
import GithubCard from "./githubCard";


export default function Main({ setTheme }) {
  const authContext = useAuth();
  return (
    <div className="">
      <div className="flex flex-row justify-between px-4 md:px-8 items-center font-sans ">
        {/* <Settings setTheme={setTheme} /> */}
        <GithubCard />
        <SearchBar />
        <Settings setTheme={setTheme} />
      </div>
      {authContext.errorMessage && authContext.errorMessage.length > 0 && (
        <div className="flex flex-col justify-center items-center transition-opacity duration-1000">
          User Not found <img className="size-10" src={Duck} alt="" />
        </div>
      )}
      {authContext.errorMessage.length === 0 &&
        authContext.questionsSolved.length === 0 &&
        !authContext.loading && (
          <div
            className="flex text-lg justify-center items-center gap-4"
            style={{ fontFamily: "Pixelify Sans", height: "80vh" }}
          >
            CodeForces
            <img className="w-auto h-14" src={PixelFlower} alt=""></img>{" "}
            Explorer
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
