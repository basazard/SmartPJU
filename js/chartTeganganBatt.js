import { teganganBattRef } from "./firebase.js";
import { onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

let dataTeganganBatt;

onValue(teganganBattRef, (snapshot) => {
  dataTeganganBatt = snapshot.val();
  document.getElementById("loadvoltage_Batt").innerHTML =
    parseFloat(dataTeganganBatt);
});

const data = {
  labels: [],
  datasets: [
    {
      label: "#TeganganBatt",
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
                y: dataTeganganBatt,
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

const chartTeganganBatt = new Chart(
  document.getElementById("chartTeganganBatt"),
  config
);
