import type { SxProps } from "@mui/material"

const imageSideContainer = (image?: string): SxProps => ({
  backgroundImage: `url(${image})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center"
})

const inputSideContainer: SxProps = {
  my: 8,
  mx: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

export default { inputSideContainer, imageSideContainer }
