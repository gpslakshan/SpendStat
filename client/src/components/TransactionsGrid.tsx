import { Box, IconButton, Tooltip } from "@mui/material";
import { Transaction } from "../models/Transaction";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionsGrid = ({ transactions, onDelete }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Transaction Name",
      flex: 2,
      editable: false,
    },
    {
      field: "amount",
      headerName: "Transaction Amount ($)",
      flex: 1,
      editable: false,
    },
    {
      field: "date",
      headerName: "Transaction Date",
      flex: 1,
      editable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Box>{formatDate(params.row.date)}</Box>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      // type: "actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <Box>
              <Tooltip title="Edit the transaction">
                <IconButton sx={{ color: "blue" }} onClick={handleClickOpen}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete the transaction">
                <IconButton
                  sx={{ color: "red" }}
                  onClick={() => removeTransaction(params.row._id)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </div>
        );
      },
    },
  ];

  const removeTransaction = (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    console.log("remove id: ", id);
    onDelete(id);
  };

  const formatDate = (date: string) => {
    return dayjs(date).format("LL");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h2 className="mt-5">All Transactions</h2>
      <div className="row">
        <div className="col-md-12">
          <DataGrid
            rows={transactions}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            // checkboxSelection
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To Edit this transaction, please enter your new transaction
                details here. We will send updates immediately.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Transaction Name"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Transaction Amount"
                type="number"
                fullWidth
                variant="outlined"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Transaction Date"
                  defaultValue={dayjs("2022-04-17")}
                  slotProps={{
                    textField: { fullWidth: true, margin: "dense" },
                  }}
                />
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default TransactionsGrid;
