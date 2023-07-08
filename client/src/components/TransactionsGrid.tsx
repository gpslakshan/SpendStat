import { Box, IconButton, Tooltip } from "@mui/material";
import { Transaction } from "../models/Transaction";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionsGrid = ({ transactions, onDelete }: Props) => {
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
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip title="Edit the transaction">
              <IconButton sx={{ color: "blue" }}>
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

  const removeTransaction = (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    console.log("remove id: ", id);
    onDelete(id);
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
        </div>
      </div>
    </>
  );
};

export default TransactionsGrid;
