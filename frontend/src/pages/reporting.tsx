import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';

export default function ReportingPage() {
  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader title="Reporting & Dashboards" subheader="KPIs and role-based views" />
        <Divider />
        <CardContent>
          <div className="text-sm text-gray-600">Reports and role-specific dashboards appear here.</div>
        </CardContent>
      </Card>
    </Stack>
  );
}


