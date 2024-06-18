import { Box, styled } from "@mui/material"
import type { SwitchProps } from "@mui/material/Switch"
import Switch from "@mui/material/Switch"
import type { Control, FieldPath, FieldValues, Path } from "react-hook-form"
import { Controller } from "react-hook-form"

type ControlledSwitchProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
} & SwitchProps

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 23,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    })
  }
}))

const ControlledSwitch = <T extends FieldValues>({
  name,
  control,
  ...rest
}: ControlledSwitchProps<T>) => (
  <Controller
    name={name as Path<T>}
    control={control}
    render={({ field: { onChange, value } }) => (
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          "& .icon": {
            position: "absolute",
            top: -7,
            right: -7,
            zIndex: 2
          }
        }}
      >
        <StyledSwitch
          focusVisibleClassName=".Mui-focusVisible"
          disableRipple
          checked={value as boolean}
          onChange={(event) => onChange(event.target.checked)}
          {...rest}
        />
      </Box>
    )}
  />
)

export default ControlledSwitch
