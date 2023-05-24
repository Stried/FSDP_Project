import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

function UserCreateAccount() {

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Account Creation
      </Typography>
      <Box component={"form"} sx={{ width: "50%", border: "none" }}>
        <TextField
          sx={{  }}
          variant="standard"
          fullWidth
          margin="normal"
          autoComplete="off"
          type="text"
          required
          helperText="Full Name"
          label="Full Name"
          name="fullName"
          focused
          color="success"
        />
        <TextField
          sx={{  }}
          variant="standard"
          fullWidth
          margin="normal"
          autoComplete="off"
          type="text"
          required
          helperText="Username"
          label="Username"
          name="username"
          focused
          color="success"
        />
      </Box>
    </Box>
  );
}

export default UserCreateAccount