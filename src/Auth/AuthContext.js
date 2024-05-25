import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [questionsSolved, setQuestionsSolved] = useState([]);
  const [correctSubmissions, setCorrectSubmissions] = useState([]);
  const [skippedSubmissions, setSkippedSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");

  async function getSubmissions({ username }) {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://codeforces.com/api/user.status?handle=${username}`
      );

      if (response.status === 400) {
        throw new Error("User not found");
      }
      if (!response.status === 400) {
        throw new Error("Failed to fetch data");
      }

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
      if (error.message === "User not found")
        setErrorMessage("User not found !");
      else setErrorMessage("Failed to fetch data");
      setCorrectSubmissions([]);
      setQuestionsSolved([]);
      setSkippedSubmissions([]);
    } finally {
      setLoading(false);
    }
  }

  function ratingColor(rating) {
    if (rating < 1200) return "#bbbbbb";
    if (rating < 1400) return "#6ee96e";
    if (rating < 1600) return "#6ecaac";
    if (rating < 1900) return "#9c9ce9";
    if (rating < 2100) return "#e97ee9";
    if (rating < 2400) return "#e9ac50";
    if (rating < 2600) return "#e96e6e";
    if (rating < 3000) return "#ff3333";
    if (rating >= 3000) return "#b22323";
    return "#e97ee9";
  }

  return (
    <AuthContext.Provider
      value={{
        getSubmissions,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
