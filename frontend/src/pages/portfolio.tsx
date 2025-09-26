import { Card, CardContent, CardHeader, Divider, Stack, Button, TextField, CircularProgress, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { useState, type FormEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { useTrademark, type Trademark } from '../hooks/useTrademark';

const statuses = [
  {value: 'registered', label: 'Registered'},
  {value: 'accepted', label: 'Accepted'},
  {value: 'published', label: 'Published'},
  {value: 'refused', label: 'Refused'},
  {value: 'withdrawn', label: 'Withdrawn'}
]
export default function PortfolioPage() {
  const [trademarks, loading] = useTrademark();
  console.log(trademarks);
  const [open, setOpen] = useState(false);
  // getting all trademarks
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }
  const addTrademark = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formJson = Object.fromEntries((formData as any).entries());
    const bodyJson: Trademark = {...formJson as Trademark, owner_id: Number(formJson.owner_id), filing_date: new Date(formJson.filing_date), classes: ''}
    console.log(bodyJson);

    const resp = await fetch('http://localhost:4000/api/trademarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({...bodyJson}),
    });
    setOpen(false);
    if (resp.ok) {
      alert('Trademark added successfully!')
      location.reload();
    } else {
      const data = await resp.json().catch(() => ({}));
      console.log(data.error);
      alert(data.error || 'Trademark addition failed');
    }
  }
  return (
    <Stack spacing={2} sx={{}}>
      <Card>
        <CardHeader
          title="Trademark Portfolio" 
          subheader="Cases, owners, status, documents"
        />
        <Divider />
        <CardContent className='flex flex-col gap-10 items-center'>
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow>
                <TableCell>Mark</TableCell>
                <TableCell align='right'>Owner</TableCell>
                <TableCell align='right'>Status</TableCell>
                <TableCell align='right'>Reg Number</TableCell>
                <TableCell align='right'>Country</TableCell>
                <TableCell align='right'>Filing Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              trademarks && trademarks.length>0?
              trademarks.map((tm, idx) =>
                <TableRow key={idx}>
                  <TableCell>{tm.mark_text}</TableCell>
                  <TableCell align='right'>{tm.owner_id}</TableCell>
                  <TableCell align='right'>{tm.status.toUpperCase()}</TableCell>
                  <TableCell align='right'>{tm.reg_num}</TableCell>
                  <TableCell align='right'>{tm.country}</TableCell>
                  <TableCell align='right'>{(new Date(tm.filing_date as string)).toLocaleDateString()}</TableCell>
                </TableRow>
              )
              :<div className="text-sm text-center p-5 text-gray-600 select-none">List trademarks, owners, jurisdictions, and statuses here.</div>
              }
            </TableBody>
          </Table>
          <Button
            className='max-w-fit'
            variant='contained' endIcon={<AddIcon/>}
            onClick={() => setOpen(true)}
          >Add Trademark</Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add a trademark</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill all the fields below</DialogContentText>
          <form onSubmit={addTrademark} id='trademark-form' className='grid grid-cols-2 gap-4'>
            <TextField
              autoFocus required
              margin="dense" id="mark"
              name="mark_text" label="Mark"
              type="text" fullWidth
              variant="filled"
            />
            <TextField
              required margin="dense"
              id="owner" name="owner_id"
              label="Owner" type="number"
              fullWidth variant="filled"
            />
            <TextField
              select id="status" defaultValue={statuses[1].value}
              name="status" label="Status"
              helperText='Please select the trademark status' variant="filled"
            >
              {statuses.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
            </TextField>
            <TextField
              required margin="dense"
              id="reg_num" name="reg_num"
              label="Registration Number" type="text"
              fullWidth variant="filled"
            />
            <TextField
              required margin="dense"
              id="filing_date" name="filing_date"
              label="Date filed" type="date"
              fullWidth variant="filled"
            />
            <TextField
              required margin="dense"
              id="country" name="country"
              label="Country" type="text"
              fullWidth variant="filled"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<SendIcon/>} type='submit' form='trademark-form'>Save</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}


