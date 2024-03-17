export function toArray<T>(value?: T[] | null): T[] {
  if (!value) {
    return [] as T[]
  }

  if (!Array.isArray(value)) {
    return []
  }

  return value
}
