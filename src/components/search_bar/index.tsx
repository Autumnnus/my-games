import SearchIcon from "@mui/icons-material/Search"
import { Box, IconButton, InputAdornment, TextField } from "@mui/material"

import { SECONDARY } from "@constants/colors"
import { Translate } from "types/translate"

export default function SearchBar({ translate }: { translate: Translate }) {
  return (
    <Box sx={{ bgcolor: SECONDARY, p: 1, borderRadius: 2 }}>
      <TextField
        label={translate("search")}
        type="search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {}}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Box>
  )
}
