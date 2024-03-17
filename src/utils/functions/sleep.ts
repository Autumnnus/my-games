export default async function sleep(ms: number = 1000) {
  await new Promise((r) => setTimeout(r, ms))
}
