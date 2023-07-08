import { Box, IconButton, Tooltip } from "@mui/material";
import { Transaction } from "../models/Transaction";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

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
  },
  {
    field: "actions",
    headerName: "Actions",
    // type: "actions",
    flex: 1,
    renderCell: () => {
      return (
        <Box>
          <Tooltip title="Edit the transaction">
            <IconButton sx={{ color: "blue" }}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete the transaction">
            <IconButton sx={{ color: "red" }}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

interface Props {
  transactions: Transaction[];
}

const TransactionsGrid = ({ transactions }: Props) => {
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
        </div>
      </div>
    </>
  );
};

export default TransactionsGrid;
