import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Dialog,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  RemoveRedEye as RemoveRedEyeIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTargetById, fetchTargets, removeTarget } from "../redux/target";
import UpdateTargetForm from "./updateForm";

const EmployeeTableViewComponent = ({ searchQuery }) => {
  const [open, setOpen] = useState({});
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedTargetId, setSelectedTargetId] = useState(null);

  const dispatch = useDispatch();
  const { targets, target, loading, targetLoading } = useSelector(
    (state) => state.targetReducer
  );

  useEffect(() => {
    dispatch(fetchTargets());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTargetId !== null && !targetLoading && target !== null) {
      setUpdateDialogOpen(true);
    }
  }, [selectedTargetId, targetLoading, target]);

  const handleClick = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  const handleRemoveTarget = (id) => {
    dispatch(removeTarget(id));
  };

  const handleUpdateDialogOpen = (id) => {
    setSelectedTargetId(id);
    dispatch(fetchTargetById(id));
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
    setSelectedTargetId(null);
  };

  const filteredTargets = targets.filter((target) => {
    console.log(target);
    const searchString = searchQuery;
    return (
      target.targetId.toString().includes(searchString) ||
      target.employeeName.toLowerCase().includes(searchString) ||
      target.areaName.toLowerCase().includes(searchString) ||
      target.target_territories.some((territory) =>
        territory.territory_name.toLowerCase().includes(searchString)
      )
    );
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Target id</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell>Area Name</TableCell>
            <TableCell>Territories</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTargets.length !== 0 && searchQuery !== ""
            ? filteredTargets.map((item) => (
                <Fragment key={item.targetId}>
                  <TableRow>
                    <TableCell>{item.targetId}</TableCell>
                    <TableCell>{item.employeeName}</TableCell>
                    <TableCell>{item.areaName}</TableCell>
                    <TableCell>
                      {item.target_territories?.map((territory) => (
                        <div key={territory.territoryId}>
                          {territory.territory_name} - {territory.target_value}{" "}
                          ({territory.target_type})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleClick(item.targetId)}
                      >
                        {open[item.targetId] ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<RemoveRedEyeIcon />}
                        onClick={() => handleUpdateDialogOpen(item.targetId)}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleRemoveTarget(item.targetId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={4}
                    >
                      <Collapse
                        in={open[item.targetId]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <Table size="small" aria-label="territories">
                            <TableHead>
                              <TableRow>
                                <TableCell>Territory Name</TableCell>
                                <TableCell>Target Value</TableCell>
                                <TableCell>Target Type</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {item.target_territories?.map((territory) => (
                                <TableRow key={territory.territoryId}>
                                  <TableCell>
                                    {territory.territory_name}
                                  </TableCell>
                                  <TableCell>
                                    {territory.target_value}
                                  </TableCell>
                                  <TableCell>{territory.target_type}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))
            : targets.map((item) => (
                <Fragment key={item.targetId}>
                  <TableRow>
                    <TableCell>{item.targetId}</TableCell>
                    <TableCell>{item.employeeName}</TableCell>
                    <TableCell>{item.areaName}</TableCell>
                    <TableCell>
                      {item.target_territories?.map((territory) => (
                        <div key={territory.territoryId}>
                          {territory.territory_name} - {territory.target_value}{" "}
                          ({territory.target_type})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleClick(item.targetId)}
                      >
                        {open[item.targetId] ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<RemoveRedEyeIcon />}
                        onClick={() => handleUpdateDialogOpen(item.targetId)}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleRemoveTarget(item.targetId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={4}
                    >
                      <Collapse
                        in={open[item.targetId]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <Table size="small" aria-label="territories">
                            <TableHead>
                              <TableRow>
                                <TableCell>Territory Name</TableCell>
                                <TableCell>Target Value</TableCell>
                                <TableCell>Target Type</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {item.target_territories?.map((territory) => (
                                <TableRow key={territory.territoryId}>
                                  <TableCell>
                                    {territory.territory_name}
                                  </TableCell>
                                  <TableCell>
                                    {territory.target_value}
                                  </TableCell>
                                  <TableCell>{territory.target_type}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
        </TableBody>
      </Table>
      <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
        {selectedTargetId && (
          <UpdateTargetForm
            open={updateDialogOpen}
            onClose={handleUpdateDialogClose}
            id={selectedTargetId}
          />
        )}
      </Dialog>
    </TableContainer>
  );
};

export default EmployeeTableViewComponent;
