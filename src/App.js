import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import InfoBox from "./InfoBox";
import TableOM from "./TableOM";
import Map from "./Map";
import { convertNum, convertTotalNum } from "./Util";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [coordinate, setCoordinate] = useState({ lat: 29.66, long: 42.87 });
  const [zoom, setZoom] = useState(2);
  const [countriesMap, setCountriesMap] = useState([]);
  const [casesType, setcasesType] = useState("cases");

  useEffect(() => {
    let link = "https://disease.sh/v3/covid-19/all";

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          let l_countries = data.map((c) => ({
            value: c.country,
            name: c.countryInfo.iso3,
            cases: c.active,
          }));
          setCountriesMap(data);
          /*
          l_countries.sort((a, b) =>
            a.name < b.name ? 1 : b.name < a.name ? -1 : 0
          );*/
          setCountries(l_countries);
          setTableData(l_countries);
        });
    };
    getCountries();
  }, []);

  const menuChangeHandler = async (event) => {
    event.preventDefault();
    let countryCode = event.target.value;
    setCountry(countryCode);
    let link =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        if (data.hasOwnProperty("countryInfo")) {
          setCoordinate({
            lat: data.countryInfo.lat,
            long: data.countryInfo.long,
          });
          setZoom(4);
        } else {
          setCoordinate({
            lat: 0,
            long: 0,
          });
          setZoom(2);
        }
      });
  };

  return (
    <div className="App">
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={menuChangeHandler}>
            <MenuItem value="WorldWide">WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem
                key={`${country.value}+${country.name}`}
                value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="app__body">
        <div className="app__left">
          <div className="app__stats">
            <InfoBox
              active={casesType === "cases" && "cases"}
              onClick={(e) => {
                setcasesType("cases");
              }}
              title="Active Cases"
              total={convertTotalNum(countryInfo.cases)}
              cases={convertNum(countryInfo.active)}></InfoBox>
            <InfoBox
              active={casesType === "recovered" && "recovered"}
              onClick={(e) => {
                setcasesType("recovered");
              }}
              title="Recovered Cases"
              total={convertTotalNum(countryInfo.cases)}
              cases={convertNum(countryInfo.recovered)}></InfoBox>
            <InfoBox
              active={casesType === "deaths" && "deaths"}
              onClick={(e) => setcasesType("deaths")}
              title="Death Cases"
              total={convertTotalNum(countryInfo.cases)}
              cases={convertNum(countryInfo.deaths)}></InfoBox>
          </div>

          <Map
            casesType={casesType}
            countriesInfo={countriesMap}
            p_coordinate={coordinate}
            p_zoom={zoom}></Map>
        </div>
        <Card className="app__right">
          <CardContent>
            <strong>Live Cases by Country</strong>
          </CardContent>
          <TableOM data={tableData}></TableOM>
        </Card>
      </div>
    </div>
  );
}

export default App;
