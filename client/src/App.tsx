import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import { Transaction } from "./models/Transaction";
import TransactionsGrid from "./components/TransactionsGrid";
import Header from "./components/Header";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const onCreateTransaction = (transaction: any) => {
    console.log("submit form data", transaction);
    axios
      .post("http://localhost:8000/transactions", transaction)
      .then((res) => {
        console.log("successfully added the transaction to DB: ", res.data);
        fetchTransactions();
      })
      .catch((err) => {
        console.log("An error occured while creating the transaction", err);
      });
  };

  const fetchTransactions = () => {
    axios
      .get("http://localhost:8000/transactions")
      .then((res) => {
        const transactions: Transaction[] = res.data.transactions;
        console.log("transactions fetched", transactions);
        setTransactions(transactions);
      })
      .catch((err) => console.log(err));
  };

  const updateTransaction = (id: string, transaction: Transaction) => {
    axios
      .put(`http://localhost:8000/transactions/${id}`, transaction)
      .then((res) => {
        console.log("Successfully updated the transaction", res);
        fetchTransactions();
      })
      .catch((err) => console.log(err));
  };

  const deleteTransaction = (id: string) => {
    axios
      .delete(`http://localhost:8000/transactions/${id}`)
      .then((res) => {
        console.log("Transaction deleted successfully", res);
        fetchTransactions();
      })
      .catch((err) => console.log(err));
  };

  useEffect(fetchTransactions, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">Transaction By Category Chart</div>
          <div className="col-md-6">
            <TransactionForm
              onSubmit={(data) => {
                onCreateTransaction(data);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TransactionsGrid
              transactions={transactions}
              onUpdate={updateTransaction}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
