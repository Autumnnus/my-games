import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Divider from "@mui/material/Divider"
import { useCallback } from "react"

import Button from "@components/button"
import styles from "@components/dialog_provider/styles"

type DialogActionButtonProps = {
  text: string
  color: "primary" | "error" | "secondary"
  onClick?: () => void | Promise<void>
  loading?: boolean
  disabled?: boolean
}

type DialogPropviderProps = {
  title: string
  isOpen: boolean
  setClose: () => void | Promise<void>
  children: JSX.Element
  leftButton?: DialogActionButtonProps
  rightButton?: DialogActionButtonProps
  size: "small" | "medium" | "large"
}

const responsiveWidth = {
  small: ["100vw", "30rem"],
  medium: ["100vw", "40rem"],
  large: ["100vw", "50rem"]
}

export default function DialogProvider({
  title,
  isOpen,
  setClose,
  children,
  leftButton,
  rightButton,
  size = "medium"
}: DialogPropviderProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={setClose}
        PaperProps={{
          sx: {
            ...styles.dialogPaperProps,
            width: responsiveWidth[size]
          }
        }}
      >
        <DialogTitle sx={styles.dialogTitle}>{title}</DialogTitle>
        <Divider sx={styles.dialogDivider} />
        <DialogContent sx={styles.dialogContent}>{children}</DialogContent>
        <Divider sx={styles.dialogDivider} />
        <DialogActionArea leftButton={leftButton} rightButton={rightButton} />
      </Dialog>
    </>
  )
}

function DialogActionArea({
  leftButton,
  rightButton
}: {
  leftButton?: DialogActionButtonProps
  rightButton?: DialogActionButtonProps
}) {
  const LeftButtonMemo = useCallback(
    () =>
      !!leftButton ? (
        <Button {...leftButton} loading={leftButton.loading}>
          {leftButton.text}
        </Button>
      ) : (
        <Box />
      ),
    [leftButton]
  )
  const RightButtonMemo = useCallback(
    () =>
      !!rightButton ? (
        <Button {...rightButton} loading={rightButton.loading}>
          {rightButton.text}
        </Button>
      ) : (
        <Box />
      ),
    [rightButton]
  )
  return (
    <DialogActions sx={styles.dialogActions}>
      <LeftButtonMemo />
      <RightButtonMemo />
    </DialogActions>
  )
}
