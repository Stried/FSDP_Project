import { useState, useEffect } from "react";
import http from "./../../../http";
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const App = () => {
  const calculateAverageRating = (receiptList) => {
    const modelRatings = {};
  
    receiptList.forEach((trialReceipt) => {
      const modelName = trialReceipt.modelName;
      const rating = trialReceipt.ratings;

      console.log("Model:", modelName);
  console.log("Rating:", rating);
  
      if (rating !== null) {
        if (!modelRatings[modelName]) {
          modelRatings[modelName] = {
            totalRating: 0,
            count: 0,
          };
        }
  
        modelRatings[modelName].totalRating += rating;
        modelRatings[modelName].count++;
      }
    });
  
    console.log("Model Ratings:", modelRatings); 

    const result = {};
    for (const modelName in modelRatings) {
      const { totalRating, count } = modelRatings[modelName];
      const averageRating = count > 0 ? totalRating / count : 0;
      console.log("Average Rating:", modelName, averageRating);
      result[modelName] = averageRating;
    }
  
    return result;
  };

  const [trialReceiptList, setTrialReceiptList] = useState([]);

  const getTrialReceipt = () => {
    http.get("/trials/getAllTrialReceiptRatings").then((res) => {
      setTrialReceiptList(res.data);
    });
  };

  useEffect(() => {
    getTrialReceipt();
  }, []);

  const averageRatings = calculateAverageRating(trialReceiptList);

  const chartOptions = {
    title: {
      text: "Top 5 Average Rated Trial Cars",
      fontColor: "#22c55e",
    },
    backgroundColor: "#1F2937",
    dataPointWidth: 130,
        axisX: {
      titleFontColor: "#666", // X-axis title color
      labelFontColor: "#FFFFFF"  // X-axis labels color
    },
    axisY: {
      titleFontColor: "#666", // Y-axis title color
      labelFontColor: "#FFFFFF"  // Y-axis labels color
    },
    legend: {
      fontColor: "#666" // Legend text color
    },
    data: [
      {
        type: "column",
        
        dataPoints: Object.entries(averageRatings).map(([modelName, averageRating]) => ({
          label: modelName,
          y: averageRating
        }))
      }
    ]
  };

 
  
  return (
    <div className="relative min-h-screen">
      <br />
      <div>
      <CanvasJSChart options={chartOptions} />
    </div>
    </div>
  );
};

export default App;