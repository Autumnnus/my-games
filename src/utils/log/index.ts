import Reactotron from "reactotron-react-js"

const ENV = process.env.NODE_ENV

export default function log(...args: (string | object | boolean)[]) {
  if (ENV !== "development") {
    return
  }
  ;(
    Reactotron as unknown as {
      log: (...args: (string | object | boolean)[]) => void
    }
  ).log(...args)
}
