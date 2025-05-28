import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";

Chart.register(ArcElement, Tooltip, Legend);

interface BalanceBarProps {
  totalIncome: number;
  totalExpense: number;
}

export const BalanceBar: React.FC<BalanceBarProps> = ({ totalIncome, totalExpense }) => {
  const remaining = Math.max(0, totalIncome - totalExpense);
  const spent = Math.max(0, totalExpense);
  const percent = totalIncome > 0 ? Math.max(0, Math.min(100, (remaining / totalIncome) * 100)) : 0;


  const data = {
    labels: ["Disponible", "Gastado"],
    datasets: [
      {
        data: [remaining, spent],
        backgroundColor: [
          percent > 60 ? "#22c55e" : percent > 30 ? "#facc15" : "#ef4444", // verde, amarillo, rojo
          "#334155" // gris oscuro para lo gastado
        ],
        borderWidth: 0,
      },
    ],
  };

  if (totalIncome === 0 && totalExpense === 0) {
    return (
      <div className="bg-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-800 flex items-center justify-center h-full">
        <span className="text-gray-400">No hay transacciones</span>
      </div>);
  }

  return (
    <div className="bg-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-800 flex flex-col items-center justify-center h-full">
      <h3 className="text-lg font-bold text-white mb-4 text-center">Saldo restante</h3>
      <div className="w-40 h-40 mb-4">
        <Doughnut
          data={data}
          options={{
            cutout: "70%",
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
            },
          }}
        />
        <div className="absolute w-40 h-40 flex items-center justify-center pointer-events-none" style={{ marginTop: "-10rem" }}>
          <span className="text-2xl font-bold text-white">{percent.toFixed(0)}%</span>
        </div>
      </div>
      <div className="flex justify-between w-full text-sm text-gray-300 mt-2">
        <span>Ingresos: ${totalIncome.toFixed(2)}</span>
        <span>Gastos: ${totalExpense.toFixed(2)}</span>
        <span>Disponible: ${remaining.toFixed(2)}</span>
      </div>
    </div>
  );
};