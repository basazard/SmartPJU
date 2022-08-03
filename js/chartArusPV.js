import { arusPVRef } from "./firebase.js";
import { onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

let dataArusPV;

onValue(arusPVRef, (snapshot) => {
  dataArusPV = snapshot.val();
  document.getElementById("current_mA_PV").innerHTML = parseFloat(dataArusPV/1000);
});

const data = {
  labels: [],
  datasets: [
    {
      label: "#ArusPV",
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
                y: dataArusPV,
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

const chartArusPV = new Chart(document.getElementById("chartArusPV"), config);
