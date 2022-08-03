import { luxRef } from "./firebase.js";
import { onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

let dataLux;

onValue(luxRef, (snapshot) => {
  dataLux = snapshot.val();
  document.getElementById("lux").innerHTML = parseFloat(dataLux);
});

const data = {
  labels: [],
  datasets: [
    {
      label: "#Intensitas Cahaya",
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
                y: dataLux,
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

const chartLux = new Chart(document.getElementById("chartLux"), config);
