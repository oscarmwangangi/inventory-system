// src/config/chartConfig.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  // Register ChartJS components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);