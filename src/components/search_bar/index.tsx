import SearchIcon from "@mui/icons-material/Search"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useRef } from "react"

import useTranslate from "@hooks/use_translate"

export default function SearchBar({
  onClick
}: {
  onClick: (search: string) => void
}) {
  const { translate } = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <TextField
      label={translate("search")}
      type="search"
      variant="filled"
      inputRef={inputRef}
      inputProps={{ style: { color: "black" } }}
      sx={{ bgcolor: "white" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => onClick(inputRef?.current?.value || "")}
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
