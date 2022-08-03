import { karbonRef } from "./firebase.js";
import { onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";

let dataKarbon;

onValue(karbonRef, (snapshot) => {
  dataKarbon = snapshot.val();
  document.getElementById("karbondioksida").innerHTML = parseFloat(dataKarbon);
});

const data = {
  labels: [],
  datasets: [
    {
      label: "#Karbondioksida",
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
                y: dataKarbon,
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

const chartKarbon = new Chart(
  document.getElementById("chartKarbon"),
  config
);
