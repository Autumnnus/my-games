import { useEffect } from "react"
import { unstable_usePrompt } from "react-router-dom"

const message = "Changes you made may not be saved."

export default function useUnloadEvent(isDirty: () => boolean) {
  unstable_usePrompt({
    when: isDirty(),
    message
  })

  useEffect(() => {
    function onUnload(e: BeforeUnloadEvent) {
      if (isDirty()) {
        e.preventDefault()
        e.returnValue = message
      }
    }

    window.addEventListener("beforeunload", onUnload)

    return () => {
      window.removeEventListener("beforeunload", onUnload)
    }
  }, [isDirty])
}
