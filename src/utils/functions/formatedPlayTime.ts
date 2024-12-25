export function formatedPlaytime(
  value: number | null,
  translate: (key: string) => string
) {
  return value !== null
    ? `${new Intl.NumberFormat("en-US").format(Math.floor(value))} ${translate("hours")}`
    : ""
}
