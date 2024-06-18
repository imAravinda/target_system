import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const initialState = {
  targets: [],
  loading: true,
  targetLoading: true,
  target: null,
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
        state.targets = [action.payload];
      }
    },
    updateTargetInState: (state, action) => {
      const updatedTarget = action.payload;
      const index = state.targets.findIndex(
        (target) => target.targetId === updatedTarget.targetId
      );
      if (index !== -1) {
        state.targets[index] = updatedTarget;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTargetLoading: (state, action) => {
      state.targetLoading = action.payload;
    },
  },
});

export const {
  setTargets,
  addTarget,
  setLoading,
  setTarget,
  setTargetLoading,
} = targetSlice.actions;

export const fetchTargets = () => async (dispatch) => {
  try {
    const status = "active";
    const response = await axios.get(`/targets/active-targets/${status}`);
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
    dispatch(setTarget(response.data.data));
    dispatch(setTargetLoading(false));
  } catch (error) {
    console.error("Failed to fetch target", error);
    dispatch(setTargetLoading(false));
  }
};

export const removeTarget = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/targets/deactive/${id}`);
    if (res.status === 200 || 201) {
      enqueueSnackbar(`${res.data.msg}`, {
        variant: "success",
      });
      dispatch(fetchTargets());
    } else {
      enqueueSnackbar(`${res.data.msg}`, {
        variant: "error",
      });
    }
  } catch (error) {
    enqueueSnackbar(`${error.message}`, {
      variant: "error",
    });
  }
};

export const createTarget = (newTarget) => async (dispatch) => {
  try {
    const res = await axios.post("/targets", newTarget);
    if (res.status === 200 || 201) {
      enqueueSnackbar(`${res.data.msg}`, {
        variant: "success",
      });
      dispatch(fetchTargets());
    } else {
      enqueueSnackbar(`${res.data.msg}`, {
        variant: "error",
      });
    }
  } catch (error) {
    enqueueSnackbar(`${error.message}`, {
      variant: "error",
    });
  }
};

export const updateTarget = (id, updateTarget) => async (dispatch) => {
  try {
    const res = await axios.patch(`/targets/${id}`, updateTarget);
    if (res.status === 200 || 201) {
      enqueueSnackbar(`${res.data.msg}`, {
        variant: "success",
      });
      dispatch(fetchTargets());
    } else {
      enqueueSnackbar(`${res.data.msg}`, {
        variant: "error",
      });
    }
  } catch (error) {
    enqueueSnackbar(`${error.message}`, {
      variant: "error",
    });
  }
};

export default targetSlice.reducer;
