import { yupResolver } from "@hookform/resolvers/yup"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState
} from "react"
import {
  Control,
  Resolver,
  UseFormHandleSubmit,
  UseFormReset
} from "react-hook-form"
import * as yup from "yup"

import useControlledForm from "@hooks/use_controlled_form"
import useToggle from "@hooks/use_toggle"
import i18next from "@utils/localization"
import { UserDataTableColumnData, UserDataTableRowData } from "types/data_table"
import { EditUserDialogData, UsersData } from "types/users"

import {
  AppContextProps,
  appContextDefaultValues,
  useAppContext
} from "../app_context"

export type UsersContextProps = {
  selectedUser?: UsersData | null
  setSelectedUser?: Dispatch<SetStateAction<UsersContextProps["selectedUser"]>>
  columns: ReadonlyArray<UserDataTableColumnData>
  rows: ReadonlyArray<UserDataTableRowData>
  isEditUserDialogOpen?: boolean
  setIsEditUserDialogOpen?: () => void
  control: Control<EditUserDialogData>
  handleSubmit?: UseFormHandleSubmit<EditUserDialogData>
  reset?: UseFormReset<EditUserDialogData>
  isValid?: boolean
  isDirty?: boolean
}

export type UsersPageContextProps = AppContextProps & UsersContextProps

export const usersPageDefaultValues: UsersPageContextProps = {
  ...appContextDefaultValues,
  translate: i18next.t,
  columns: [],
  rows: [],
  control: {} as Control<EditUserDialogData>
}

const UsersPageContext = createContext(usersPageDefaultValues)

export function UsersPageContextProvider(props: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { translate, token, backendUrl, users, setUsers } = useAppContext()

  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useToggle()
  const [selectedUser, setSelectedUser] =
    useState<UsersContextProps["selectedUser"]>(null)

  const schema = yup
    .object({
      email: yup
        .string()
        .matches(
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          translate("email_invalid")
        ),
      name: yup.string(),
      password: yup.string().min(6).max(16),
      profileImage: yup.string()
    })
    .required()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty }
  } = useControlledForm<EditUserDialogData>({
    resolver: yupResolver(schema) as unknown as Resolver<EditUserDialogData>,
    mode: "all"
  })

  const rows = useMemo(() => {
    return users.map((user) =>
      createData(
        user.profileImage,
        user.name,
        user.gameSize,
        user.completedGameSize,
        user.screenshotSize,
        user._id
      )
    )
  }, [users])

  const columns: ReadonlyArray<UserDataTableColumnData> = useMemo(
    () => [
      { id: "profileImage", label: "", minWidth: 50 },
      { id: "name", label: translate("member") },
      {
        id: "gameSize",
        label: translate("games"),
        align: "right"
      },
      {
        id: "completedGameSize",
        label: translate("completed_games"),
        align: "right"
      },
      {
        id: "screenshotSize",
        label: translate("screenshots"),
        align: "right"
      },
      {
        id: "actions",
        label: "",
        align: "right",
        minWidth: 50
      }
    ],
    [translate]
  )

  return (
    <UsersPageContext.Provider
      value={{
        ...usersPageDefaultValues,
        translate,
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        columns,
        rows,
        isEditUserDialogOpen,
        setIsEditUserDialogOpen,
        control,
        handleSubmit,
        reset,
        isValid,
        isDirty,
        token,
        backendUrl
      }}
    >
      {props.children}
    </UsersPageContext.Provider>
  )
}
export function useUsersPageContext() {
  const context = useContext(UsersPageContext)
  if (context === undefined) {
    throw new Error("UsersPage Context Error")
  }
  return context
}

function createData(
  profileImage: string,
  name: string,
  gameSize: number,
  completedGameSize: number,
  screenshotSize: number,
  _id: string
) {
  return {
    profileImage,
    name,
    gameSize,
    completedGameSize,
    screenshotSize,
    _id
  }
}
