import "./table.scss";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { rows } from "./statData.js";

const Table = () => {
  const rowKeys = Object.keys(rows[0]).filter((k) => k !== "image");

  return (
    <TableContainer component={Paper} className="table box" elevation={0}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="transactions table">
        <TableHead>
          <TableRow>
            {rowKeys.map((cell) => (
              <TableCell key={cell} className="table-cell head">
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              {rowKeys.map((rowKey) => {
                if (rowKey === "product") {
                  return (
                    <TableCell key={rowKey} className="table-cell">
                      <div className="cell-wrapper">
                        <img src={row.image} alt="" className="image" />
                        <span>{row[rowKey]}</span>
                      </div>
                    </TableCell>
                  );
                }

                if (rowKey === "status") {
                  return (
                    <TableCell key={rowKey} className="table-cell">
                      <span className={`status-badge ${row.status}`}>
                        {row.status}
                      </span>
                    </TableCell>
                  );
                }

                return (
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

export default Table;
