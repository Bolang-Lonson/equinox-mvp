import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';

export default function PortfolioPage() {
  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader title="Trademark Portfolio" subheader="Cases, owners, status, documents" />
        <Divider />
        <CardContent>
          <div className="text-sm text-gray-600">List trademarks, owners, jurisdictions, and statuses here.</div>
        </CardContent>
      </Card>
    </Stack>
  );
}


