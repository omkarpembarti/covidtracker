import React from "react";
import numeral from "numeral";
import "./TableOM.css";

const sortTableData = (data) => {
  data.sort((a, b) => (a.cases < b.cases ? 1 : b.cases < a.cases ? -1 : 0));
  return data;
};

const TableOM = (props) => {
  let tableData = props.data;
  tableData = sortTableData(tableData);
  console.log("TABLE");
  console.log(props.data);
  return (
    <div className="table">
      <table className="table_inside">
        <tbody>
          {tableData.map((c) => (
            <tr key={`${c.value}+${c.cases}`}>
              <td>{c.value}</td>
              <td>
                <strong>{numeral(c.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOM;
