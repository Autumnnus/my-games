import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack
} from "@mui/material"

import GameDataTable from "@components/data_table/game_data_table"
import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import { useGamesPageContext } from "context/games"

export const GamesPage = () => {
  const { games } = useGamesPageContext()
  return (
    <Box px={5} py={2}>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        sx={{ backgroundColor: TABLE_ROW_BACKGROUND_COLOR, p: 2 }}
      >
        <Box fontSize={24} fontWeight="bold">
          Games
        </Box>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton>
            <AddCircleOutlineIcon sx={{ width: "40px", height: "40px" }} />
          </IconButton>
          <FormControl
            sx={{
              m: 1,
              width: "25ch",
              background: TABLE_HEADER_BACKGROUND_COLOR
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              type="text"
              startAdornment={
                <InputAdornment position="start">
                  <IconButton aria-label="search" edge="start"></IconButton>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {}}
                    edge="end"
                  ></IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Stack>
      </Stack>
      <GameDataTable games={games} />
    </Box>
  )
}
