import { Transaction } from "../models/Transaction";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Transaction Name",
    // width: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "amount",
    headerName: "Transaction Amount ($)",
    // width: 150,
    flex: 1,
    editable: false,
  },
  {
    field: "date",
    headerName: "Transaction Date",
    // type: "date",
    width: 150,
    flex: 1,
    editable: false,
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
            // checkboxSelection
            // disableRowSelectionOnClick
          />
        </div>
      </div>
    </>
  );
};

export default TransactionsGrid;
