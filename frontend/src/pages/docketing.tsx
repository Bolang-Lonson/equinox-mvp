import { Card, CardContent, CardHeader, Divider, Stack, Button, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent, TextField, DialogContentText, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import { useDocket, type Docket } from '../hooks/useDocket';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SaveIcon from '@mui/icons-material/Save';
import { useState, type FormEvent } from 'react';


export default function DocketingPage() {
  const dockets: Docket[] = useDocket();
  const [open, setOpen] = useState(false);

  const createDocket = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formJson = Object.fromEntries((formData as any).entries());
    const bodyJson: Docket = {...formJson as Docket, completed: Boolean(formJson.completed)}
    // console.log(bodyJson);

    const resp = await fetch('http://localhost:4000/api/dockets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({...bodyJson}),
    });
    setOpen(false);
    if (resp.ok) {
      alert('Docket created successfully!')
      location.reload();
    } else {
      const data = await resp.json().catch(() => ({}));
      console.log(data.error);
      alert(data.error || 'Docket creation failed');
    }
  }

  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader title="Docketing & Deadlines" subheader="Automatic reminders and tasks" />
        <Divider />
        <CardContent>
          <CardContent className='flex flex-col gap-10 items-center'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Trademark ID</TableCell>
                <TableCell align='right'>Title</TableCell>
                <TableCell align='right'>Due Date</TableCell>
                <TableCell align='right'>Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              dockets.length>0?
              dockets.map((dkt, idx) =>
                <TableRow key={idx}>
                  <TableCell>{dkt.trademark_id}</TableCell>
                  <TableCell align='right'>{dkt.title}</TableCell>
                  <TableCell align='right'>{(new Date(dkt.due_date as string)).toLocaleDateString()}</TableCell>
                  <TableCell align='right'>{String(dkt.completed)}</TableCell>
                </TableRow>
              )
              :<div className="text-sm text-center p-5 text-gray-600 select-none">Calendar and upcoming deadlines will appear here.</div>
              }
            </TableBody>
          </Table>
          <Button
            className='max-w-fit'
            variant='contained' endIcon={<PostAddIcon/>}
            onClick={() => setOpen(true)}
          >Create Docket</Button>
        </CardContent>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add a trademark</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill all the fields below</DialogContentText>
          <form onSubmit={createDocket} id='docket-form' className='grid grid-cols-2 gap-4'>
            <TextField
              autoFocus required
              margin="dense" id="title"
              name="title" label="Title"
              type="text" fullWidth
              variant="filled"
            />
            <TextField
              required margin="dense"
              id="trademark_id" name="trademark_id"
              label="Trademark ID" type="number"
              fullWidth variant="filled"
            />
            <FormControlLabel control={<Checkbox name='completed' id='completed'/>} label='Completed'/>
            <TextField
              required margin="dense"
              id="due_date" name="due_date"
              label="Date Due" type="date"
              fullWidth variant="filled"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<SaveIcon/>} type='submit' form='docket-form'>Save</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}


