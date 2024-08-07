import { useDispatch } from "react-redux";
import { getSubmissions } from "../context/user/userSlice";
import { getSolutions } from "../context/solutions/solutionsSlice";
import { toast } from "sonner";
import HowToUse from "../components/HowToUse";
import PixelFlower from "../images/pixelFlower.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();

  let [searchParams] = useSearchParams();
  let path = searchParams.get("");

  // console.log(path);

  const urlParams = [];
  if (path) {
    if (path.split("/")[0]) {
      urlParams.push(path.split("/")[0]);
    }
    if (path.split("/")[1]) {
      urlParams.push(path.split("/")[1]);
    }
  }
  console.log(urlParams);

  const navigate = useNavigate();

  useEffect(() => {
    if (urlParams.length === 1) {
      navigate(`/user/${urlParams[0]}`);
    } else if (urlParams.length === 2) {
      navigate(`/problem/${urlParams[0]}/${urlParams[1]}`);
    }
  }, [navigate, urlParams]);

  return (
    <div className="">
      <div
        className="mt-6 flex flex-col items-center justify-between"
        style={{ height: "80vh" }}
      >
        <div
          className="flex items-center justify-center gap-4 text-lg"
          style={{ fontFamily: "Pixelify Sans", margin: "auto" }}
        >
          CodeForces
          <img className="h-14 w-auto" src={PixelFlower} alt=""></img> Explorer
        </div>

        <div className="text-xs">
          <HowToUse />
        </div>
      </div>
    </div>
  );
}
