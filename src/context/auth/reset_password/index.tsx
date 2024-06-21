import { yupResolver } from "@hookform/resolvers/yup"
import { createContext, useContext } from "react"
import { Control, UseFormHandleSubmit, useForm } from "react-hook-form"
import * as yup from "yup"

import i18next from "@utils/localization"
import { AuthResetPasswordData } from "types/auth"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../../app_context"

export type AuthResetPasswordPageContextProps = AppContextProps & {
  control: Control<AuthResetPasswordData>
  handleSubmit?: UseFormHandleSubmit<AuthResetPasswordData>
  isValid?: boolean
}

export const authResetPasswordPageDefaultValues: AuthResetPasswordPageContextProps =
  {
    ...appContextDefaultValues,
    translate: i18next.t,
    control: {} as Control<AuthResetPasswordData>
  }
const AuthResetPasswordPageContext = createContext(
  authResetPasswordPageDefaultValues
)

export function AuthResetPasswordPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate, backendUrl } = useAppContext()

  const schema = yup
    .object({
      password: yup
        .string()
        .min(6)
        .max(16)
        .required(
          translate("input_is_required", { name: translate("password") })
        )
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<AuthResetPasswordData>({
    resolver: yupResolver(schema),
    mode: "all"
  })
  return (
    <AuthResetPasswordPageContext.Provider
      value={{
        ...authResetPasswordPageDefaultValues,
        translate,
        control,
        handleSubmit,
        isValid,
        backendUrl
      }}
    >
      {props.children}
    </AuthResetPasswordPageContext.Provider>
  )
}

export function useAuthResetPasswordPageContext() {
  const context = useContext(AuthResetPasswordPageContext)
  if (context === undefined) {
    throw new Error("AuthResetPasswordPage Context Error")
  }
  return context
}
