import type { LoadingButtonProps } from "@mui/lab/LoadingButton"
import LoadingButton from "@mui/lab/LoadingButton"
import { type SxProps, type Theme } from "@mui/material"

export default function Button(props: LoadingButtonProps) {
  return (
    <LoadingButton
      variant="contained"
      loadingPosition="start"
      {...props}
      sx={
        ((theme: Theme) => {
          let backgroundColor: string = theme.palette.primary.main

          if (props?.color && props?.color !== "inherit") {
            if (
              Object.prototype.hasOwnProperty.call(theme.palette, props.color)
            ) {
              backgroundColor = theme.palette[props.color].main
            }
          }

          return {
            "&.Mui-disabled": {
              backgroundColor,
              opacity: 0.5,
              color: [
                theme.palette.primary.main,
                theme.palette.error.main
              ].includes(backgroundColor)
                ? "white"
                : "none"
            },
            boxShadow: "none",
            borderRadius: 1.6,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: props?.loading ? "flex" : "inline-block",
            width: props?.fullWidth ? "100%" : undefined,
            minWidth: "9rem",
            overflow: "hidden",
            "& .MuiButton-label": {
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "block"
            },
            ...props?.sx
          }
        }) as unknown as SxProps
      }
    />
  )
}
