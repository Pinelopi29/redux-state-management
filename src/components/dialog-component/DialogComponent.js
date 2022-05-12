import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./DialogComponent.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers, selectProjects } from "../view-projects/ProjectsSlice";

function DialogComponent(props) {
  const users = useSelector(selectUsers);
  const projects = useSelector(selectProjects);

  const [open, setOpen] = React.useState(false);
  const [projectId, setProjectId] = React.useState(1);
  const [ownerId, setOwnerId] = React.useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const [owner, setOwner] = React.useState(
    props.projectOnwer ? props.projectOnwer : ""
  );

  const handleChange = (event) => {
    setOwner(event.target.value);
  };

  return (
    <div className="container">
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.buttonTitle}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form
          onSubmit={(event) => {
            if (props.form == "createProject") {
              dispatch(
                props.addProjectHandle({
                  name: event.target[0].value,
                  description: event.target[1].value,
                  owner: event.target[2].value,
                  id: projectId,
                })
              );
              setProjectId(projectId + 1);
            } else if (props.form == "createUser") {
              if (users.some((e) => e.email === event.target[1].value)) {
                alert("Email already used");
              } else {
                dispatch(
                  props.addProjectHandle({
                    name: event.target[0].value,
                    email: event.target[1].value,
                    id: ownerId,
                  })
                );
                setOwnerId(ownerId + 1);
              }
            } else if (props.form == "editProject") {
              dispatch(
                props.addProjectHandle({
                  name: event.target[0].value,
                  description: event.target[1].value,
                  owner: owner,
                  id: props.projectId,
                })
              );
            }
            event.preventDefault();
            handleClose();
          }}
        >
          <DialogTitle>{props.buttonTitle}</DialogTitle>
          <DialogContent>
            {props.fields.map((item, i) => {
              if (item == "Owner") {
                if (props.users.length > 0) {
                  console.log(props.projectOnwer);
                  return (
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Owner
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label={owner}
                          value={owner}
                          onChange={handleChange}
                        >
                          {props.users.map((user) => (
                            <MenuItem value={user.name}>{user.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  );
                } else {
                  return (
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Owner
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={owner}
                          label={owner}
                          onChange={handleChange}
                        >
                          <MenuItem>No users available</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  );
                }
              } else {
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    id={item}
                    label={item}
                    defaultValue={
                      props.projectId
                        ? projects.find((x) => x.id === props.projectId)[
                            item.toLowerCase()
                          ]
                        : ""
                    }
                    type={item}
                    fullWidth
                    variant="standard"
                  />
                );
              }
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{props.buttonTitle}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default DialogComponent;
