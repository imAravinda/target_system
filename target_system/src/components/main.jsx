import { Grid } from "@mui/material";
import EmployeeTableViewComponent from "./Shared/table";
import ToolBar from "./Shared/toolBar";
import { useState } from "react";

const MainComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ToolBar onSearch={handleSearch} />
      </Grid>
      <Grid item xs={12} sx={{ margin: "3rem" }}>
        <EmployeeTableViewComponent searchQuery={searchQuery} />
      </Grid>
    </Grid>
  );
};

export default MainComponent;
