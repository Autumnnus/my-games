import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Avatar, Box, Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import axios from "axios"
import { useState } from "react"
import { useLocation } from "react-router-dom"

import Button from "@components/button"
import TextInput from "@components/text_input"
import AuthImageSide from "@pages/main/auth/sub_components/image_side"
import AuthInputSide from "@pages/main/auth/sub_components/input_side"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import { useAuthResetPasswordPageContext } from "context/auth/reset_password"
import { AuthResetPasswordData } from "types/auth"
import { AxiosErrorMessage } from "types/axios"

export default function AuthResetPasswordPage() {
  const { translate, control, handleSubmit, isValid } =
    useAuthResetPasswordPageContext()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const resetPasswordToken = new URLSearchParams(location.search).get(
    "resetPasswordToken"
  )
  async function onSubmit(data: AuthResetPasswordData) {
    setLoading(true)
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`,
        data
      )
      .then(() => {
        showSuccessToast(
          "Password reset successfully. You can now login with your new password."
        )
      })
      .catch((error: AxiosErrorMessage) => {
        console.log(error)
        showErrorToast("Request is failed: " + error.response?.data.message)
      })
      .finally(() => setLoading(false))
  }
  return (
    <Grid container component="main" sx={{ height: "100%" }}>
      <AuthImageSide />
      <AuthInputSide>
        <Box sx={{ width: "100%" }}>
          <Stack alignItems={"center"}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {translate("reset_password")}
            </Typography>
          </Stack>
          <Stack gap={1} mt={1}>
            <TextInput<AuthResetPasswordData>
              type="password"
              control={control}
              name="password"
              label={translate("password")}
              placeholder="**********"
            />
            <Button
              fullWidth
              disabled={!isValid}
              loading={loading}
              onClick={handleSubmit?.(onSubmit)}
              sx={{ mt: 3, mb: 2 }}
            >
              {translate("reset")}
            </Button>
          </Stack>
        </Box>
      </AuthInputSide>
    </Grid>
  )
}
