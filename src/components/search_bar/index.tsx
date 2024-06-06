import SearchIcon from "@mui/icons-material/Search"
import { IconButton, InputAdornment, TextField } from "@mui/material"

import useTranslate from "@hooks/use_translate"

export default function SearchBar() {
  const { translate } = useTranslate()
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
              <SearchIcon sx={{ color: "black" }} />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}
