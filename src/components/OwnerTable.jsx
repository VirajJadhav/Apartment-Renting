import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 450,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const columns = [
  "Name",
  "Start Date",
  "Due Date",
  "Rent Amount",
  "Paid",
  "Edit",
  "Delete",
];

export default function OwnerTable(props) {
  const classes = useStyles();

  const rows = props.data;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <StyledTableCell
                  key={index}
                  align="left"
                  style={{ minWidth: 170 }}
                >
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {row.map((value, ind) => {
                      return (
                        <TableCell key={ind} align="left">
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="left">
                      <EditIcon
                        color="primary"
                        onClick={() => props.handleEdit(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <DeleteIcon
                        color="error"
                        onClick={() => props.handleDeleteModal(index)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
