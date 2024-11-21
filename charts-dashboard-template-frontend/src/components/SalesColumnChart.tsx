import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AxiosResponse, AxiosError } from "axios";
import "./SalesColumnChart.css";
import apiClient from "../config/api";

interface SaleData {
  product: string;
  quantity: number;
  price: number;
}

const SalesColumnChart: React.FC = () => {
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
      const chart = am4core.create("salesColumnChart", am4charts.XYChart);

      chart.data = salesData;
      chart.responsive.enabled = true;

      const title = chart.titles.create();
      title.text = "Sales Quantity and Value Column and Line Chart";
      title.fontSize = 20;
      title.marginBottom = 20;

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "product";
      categoryAxis.title.text = "Product";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      const valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = "Quantity";

      const valueAxisY2 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY2.title.text = "Sales";
      valueAxisY2.renderer.opposite = true;

      const columnSeries = chart.series.push(new am4charts.ColumnSeries());
      columnSeries.dataFields.valueY = "quantity";
      columnSeries.dataFields.categoryX = "product";
      columnSeries.columns.template.tooltipText =
        "{categoryX}: [bold]{valueY}[/]";
      columnSeries.columns.template.fillOpacity = 0.8;

      const columnTemplate = columnSeries.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
      columnTemplate.column.cornerRadiusTopLeft = 10;
      columnTemplate.column.cornerRadiusTopRight = 10;

      const lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.valueY = "price";
      lineSeries.dataFields.categoryX = "product";
      lineSeries.name = "Price";
      lineSeries.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      lineSeries.strokeWidth = 2;
      lineSeries.yAxis = valueAxisY2;

      const bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color("#0080fb");
      bullet.circle.stroke = am4core.color("#ffffff");
      bullet.circle.strokeWidth = 2;

      chart.cursor = new am4charts.XYCursor();

      return () => {
        chart.dispose();
      };
    }
  }, [salesData]);

  return <div id="salesColumnChart" className="column-chart-container"></div>;
};

export default SalesColumnChart;
