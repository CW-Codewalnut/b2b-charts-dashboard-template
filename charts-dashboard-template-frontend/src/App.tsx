import React from "react";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import SalesColumnChart from "./components/SalesColumnChart";
import SalesBarChart from "./components/SalesBarChart";
import SalesPieChart from "./components/SalesPieChart";
import GdpBarChartRace from "./components/GdpBarChartRace";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <TopBar
        onClick={() => {
          window.open(
            "https://www.codewalnut.com/insights/b2b-charts-dashboard-application-development",
            "_blank"
          );
        }}
      />
      <div className="content">
        <center className="center">B2B Dashboard Application</center>
        <GdpBarChartRace />
        <SalesColumnChart />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SalesBarChart />
          <SalesPieChart />
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default App;
