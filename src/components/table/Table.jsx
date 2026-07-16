import "./table.scss";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDashboardStatus,
  selectDashboardTransactions,
} from "../../store/dashboardSlice";

const columns = [
  { id: "id", label: "Order" },
  { id: "product", label: "Product" },
  { id: "customer", label: "Customer" },
  { id: "date", label: "Date" },
  { id: "amount", label: "Amount" },
  { id: "items", label: "Items" },
  { id: "method", label: "Method" },
  { id: "status", label: "Status" },
];

const Table = () => {
  const rows = useSelector(selectDashboardTransactions);
  const status = useSelector(selectDashboardStatus);

  if (status === "loading" || status === "idle") {
    return (
      <div className="table state-box">
        <CircularProgress size={24} sx={{ color: "var(--accent)" }} />
        <span>Loading transactions…</span>
      </div>
    );
  }

  if (!rows.length) {
    return <div className="table state-box">No transactions yet.</div>;
  }

  return (
    <TableContainer component={Paper} className="table box" elevation={0}>
      <MuiTable sx={{ minWidth: 860 }} aria-label="transactions table" size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} className="table-cell head">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell className="table-cell">#{row.id}</TableCell>
              <TableCell className="table-cell">
                <div className="cell-wrapper">
                  {row.image ? <img src={row.image} alt="" className="image" /> : null}
                  <span className="product-title">{row.product}</span>
                </div>
              </TableCell>
              <TableCell className="table-cell">
                <Link to={`/users/${row.customerId}`} className="customer-link">
                  {row.customer}
                </Link>
              </TableCell>
              <TableCell className="table-cell">{row.date}</TableCell>
              <TableCell className="table-cell amount">
                ${Number(row.amount).toLocaleString()}
              </TableCell>
              <TableCell className="table-cell">{row.items}</TableCell>
              <TableCell className="table-cell">{row.method}</TableCell>
              <TableCell className="table-cell">
                <span className={`status-badge ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
