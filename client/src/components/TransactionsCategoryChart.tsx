import { useEffect, useState } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

interface Props {
  categorizedTransactions: any[];
}

const TransactionsCategoryChart = ({ categorizedTransactions }: Props) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [chartValues, setChartValues] = useState<number[]>([]);
  const { categories } = useSelector((state: any) => state.auth.user);

  const data = {
    labels: labels,
    datasets: [
      {
        data: chartValues,
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    console.log("Transactions categroized", categorizedTransactions);
    setLabels(
      getCategoriesByIds(categorizedTransactions.map((item) => item._id))
    );
    setChartValues(categorizedTransactions.map((item) => item.totalExpenses));
  }, [categorizedTransactions]);

  const getCategoriesByIds = (categoryIds: string[]) => {
    let returnArr: string[] = [];
    for (let i = 0; i < categoryIds.length; i++) {
      const category = categories.find(
        (category: any) => category._id === categoryIds[i]
      );
      returnArr.push(category ? category.label : "NA");
    }
    return returnArr;
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ marginTop: "1rem" }}>
        Transactions By Category
      </Typography>
      <Doughnut
        data={data}
        className="chart"
        options={{
          aspectRatio: 1.2, // reduce whitespaces and adjust height accordingly
          cutout: 120, // thickness of the doghnut
          plugins: {
            colors: {
              forceOverride: true,
            },
            legend: {
              position: "right",
            },
          },
        }}
      />
    </Box>
  );
};

export default TransactionsCategoryChart;
