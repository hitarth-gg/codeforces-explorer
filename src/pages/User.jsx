import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRatingGraph, getSubmissions } from "../context/user/userSlice";
import CenteredLoader from "../ui/CenteredLoader";
import ErrorPage from "./ErrorPage";
import TabSubmissions from "../components/TabSubmissions";
import { getRatings } from "../context/solutions/solutionsSlice";

export default function User() {
  const x = useParams();
  const [styleBlur, setStyleBlur] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubmissions(x.id));
    dispatch(getRatingGraph(x.id));
    setStyleBlur(true);
  }, [dispatch, x.id]);

  const {
    problemsSolved,
    correctSubmissions,
    skippedSubmissions,
    isLoading,
    errorMsg,
  } = useSelector((store) => store.user);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setStyleBlur(false), 500); // Unblur after loading
    }
  }, [isLoading]);

  if (isLoading) return <CenteredLoader />;
  else if (errorMsg) {
    return <ErrorPage text={errorMsg} />;
  } else if (
    problemsSolved.length +
      correctSubmissions.length +
      skippedSubmissions.length ===
    0
  ) {
    return (
      <ErrorPage
        title="No data to show here !"
        text={"User has not made any submissions yet."}
        type={"info"}
      />
    );
  }

  return (
    // {`transition-all duration-700 ease-in-out ${styleBlur ? "blur-md" : ""}`}
    <div
      className={`mt-8 transition-all duration-300 ease-in-out sm:mx-4 lg:mx-14 ${styleBlur ? "opacity-0 blur-md" : ""}`}
    >
      <TabSubmissions />
    </div>
  );
}
