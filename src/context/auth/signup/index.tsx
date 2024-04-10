import { yupResolver } from "@hookform/resolvers/yup"
import { createContext, useContext } from "react"
import { type Control, type UseFormHandleSubmit } from "react-hook-form"
import * as yup from "yup"

import useControlledForm from "@hooks/use_controlled_form"
import i18next from "@utils/localization"
import { AuthSignupData } from "types/auth"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../../app_context"

export type AuthSignUpContextProps = {
  control: Control<AuthSignupData>
  handleSubmit?: UseFormHandleSubmit<AuthSignupData>
  isValid?: boolean
}

export type AuthSignUpPageContextProps = AppContextProps &
  AuthSignUpContextProps

export const authSignUpPageDefaultValues: AuthSignUpPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  control: {} as Control<AuthSignupData>
}

const AuthSignUpPageContext = createContext(authSignUpPageDefaultValues)

export function AuthSignUpPageContextProvider(props: {
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
        ),
      name: yup
        .string()
        .min(2)
        .max(16)
        .required(translate("input_is_required", { name: translate("name") }))
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useControlledForm<AuthSignupData>({
    resolver: yupResolver(schema),
    mode: "all"
  })
  return (
    <AuthSignUpPageContext.Provider
      value={{
        ...authSignUpPageDefaultValues,
        translate,
        control,
        handleSubmit,
        isValid
      }}
    >
      {props.children}
    </AuthSignUpPageContext.Provider>
  )
}

export function useAuthSignUpPageContext() {
  const context = useContext(AuthSignUpPageContext)
  if (context === undefined) {
    throw new Error("AuthSignUpPage Context Error")
  }
  return context
}
