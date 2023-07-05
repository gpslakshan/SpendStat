import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TransactionForm, {
  TransactionFormData,
} from "./components/TransactionForm";
import { Transaction } from "./models/Transaction";
import TransactionsGrid from "./components/TransactionsGrid";
import Header from "./components/Header";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const onCreateTransaction = (transaction: TransactionFormData) => {
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
            <TransactionsGrid transactions={transactions} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
