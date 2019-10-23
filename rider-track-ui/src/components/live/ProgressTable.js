import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Participant Name', minWidth: 170 },
  { id: 'rank', label: 'Rank', minWidth: 100 },
  {
    id: 'speed',
    label: 'Speed',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'distance_travelled',
    label: 'Route travelled (miles)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'altitude',
    label: 'Altitude',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'distance_remaining',
    label: 'Distance Remaining',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'gps',
    label: 'GPS (latitude/longitude)',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'last_updated',
    label: 'Last Updated (min ago)',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

function createData(name, rank, speed, distance_travelled, altitude, distance_remaining, gps, last_updated) {
  return {
    name, rank, speed, distance_travelled, altitude, distance_remaining, gps, last_updated,
};
}

const rows = [
  createData('Vivek', 1, 5, 6, 212.0, 10, '12.2 / 13.1', 3),
  createData('Shuanak', 2, 5, 6, 212.0, 15, '12.2 / 13.1', 5),
  createData('Shilpa', 3, 5, 6, 201.0, 17, '12.2 / 13.1', 1),
  createData('Mike', 4, 5, 6, 221.0, 12, '12.2 / 13.1', 9),
  createData('Janani', 5, 5, 6, 219.2, 11, '12.2 / 13.1', 3),
  createData('Matt', 6, 5, 6, 212.4, 13, '12.2 / 13.1', 6),
  createData('David', 7, 5, 6, 212.6, 10.3, '12.2 / 13.1', 7),
  createData('Saran', 8, 5, 6, 212.2, 10.4, '12.2 / 13.1', 2),

];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
