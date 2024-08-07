import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export default function UpsolveButton({ path, setPath }) {
  const changePath = () => {
    if (path === "home") setPath("upsolve");
    else setPath("home");
  };

  console.log(path);

  const text = path === "home" ? "upsolve" : "home";

  return (
    <Button color="gray" variant="outline" onClick={changePath}>
      <Text
        weight={"regular"}
        className="flex justify-center items-center gap-1"
      >
        {text} <CrumpledPaperIcon />
      </Text>
    </Button>
  );
}
