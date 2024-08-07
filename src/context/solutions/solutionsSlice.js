import { createSlice } from "@reduxjs/toolkit";
import { GET_SUBMISSIONS_BY_CONTEST, GET_USER_RATINGS } from "../../utils/api";
import { toast } from "sonner";

const initialState = {
  allUsers: [],
  solutions: [],
  ratings: [],
  isLoading: false,
  isLoadingRatings: false,
  errorMsg: "",
  errorMsgRatings: "",
  numberOfSubmissions: 8000,
};

const solutionsSlice = createSlice({
  name: "solutions",
  initialState,
  reducers: {
    getSolutions: {
      prepare(allUsers, solutions) {
        return {
          payload: {
            allUsers,
            solutions,
          },
        };
      },
      reducer(state, action) {
        state.allUsers = action.payload.allUsers;
        state.solutions = action.payload.solutions;
        state.isLoading = false;
      },
    },

    fetchingSolutions(state) {
      state.isLoading = true;
      state.allUsers = [];
      state.solutions = [];
      state.errorMsg = "";
      state.errorMsgRatings = "";
      state.isLoadingRatings = false;
    },

    fetchingRatings(state) {
      state.isLoadingRatings = true;
      state.errorMsgRatings = "";
    },

    getRatings(state, action) {
      state.ratings = action.payload;
      state.isLoadingRatings = false;
    },

    setError(state, action) {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
    setErrorRatings(state, action) {
      state.errorMsgRatings = action.payload;
      state.isLoadingRatings = false;
    },

    pushRatings(state, action) {
      const ratings = action.payload;
      if (ratings.length === 0 || state.solutions.length !== ratings.length)
        return;
      const newSolutions = state.solutions.map((solution, index) => {
        solution.rating = ratings[index] || -1;
        return solution;
      });
      state.solutions = newSolutions;
    },

    updateNumberOfSubmissions (state, action) {
      state.numberOfSubmissions = action.payload;
    }
  },
});

export const { pushRatings, updateNumberOfSubmissions } = solutionsSlice.actions;
export default solutionsSlice.reducer;
/* ------------------------------------------------------ */
export function getRatings(usernames, usernameChunkSize) {
  return async function (dispatch, getState) {
    dispatch({ type: "solutions/fetchingRatings" });

    try {
      if (usernames.length !== getState().solutions.solutions.length) {
        throw new Error(
          "Couldn't fetch user ratings. Usernames and solutions length mismatch.",
        );
      }

      const chunkSize = usernameChunkSize; // You can adjust this based on the API's rate limits
      const users = [];

      for (let i = 0; i < usernames.length; i += chunkSize) {
        const chunk = usernames.slice(i, i + chunkSize);
        const joinedUsers = chunk.join(";");
        const url = GET_USER_RATINGS(joinedUsers);

        const response = await fetch(url);

        if (response.status !== 200) {
          throw new Error("Failed to fetch ratings.");
        }

        const data = await response.json();
        users.push(...data.result);
      }

      dispatch({
        type: "solutions/getRatings",
        payload: users.map((user) => user.rating),
      });

      dispatch(pushRatings(users.map((user) => user.rating)));
    } catch (error) {
      dispatch({ type: "solutions/setErrorRatings", payload: error.message });

      toast.error("Error", {
        duration: 4000,
        description: error.message,
        icon: " ",
      });
    }
  };
}
/* ------------------------------------------------------ */
export function getSolutions(
  contestId,
  problemIndex,
  numberOfSubmissions = 8000,
  usernameChunkSize = 500,
) {
  return async function (dispatch, getState) {
    dispatch({ type: "solutions/fetchingSolutions" });

    try {
      const res = await fetch(
        GET_SUBMISSIONS_BY_CONTEST(contestId, numberOfSubmissions),
      );

      if (res.status === 400) {
        throw new Error("Contest not found");
      } else if (res.status === 403) {
        throw new Error("Too many requests");
      }
      if (res.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      const plug = data.result;
      const newSolution = [];
      const usernames = [];

      for (let i = 0; i < plug.length; i++) {
        if (
          plug[i].problem.index === problemIndex &&
          plug[i].verdict === "OK"
        ) {
          newSolution.push(plug[i]);
          usernames.push(plug[i].author.members[0].handle);
        }
      }

      dispatch({
        type: "solutions/getSolutions",
        payload: { allUsers: usernames, solutions: newSolution },
      });

      dispatch(getRatings(usernames, usernameChunkSize));
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        const str =
          "Network error or CodeForces API is down. Please try again later.";
        dispatch({ type: "solutions/setError", payload: str });
      } else {
        dispatch({ type: "solutions/setError", payload: error.message });
      }
    }
  };
}
