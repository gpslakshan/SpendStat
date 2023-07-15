import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  MenuItem,
  Icon,
  Tooltip,
} from "@mui/material";
import { Category } from "../models/Category";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import {
  AddHomeWork,
  Commute,
  Fastfood,
  LiveTv,
  MedicalServices,
  MiscellaneousServices,
  Paid,
  Pool,
  RequestQuote,
  Security,
  Work,
} from "@mui/icons-material";

interface Props {
  mode: string;
  open: boolean;
  onClose: () => void;
  onCreate: (data: Category) => void;
  data: Category | null;
  onUpdate: (id: string, data: Category) => void;
}

const CategoryForm = ({
  open,
  onClose,
  mode,
  data,
  onCreate,
  onUpdate,
}: Props) => {
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
    { name: "Housing", icon: AddHomeWork },
    { name: "Transportation", icon: Commute },
    { name: "Food", icon: Fastfood },
    { name: "Utilities", icon: RequestQuote },
    { name: "Insurance", icon: Security },
    { name: "Medical & Healthcare", icon: MedicalServices },
    { name: "Investment", icon: Work },
    { name: "Personal Spending", icon: Paid },
    { name: "Recreation", icon: Pool },
    { name: "Entertainment", icon: LiveTv },
    { name: "Miscellaneous", icon: MiscellaneousServices },
  ];

  const handleFormSubmit = (formData: FieldValues) => {
    console.log("form data: ", formData);
    if (mode === "create") {
      onCreate(formData as Category);
    } else {
      onUpdate(data?._id || "", formData as Category);
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
                    <Tooltip title={option.name}>
                      <Icon component={option.icon} />
                    </Tooltip>
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
