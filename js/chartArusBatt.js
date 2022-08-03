import { arusBattRef } from "./firebase.js";
import { onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

let dataArusBatt;

onValue(arusBattRef, (snapshot) => {
  dataArusBatt = snapshot.val();
  document.getElementById("current_mA_Batt").innerHTML =
    parseFloat(dataArusBatt/1000);
});

const data = {
  labels: [],
  datasets: [
    {
      label: "#ArusBatt",
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
                y: dataArusBatt,
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

const chartArusBatt = new Chart(
  document.getElementById("chartArusBatt"),
  config
);
