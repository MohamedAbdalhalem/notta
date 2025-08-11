import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


export default function SelectMode({mode,setMode} : {mode :"light" | "dark" | "system" | undefined,setMode : (mode: ("light" | "dark" | "system") | null) => void}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect
          value={mode}
          inputProps={{
            name: 'mode',
            id: 'uncontrolled-native',
                  }}
                  onChange={(event) => {
        setMode(event.target.value as 'light' | 'dark' | 'system' );
      }}
        >
          
          <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
