import { yupResolver } from "@hookform/resolvers/yup"
import { createContext, useContext } from "react"
import {
  useForm,
  type Control,
  type UseFormHandleSubmit
} from "react-hook-form"
import * as yup from "yup"

import i18next from "@utils/localization"
import { AuthForgotPasswordData } from "types/auth"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../../app_context"

export type AuthForgotPasswordContextProps = {
  control: Control<AuthForgotPasswordData>
  handleSubmit?: UseFormHandleSubmit<AuthForgotPasswordData>
  isValid?: boolean
}

export type AuthForgotPasswordPageContextProps = AppContextProps &
  AuthForgotPasswordContextProps

export const authForgotPasswordPageDefaultValues: AuthForgotPasswordPageContextProps =
  {
    ...appContextDefaultValues,
    translate: i18next.t,
    control: {} as Control<AuthForgotPasswordData>
  }
const AuthForgotPasswordPageContext = createContext(
  authForgotPasswordPageDefaultValues
)

export function AuthForgotPasswordPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate, backendUrl } = useAppContext()

  const schema = yup
    .object({
      email: yup
        .string()
        .email()
        .required(translate("input_is_required", { name: translate("email") }))
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<AuthForgotPasswordData>({
    resolver: yupResolver(schema),
    mode: "all"
  })
  return (
    <AuthForgotPasswordPageContext.Provider
      value={{
        ...authForgotPasswordPageDefaultValues,
        translate,
        control,
        handleSubmit,
        isValid,
        backendUrl
      }}
    >
      {props.children}
    </AuthForgotPasswordPageContext.Provider>
  )
}

export function useAuthForgotPasswordPageContext() {
  const context = useContext(AuthForgotPasswordPageContext)
  if (context === undefined) {
    throw new Error("AuthForgotPasswordPage Context Error")
  }
  return context
}
