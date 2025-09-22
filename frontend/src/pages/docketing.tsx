import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';

export default function DocketingPage() {
  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader title="Docketing & Deadlines" subheader="Automatic reminders and tasks" />
        <Divider />
        <CardContent>
          <div className="text-sm text-gray-600">Calendar and upcoming deadlines will appear here.</div>
        </CardContent>
      </Card>
    </Stack>
  );
}


