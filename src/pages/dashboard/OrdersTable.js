import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// import {useNavigate} from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { getAllClientApi, deleteClientApi } from 'apiservices/Api';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Swal from 'sweetalert2';
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'fat',
    align: 'left',
    disablePadding: false,
    label: 'Email-ID'
  },
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: 'Location'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'protein',
    align: 'left',
    disablePadding: false,
    label: 'Actions'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Active';
      break;
    case 2:
      color = 'error';
      title = 'Inactive';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  // const navigate = useNavigate();

  // const navigateToClientdetails = () => {
  //   // 👇️ navigate to /contacts
  //   navigate('clientlist/clientdetails');
  // };

  const [clientList, setClientList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientList = async () => {
      try {
        const list = await getAllClientApi(); // Await the Promise
        setClientList(list.data);
        console.log(list);
        console.log(clientList);
      } catch (error) {
        setError(error); // Handle API call errors
        console.error('Error fetching client details:', error);
      }
    };

    fetchClientList();
  }, []);

  const handleDelete = async (clientId) => {
    try {
      // Show a confirmation dialog
      const result = await Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this client?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      // If the user confirms the deletion
      if (result.isConfirmed) {
        // Call the deleteClientApi function here
        await deleteClientApi(clientId);
        setClientList((prevClientList) => prevClientList.filter((client) => client.id !== clientId));
        Swal.fire('Deleted!', 'The client has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      // Handle the error if needed
    }
  };
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {/* {stableSort(rows, getComparator(order, orderBy)).map((row, index) => { */}
            {clientList.length === 0 ? ( // Check if clientList is empty
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {error ? 'Error fetching data' : 'No clients available'}
                </TableCell>
              </TableRow>
            ) : (
              clientList &&
              clientList.map((row, index) => {
                const isItemSelected = isSelected(row.trackingNo);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="left">
                      <Link color="primary" component={RouterLink} to={`/clientlist/clientdetails/${row.id}`}>
                        {row.name}
                      </Link>
                    </TableCell>

                    {/* <TableCell align="left">{row.name}</TableCell> */}
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.location}</TableCell>
                    <TableCell align="left">
                      <OrderStatus status={row.active == true ? 1 : 2} />
                    </TableCell>
                    <TableCell align="left">
                      <IconButton
                        onClick={() => handleDelete(row.id)} // Replace with your delete function
                        color="error"
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
