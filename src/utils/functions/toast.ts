import { toast } from "react-toastify"

const defaultPosition = "top-right"

export function showSuccessToast(text: string) {
  toast.success(text, {
    position: defaultPosition
  })
}

export function showInfoToast(text: string) {
  toast.info(text, {
    position: defaultPosition
  })
}
export function showWarningToast(text: string) {
  toast.warning(text, {
    position: defaultPosition
  })
}
export function showErrorToast(text: string) {
  toast.error(text, {
    position: defaultPosition
  })
}
