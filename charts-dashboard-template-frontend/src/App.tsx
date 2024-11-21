import React, { useState } from "react";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import SalesColumnChart from "./components/SalesColumnChart";
import SalesBarChart from "./components/SalesBarChart";
import SalesPieChart from "./components/SalesPieChart";
import GdpBarChartRace from "./components/GdpBarChartRace";
import Documentation from "./pages/Documentation";
import "./App.css";

const App: React.FC = () => {
  const [showDocumentation, setShowDocumentation] = useState(false);
  return (
    <>
      <TopBar
        onToggleView={() => setShowDocumentation(!showDocumentation)}
        showDocumentation={showDocumentation}
      />
      <div className="content">
        {showDocumentation ? (
          <Documentation />
        ) : (
          <>
            <center className="center">B2B Dashboard Application</center>
            <GdpBarChartRace />
            <SalesColumnChart />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <SalesBarChart />
              <SalesPieChart />
            </div>
          </>
        )}
      </div>
      <BottomBar />
    </>
  );
};

export default App;
