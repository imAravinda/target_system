import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Grid,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { createTarget } from "../redux/target";
import { fetchAreas, fetchEmployees, fetchTerritories } from "../redux/data";

const AddTargetForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [tr_area_id, setSelecetedAreaId] = useState();
  const [designation, setDesignation] = useState("");
  const [t_emp_id, setEmpId] = useState();
  const [t_designation_id, setDesignationId] = useState();
  const [targetTerritories, setTargetTerritories] = useState([]);
  const targetTypes = ["Annually", "Monthly", "Quarterly"];
  const { employees, areas, territories } = useSelector(
    (state) => state.dataReducer
  );
  console.log(employees);
  useEffect(() => {
    dispatch(fetchEmployees);
    dispatch(fetchAreas);
  }, [dispatch]);

  useEffect(() => {
    if (tr_area_id) {
      dispatch(fetchTerritories(tr_area_id));
    }
  }, [dispatch, tr_area_id]);

  const handleTerritoryChange = (event, newValue) => {
    console.log(newValue);
    const newTerritories = newValue.map((territory) => ({
      territoryName: territory.territory_name,
      territoryId: territory.territoryId,
      target_value: "",
      target_type: "",
      dynamic_value: "",
      dynamicValues: [],
    }));
    const updatedTargetTerritories = newTerritories.map((newTerritory) => {
      console.log(newTerritory);
      const existingTerritory = targetTerritories.find(
        (t) => t.territoryId === newTerritory.territoryId
      );
      return existingTerritory || newTerritory;
    });

    setTargetTerritories(updatedTargetTerritories);
  };

  const handleTargetChange = (index, field, value) => {
    const newTargetTerritories = [...targetTerritories];
    newTargetTerritories[index][field] = value;

    if (field === "target_type") {
      let dynamicValues = [];
      if (value === "Monthly") {
        dynamicValues = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      } else if (value === "Quarterly") {
        dynamicValues = ["Q1", "Q2", "Q3", "Q4"];
      } else if (value === "Annually") {
        dynamicValues = ["2021", "2022", "2023", "2024", "2025"];
      }
      newTargetTerritories[index].dynamicValues = dynamicValues;
      newTargetTerritories[index].dynamic_value = "";
    }

    setTargetTerritories(newTargetTerritories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = {
      t_emp_id,
      t_designation_id,
      tr_area_id,
      target_territories: targetTerritories.map((territory) => ({
        territoryId: territory.territoryId,
        target_value: territory.target_value,
        target_type: territory.target_type,
        dynamic_value: territory.dynamic_value,
      })),
    };
    dispatch(createTarget(target));
    handleClose();
  };

  const resetForm = () => {
    setSelecetedAreaId(null);
    setDesignation("");
    setEmpId(null);
    setDesignationId(null);
    setTargetTerritories([]);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Add New Target</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={employees.data}
                    getOptionLabel={(option) => `${option.employee_name}`}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setEmpId(newValue.employee_id);
                        setDesignation(newValue.designation.designation_name);
                        setDesignationId(newValue.designation_id);
                      } else {
                        setEmpId(null);
                      }
                    }}
                    sx={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Employee" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Designation"
                    name="designation"
                    value={designation}
                    sx={{ width: 500 }}
                    required
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={areas.data}
                    getOptionLabel={(option) => `${option.area_name}`}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelecetedAreaId(newValue.area_id);
                      } else {
                        setSelecetedAreaId(null);
                      }
                    }}
                    sx={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Area" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {territories !== undefined ? (
                    <Autocomplete
                      multiple
                      id="territory-select"
                      options={territories}
                      getOptionLabel={(option) => `${option.territory_name}`}
                      onChange={handleTerritoryChange}
                      sx={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Territories" />
                      )}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {targetTerritories.map((territory, index) => {
                console.log(territory);
                return (
                  <Grid
                    container
                    spacing={2}
                    key={index}
                    sx={{ marginBottom: "20px" }}
                  >
                    <Grid item xs={4}>
                      <TextField
                        label="Territory"
                        value={territory.territoryName}
                        sx={{ width: 350 }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Autocomplete
                        id="target-type"
                        options={targetTypes}
                        getOptionLabel={(option) => `${option}`}
                        onChange={(e, newValue) =>
                          handleTargetChange(index, "target_type", newValue)
                        }
                        sx={{ width: 350 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Target Type" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {territory.target_type !== "" ? (
                        <Autocomplete
                          options={territory.dynamicValues || []}
                          value={territory.dynamic_value}
                          onChange={(event, newValue) =>
                            handleTargetChange(index, "dynamic_value", newValue)
                          }
                          sx={{ width: 350 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Dynamic Value" />
                          )}
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs={3}>
                      {territory.dynamic_value !== "" ? (
                        <TextField
                          label="Target Value"
                          value={territory.target_value}
                          onChange={(e) =>
                            handleTargetChange(
                              index,
                              "target_value",
                              e.target.value
                            )
                          }
                          sx={{ width: 350 }}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTargetForm;
