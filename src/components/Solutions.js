import {
  Box,
  Button,
  Code,
  DropdownMenu,
  Flex,
  Link,
  Spinner,
  Table,
  Text,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import timestamp from "unix-timestamp";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BarChartIcon,
  DividerVerticalIcon,
  LayersIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import Pagination from "./Pagination";

export default function Solutions() {
  const authContext = useAuth();

  const [userRating, setUserRating] = useState([]);
  const [data, setData] = useState(authContext.solutions || []); // [id, handle, date, lang, time, memory]
  const allUsers = [];
  const [sortedData, setSortedData] = useState(authContext.solutions || []);
  const [option, setOption] = useState({ rating: "Rating", lang: "Lang" });
  // for (let i = 0; i < authContext.solutions.length; i++) {
  //   allUsers.push(authContext.solutions[i].author.members[0].handle);
  // }

  for (let i = 0; i < data.length; i++) {
    allUsers.push(authContext.solutions[i].author.members[0].handle);
  }

  useEffect(() => {
    const fetchUserRatings = async () => {
      const ratings = await authContext.getUserInfo(allUsers);
      setUserRating(ratings);
    };

    fetchUserRatings();
  }, [authContext.solutions]);

  useEffect(() => {
    let newData = [...data];
    if (userRating.length > 0) {
      userRating.map(
        (it, index) =>
          (newData[index].author.members[0].rating = it.rating || -1)
      );
      setData(newData);
      setSortedData(newData);
    }
  }, [userRating.length]);

  // console.log(data);

  function sortAsc() {
    setOption({ ...option, rating: "Asc" });
    const sortedTempq = [...sortedData].sort(
      (a, b) => a.author.members[0].rating - b.author.members[0].rating
    );
    setSortedData(sortedTempq);
  }

  function sortDefault() {
    setOption({ rating: "Rating", lang: "Lang" });
    setSortedData(data);
  }

  function sortDesc() {
    setOption({ ...option, rating: "Desc" });
    const sortedTempq = [...sortedData].sort(
      (a, b) => b.author.members[0].rating - a.author.members[0].rating
    );
    setSortedData(sortedTempq);
  }

  function selectLang(lang) {
    setOption({ rating: "Rating", lang: lang });
    const sortedTempq = [...data].filter((it) => {
      if (it.programmingLanguage.includes(lang)) return it;
      else return null;
    });
    setSortedData(sortedTempq);
  }

  const [pageSize, setPageSize] = useState(100);
  const [pageNo, setPageNo] = useState(0);
  const [page, setPage] = useState([]);

  useEffect(() => {
    const start = pageNo * pageSize;
    const end = start + pageSize;
    setPage(sortedData.slice(start, end));
  }, [sortedData, pageNo, pageSize]);

  function searchAgain() {
    if (authContext.getSolMemory)
      authContext.getSolutions(
        authContext.getSolMemory.contestId,
        authContext.getSolMemory.index
      );
  }

  return (
    <div>
      <div className="flex  justify-between gap-x-2">
        <Flex align={"center"} className="gap-2 ">
          <Text size={"1"}>Submissions to Fetch: </Text>
          <Button
            size={"1"}
            variant="soft"
            color={authContext.submissionCount === 8000 ? "indigo" : "gray"}
            onClick={() => {
              authContext.setSubmissionCount(8000);
            }}
          >
            8K
          </Button>
          <Button
            size={"1"}
            variant="soft"
            color={authContext.submissionCount === 20000 ? "indigo" : "gray"}
            onClick={() => {
              authContext.setSubmissionCount(20000);
            }}
          >
            20K
          </Button>
          <Button
            size={"1"}
            variant="soft"
            color={authContext.submissionCount === 50000 ? "indigo" : "gray"}
            onClick={() => {
              authContext.setSubmissionCount(50000);
            }}
          >
            50K
          </Button>
          {/* <DividerVerticalIcon color="gray" height={20} width={20} /> */}
            <ArrowRightIcon color="gray" height={16} width={16} />
          {/* <Text size={"1"}>Search Again: </Text> */}
          <Button
            size={"1"}
            variant="soft"
            color={"gray"}
            onClick={() => {
              searchAgain();
            }}
          >
            <MagnifyingGlassIcon />
          </Button>
          <DividerVerticalIcon color="gray" height={20} width={20} />
            <Code color="gray" variant="outline" size="1">Correct Submissions: {sortedData.length}</Code>
        </Flex>

        <Pagination
          arraySize={sortedData.length}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageNo={pageNo}
          setPageNo={setPageNo}
          page={page}
          setPage={setPage}
          position="relative"
        />
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Who</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button size={"1"} variant="soft" color="gray">
                    {option.rating}
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
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button size={"1"} variant="soft" color="gray">
                    {option.lang}
                    <DropdownMenu.TriggerIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size={"1"}>
                  <DropdownMenu.Item
                    onClick={sortDefault}
                    color="gray"
                    shortcut={<LayersIcon />}
                  >
                    All
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => selectLang("C++")}>
                    C++
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => selectLang("Java ")}>
                    Java
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => selectLang("Pyt")}>
                    Python
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => selectLang("JavaScript")}>
                    JavaScript
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => selectLang("Go")}>
                    Go
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => selectLang("PyPy")}>
                    PyPy
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Memory</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body className="font-sans">
          {page.map((it, index) => (
            <Table.Row key={it.id} style={{ color: "#888888" }}>
              <Table.Cell>{pageNo * pageSize + index + 1}</Table.Cell>
              <Table.RowHeaderCell>
                <Link
                  href={`https://codeforces.com/contest/${it.contestId}/submission/${it.id}`}
                  target="_blank"
                >
                  {it.id}
                </Link>
              </Table.RowHeaderCell>
              <Table.RowHeaderCell>
                <Link
                  style={{
                    color: authContext.ratingColor(
                      it.author.members[0].rating || 0
                    ),
                  }}
                  href={`https://codeforces.com/profile/${it.author.members[0].handle}`}
                  target="_blank"
                >
                  {`${it.author.members[0].handle}`}
                </Link>
              </Table.RowHeaderCell>
              <Table.Cell>
                <div
                  style={{
                    color: authContext.ratingColor(
                      it.author.members[0].rating || 0
                    ),
                  }}
                  size={"1"}
                  color="gray"
                  variant="outline"
                >
                  {it.author.members[0].rating === undefined ? (
                    <Spinner />
                  ) : it.author.members[0].rating !== -1 ? (
                    it.author.members[0].rating
                  ) : (
                    "-"
                  )}
                  {/* {userRating[index]?.rating || "-"} */}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex  items-center">
                  <div className="text-nowrap">
                    {`${timestamp
                      .toDate(it.creationTimeSeconds)
                      .toDateString()
                      .slice(4)} 
                    - `}
                  </div>
                  <div className="text-[.7rem]">
                    {`${timestamp
                      .toDate(it.creationTimeSeconds)
                      .toTimeString()
                      .slice(0, 5)}`}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>{it.programmingLanguage}</Table.Cell>
              <Table.Cell>{it.timeConsumedMillis} ms</Table.Cell>
              <Table.Cell>
                {Math.round(it.memoryConsumedBytes / 1000)} KB
              </Table.Cell>
            </Table.Row>
          ))}

          {/* <Table.Row>
            <Table.RowHeaderCell>123099921</Table.RowHeaderCell>
            <Table.RowHeaderCell>hitvrth</Table.RowHeaderCell>
            <Table.Cell>Mar/27/2023</Table.Cell>
            <Table.Cell>C++ GNU 17</Table.Cell>
            <Table.Cell>80ms</Table.Cell>
            <Table.Cell>23 KB</Table.Cell>
          </Table.Row> */}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
