import { FieldValues, useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Transaction } from "../models/Transaction";

interface Props {
  onSubmit: (data: Transaction) => void;
}

const TransactionForm = ({ onSubmit }: Props) => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      date: null,
    },
  });

  const onFormSubmit = (data: FieldValues) => {
    console.log("form data: ", data);
    onSubmit({ ...data, date: data.date.$d } as Transaction);
    reset();
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <form className="mt-3" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-3">
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
                />
              )}
            />
          </div>
          <div className="mb-3">
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
                />
              )}
            />
          </div>
          <div className="mb-3">
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
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
