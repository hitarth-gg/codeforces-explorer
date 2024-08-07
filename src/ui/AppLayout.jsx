import { Theme } from "@radix-ui/themes";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import Visits from "../components/Visits";
import Header from "../components/Header";
import { Toaster } from "sonner";
import { useState } from "react";

export default function AppLayout({props}) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    console.log(theme);
    
  }

  return (
    <Theme appearance={theme}>
      <div className="w-0 h-0 opacity-0 pointer-events-none">
      <Visits />
      </div>
      <Toaster
        theme={theme}
        toastOptions={{
          classNames: {
            error:
              theme === "dark"
                ? "bg-[#1c1317] border border-rose-500"
                : "bg-red-100 border border-rose-500",
            title: theme === "dark" ? "text-rose-500" : "text-red-600",
            description: theme === "dark" ? "text-rose-200" : "text-red-600",
            actionButton: "bg-zinc-400",
            cancelButton: "bg-orange-400",
            closeButton: "bg-lime-400",
            icon: "text-rose-100",
          },
        }}
      />
      <div className="layout font-inter flex flex-col">
        <Header theme={theme} toggleTheme={toggleTheme} />
        {isLoading && <Loader />}
        <main className="" >
        {props || <Outlet />}
        </main>
      </div>
    </Theme>
  );
}
