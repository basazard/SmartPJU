import { teganganPVRef } from "./firebase.js";
import { onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

let dataTeganganPV;

onValue(teganganPVRef, (snapshot) => {
  dataTeganganPV = snapshot.val();
  document.getElementById("loadvoltage_PV").innerHTML =
    parseFloat(dataTeganganPV);
});

const data = {
  labels: [],
  datasets: [
    {
      label: "#TeganganPV",
      data: [],
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
};

const config = {
  type: "line",
  data,
  options: {
    scales: {
      x: {
        type: "realtime",
        realtime: {
          onRefresh: (chart) => {
            chart.data.datasets.forEach((dataset) => {
              dataset.data.push({
                x: Date.now(),
                y: dataTeganganPV,
              });
            });
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  },
};

const chartTeganganPV = new Chart(
  document.getElementById("chartTeganganPV"),
  config
);
