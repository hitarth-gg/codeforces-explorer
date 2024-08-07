import { Box, Tabs, Text } from "@radix-ui/themes";
import TableSubmissions from "./TableSubmissions";
import { useSelector } from "react-redux";
import Profile from "./Profile/Profile";

export default function TabSubmissions({ setStyleBlur }) {
  const { problemsSolved, correctSubmissions, skippedSubmissions } =
    useSelector((store) => store.user);
  // setStyleBlur(false);

  return (
    <div className={""}>
      <Tabs.Root defaultValue="psolved">
        <Tabs.List>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="psolved">Problems Solved</Tabs.Trigger>
          <Tabs.Trigger value="correct">Correct Submissions</Tabs.Trigger>
          <Tabs.Trigger value="skipped">Skipped Submissions</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="profile">
            <Profile />
          </Tabs.Content>

          <Tabs.Content value="psolved">
            <TableSubmissions data={problemsSolved} />
          </Tabs.Content>

          <Tabs.Content value="correct">
            <TableSubmissions data={correctSubmissions} />
          </Tabs.Content>

          <Tabs.Content value="skipped">
            <Text size="2">
              <TableSubmissions data={skippedSubmissions} />
              {/* <TableSkipped /> */}
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
