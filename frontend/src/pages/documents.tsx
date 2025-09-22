import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';

export default function DocumentsPage() {
  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader title="Document Management" subheader="PDFs, office actions, evidence of use" />
        <Divider />
        <CardContent>
          <div className="text-sm text-gray-600">Upload and manage matter documents here.</div>
        </CardContent>
      </Card>
    </Stack>
  );
}


