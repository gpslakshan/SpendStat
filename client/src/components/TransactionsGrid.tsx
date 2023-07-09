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
import { FieldValues, useForm, Controller } from "react-hook-form";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, transaction: Transaction) => void;
}

const TransactionsGrid = ({ transactions, onDelete, onUpdate }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateTransactionId, setUpdateTransactionId] = useState<string>("");

  const { handleSubmit, control, setValue } = useForm({});

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
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => handleClickOpen(params.row)}
                >
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

  const handleClickOpen = (data: any) => {
    console.log("update transaction data: ", data);
    setValue("name", data.name, { shouldValidate: true });
    setValue("amount", data.amount, { shouldValidate: true });
    setValue("date", dayjs(data.date), { shouldValidate: true });
    setUpdateTransactionId(data._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFormSubmit = (data: FieldValues) => {
    console.log("form data: ", data);
    onUpdate(updateTransactionId, data as Transaction);
    handleClose();
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
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <DialogContent>
                <DialogContentText>
                  To Edit this transaction, please enter your new transaction
                  details here. We will send updates immediately.
                </DialogContentText>

                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Transaction Name is required" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      size="small"
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      label="Transaction Name"
                      variant="outlined"
                      margin="dense"
                    />
                  )}
                />
                <Controller
                  name="amount"
                  control={control}
                  rules={{ required: "Transaction Amount is required" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      size="small"
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      type="number"
                      label="Transaction Amount ($)"
                      variant="outlined"
                      margin="dense"
                    />
                  )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: "Date is required" }}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <DatePicker
                        label="Transaction Date"
                        value={value}
                        format="DD/MM/YYYY"
                        onChange={onChange}
                        slotProps={{
                          textField: {
                            size: "small",
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                            fullWidth: true,
                            margin: "dense",
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} type="button">
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default TransactionsGrid;
