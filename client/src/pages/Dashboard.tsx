import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TransactionForm from "../components/TransactionForm";
import TransactionsGrid from "../components/TransactionsGrid";
import transactionsService from "../services/transactions-service";
import { Transaction } from "../models/Transaction";
import TransactionsCategoryChart from "../components/TransactionsCategoryChart";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoriedTransactions, setCategoriedTransactions] = useState<any[]>(
    []
  );

  const onCreateTransaction = (transaction: Transaction) => {
    console.log("submit form data", transaction);
    transactionsService
      .createTransaction(transaction)
      .then((res) => {
        console.log("successfully added the transaction to DB: ", res.data);
        fetchTransactions();
        fetchCategorizedTransactions();
      })
      .catch((err) => {
        console.log("An error occured while creating the transaction", err);
      });
  };

  const fetchTransactions = () => {
    transactionsService
      .getAllTransactions()
      .then((res) => {
        const transactions: Transaction[] = res.data.transactions;
        console.log("transactions fetched", transactions);
        setTransactions(transactions);
      })
      .catch((err) => console.log(err));
  };

  const updateTransaction = (id: string, transaction: Transaction) => {
    transactionsService
      .updateTransaction(id, transaction)
      .then((res) => {
        console.log("Successfully updated the transaction", res);
        fetchTransactions();
        fetchCategorizedTransactions();
      })
      .catch((err) => console.log(err));
  };

  const deleteTransaction = (id: string) => {
    transactionsService
      .deleteTransaction(id)
      .then((res) => {
        console.log("Transaction deleted successfully", res);
        fetchTransactions();
        fetchCategorizedTransactions();
      })
      .catch((err) => console.log(err));
  };

  const fetchCategorizedTransactions = () => {
    transactionsService
      .getCategorizedTransactions()
      .then((res) => {
        let categorizedTransactions = res.data.categorizedTransactions;
        categorizedTransactions = categorizedTransactions.map((item: any) => ({
          ...item,
          _id: item._id.category,
        }));
        setCategoriedTransactions(categorizedTransactions);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategorizedTransactions();
  }, []);

  return (
    <Container>
      <Box sx={{ height: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TransactionsCategoryChart
              categorizedTransactions={categoriedTransactions}
            />
          </Grid>
          <Grid item md={6}>
            <TransactionForm
              onSubmit={(data) => {
                onCreateTransaction(data);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TransactionsGrid
              transactions={transactions}
              onUpdate={updateTransaction}
              onDelete={deleteTransaction}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
