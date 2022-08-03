import { dayaBattRef } from "./firebase.js";
import { onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

let dataDayaBatt;

onValue(dayaBattRef, (snapshot) => {
  dataDayaBatt = snapshot.val();
  document.getElementById("power_mW_Batt").innerHTML = parseFloat(dataDayaBatt/1000);
});

const data = {
  labels: [],
  datasets: [
    {
      label: "#DayaBatt",
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
                y: dataDayaBatt,
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

const chartDayaBatt = new Chart(
  document.getElementById("chartDayaBatt"),
  config
);
