import { Box, IconButton, Tooltip, Typography } from "@mui/material";
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
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, transaction: Transaction) => void;
}

const TransactionsGrid = ({ transactions, onDelete, onUpdate }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [updateTransactionId, setUpdateTransactionId] = useState<string>("");

  const { handleSubmit, control, setValue } = useForm({});

  const { categories } = useSelector((state: any) => state.auth.user);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Transaction Name",
      flex: 1,
      editable: false,
    },
    {
      field: "category_id",
      headerName: "Transaction Category",
      flex: 1,
      editable: false,
      renderCell: (params) => {
        return <Box>{getCategoryById(params.row.category_id)}</Box>;
      },
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

  const getCategoryById = (id: string) => {
    const category = categories.find((category: any) => category._id === id);
    return category ? category.label : "NA";
  };

  const handleClickOpen = (data: any) => {
    console.log("update transaction data: ", data);
    setValue("name", data.name, { shouldValidate: true });
    setValue("amount", data.amount, { shouldValidate: true });
    setValue("date", dayjs(data.date), { shouldValidate: true });
    setValue("category_id", data.category_id, { shouldValidate: true });
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
      <Typography variant="h4" sx={{ marginBottom: "1rem", marginTop: "1rem" }}>
        All Transactions
      </Typography>
      <Box>
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
          <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
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

              <Controller
                name="category_id"
                control={control}
                rules={{ required: "Category is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    select
                    label="Transaction Category"
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    margin="dense"
                  >
                    {categories.map((option: any) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} type="button">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default TransactionsGrid;
