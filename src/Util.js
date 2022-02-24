import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

export const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 1000,
  },
};

export const convertNum = (number) => {
  return number ? `+${numeral(number).format("0.0a")}` : 0;
};
export const convertTotalNum = (number) => {
  return number ? `${numeral(number).format("0.0a")}` : 0;
};

export const showDataOnMap = (data, caseType = "cases") => {
  console.log(caseType);
  console.log(data);
  return data.map((country) => (
    <Circle
      id={`${country["countryInfo"].lat}${country["countryInfo"].long}`}
      center={[country["countryInfo"].lat, country["countryInfo"].long]}
      fillOpacity={0.2}
      pathOptions={{
        color: casesTypeColors[caseType]["hex"],
      }}
      radius={
        isNaN(
          Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
        )
          ? 10000
          : Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
      }>
      <Popup>
        <div className="popup_Container">
          <div
            className="popup_Image"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}></div>
          <div className="popup_Country">Country:{country.country}</div>
          <div className="popup_Cases">
            Cases :{numeral(country.cases).format("0,0")}
          </div>
          <div className="popup_recovered">
            Recovered :{numeral(country.recovered).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
