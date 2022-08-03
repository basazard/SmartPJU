import { dayaPVRef } from "./firebase.js";
import { onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

let dataDayaPV;

onValue(dayaPVRef, (snapshot) => {
  dataDayaPV = snapshot.val();
  document.getElementById("power_mW_PV").innerHTML = parseFloat(dataDayaPV/1000);
});

const data = {
  labels: [],
  datasets: [
    {
      label: "#DayaPV",
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
                y: dataDayaPV,
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

const chartDayaPV = new Chart(document.getElementById("chartDayaPV"), config);
