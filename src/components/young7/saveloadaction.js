import React from "react";
import { Button } from "@material-ui/core";
import * as Icon from "@material-ui/icons";
import { ActionAlert } from "./actionalert";

export function SaveLoadAction(props) {
  const { curWorld, allActions, loadData } = props;

  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleClickOpen = async type => {
    if (type === "save") {
      const gifts = Object.keys(curWorld.knights)
        .filter(name => curWorld.knights[name].gifts && curWorld.knights[name].gifts.length)
        .reduce((acc, name) => {
          acc[name] = curWorld.knights[name].gifts;
          return acc;
        }, {});
      const ramen = curWorld.ramenHistory;

      const fileName = "file";
      const json = JSON.stringify({ gifts, actions: [...allActions], ramen });
      const blob = new Blob([json], { type: "application/json" });
      const href = await URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      document.getElementById("selectImage").click();
    }
  };

  const setFile = event => {
    const fileReader = new FileReader();
    fileReader.onloadend = e => {
      const content = e.target.result;
      const isValid = loadData(content);
      if (!isValid) {
        setSnackOpen(true);
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button variant="outlined" color="primary" startIcon={<Icon.Save />} style={{ margin: 15, width: 160 }} onClick={() => handleClickOpen("save")}>
        Save
      </Button>
      <Button variant="outlined" color="primary" startIcon={<Icon.CloudUpload />} style={{ margin: 15, width: 160 }} onClick={() => handleClickOpen("load")}>
        Load
      </Button>
      <input type="file" id="selectImage" onChange={setFile} hidden></input>
      <ActionAlert alertOpen={snackOpen} setAlertOpen={setSnackOpen} text="잘못된 데이터 파일입니다." />
    </div>
  );
}
