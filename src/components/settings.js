import {
  GearIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu, TextField } from "@radix-ui/themes";
import React from "react";
import VisitorCounter from "./Visit";
import { useAuth } from "../Auth/AuthContext";

export default function Settings({ setTheme }) {
  const authContext = useAuth();

  return (
    <div className="">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color="gray" variant="outline">
            <GearIcon />
            {/* <DropdownMenu.TriggerIcon /> */}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {/* <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item> */}
          {/* <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item> */}
          {/* <DropdownMenu.Separator /> */}
          {/* <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item> */}

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Theme</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item onClick={() => setTheme("dark")}>
                <MoonIcon /> Dark Mode
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => setTheme("light")}>
                <SunIcon /> Light Mode
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Values</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <div className="flex flex-col gap-y-1">
                <div className="flex justify-center items-center gap-2 text-xs">
                  Submissions to Fetch:
                  <TextField.Root
                    type="number"
                    size={"1"}
                    placeholder={`${authContext.submissionCount} | (default: 8000)`}
                    onChange={(e) =>
                      authContext.setSubmissionCount(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        e.currentTarget === document.activeElement
                      ) {
                        e.currentTarget.blur();
                        e.currentTarget.value = "";
                      }
                    }}
                  >
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
                <div className="flex justify-center items-center gap-2 text-xs">
                  Username Chunk Size
                  <TextField.Root
                    type="number"
                    size={"1"}
                    placeholder={`${authContext.usernameChunkSize} | (default: 500)`}
                    onChange={(e) =>
                      authContext.setUsernameChunkSize(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        e.currentTarget === document.activeElement
                      ) {
                        e.currentTarget.blur();
                        e.currentTarget.value = "";
                      }
                    }}
                  >
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
              </div>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />

          <div className="flex text-[12px] gap-2 justify-center items-center">
            <VisitorCounter />
          </div>

          {/* <DropdownMenu.Item>Share</DropdownMenu.Item> */}

          {/* <DropdownMenu.Item>Add to favorites</DropdownMenu.Item> */}
          {/* <DropdownMenu.Separator /> */}
          {/* <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
            Delete
          </DropdownMenu.Item> */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
