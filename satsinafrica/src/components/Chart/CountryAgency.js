import React from "react";
import { Pie } from "react-chartjs-2";

const CountryAgency = ({ data }) => {
  const agencyStatus = {
    withAgency: 0,
    withoutAgency:0,
  }

  // Comptabiliser les pays avec ou sans agence spatiale
  data.forEach((country) => {
    if (country.space_agency.name) {
      agencyStatus.withAgency += 1;
      console.log(agencyStatus.withAgency)
    } else {
      agencyStatus.withoutAgency += 1;
    }
  });

  // Préparer les données pour la pie chart
  const chartData = {
    labels: ["With Space Agency", "Without Space Agency"],
    datasets: [
      {
        data: [agencyStatus.withAgency, agencyStatus.withoutAgency],
        backgroundColor: ["#D64045", "#D7DFF2"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="font-bold w-full h-full flex flex-col items-center justify-center">
      <h3>Countries with and without Space Agencies</h3>
      <div>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
};

export default CountryAgency;
