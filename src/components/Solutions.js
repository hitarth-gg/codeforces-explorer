import { Code, Link, Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import timestamp from "unix-timestamp";

export default function Solutions() {
  const authContext = useAuth();

  const [userRating, setUserRating] = useState([]);
  //  const [allUsers, setAllUsers] = useState([]);
  const allUsers = [];

  for (let i = 0; i < authContext.solutions.length; i++) {
    allUsers.push(authContext.solutions[i].author.members[0].handle);
  }

  useEffect(() => {
    const fetchUserRatings = async () => {
      const ratings = await authContext.getUserInfo(allUsers);
      setUserRating(ratings);
    };

    fetchUserRatings();
  }, [authContext]);

  return (
    <div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Who</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Rating</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Lang</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Memory</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body className="font-sans">
          {authContext.solutions.map((it, index) => (
            <Table.Row key={it.id} style={{ color: "#888888" }}>
              <Table.Cell>{index+1}</Table.Cell>
              <Table.RowHeaderCell>
                <Link
                  href={`https://codeforces.com/contest/${it.contestId}/submission/${it.id}`}
                  target="_blank"
                >
                  {it.id}
                </Link>
              </Table.RowHeaderCell>
              <Table.RowHeaderCell
                style={{
                  color: authContext.ratingColor(
                    userRating[index]?.rating || "0"
                  ),
                }}
              >
                {/* {`${it.author.members[0].handle} • `} */}
                {`${it.author.members[0].handle}`}
              </Table.RowHeaderCell>
              <Table.Cell>
                <div
                  style={{
                    color: authContext.ratingColor(
                      userRating[index]?.rating || "0"
                    ),
                  }}
                  size={"1"}
                  color="gray"
                  variant="outline"
                >
                  {userRating[index]?.rating || "-"}
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
