import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should be at least 3 characters" })
    .max(60),
  amount: z.number({ invalid_type_error: "Amount is required" }).min(0.01),
  date: z.date({
    invalid_type_error: "Date is required",
    required_error: "Please select a date",
  }),
});

type TransactionFormData = z.infer<typeof schema>;

const TransactionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({ resolver: zodResolver(schema) });

  const onSubmit = (transaction: TransactionFormData) => {
    console.log("submit form data", transaction);
    axios
      .post("http://localhost:8000/transactions", transaction)
      .then((res) => {
        console.log("successfully added the transaction to DB: ", res.data);
      })
      .catch((err) => {
        console.log("An error occured while creating the transaction", err);
      });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Transaction Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="form-control"
              placeholder="Groceries"
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message} </p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="amount" className="form-label">
              Transaction Amount ($)
            </label>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              className="form-control"
              id="amount"
              placeholder="100"
            />
            {errors.amount && (
              <p className="text-danger">{errors.amount.message} </p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="date" className="form-label">
              Transaction Date ($)
            </label>
            <input
              {...register("date", { valueAsDate: true })}
              type="date"
              id="date"
              className="form-control"
            />
            {errors.amount && (
              <p className="text-danger">{errors.date?.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
