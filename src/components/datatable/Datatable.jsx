import "./datatable.scss";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import { visuallyHidden } from "@mui/utils";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AddBoxOutlined, DeleteOutline } from "@mui/icons-material";
import {
  useDeleteProductMutation,
  useDeleteUserMutation,
  useGetProductsQuery,
  useGetUsersQuery,
} from "../../services/fakeStoreApi";
import { resourceConfig } from "../../utils/resourceConfig";

function descendingComparator(a, b, orderBy) {
  const aValue = a[orderBy];
  const bValue = b[orderBy];
  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead({
  columns,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className="table-cell" padding="checkbox">
          <Checkbox
            color="primary"
            sx={{ color: "var(--accent)" }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all rows" }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            className="table-cell"
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.disableSort ? (
              headCell.label
            ) : (
              <TableSortLabel
                sx={{
                  color:
                    orderBy === headCell.id ? "var(--accent) !important" : "inherit",
                }}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({
  numSelected,
  title,
  newPath,
  onDelete,
  isDeleting,
}) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.success.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          className="typography"
          sx={{ flex: "1 1 100%", fontWeight: 650 }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className="typography"
          sx={{ flex: "1 1 100%", fontWeight: 700, letterSpacing: "-0.02em" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete} disabled={isDeleting}>
            <DeleteOutline color="error" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={`Add ${title.toLowerCase().slice(0, -1)}`}>
          <Link to={newPath} className="add-link">
            <IconButton className="add-btn">
              <AddBoxOutlined />
            </IconButton>
          </Link>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  newPath: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
};

function renderCell(column, row, resourcePath) {
  switch (column.type) {
    case "user":
      return (
        <div className="cell-user">
          <img src={row.avatar} alt="" />
          <div>
            <span className="cell-primary">{row.name}</span>
            <span className="cell-secondary">ID #{row.id}</span>
          </div>
        </div>
      );
    case "username":
      return <span className="cell-chip">@{row.username}</span>;
    case "email":
      return <a className="cell-link" href={`mailto:${row.email}`}>{row.email}</a>;
    case "address":
      return (
        <div className="cell-stack">
          <span className="cell-primary">{row.street || "—"}</span>
          <span className="cell-secondary">
            {row.city}
            {row.zipcode ? `, ${row.zipcode}` : ""}
          </span>
        </div>
      );
    case "product":
      return (
        <div className="cell-product">
          <img src={row.image} alt="" />
          <div>
            <span className="cell-primary">{row.title}</span>
            <span className="cell-secondary">{row.shortDescription}</span>
          </div>
        </div>
      );
    case "category":
      return <span className="cell-chip">{row.category}</span>;
    case "price":
      return <span className="cell-price">${Number(row.price).toFixed(2)}</span>;
    case "rating":
      return (
        <div className="cell-rating">
          <span className="cell-primary">{Number(row.rating).toFixed(1)}</span>
          <span className="cell-secondary">{row.reviews} reviews</span>
        </div>
      );
    case "status":
      return <span className={`status-badge ${row.status}`}>{row.status}</span>;
    case "action":
      return (
        <Link
          to={`${resourcePath}/${row.id}`}
          className="btn-view"
          onClick={(event) => event.stopPropagation()}
        >
          View
        </Link>
      );
    default:
      return row[column.id];
  }
}

export default function DataTable({ resource = "users" }) {
  const config = resourceConfig[resource];
  const usersQuery = useGetUsersQuery(undefined, { skip: resource !== "users" });
  const productsQuery = useGetProductsQuery(undefined, {
    skip: resource !== "products",
  });
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [deleteProduct, { isLoading: isDeletingProduct }] = useDeleteProductMutation();

  const query = resource === "products" ? productsQuery : usersQuery;
  const rows = useMemo(() => query.data ?? [], [query.data]);
  const { isLoading, isError, error, isFetching } = query;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(config.orderBy);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows.map((n) => n.id));
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selected.map((id) =>
          resource === "products" ? deleteProduct(id).unwrap() : deleteUser(id).unwrap()
        )
      );
      setSelected([]);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  if (isLoading) {
    return (
      <Box className="datatable state-box">
        <CircularProgress size={28} sx={{ color: "var(--accent)" }} />
        <span>Loading {config.title.toLowerCase()}…</span>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="datatable state-box error">
        Failed to load {config.title.toLowerCase()}: {error?.status ?? "network error"}
      </Box>
    );
  }

  return (
    <Box className="datatable" sx={{ width: "100%" }}>
      <Paper
        className="datatable-paper"
        sx={{ width: "100%", mb: 2, backgroundImage: "none", opacity: isFetching ? 0.85 : 1 }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={config.title}
          newPath={config.newPath}
          onDelete={handleDelete}
          isDeleting={isDeletingUser || isDeletingProduct}
        />
        <TableContainer>
          <Table sx={{ minWidth: 980 }} aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              columns={config.columns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell className="table-cell" padding="checkbox">
                      <Checkbox
                        color="primary"
                        sx={{ color: "var(--accent)" }}
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    {config.columns.map((column) => (
                      <TableCell
                        key={column.id}
                        className={`table-cell${column.type === "action" ? " cell-action" : ""}`}
                        id={column.id === "id" ? labelId : undefined}
                        scope="row"
                      >
                        {renderCell(column, row, config.path)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 30 * emptyRows }}>
                  <TableCell colSpan={config.columns.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
}

DataTable.propTypes = {
  resource: PropTypes.oneOf(["users", "products"]),
};
