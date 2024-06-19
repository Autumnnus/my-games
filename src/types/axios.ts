import type { AxiosError } from "axios"

export type AxiosErrorMessage = AxiosError<{ message: string }>
