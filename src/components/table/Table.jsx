import "./table.scss";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import PropTypes from "prop-types";
import { rows } from "./statData.js";

const Table = (props) => {
  const rowKeys = Object.keys(rows[0]).filter((k) => k !== "image");

  return (
    <TableContainer component={Paper} className="table box">
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {rowKeys.map((cell) => (
              <TableCell key={cell} className="table-cell">
                {cell.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {rowKeys.map((rowKey) => {
                return rowKey === "product" ? (
                  <TableCell key={rowKey} className="table-cell">
                    <div className="cell-wrapper">
                      <img src={row.image} alt="" className="image" />
                      {row[rowKey]}
                    </div>
                  </TableCell>
                ) : rowKey === "status" ? (
                  <TableCell key={rowKey} className="table-cell">
                    <span className={`status  ${row.status}`}>{row.status}</span>
                  </TableCell>
                ) : (
                  <TableCell key={rowKey} className="table-cell">
                    {row[rowKey]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

// Table.propTypes = {};

export default Table;
