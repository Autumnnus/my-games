import SearchIcon from "@mui/icons-material/Search"
import { IconButton, InputAdornment, TextField } from "@mui/material"

import { Translate } from "types/translate"

export default function SearchBar({ translate }: { translate: Translate }) {
  return (
    <TextField
      label={translate("search")}
      type="search"
      variant="filled"
      sx={{ bgcolor: "white" }}
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
  )
}
