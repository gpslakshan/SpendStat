import { Transaction } from "../models/Transaction";

interface Props {
  transactions: Transaction[];
}

const TransactionsGrid = ({ transactions }: Props) => {
  return (
    <>
      <h2 className="mt-5">All Transactions</h2>
      <div className="row">
        <div className="col-md-12">
          <ul className="list-group">
            {transactions.map((transaction) => (
              <li key={transaction._id} className="list-group-item">
                {transaction.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TransactionsGrid;
