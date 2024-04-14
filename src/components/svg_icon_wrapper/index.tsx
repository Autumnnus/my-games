import type { IconProps } from "@mui/material/Icon"
import Icon from "@mui/material/Icon"

export default function IconWrapper(props: IconProps) {
  return (
    <Icon
      {...props}
      sx={{
        width: "1.4rem",
        height: "1.4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...props?.sx
      }}
    />
  )
}
