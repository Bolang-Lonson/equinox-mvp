import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';

export default function MonitoringPage() {
  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader title="Watch & Monitoring" subheader="Search integrations and alerts" />
        <Divider />
        <CardContent>
          <div className="text-sm text-gray-600">Search results and monitoring alerts appear here.</div>
        </CardContent>
      </Card>
    </Stack>
  );
}


