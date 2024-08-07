import { Box,Tabs, Text } from "@radix-ui/themes";
import TableQue from "./TableQS";
import TableSkipped from "./TableSkipped";
import TableCorrect from "./TableCorrect";
// import Profile from "./Profile/Profile";

export default function TabSubmissions() {
  

  return (
    <div className="font-sans">
      <Tabs.Root defaultValue="qsolved">
        <Tabs.List>
          {/* <Tabs.Trigger value="profile">Profile</Tabs.Trigger> */}
          <Tabs.Trigger value="qsolved">Questions Solved</Tabs.Trigger>
          <Tabs.Trigger value="correct">Correct Submissions</Tabs.Trigger>
          <Tabs.Trigger value="skipped">Skipped Submissions</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          {/* <Tabs.Content value="profile"> */}
            {/* <Profile /> */}
          {/* </Tabs.Content> */}
          <Tabs.Content value="qsolved">
            {/* <Text size="2">Make changes to your account.</Text> */}
            <TableQue />
          </Tabs.Content>

          <Tabs.Content value="correct">
            <TableCorrect />
          </Tabs.Content>

          <Tabs.Content value="skipped">
            <Text size="2">
              <TableSkipped />
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
