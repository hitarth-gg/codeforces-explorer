import SearchBar from "./SearchBar";
import header from "../assets/header2.png";
import { Link } from "react-router-dom";
import {
  DividerVerticalIcon,
  GitHubLogoIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

export default function Header({ theme, toggleTheme }) {
  return (
    <div className="z-10 flex items-center justify-between border-[#5a5e6750] px-4 py-3">
      <div className="flex items-center justify-center gap-x-2">
        <Link
          className="hover: flex w-fit cursor-pointer select-none gap-x-2 rounded-sm p-1 font-spaceMono text-sm transition-all duration-200 hover:bg-[#70707030]"
          to={"/"}
        >
          <img className="w-5" src={header} alt="" />
          <span>explorer.</span>
        </Link>
        <DividerVerticalIcon width={20} height={20} color="#ffffff40" />
        <Button color="gray" variant="ghost" size={"1"}>
          <a
            href="https://github.com/hitarth-gg/codeforces-explorer"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubLogoIcon className="my-1" width={17} height={17} />
          </a>
        </Button>
      </div>

      <div className="w-2/6">
        <SearchBar />
      </div>
      <div className="flex items-center justify-center gap-x-8">
        <Link
          target="_blank"
          to="https://github.com/hitarth-gg/codeforces-explorer-extension"
        >
          <Button color="gray" variant="ghost" size={"1"}>
            <div className="p-1 text-[.8rem]">Extension</div>
          </Button>
        </Link>
        <Button color="gray" variant="ghost" size={"1"} onClick={toggleTheme}>
          {theme === "dark" ? (
            <MoonIcon className="my-1" width={17} height={17} />
          ) : (
            <SunIcon className="my-1" width={17} height={17} />
          )}
        </Button>
      </div>
    </div>
  );
}
