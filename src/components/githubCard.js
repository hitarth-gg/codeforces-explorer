import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Card } from "@radix-ui/themes";
import React from "react";

export default function GithubCard() {
  return (
    <div className=" w-fit transition-all ease-in-out duration-100">
      <Card asChild size={"1"} style={{ padding: ".6rem" }}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/hitarth-gg"
        >
          <GitHubLogoIcon height="1.3rem" width="1.3rem" />
        </a>
      </Card>
    </div>
  );
}
