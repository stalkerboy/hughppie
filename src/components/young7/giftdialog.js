import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { KnightData } from "./simulater/data";
import { CardGiftcard } from "@material-ui/icons";

export default function GiftDialog(props) {
  const { curWorld } = props;
  const [knightGiftList, setknightGiftList] = useState([]);
  const [curKnight, setCurKnight] = useState("");
  const [open, setOpen] = React.useState(false);

  const knightsNames = Object.keys(KnightData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setknightGiftList([]);
    setCurKnight("");
    setOpen(false);
  };

  return (
    <>
      <FormControl style={{ margin: 0 }}>
        <Button color="primary" size="large" style={{ width: 60, marginTop: 15, marginLeft: 0, paddingLeft: 0, paddingRight: 0 }} onClick={handleClickOpen}>
          <CardGiftcard />
          선물
        </Button>
      </FormControl>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">신기사 선물</DialogTitle>
        <DialogContent dividers={true}>
          <div style={{ display: "flex", width: 400 }} />
          <FormControl style={{ margin: 15, display: "flex" }}>
            <Autocomplete
              id="tags-outlined-gift"
              options={knightsNames.sort()}
              defaultValue={""}
              filterSelectedOptions
              onChange={(_, value) => {
                setCurKnight(value);
                if (value) setknightGiftList(curWorld.knights[value].gifts);
                else {
                  setknightGiftList([]);
                  return;
                }
              }}
              renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" color="primary" label={option} {...getTagProps({ index })} />)}
              renderInput={params => <TextField {...params} variant="outlined" label="신기사" placeholder="신기사" />}
            />
          </FormControl>

          <FormControl style={{ margin: 15, display: "flex" }}>
            <Autocomplete
              id="tags-outlined-gift"
              multiple
              options={[2, 5, 8]}
              getOptionLabel={option => option}
              getOptionSelected={() => curWorld.knights[curKnight].gifts.length >= 5}
              value={knightGiftList}
              filterSelectedOptions
              onChange={(_, value) => {
                setknightGiftList(value);
                curWorld.knights[curKnight].gifts = value;
                // (curWorld.knights.gifts = value.length ? value : [])
              }}
              renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" color="primary" label={option} {...getTagProps({ index })} />)}
              renderInput={params => <TextField {...params} variant="outlined" label="호감도선물" placeholder="호감도선물" />}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
