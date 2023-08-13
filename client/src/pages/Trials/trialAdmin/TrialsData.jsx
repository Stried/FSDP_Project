import { useState, useEffect } from "react";
import http from "../../../http";
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function TrialsData() {const calculateAverageRating = (receiptList) => {
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
    averageRatingsArray.push({ modelName, averageRating, count }); // Include count in the array
  }

  return averageRatingsArray;
};
  
  const [trialReceiptList, setTrialReceiptList] = useState([]);
const [storeReceiptList, setStoreReceiptList] = useState([])
  const getTrialReceipt = () => {
    http.get("/trials/getAllTrialReceiptRatings").then((res) => {
      setTrialReceiptList(res.data);
    });
  };

  const getStoreReceipt = () => {
    http.get("/store/viewStoreReceipt").then((res) => {
      setStoreReceiptList(res.data);
    });
  };

  useEffect(() => {
    getTrialReceipt();
  }, []);

  useEffect(() => {
    getStoreReceipt();
  }, []);


  const calculatePopularModels = (storeReceiptList) => {
    const modelCounts = {};
  
    storeReceiptList.forEach((receipt) => {
      const modelName = receipt.carModel;
  
      if (!modelCounts[modelName]) {
        modelCounts[modelName] = 0;
      }
  
      modelCounts[modelName]++;
    });
  
    const popularModels = Object.keys(modelCounts)
      .map((modelName) => ({
        modelName,
        count: modelCounts[modelName],
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  
    return popularModels;
  };

  const averageRatings = calculateAverageRating(trialReceiptList);

  const popularModels = calculatePopularModels(storeReceiptList);

  const sortedTop5 = averageRatings
  .sort((a, b) => b.averageRating - a.averageRating)
  .slice(0, 5);

  const chartOptions = {
    title: {
      text: "Top 5 Average Rated Trial Cars",
      fontColor: "#22c55e",
      fontFamily: "Montserrat", 
    },
    backgroundColor: "#1F2937",
    dataPointWidth: 130,
        axisX: {
      titleFontColor: "#666", // X-axis title color
      labelFontColor: "#FFFFFF",  // X-axis labels color
      fontFamily: "Montserrat", 
    },
    axisY: {
      titleFontColor: "#666", // Y-axis title color
      labelFontColor: "#FFFFFF",  // Y-axis labels color
      fontFamily: "Montserrat", 
      minimum: 0, 
      maximum: 5, 
    },
    legend: {
      fontColor: "#666" // Legend text color
    },
    data: [
      {
        type: "column",
        
        dataPoints: sortedTop5.map(({ modelName, averageRating, count }) => ({
          label: modelName,
          y: averageRating,
          toolTipContent: `${modelName}<br>Average Rating: ${averageRating}<br>Feedback Count: ${count}`
        }))
      }
    ]
  };

 
  const chartOptionsStore = {
    title: {
      text: "Top 5 Most Popular Store Car Models",
      fontColor: "#22c55e",
      fontFamily: "Montserrat",
    },
    backgroundColor: "#1F2937",
    dataPointWidth: 130,
    axisX: {
      titleFontColor: "#666",
      labelFontColor: "#FFFFFF",
      fontFamily: "Montserrat",
    },
    axisY: {
      titleFontColor: "#666",
      labelFontColor: "#FFFFFF",
      fontFamily: "Montserrat",
      minimum: 0,
    },
    legend: {
      fontColor: "#666",
    },
    data: [
      {
        type: "column",
        dataPoints: popularModels.map(({ modelName, count }) => ({
          label: modelName,
          y: count,
          toolTipContent: `${modelName}<br>No. of orders: ${count}`,
        })),
      },
    ],
  };
  
  return (
<div className="min-h-screen">
      <div className="flex justify-center">
        <div className="chart-container w-11/12 mt-10">
          {trialReceiptList.length === 0 ? (
            <p className="text-center text-gray-500">
              No data available to display for the trial receipts graph.
            </p>
          ) : (
            <CanvasJSChart options={chartOptions} />
          )}
        </div>
      </div>
      <br />
      <div className="flex justify-center">
        <div className="chart-container w-11/12 mt-10">
          {storeReceiptList.length === 0 ? (
            <p className="text-center text-gray-500">
              No data available to display for the store car models graph.
            </p>
          ) : (
            <CanvasJSChart options={chartOptionsStore} />
          )}
        </div>
        
      </div>
      
    </div>
  
  );
};

export default TrialsData;