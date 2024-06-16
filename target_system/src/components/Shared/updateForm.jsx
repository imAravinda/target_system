import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Grid,
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { fetchTargetById, updateTarget } from "../redux/target";
import { fetchAreas, fetchEmployees, fetchTerritories } from "../redux/data";

const UpdateTargetForm = ({ open, onClose, id }) => {
  const dispatch = useDispatch();
  const { target, loading } = useSelector((state) => state.targetReducer);
  const { employees, areas, territories } = useSelector(
    (state) => state.dataReducer
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchTargetById(id));
    }
  }, [dispatch, id]);

  const [tr_area_id, setSelectedAreaId] = useState(null);
  const [designation, setDesignation] = useState("");
  const [t_emp_id, setEmpId] = useState(null);
  const [t_designation_id, setDesignationId] = useState(null);
  const [targetTerritories, setTargetTerritories] = useState([]);

  const targetTypes = ["Annually", "Monthly", "Quarterly"];

  useEffect(() => {
    dispatch(fetchEmployees);
    dispatch(fetchAreas);
  }, [dispatch]);

  useEffect(() => {
    if (tr_area_id) {
      dispatch(fetchTerritories(tr_area_id));
    }
  }, [dispatch, tr_area_id]);

  useEffect(() => {
    if (target) {
      setSelectedAreaId(target.tr_area_id);
      setDesignation(target.designation);
      setEmpId(target.t_emp_id);
      setDesignationId(target.t_designation_id);
      setTargetTerritories(target.target_territories || []);
    }
  }, [target]);

  const handleTerritoryChange = (event, newValue) => {
    const newTerritories = newValue.map((territory) => ({
      territory_name: territory.territory_name,
      territoryId: territory.territoryId,
      target_value: "",
      target_type: "",
      dynamic_value: "",
      dynamicValues: [],
    }));
    setTargetTerritories(newTerritories);
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
    const updatedTarget = {
      ...target,
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
    dispatch(updateTarget(updatedTarget));
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Edit Target</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="combo-box-employee"
                    options={employees.data}
                    getOptionLabel={(option) => `${option.employee_name}`}
                    value={
                      employees.data.find(
                        (emp) => emp.employee_id === t_emp_id
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setEmpId(newValue.employee_id);
                        setDesignation(newValue.designation.designation_name);
                        setDesignationId(newValue.designation_id);
                      } else {
                        setEmpId(null);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Employee" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Designation"
                    value={designation}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    id="combo-box-area"
                    options={areas.data}
                    getOptionLabel={(option) => `${option.area_name}`}
                    value={
                      areas.data.find((area) => area.area_id === tr_area_id) ||
                      null
                    }
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelectedAreaId(newValue.area_id);
                      } else {
                        setSelectedAreaId(null);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Area" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {territories && (
                    <Autocomplete
                      multiple
                      id="territory-select"
                      options={territories}
                      getOptionLabel={(option) => `${option.territory_name}`}
                      value={territories.filter((territory) =>
                        targetTerritories.some(
                          (tt) => tt.territoryId === territory.territoryId
                        )
                      )}
                      onChange={handleTerritoryChange}
                      renderInput={(params) => (
                        <TextField {...params} label="Territories" />
                      )}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {targetTerritories.map((territory, index) => (
                <Grid container spacing={2} key={territory.territoryId}>
                  <Grid item xs={4}>
                    <TextField
                      label="Territory"
                      value={territory.territory_name}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
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
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      id="target-type"
                      options={targetTypes}
                      getOptionLabel={(option) => `${option}`}
                      value={territory.target_type || ""}
                      onChange={(event, newValue) => {
                        handleTargetChange(index, "target_type", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Target Type" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    {territory.target_type && (
                      <Autocomplete
                        options={territory.dynamicValues || []}
                        value={territory.dynamic_value}
                        onChange={(event, newValue) =>
                          handleTargetChange(index, "dynamic_value", newValue)
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Dynamic Value" />
                        )}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTargetForm;
