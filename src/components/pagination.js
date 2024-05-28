import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex, Grid, IconButton } from "@radix-ui/themes";
import React from "react";

// #3e63dd

const styles = {
  selected: {
    backgroundColor: "#3e63dd",
    color: "white",
  },
  fixed: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1px",
  },
};

export default function Pagination({
  arraySize,
  pageSize,
  setPageSize,
  pageNo,
  setPageNo,
  page,
  setPage,
  position,
}) {
  const pageCount = Math.ceil(arraySize / pageSize);
  return (
    <div
      className={`flex  ${
        position ? position : "absolute"
      }  w-fit justify-center items-center border-[1px] rounded-sm border-[#43484e]`}
    >
      <IconButton
        size={"1"}
        color="gray"
        variant="soft"
        style={{ borderRadius: "0px" }}
        onClick={() => {
          if (pageNo - 1 >= 0) {
            setPageNo(pageNo - 1);
          }
        }}
      >
        <ArrowLeftIcon width="18" height="18" />
      </IconButton>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger size={"1"}>
          <Button
            color="gray"
            variant="soft"
            highContrast
            style={{ borderRadius: "0px" }}
          >
            {pageNo + 1} / {pageCount}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Grid columns={"5"}>
            {Array.from({ length: pageCount }).map((_, i) => (
              <DropdownMenu.Item
                key={i}
                style={
                  i === pageNo
                    ? { ...styles.selected, ...styles.fixed }
                    : { ...styles.fixed }
                }
                onClick={() => {
                  setPageNo(i);
                }}
              >
                {i + 1}
              </DropdownMenu.Item>
            ))}
          </Grid>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red" onClick={() => setPageSize(100000)}>
            Remove Pagination (Unstable)
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <IconButton
        size={"1"}
        color="gray"
        variant="soft"
        style={{ borderRadius: "0px" }}
        onClick={() => {
          if (pageNo + 1 < pageCount) {
            setPageNo(pageNo + 1);
          }
        }}
      >
        <ArrowRightIcon width="18" height="18" />
      </IconButton>
    </div>
  );
}
