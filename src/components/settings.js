import { GearIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import React from "react";

export default function Settings({ setTheme }) {
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

          {/* <DropdownMenu.Separator /> */}
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
