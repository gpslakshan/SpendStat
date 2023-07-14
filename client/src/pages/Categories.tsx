import { useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const Categories = () => {
  const { categories } = useSelector((state: any) => state.auth.user);

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
                // onClick={() => removeTransaction(params.row._id)}
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
