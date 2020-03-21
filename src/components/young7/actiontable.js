import React from "react";
import { Card, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { RegionData } from "./simulater/data";

export const ActionTable = props => {
  const { allActions } = props;
  return (
    <Card>
      <TableContainer component={Paper} style={{ margin: 0 }}>
        {allActions.map((_, i) => {
          if (i % 12 === 0)
            return (
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow key={i + "header"}>
                    <TableCell padding="none" align="center" key={"head" + i + "day"} colSpan={5}>
                      {parseInt(i / 12) + 1} 일차
                    </TableCell>
                  </TableRow>
                  <TableRow key={i + "headerRow"} style={{ background: "gray" }}>
                    <TableCell padding="none" align="center" key={"head" + i + "1"} style={{ width: 40 }}>
                      시간
                    </TableCell>
                    <TableCell padding="none" align="center" key={"head" + i + "2"} style={{ width: 60 }}>
                      지역상세
                    </TableCell>
                    <TableCell padding="none" align="center" key={"head" + i + "3"} style={{ width: 100 }}>
                      타입
                    </TableCell>
                    <TableCell padding="none" align="center" key={"head" + i + "5"}>
                      신기사
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allActions.slice(i, i * 12 + 12).map((action, hour) => (
                    <TableRow key={hour}>
                      <TableCell padding="none" align="center" key={i + hour + "1"} style={{ width: 40 }}>
                        {9 + hour}:00
                      </TableCell>
                      <TableCell padding="none" align="center" key={i + hour + "2"} style={{ width: 60 }}>
                        {RegionData[action.regionNo].name}
                      </TableCell>
                      <TableCell padding="none" align="center" key={i + hour + "3"} style={{ width: 40 }}>
                        {action.type === "fight" ? "전투" : action.type === "build" ? "건설" : action.type === "patrol" ? "순찰" : "개발"}{" "}
                        {action.typeDesc === "knights" ? action.typeDesc + " " + action.target : action.typeDesc}
                      </TableCell>
                      <TableCell padding="none" align="left" key={i + hour + "5"}>
                        {action.knights.map((name, i) => (i === action.knights.length - 1 ? name : name + ", "))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <br />
              </Table>
            );
          else return null;
        })}
      </TableContainer>
    </Card>
  );
};
