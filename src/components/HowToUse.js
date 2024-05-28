import {
  Avatar,
  Blockquote,
  Box,
  Code,
  Em,
  Flex,
  Heading,
  HoverCard,
  Link,
  Text,
} from "@radix-ui/themes";
import React from "react";

export default function HowToUse() {
  return (
    <div>
      <Text>
        {/* Follow{" "} */}
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Link href="https://twitter.com/radix_ui" target="_blank">
              how to use
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Content maxWidth="800px">
            <Flex gap="4" style={{ gap: "10px" }}>
              <Box>
                <Text
                  size="2"
                  as="h4"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Searching Usernames
                </Text>
                <Blockquote color="gray" size={"1"}>
                  <Text as="div" size="1">
                    e.g. : <Code color="indigo">tourist</Code>,{" "}
                    <Code color="indigo">Benq</Code>
                  </Text>
                </Blockquote>
                <Heading size="2" as="h3">
                  Searching Problems
                </Heading>
                <Blockquote color="gray" size={"1"}>
                  <Text as="div" size="2">
                    Problems can be searched by using two methods :
                  </Text>
                  <Text as="div" size="1">
                    ‎ 1. By using <em>contestId</em> and <em>problemIndex</em>{" "}
                    (always works) : e.g. <Code color="indigo">1480/C</Code>‎ or
                    e.g. <Code color="indigo">1480/c</Code>
                  </Text>
                  <Text as="div" size="1">
                    ‎ 2. By using <em>URL</em> : supported url types are :{" "}
                    <div className="flex flex-col">
                      ‎
                      <Code color="indigo">
                        https://codeforces.com/problemset/problem/1480/C
                      </Code>
                      <Code color="indigo">
                        https://codeforces.com/contest/1977/problem/B{" "}
                      </Code>
                    </div>
                  </Text>
                </Blockquote>
              </Box>
            </Flex>
          </HoverCard.Content>
        </HoverCard.Root>{" "}
        {/* for updates. */}
      </Text>
    </div>
  );
}
