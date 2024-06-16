import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [userRatingGraph, setUserRatingGraph] = useState({});
  const [questionsSolved, setQuestionsSolved] = useState([]);
  const [correctSubmissions, setCorrectSubmissions] = useState([]);
  const [skippedSubmissions, setSkippedSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [solutions, setSolutions] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [submissionCount, setSubmissionCount] = useState(8000);
  const [usernameChunkSize, setUsernameChunkSize] = useState(500);

  function cleanUp() {
    setQuestionsSolved([]);
    setCorrectSubmissions([]);
    setSkippedSubmissions([]);
    setLoading(false);
    setErrorMessage("");
    setUsername("");
    setSolutions("");
    setUserInfo({});
  }

  async function getSubmissions({ username }) {
    cleanUp();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://codeforces.com/api/user.status?handle=${username}`
      );

      if (response.status === 400) {
        throw new Error("User not found");
      } else if (response.status === 403) {
        throw new Error("Too many requests");
      } else if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      console.log(response.status);

      const data = await response.json();
      setUsername(username);

      const newQuestionsSolved = [];
      const newCorrectSubmissions = [];
      const newSkippedSubmissions = [];

      data.result.forEach((it) => {
        const submission = {
          id: it.id,
          problem: it.problem.name,
          contestId: it.contestId,
          rating: it.problem.rating ? it.problem.rating : 0,
          index: it.problem.index,
          tags: it.problem.tags,
        };

        if (it.verdict === "SKIPPED") {
          newSkippedSubmissions.push(submission);
        } else if (it.verdict === "OK") {
          if (!newQuestionsSolved.some((x) => x.problem === it.problem.name)) {
            newQuestionsSolved.push(submission);
          }
          newCorrectSubmissions.push(submission);
        }
      });

      setQuestionsSolved(newQuestionsSolved);
      setCorrectSubmissions(newCorrectSubmissions);
      setSkippedSubmissions(newSkippedSubmissions);
    } catch (error) {
      console.log(error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setErrorMessage(
          "Network error or CF API is down. Please try again later."
        );
      } else {
        setErrorMessage(error.message);
      }

      setCorrectSubmissions([]);
      setQuestionsSolved([]);
      setSkippedSubmissions([]);
    } finally {
      setLoading(false);
    }
  }

  const [getSolMemory, setGetSolMemory] = useState({});
  async function getSolutions(contestId, index) {
    setGetSolMemory({ contestId, index });
    cleanUp();

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        // `https://codeforces.com/api/contest.status?contestId=${contestId}&from=1&count=8000`
        `https://codeforces.com/api/contest.status?contestId=${contestId}&from=1&count=${submissionCount}`
      );

      if (response.status === 400) {
        throw new Error("Contest not found");
      } else if (response.status === 403) {
        throw new Error("Too many requests");
      }
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const plug = data.result;

      // console.log(plug);
      const newSolution = [];

      for (let i = 0; i < plug.length; i++) {
        if (plug[i].problem.index === index && plug[i].verdict === "OK") {
          newSolution.push(plug[i]);
        }
      }
      // console.log(newSolution);
      setSolutions(newSolution);
    } catch (error) {
      // if (error.message === "Contest not found")
      // setErrorMessage("Contest not found !");
      // else setErrorMessage("Failed to fetch data");
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setErrorMessage(
          "Network error or CF API is down. Please try again later."
        );
      } else {
        setErrorMessage(error.message);
      }
      setSolutions("");
    } finally {
      setLoading(false);
    }
  }

  async function getUserInfo(usernames) {
    try {
      const chunkSize = usernameChunkSize; // You can adjust this based on the API's rate limits
      const users = [];

      for (let i = 0; i < usernames.length; i += chunkSize) {
        const chunk = usernames.slice(i, i + chunkSize);
        const joinedUsers = chunk.join(";");
        const url = `https://codeforces.com/api/user.info?handles=${joinedUsers}`;
        // console.log(url);

        const response = await fetch(url);

        if (response.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        users.push(...data.result);
      }

      return users;
    } catch (error) {
      setErrorMessage("Failed to fetch data");
      console.error(error);
      return [];
    }
  }

  function ratingColor(rating) {
    if (rating < 1200) return "#bbbbbb";
    if (rating < 1400) return "#6ee96e";
    if (rating < 1600) return "#6ecaac";
    if (rating < 1900) return "#9eb1ff";
    if (rating < 2100) return "#e97ee9";
    if (rating < 2400) return "#e9ac50";
    if (rating < 2600) return "#e96e6e";
    if (rating < 3000) return "#ff3333";
    if (rating >= 3000) return "#b22323";
    return "#e97ee9";
  }
  console.log(userRatingGraph);
  
  async function getUserRatingGraph({ username }) {
    // setLoading(true);
    if (errorMessage === "") {
      try {
        const response = await fetch(
          `https://codeforces.com/api/user.rating?handle=${username}`
        );
        if (response.status === 400) {
          throw new Error("User not found");
        } else if (response.status === 403) {
          throw new Error("Too many requests");
        } else if (response.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUserRatingGraph(data.result);
        // console.log(data.result);
      } catch (error) {
        console.log(error);
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          setErrorMessage(
            "Network error or CF API is down. Please try again later."
          );
        } else {
          setErrorMessage(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        getSubmissions,
        getUserRatingGraph,
        userRatingGraph,
        questionsSolved,
        correctSubmissions,
        skippedSubmissions,
        setQuestionsSolved,
        setCorrectSubmissions,
        setSkippedSubmissions,
        ratingColor,
        loading,
        setLoading,
        errorMessage,
        setErrorMessage,
        solutions,
        getSolutions,
        getUserInfo,
        submissionCount,
        setSubmissionCount,
        usernameChunkSize,
        setUsernameChunkSize,
        getSolMemory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
