import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  targets: [],
  loading: true,
  targetLoading:true,
  target:null
};

const targetSlice = createSlice({
  name: "targets",
  initialState,
  reducers: {
    setTargets: (state, action) => {
      state.targets = action.payload;
    },
    setTarget: (state, action) => {
      state.target = action.payload;
    },
    addTarget: (state, action) => {
      // Ensure targets is an array before pushing
      if (Array.isArray(state.targets)) {
        state.targets.push(action.payload);
      } else {
        // If targets is not an array, replace it with a new array containing the payload
        state.targets = [action.payload];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTargetLoading: (state, action) => {
      state.targetLoading = action.payload;
    }
  },
});

export const { setTargets, addTarget, setLoading, setTarget, setTargetLoading } = targetSlice.actions;

// Thunks
export const fetchTargets = () => async (dispatch) => {
  try {
    const status = "active";
    const response = await axios.get(`/targets/active-targets/${status}`);
    console.log(response.data.data);
    dispatch(setTargets(response.data.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Failed to fetch targets", error);
    dispatch(setLoading(false));
  }
};

export const fetchTargetById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/targets/${id}`);
    console.log(response);
    dispatch(setTarget(response.data.data));
    dispatch(setTargetLoading(false));
  } catch (error) {
    console.error("Failed to fetch target", error);
    dispatch(setTargetLoading(false));
  }
}

export const removeTarget = (id) => async (dispatch) => {
  try {
    await axios.patch(`/targets/deactive/${id}`);
    dispatch(fetchTargets());
  } catch (error) {
    console.log(error.message);
  }
}

export const createTarget = (newTarget) => async (dispatch) => {
  try {
   await axios.post("/targets", newTarget);
    // Ensure target_territories is initialized as an array if not present
    dispatch(fetchTargets());
  } catch (error) {
    console.error("Failed to create target", error);
  }
};

export const updateTarget = (id,updateTarget) => async (dispatch) => {
  try {
    await axios.patch(`/targets/${id}`);
    dispatch(fetchTargets());
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Failed to update target", error);
    dispatch(setLoading(false));
  }
}

export default targetSlice.reducer;
