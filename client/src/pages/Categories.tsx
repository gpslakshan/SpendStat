import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import categoriesService from "../services/categories-service";
import { setUser } from "../redux/auth-slice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.auth.user);

  const removeTransaction = (id: string) => {
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
                // onClick={() => handleClickOpen(params.row)}
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
        );
      },
    },
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: "1rem", marginTop: "3rem" }}>
        List of Categories
      </Typography>
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
    </Container>
  );
};

export default Categories;
