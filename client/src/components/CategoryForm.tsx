import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import { Category } from "../models/Category";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

interface Props {
  mode: string;
  open: boolean;
  onClose: () => void;
  onCreate: (data: Category) => void;
  data: Category | null;
}

const CategoryForm = ({ open, onClose, mode, data, onCreate }: Props) => {
  const { handleSubmit, reset, control, setValue } = useForm({
    defaultValues: {
      label: "",
      icon: "",
    },
  });

  useEffect(() => {
    console.log("Category Form re-rendered");
    setValue("label", data ? data.label : "", { shouldValidate: true });
    setValue("icon", data ? data.icon : "", { shouldValidate: true });
  }, [mode, open]);

  const icons = [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "E" },
  ];

  const handleFormSubmit = (data: FieldValues) => {
    console.log("form data: ", data);
    if (mode === "create") {
      onCreate(data as Category);
    } else {
    }
    reset();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {mode === "create" ? "Add New Category" : "Edit New Category"}
      </DialogTitle>
      <Box
        component="form"
        className="mt-3"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <DialogContent>
          <Controller
            name="label"
            control={control}
            rules={{ required: "Category Label Name is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                size="small"
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                label="Category Label"
                variant="outlined"
                sx={{ marginBottom: "1rem" }}
              />
            )}
          />

          <Controller
            name="icon"
            control={control}
            rules={{ required: "Category Icon required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                select
                label="Category Icon"
                helperText={error ? error.message : null}
                size="small"
                error={!!error}
                value={value}
                onChange={onChange}
                fullWidth
                sx={{ marginBottom: "1rem" }}
              >
                {icons.map((option: any) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
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
          <Button type="submit" autoFocus>
            {mode === "create" ? "Create" : "Save"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CategoryForm;
