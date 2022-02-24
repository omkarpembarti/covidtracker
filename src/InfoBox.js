import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "./InfoBox.css";
import { casesTypeColors } from "./Util";
function InfoBox(props) {
  let ActiveClassName = "";
  let HeaderClassName = "";
  if (props.active === "cases") {
    ActiveClassName = "infoBox_cases";
  } else if (props.active === "recovered") {
    ActiveClassName = "infoBox_recoverd";
  } else if (props.active === "deaths") {
    ActiveClassName = "infoBox_deaths";
  }

  if (props.title === "Active Cases") {
    HeaderClassName = "infoBox_Countcases";
  } else if (props.title === "Recovered Cases") {
    HeaderClassName = "infoBox_Countrecovered";
  } else if (props.title === "Death Cases") {
    HeaderClassName = "infoBox_Countdeaths";
  }

  return (
    <Card className={`infobox ${ActiveClassName}`} onClick={props.onClick}>
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {props.title}
        </Typography>
        <h2 className={HeaderClassName} style={{ HeaderClassName }}>
          {props.cases}
        </h2>
        <Typography className="infoBox__total">Total {props.total}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
