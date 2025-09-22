import { Card, CardContent, CardHeader, Grid2 as Grid, LinearProgress, List, ListItem, ListItemText, Stack, Divider } from '@mui/material';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>

      {/* KPI Cards */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardHeader title="Open Dockets" />
            <CardContent>
              <p className="text-3xl font-bold">24</p>
              <p className="text-xs text-gray-500 mt-1">+3 since last week</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardHeader title="Upcoming Renewals (90d)" />
            <CardContent>
              <p className="text-3xl font-bold">12</p>
              <LinearProgress className="mt-3" variant="determinate" value={45} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardHeader title="Active Matters" />
            <CardContent>
              <p className="text-3xl font-bold">86</p>
              <p className="text-xs text-gray-500 mt-1">Trademark + Opposition</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardHeader title="Pending Invoices" />
            <CardContent>
              <p className="text-3xl font-bold">$14,250</p>
              <p className="text-xs text-gray-500 mt-1">7 invoices</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Two Column: Deadlines and Renewals */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Upcoming Deadlines" subheader="Docketing & reminders" />
            <Divider />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText primary="Office Action Response" secondary="US 97/123456 - due May 12" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Statement of Use" secondary="US 88/654321 - due Jun 3" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Opposition Deadline" secondary="EU TM 01928374 - due Jun 15" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Renewals" subheader="Next 90 days" />
            <Divider />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText primary="US Reg. 5,123,456" secondary="Class 9 - due May 28" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="CA Reg. TMA1,234,567" secondary="Class 35 - due Jun 20" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="EU TM 017654321" secondary="Class 41 - due Jul 2" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Portfolio Snapshot & Recent Activity */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardHeader title="Portfolio Snapshot" subheader="By jurisdiction and status" />
            <Divider />
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="rounded-md border p-3">
                  <p className="text-xs text-gray-500">US Active</p>
                  <p className="text-xl font-semibold">38</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-gray-500">EU Active</p>
                  <p className="text-xl font-semibold">21</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-gray-500">Pending</p>
                  <p className="text-xl font-semibold">11</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-gray-500">Oppositions</p>
                  <p className="text-xl font-semibold">6</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-gray-500">Watch Hits (30d)"</p>
                  <p className="text-xl font-semibold">15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardHeader title="Recent Activity" subheader="Filings, office actions, notes" />
            <Divider />
            <CardContent>
              <Stack spacing={1.5}>
                <div className="text-sm"><span className="font-medium">Note</span>: Evidence of use uploaded for US 88/654321</div>
                <div className="text-sm"><span className="font-medium">Filing</span>: Madrid extension filed - AU</div>
                <div className="text-sm"><span className="font-medium">Action</span>: OA received - response drafted</div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}


