import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AxiosResponse, AxiosError } from "axios";
import "./SalesPieChart.css";
import apiClient from "../config/api";

interface SaleData {
  product: string;
  quantity: number;
  price: number;
}

const SalesPieChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SaleData[]>([]);

  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    apiClient
      .get<SaleData[]>("/api/sales")
      .then((response: AxiosResponse<SaleData[]>) =>
        setSalesData(response.data)
      )
      .catch((error: AxiosError) => console.error(error));
  }, []);

  useEffect(() => {
    if (salesData.length > 0) {
      const chart = am4core.create("salesPieChart", am4charts.PieChart);

      chart.data = salesData;
      chart.responsive.enabled = true;

      const title = chart.titles.create();
      title.text = "Product wise Sales Pie Chart";
      title.fontSize = 20;
      title.marginTop = 20;

      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "quantity";
      pieSeries.dataFields.category = "product";
      pieSeries.slices.template.tooltipText = "{category}: [bold]{value}[/]";

      pieSeries.slices.template.fillOpacity = 0.8;
      pieSeries.slices.template.stroke = am4core.color("#FFFFFF");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      pieSeries.hiddenState.properties.opacity = 0;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      chart.innerRadius = am4core.percent(50);

      return () => {
        chart.dispose();
      };
    }
  }, [salesData]);

  return <div id="salesPieChart" className="pie-chart-container"></div>;
};

export default SalesPieChart;
