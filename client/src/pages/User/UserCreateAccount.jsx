import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

function UserCreateAccount() {

  return (
      <Box>
          <Typography variant="h5" sx={{ my: 2 }}>
              Account Creation
          </Typography>
          <Box component={"form"} sx={{width: "50%"}}>
              <TextField
                  variant="standard"
                  fullWidth margin='normal' autoComplete='off' type="text"
                  required helperText="Full Name"
                  label="Full Name" name="fullName"
              />
          </Box>
      </Box>
  )
}

export default UserCreateAccount