import { toast } from "react-toastify"

const defaultPosition = "top-right"

export function showSuccessToast(text: string) {
  toast.success(text, {
    position: defaultPosition,
    pauseOnFocusLoss: false,
    closeOnClick: true
  })
}

export function showInfoToast(text: string) {
  toast.info(text, {
    position: defaultPosition,
    pauseOnFocusLoss: false,
    closeOnClick: true
  })
}
export function showWarningToast(text: string) {
  toast.warning(text, {
    position: defaultPosition,
    pauseOnFocusLoss: false,
    closeOnClick: true
  })
}
export function showErrorToast(text: string) {
  toast.error(text, {
    position: defaultPosition,
    pauseOnFocusLoss: false,
    closeOnClick: true
  })
}
