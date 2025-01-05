// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import StudentMainPage from "./StudentMainPage";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemText variant="h4" primary="Student" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Student Management System
        </Typography>
        <Container maxWidth="lg">
          <StudentMainPage />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
