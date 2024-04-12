import { yupResolver } from "@hookform/resolvers/yup"
import { createContext, useContext } from "react"
import {
  UseFormReset,
  useForm,
  type Control,
  type UseFormHandleSubmit
} from "react-hook-form"
import * as yup from "yup"

import i18next from "@utils/localization"
import { AuthLoginData } from "types/auth"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../../app_context"

export type AuthLoginContextProps = {
  control: Control<AuthLoginData>
  handleSubmit?: UseFormHandleSubmit<AuthLoginData>
  reset?: UseFormReset<AuthLoginData>
  isValid?: boolean
}

export type AuthLoginPageContextProps = AppContextProps & AuthLoginContextProps

export const authLoginPageDefaultValues: AuthLoginPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  control: {} as Control<AuthLoginData>
}

const AuthLoginPageContext = createContext(authLoginPageDefaultValues)

export function AuthLoginPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate } = useAppContext()

  const schema = yup
    .object({
      email: yup
        .string()
        .email()
        .required(translate("input_is_required", { name: translate("email") })),
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
    reset,
    formState: { isValid }
  } = useForm<AuthLoginData>({
    resolver: yupResolver(schema),
    mode: "all"
  })
  return (
    <AuthLoginPageContext.Provider
      value={{
        ...authLoginPageDefaultValues,
        translate,
        control,
        handleSubmit,
        isValid,
        reset
      }}
    >
      {props.children}
    </AuthLoginPageContext.Provider>
  )
}

export function useAuthLoginPageContext() {
  const context = useContext(AuthLoginPageContext)
  if (context === undefined) {
    throw new Error("AuthLoginPage Context Error")
  }
  return context
}
