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
  
      if (rating !== null && rating!==0) {
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
  
    const averageRatingsArray = [];
    for (const modelName in modelRatings) {
      const { totalRating, count } = modelRatings[modelName];
      const averageRating = count > 0 ? totalRating / count : 0;
      averageRatingsArray.push({ modelName, averageRating });
    }
  
    return averageRatingsArray;
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

  const sortedTop5 = averageRatings
  .sort((a, b) => b.averageRating - a.averageRating)
  .slice(0, 5);

  const chartOptions = {
    title: {
      text: "Top 5 Average Rated Trial Cars",
      fontColor: "#22c55e",
      fontFamily: "Arial", 
    },
    backgroundColor: "#1F2937",
    dataPointWidth: 130,
        axisX: {
      titleFontColor: "#666", // X-axis title color
      labelFontColor: "#FFFFFF",  // X-axis labels color
      fontFamily: "Arial", 
    },
    axisY: {
      titleFontColor: "#666", // Y-axis title color
      labelFontColor: "#FFFFFF",  // Y-axis labels color
      fontFamily: "Arial", 
      minimum: 0, 
      maximum: 5, 
    },
    legend: {
      fontColor: "#666" // Legend text color
    },
    data: [
      {
        type: "column",
        
        dataPoints: sortedTop5.map(({ modelName, averageRating }) => ({
          label: modelName,
          y: averageRating
        }))
      }
    ]
  };

 
  
  return (
    <div className="flex justify-center min-h-screen">
    <br />
    <div className="chart-container w-11/12 mt-10">
      {trialReceiptList.length === 0 ? (
        <p className="text-center text-gray-500">No data available to display for the graph.</p>
      ) : (
        <CanvasJSChart options={chartOptions} />
      )}
    </div>
  </div>
  );
};

export default App;