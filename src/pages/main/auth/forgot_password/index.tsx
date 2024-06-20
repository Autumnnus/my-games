import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Avatar, Box, Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "@components/button"
import Link from "@components/link"
import TextInput from "@components/text_input"
import { PRIMARY } from "@constants/colors"
import AuthImageSide from "@pages/main/auth/sub_components/image_side"
import AuthInputSide from "@pages/main/auth/sub_components/input_side"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import { useAuthForgotPasswordPageContext } from "context/auth/forgot_password"
import { AuthForgotPasswordData } from "types/auth"
import { AxiosErrorMessage } from "types/axios"

export default function AuthForgotPasswordPage() {
  const { translate, control, handleSubmit, isValid } =
    useAuthForgotPasswordPageContext()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function navigatePage(pathname: string) {
    navigate(pathname)
  }
  async function onSubmit(data: AuthForgotPasswordData) {
    setLoading(true)
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/forgotpassword`, data)
      .then(() => {
        showSuccessToast(
          "Email sent successfully. Check your email for the reset link."
        )
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
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
            <TextInput<AuthForgotPasswordData>
              type="email"
              control={control}
              name="email"
              label={translate("email")}
              placeholder="abcdef@gmail.com"
            />
            <Button
              fullWidth
              disabled={!isValid}
              loading={loading}
              onClick={handleSubmit?.(onSubmit)}
              sx={{ mt: 3, mb: 2 }}
            >
              {translate("send")}
            </Button>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Link
                sx={{ cursor: "pointer", color: PRIMARY }}
                variant="body2"
                onClick={() => navigatePage("/auth/login")}
              >
                {translate("login")}
              </Link>
              <Link
                onClick={() => navigatePage("/auth/signup")}
                sx={{
                  cursor: "pointer",
                  color: PRIMARY,
                  textAlign: "right"
                }}
                variant="body2"
              >
                {translate("dont_have_account")}
              </Link>
            </Stack>
          </Stack>
        </Box>
      </AuthInputSide>
    </Grid>
  )
}
