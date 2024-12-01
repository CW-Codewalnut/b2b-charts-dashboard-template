import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "./GdpBarChartRace.css";
import apiClient from "../config/api";

type Country =
  | "USA"
  | "India"
  | "Japan"
  | "Germany"
  | "UK"
  | "France"
  | "China"
  | "Brazil"
  | "Canada"
  | "Russia";

interface CountryGDPData {
  country: Country;
  gdp: number;
}

interface YearlyGDPData {
  year: string;
  countryGdpDataList: CountryGDPData[];
}

type AllGDPData = YearlyGDPData[];

const GdpBarChartRace: React.FC = () => {
  const [allGDPData, setAllGDPData] = useState<AllGDPData>([]);
  const [replay, setReplay] = useState(false);

  useEffect(() => {
    const fetchGDPData = async () => {
      try {
        const response = await apiClient.get("/api/gdp");
        setAllGDPData(response.data);
      } catch (error) {
        console.error("Error fetching GDP data:", error);
      }
    };

    fetchGDPData();
  }, []);

  useEffect(() => {
    if (allGDPData.length === 0) return;

    const root = am5.Root.new("gdpBarChartRace");
    root.numberFormatter.setAll({
      numberFormat: "##.##",
      bigNumberPrefixes: [{ number: 1e12, suffix: "T$" }],
      smallNumberPrefixes: [],
    });

    var stepDuration = 700;
    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
      })
    );

    chart.zoomOutButton.set("forceHidden", true);

    var yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 20,
      inversed: true,
      minorGridEnabled: true,
    });
    yRenderer.grid.template.set("visible", false);

    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "network",
        renderer: yRenderer,
      })
    );

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        strictMinMax: true,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    xAxis.set("interpolationDuration", stepDuration);
    xAxis.set("interpolationEasing", am5.ease.linear);

    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",
        categoryYField: "network",
      })
    );

    series.columns.template.setAll({ cornerRadiusBR: 5, cornerRadiusTR: 5 });

    series.columns.template.adapters.add("fill", function (fill, target) {
      const index = series.columns.indexOf(target);
      const colors = chart.get("colors");
      return colors && index !== -1 ? colors.getIndex(index) : fill;
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      const index = series.columns.indexOf(target);
      const colors = chart.get("colors");
      return colors && index !== -1 ? colors.getIndex(index) : stroke;
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueXWorking.formatNumber('#.# a')}",
          fill: root.interfaceColors.get("alternativeText"),
          centerX: am5.p100,
          centerY: am5.p50,
          populateText: true,
        }),
      });
    });

    var label = chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: "2002",
        fontSize: "8em",
        opacity: 0.9,
        x: am5.p100,
        y: am5.p100,
        centerY: am5.p100,
        centerX: am5.p100,
        fill: am5.color("#FFA500"),
      })
    );

    function getSeriesItem(category: string | undefined) {
      for (var i = 0; i < series.dataItems.length; i++) {
        var dataItem = series.dataItems[i];
        if (dataItem.get("categoryY") == category) {
          return dataItem;
        }
      }
    }

    function sortCategoryAxis() {
      series.dataItems.sort(function (x, y) {
        return (y.get("valueX") as number) - (x.get("valueX") as number);
      });

      am5.array.each(yAxis.dataItems, function (dataItem) {
        const seriesDataItem = getSeriesItem(dataItem.get("category"));

        if (seriesDataItem) {
          const index = series.dataItems.indexOf(seriesDataItem);
          const deltaPosition =
            (index - dataItem.get("index", 0)) / series.dataItems.length;

          if (dataItem.get("index") !== index) {
            dataItem.set("index", index);
            dataItem.set("deltaPosition", -deltaPosition);
            dataItem.animate({
              key: "deltaPosition",
              to: 0,
              duration: stepDuration / 2,
              easing: am5.ease.out(am5.ease.cubic),
            });
          }
        }
      });

      yAxis.dataItems.sort(function (x, y) {
        const xIndex = x.get("index");
        const yIndex = y.get("index");
        if (typeof xIndex !== "undefined" && typeof yIndex !== "undefined") {
          return xIndex - yIndex;
        } else if (
          typeof xIndex === "undefined" &&
          typeof yIndex === "undefined"
        ) {
          return 0;
        } else if (typeof xIndex === "undefined") {
          return 1;
        } else {
          return -1;
        }
      });
    }

    var yearIndex = 0;

    var interval = setInterval(function () {
      if (yearIndex < allGDPData.length) {
        updateData();
        yearIndex++;
      } else {
        clearInterval(interval);
        clearInterval(sortInterval);
      }
    }, stepDuration);

    var sortInterval = setInterval(function () {
      sortCategoryAxis();
    }, 100);

    function setInitialData(yearIndex: number) {
      const yearData = allGDPData[yearIndex];
      for (const { country, gdp } of yearData.countryGdpDataList) {
        series.data.push({ network: country, value: gdp });
        yAxis.data.push({ network: country });
      }
    }

    function updateData() {
      var itemsWithNonZero = 0;

      if (allGDPData[yearIndex]) {
        const yearData = allGDPData[yearIndex];
        label.set("text", yearData.year);

        am5.array.each(series.dataItems, function (dataItem) {
          const country = dataItem.get("categoryY");
          let value: number | undefined;

          if (
            country !== undefined &&
            yearData.countryGdpDataList.some((item) => item.country === country)
          ) {
            value = yearData.countryGdpDataList.find(
              (item) => item.country === country
            )?.gdp;

            if (value !== undefined && value > 0) {
              itemsWithNonZero++;
            }
          }

          dataItem.animate({
            key: "valueX",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear,
          });

          dataItem.animate({
            key: "valueXWorking",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear,
          });
        });

        yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
      }
    }

    setInitialData(yearIndex);
    setTimeout(function () {
      yearIndex++;
      updateData();
    }, 50);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [allGDPData, replay]);

  return (
    <div className="bar-chart-race-container">
      <div className="chart-title">
        GDP Bar Chart Race
        <button
          className="replay-button"
          onClick={() => setReplay((prev) => !prev)}
        >
          Replay
        </button>
      </div>
      <div id="gdpBarChartRace" className="chartdiv"></div>
    </div>
  );
};

export default GdpBarChartRace;
