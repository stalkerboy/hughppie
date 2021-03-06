import React from "react";
import { FormControl, Card, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));

export const ActionResult = props => {
  const classes = useStyles();
  const { curState } = props;
  return (
    <Card>
      <Typography variant="h5" component="span" style={{ margin: 10 }}>
        {curState.day - 1} 일 {curState.hour ? curState.hour + "시간 경과" : null}
      </Typography>
      <FormControl className={classes.formControl} style={{ display: "flex" }}>
        과학력 : {curState.science} &nbsp; 환력 : {curState.spirit} &nbsp; 정보력 : {curState.information}
      </FormControl>
      <FormControl className={classes.formControl} style={{ display: "inline-block" }}>
        지역 :<br />
        {curState.region.map((s, index) => (
          <FormControl key={index} className={classes.formControl}>
            <Paper key={index} elevation={4} style={{ padding: 10, maxWidth: 200, minWidth: 150 }}>
              {s.split("\n").map((line, i) => {
                return (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                );
              })}
            </Paper>
          </FormControl>
        ))}
      </FormControl>
      <br />
      <FormControl className={classes.formControl} style={{ display: "inline-block" }}>
        신기사 :<br />
        {curState.knights.map((s, index) => (
          <FormControl key={index} className={classes.formControl}>
            <Paper key={index} elevation={4} style={{ padding: 10, maxWidth: 200, minWidth: 150 }}>
              {s.split("\n").map((line, i) => {
                return (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                );
              })}
            </Paper>
          </FormControl>
        ))}
      </FormControl>
      <br />
      <br />
    </Card>
  );
};
