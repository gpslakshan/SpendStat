import { FieldValues, useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Transaction } from "../models/Transaction";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";

interface Props {
  onSubmit: (data: Transaction) => void;
}

const TransactionForm = ({ onSubmit }: Props) => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      date: null,
      category_id: "",
    },
  });

  const { categories } = useSelector((state: any) => state.auth.user);

  const onFormSubmit = (data: FieldValues) => {
    console.log("form data: ", data);
    onSubmit({ ...data, date: data.date.$d } as Transaction);
    reset();
  };

  return (
    <Box
      component="form"
      className="mt-3"
      onSubmit={handleSubmit(onFormSubmit)}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Transaction Name is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label="Transaction Name"
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
          />
        )}
      />

      <Controller
        name="amount"
        control={control}
        rules={{ required: "Transaction Amount is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            sx={{ marginBottom: "1rem" }}
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
                },
              }}
              sx={{ marginBottom: "1rem" }}
            />
          )}
        />
      </LocalizationProvider>

      <Controller
        name="category_id"
        control={control}
        rules={{ required: "Category is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            select
            label="Transaction Category"
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            value={value}
            onChange={onChange}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          >
            {categories.map((option: any) => (
              <MenuItem key={option._id} value={option._id}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default TransactionForm;
