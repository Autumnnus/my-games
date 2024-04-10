import type { LinkProps as MUILinkProps } from "@mui/material"
import MUILink from "@mui/material/Link"

type LinkProps = MUILinkProps & { bold?: boolean }

export default function Link(props: LinkProps) {
  return (
    <MUILink
      {...props}
      sx={{
        textDecoration: "none",
        color: "inherit",
        fontWeight: props?.bold ? "bold" : "normal",
        ...props?.sx
      }}
    />
  )
}
