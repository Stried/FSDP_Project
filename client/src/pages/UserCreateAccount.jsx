import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import "./../App.css";

function UserCreateAccount() {
  return (
    <Box>
      <Button variant="contained" className="">
        Test
      </Button>
      <Typography className="text-red-400">Account Creation</Typography>
      <Box component={"form"} sx={{ width: "50%" }}>
        <TextField
          className="tw-border-green-400"
          sx={{}}
          variant="standard"
          fullWidth
          margin="normal"
          autoComplete="off"
          type="text"
          required
          label="Full Name"
          name="fullName"
          focused
          color="success"
        />
        <TextField
          sx={{}}
          variant="standard"
          fullWidth
          margin="normal"
          autoComplete="off"
          type="text"
          required
          label="Username"
          name="username"
          focused
          color="success"
        />
      </Box>
    </Box>
  );
}

export default UserCreateAccount;
