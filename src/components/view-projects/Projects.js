import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addProject,
  editProject,
  selectProjects,
  selectUsers,
  addUser,
} from "./ProjectsSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogComponent from "../dialog-component/DialogComponent";
import "./Projects.css";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function Projects() {
  const projects = useSelector(selectProjects);
  const users = useSelector(selectUsers);
  const classes = useStyles();

  useEffect(() => {
    setRows(projects);
  }, [projects]);

  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState(projects);

  const requestSearch = (searchedVal) => {
    const filteredRows = projects.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.description.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div className="container">
      {projects.length > 0 ? (
        <Paper>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Owner</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.owner}</TableCell>
                    <TableCell align="left">
                      <DialogComponent
                        buttonTitle="Edit Project"
                        form="editProject"
                        fields={["Name", "Description", "Owner"]}
                        projectId={row.id}
                        projectOnwer={row.owner}
                        addProjectHandle={editProject}
                        users={users}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <h1>No projects to show</h1>
      )}

      <div className="buttons-container">
        <DialogComponent
          buttonTitle="Create Project"
          form="createProject"
          fields={["Name", "Description", "Owner"]}
          addProjectHandle={addProject}
          users={users}
        />
        <DialogComponent
          buttonTitle="Create User"
          form="createUser"
          fields={["Name", "Email"]}
          addProjectHandle={addUser}
        />
      </div>
    </div>
  );
}
