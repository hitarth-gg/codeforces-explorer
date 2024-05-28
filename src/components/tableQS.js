import {
  Button,
  Code,
  DropdownMenu,
  Link,
  Table,
} from "@radix-ui/themes";
import { useAuth } from "../Auth/AuthContext";
import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChartIcon,
} from "@radix-ui/react-icons";
import Pagination from "./Pagination";

export default function TableQue() {
  const authContext = useAuth();
  const [tempq, setTempq] = useState(authContext.questionsSolved);

  let count = 1;

  useEffect(() => {
    count = 1;
  }, [tempq]);

  useEffect(() => {
    setTempq(authContext.questionsSolved);
    setPageNo(0);
  }, [authContext.questionsSolved]);

  function sortAsc() {
    const sortedTempq = [...tempq].sort((a, b) => {
      if (!a.rating && !b.rating) return 0;
      if (!a.rating) return 1;
      if (!b.rating) return -1;
      return a.rating - b.rating;
    });
    setTempq(sortedTempq);
  }

  function sortDesc() {
    const sortedTempq = [...tempq].sort((a, b) => b.rating - a.rating);
    setTempq(sortedTempq);
  }

  function sortDefault() {
    setTempq(authContext.questionsSolved);
  }

  const [pageSize, setPageSize] = useState(100);
  const [pageNo, setPageNo] = useState(0);
  const [page, setPage] = useState([]);

  useEffect(() => {
    const start = pageNo * pageSize;
    const end = start + pageSize;
    setPage(tempq.slice(start, end));
  }, [tempq, pageNo, pageSize]);

  return (
    <div className="">
      <div className="flex justify-end">
        <Pagination
          arraySize={tempq.length}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageNo={pageNo}
          setPageNo={setPageNo}
          page={page}
          setPage={setPage}
          position="relative"
        />
      </div>
      <Table.Root size="1">
        <Table.Header>
          <Table.Row style={{ color: "#cccccc" }}>
            <Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Problem</Table.ColumnHeaderCell>

            <Table.Cell px={"0"}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button size={"1"} variant="soft" color="gray">
                    Options
                    <DropdownMenu.TriggerIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size={"1"}>
                  <DropdownMenu.Item
                    shortcut={<BarChartIcon />}
                    onClick={sortDefault}
                  >
                    Default
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    shortcut={<ArrowDownIcon />}
                    onClick={sortAsc}
                  >
                    Ascending
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    shortcut={<ArrowUpIcon />}
                    onClick={sortDesc}
                  >
                    Descending
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Table.Cell>
            <Table.ColumnHeaderCell>Division</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Tags</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body style={{ color: "#888888" }}>
          {page.map((it) => (
            <Table.Row key={it.id} style={{ color: "#888888" }}>
              <Table.Cell width={"1px"}>
                {pageNo * pageSize + count++}
              </Table.Cell>
              <Table.RowHeaderCell>
                <Link
                  style={{ whiteSpace: "nowrap" }}
                  target="_blank"
                  href={`https://codeforces.com/contest/${it.contestId}/submission/${it.id}`}
                >
                  {it.problem}
                </Link>
              </Table.RowHeaderCell>
              <Table.Cell style={{ color: authContext.ratingColor(it.rating) }}>
                {it.rating ? it.rating : ""}
              </Table.Cell>
              <Table.Cell>
                <Link
                  style={{
                    color: "#888888",

                    whiteSpace: "nowrap",
                  }}
                  target="_blank"
                  href={
                    it.contestId > 10000
                      ? `https://codeforces.com/problemset/gymProblem/${it.contestId}/${it.index}`
                      : `https://codeforces.com/problemset/problem/${it.contestId}/${it.index}`
                  }
                >{`${it.contestId} - ${it.index}`}</Link>
              </Table.Cell>
              <Table.Cell>
                {it.tags.map((tag) => (
                  <Code
                    key={tag}
                    color="gray"
                    variant="ghost"
                    className="mx-1 border-[0.3px] border-[#363a3f]"
                    style={{
                      padding: "1px 4px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </Code>
                  // <Badge className="mx-1" style={{fontFamily: "", fontWeight: ""}} size={"1"} color="gray" variant="outline">{tag}</Badge>
                ))}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
