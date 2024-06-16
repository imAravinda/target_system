import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employees: [],
  areas: [],
  territories: [],
  loading: true,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setAreas: (state, action) => {
      state.areas = action.payload;
    },
    setTerritories: (state, action) => {
      state.territories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { setEmployees, setAreas, setTerritories, setLoading } = dataSlice.actions;

export const fetchEmployees = async (dispatch) => {
  try {
    const response = await axios.get("/employees");
    dispatch(setEmployees(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error.message);
    dispatch(setLoading(false));
  }
}


export const fetchAreas = async (dispatch) => {
  try {
    const response = await axios.get("/areas");
    dispatch(setAreas(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error.message);
    dispatch(setLoading(false));
  }
}

export const fetchTerritories = (areaId) => async (dispatch) => {
  try {
    const response = await axios.get(`/territories/area/${areaId}`);
    console.log(response);
    dispatch(setTerritories(response.data.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error.message);
    dispatch(setLoading(false));
  }
};

export default dataSlice.reducer;
