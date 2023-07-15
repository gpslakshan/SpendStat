import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Container,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddHomeWork,
  Commute,
  Delete,
  Edit,
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
import categoriesService from "../services/categories-service";
import { setUser } from "../redux/auth-slice";
import Button from "@mui/material/Button";
import CategoryForm from "../components/CategoryForm";
import { Category } from "../models/Category";

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

const Categories = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("create");
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.auth.user);

  const handleClickOpen = (mode: string, data: Category | null = null) => {
    setMode(mode);
    if (mode === "edit") {
      setCategoryData(data);
    } else {
      setCategoryData(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createCategory = (data: Category) => {
    categoriesService
      .createCategory(data)
      .then((res) => {
        console.log("category created successfully", res);
        const user = res.data.user;
        console.log(user);
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        console.log("An error occured while creating the category", err);
      });
  };

  const updateCategory = (id: string, updatedData: Category) => {
    categoriesService
      .updateCategory(id, updatedData)
      .then((res) => {
        console.log("category updated successfully", res);
        const user = res.data.user;
        console.log(user);
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        console.log("An error occured while updating the category", err);
      });
  };

  const removeCategory = (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    console.log("remove id: ", id);
    categoriesService
      .deleteCategory(id)
      .then((res) => {
        console.log("Category deleted successfully", res);
        const user = res.data.user;
        console.log(user);
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) =>
        console.log("An error occured while deleting the category", err)
      );
  };

  const columns: GridColDef[] = [
    {
      field: "label",
      headerName: "Category Name",
      flex: 1,
      editable: false,
    },
    {
      field: "icon",
      headerName: "Category Icon",
      flex: 1,
      editable: false,
      renderCell: (params) => {
        const icon = icons.filter((icon) => icon.name == params.row.icon)[0]
          .icon;
        return <Icon component={icon}></Icon>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      // type: "actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip title="Edit the transaction">
              <IconButton
                sx={{ color: "blue" }}
                onClick={() => {
                  handleClickOpen("edit", params.row);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete the transaction">
              <IconButton
                sx={{ color: "red" }}
                onClick={() => removeCategory(params.row._id)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
          marginTop: "3rem",
        }}
      >
        <Typography variant="h4">List of Categories</Typography>
        <Button variant="contained" onClick={() => handleClickOpen("create")}>
          Add new Category
        </Button>
      </Box>
      <DataGrid
        rows={categories}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        // checkboxSelection
      />
      <CategoryForm
        mode={mode}
        data={categoryData}
        open={open}
        onCreate={createCategory}
        onClose={handleClose}
        onUpdate={updateCategory}
      />
    </Container>
  );
};

export default Categories;
