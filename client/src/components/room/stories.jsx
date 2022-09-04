import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Tooltip,
} from "@mui/material";

import { Box } from "@mui/system";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useMemo, useState, useEffect } from "react";

function Stories({ room_id }) {
  const tableStyle = {
    width: "70%",
    margin: "auto",
    marginTop: "50px",
  };

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [stories, setStories] = useState(null);
  const { player } = useAuthContext();

  const story = useMemo(() => {
    return { title, room_id };
  }, [title, room_id]);

  useEffect(() => {
    const fetchStories = async () => {
      await fetch(`http://localhost:5000/api/stories/${room_id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setStories(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchStories();
  }, [player, room_id, story]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCreate = async () => {
    if (!player) {
      return;
    }
    await fetch("http://localhost:5000/api/stories", {
      method: "POST",
      body: JSON.stringify(story),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${player.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setTitle("");
    handleClose();
  };

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="roomDetails">
      <Box sx={{ width: "60%", typography: "body1" }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpen}
          style={{ position: "relative", top: "80px", left: "800px" }}
        >
          <Tooltip title="Add Story">
            <AddIcon />
          </Tooltip>
        </Fab>

        <TabContext value={value}>
          <TableContainer component={Paper} style={tableStyle}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontWeight: "bold" }}>
                <TableRow>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Active Stories" value="1" />
                    <Tab label="Completed Stories" value="2" />
                    <Tab label="All Stories" value="3" />
                  </TabList>
                </TableRow>
              </TableHead>

              <TabPanel value="1">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead sx={{ fontWeight: "bold" }}>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="center">Estimation</TableCell>
                      <TableCell align="center">Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stories &&
                      stories.map((story) => (
                        <TableRow key={story._id}>
                          <TableCell component="th" scope="row">
                            {story.title}
                          </TableCell>
                          <TableCell align="center"> - </TableCell>
                          <TableCell align="center"> - </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </Table>
          </TableContainer>
        </TabContext>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "40%",
            height: "35%",
            position: "fixed",
            top: 100,
            m: 0,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontSize: 27 }}>
          Create New Story
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Story Name"
            type="text  "
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Stories;
