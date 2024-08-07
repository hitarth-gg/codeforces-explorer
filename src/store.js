import userReducer from "./context/user/userSlice";
import solutionsReducer from "./context/solutions/solutionsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    solutions: solutionsReducer,
  },
});

export default store;
