import { useEffect, useState } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import { Transaction } from "./models/Transaction";
import TransactionsGrid from "./components/TransactionsGrid";
import Header from "./components/Header";
import transactionsService from "./services/transactions-service";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const onCreateTransaction = (transaction: Transaction) => {
    console.log("submit form data", transaction);
    transactionsService
      .createTransaction(transaction)
      .then((res) => {
        console.log("successfully added the transaction to DB: ", res.data);
        fetchTransactions();
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
      })
      .catch((err) => console.log(err));
  };

  const deleteTransaction = (id: string) => {
    transactionsService
      .deleteTransaction(id)
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
