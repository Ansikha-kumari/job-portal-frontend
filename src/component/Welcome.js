import { Grid, Typography } from "@material-ui/core";

const Welcome = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh", background : "url(https://www.cms.gov/sites/default/files/2022-09/InflationReductionActWe%27reHiring.jpg)", backgroundSize: "100% 100%",color: "rgb(255, 255, 0, 1)" }}
    >
      <Grid item>
        <Typography variant="h2">Welcome to Job Portal</Typography>
      </Grid>
    </Grid>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
