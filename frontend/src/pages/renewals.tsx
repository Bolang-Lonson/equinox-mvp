import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';

export default function RenewalsPage() {
  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader title="Renewals & Fees" subheader="Manage fees and invoice tracking" />
        <Divider />
        <CardContent>
          <div className="text-sm text-gray-600">Upcoming renewals and invoice statuses go here.</div>
        </CardContent>
      </Card>
    </Stack>
  );
}


