import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import { Transaction } from "./models/Transaction";
import TransactionsGrid from "./components/TransactionsGrid";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
    <div className="container">
      <TransactionForm onCreateTransaction={fetchTransactions} />
      <TransactionsGrid transactions={transactions} />
    </div>
  );
}

export default App;
