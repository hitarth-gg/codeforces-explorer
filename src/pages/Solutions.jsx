import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubmissions } from "../context/user/userSlice";
import CenteredLoader from "../ui/CenteredLoader";
import ErrorPage from "./ErrorPage";
import SolutionsTable from "../components/SolutionsTable";
import { getSolutions, updateNumberOfSubmissions } from "../context/solutions/solutionsSlice";

export default function Solutions() {
  const params = useParams();
  const [styleBlur, setStyleBlur] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateNumberOfSubmissions(8000));
    dispatch(getSolutions(params.contest, params.index));
    setStyleBlur(true);
  }, [dispatch, params.contest, params.index]);

  
  const {
    solutions,
    ratings,
    isLoading,
    isLoadingRatings,
    errorMsg,
    errorMsgRatings,
  } = useSelector((store) => store.solutions);

  useEffect(() => {
    if (!isLoading && solutions.length > 0) {
      setTimeout(() => setStyleBlur(false), 100); // Unblur after loading
    }
  }, [isLoading, solutions.length]);

  //   console.log(solutions);

  if (isLoading) return <CenteredLoader />;
  else if (errorMsg) {
    return <ErrorPage text={errorMsg} />;
  } else if (solutions.length === 0) {
    return (
      <ErrorPage
        title="No data to show here !"
        text={"No accepted submissions found."}
        type={"info"}
      />
    );
  }

  return (
    // {`transition-all duration-700 ease-in-out ${styleBlur ? "blur-md" : ""}`}
    <div
      className={`mt-8 transition-all duration-300 ease-in-out sm:mx-4 lg:mx-14 ${styleBlur ? " blur-md" : ""}`}
    >
      <SolutionsTable
        // setStyleBlur={setStyleBlur}
        solutions={solutions}
        isLoadingRatings={isLoadingRatings}
      />
    </div>
  );
}
