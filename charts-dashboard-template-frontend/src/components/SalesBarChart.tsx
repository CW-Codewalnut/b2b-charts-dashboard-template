import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AxiosResponse, AxiosError } from "axios";
import "./SalesBarChart.css";
import apiClient from "../config/api";

interface SaleData {
  product: string;
  quantity: number;
  price: number;
}

const SalesBarChart: React.FC = () => {
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
      const chart = am4core.create("salesBarChart", am4charts.XYChart);

      chart.data = salesData;
      chart.responsive.enabled = true;

      const title = chart.titles.create();
      title.text = "Sales Quantity Bar Chart";
      title.fontSize = 20;
      title.marginBottom = 20;

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "product";
      categoryAxis.title.text = "Product";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      const valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxisX.title.text = "Quantity";

      const barSeries = chart.series.push(new am4charts.ColumnSeries());
      barSeries.dataFields.valueX = "quantity";
      barSeries.dataFields.categoryY = "product";
      barSeries.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
      barSeries.columns.template.fillOpacity = 0.8;

      const barTemplate = barSeries.columns.template;
      barTemplate.strokeWidth = 2;
      barTemplate.strokeOpacity = 1;
      barTemplate.column.cornerRadiusBottomRight = 10;
      barTemplate.column.cornerRadiusTopRight = 10;

      barTemplate.fill = am4core.color("#4CAF50");
      barTemplate.stroke = am4core.color("#4CAF50");

      chart.cursor = new am4charts.XYCursor();

      return () => {
        chart.dispose();
      };
    }
  }, [salesData]);

  return <div id="salesBarChart" className="bar-chart-container"></div>;
};

export default SalesBarChart;
