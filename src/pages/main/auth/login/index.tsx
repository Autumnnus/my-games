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
import sleep from "@utils/functions/sleep"
import { showErrorToast, showSuccessToast } from "@utils/functions/toast"
import log from "@utils/log"
import { useAuthLoginPageContext } from "context/auth/login"
import { AuthLoginData } from "types/auth"
import { AxiosErrorMessage } from "types/axios"

export default function AuthLoginPage() {
  const { translate, control, handleSubmit, isValid, reset, backendUrl } =
    useAuthLoginPageContext()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function navigatePage(pathname: string) {
    navigate(pathname)
  }
  async function onSubmit(data: AuthLoginData) {
    setLoading(true)
    await sleep(500)
    axios
      .post(`${backendUrl}/api/auth/login`, data)
      .then((res) => {
        reset?.({ email: data.email, password: data.password })
        log(`${data.email} is added: `, data)
        localStorage.setItem("my-games-user", JSON.stringify(res.data))
        showSuccessToast("Login successful")
        window.location.href = "/"
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        showErrorToast("Login failed: " + error.response?.data.message)
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
              {translate("login")}
            </Typography>
          </Stack>
          <Stack gap={1} mt={1}>
            <TextInput<AuthLoginData>
              type="email"
              control={control}
              name="email"
              label={translate("email")}
              placeholder="abcdef@gmail.com"
            />
            <TextInput<AuthLoginData>
              type="password"
              control={control}
              name="password"
              label={translate("password")}
              placeholder="*********"
            />
            <Button
              fullWidth
              disabled={!isValid}
              loading={loading}
              onClick={handleSubmit?.(onSubmit)}
              sx={{ mt: 3, mb: 2 }}
            >
              {translate("login")}
            </Button>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Link
                sx={{ cursor: "pointer", color: PRIMARY }}
                variant="body2"
                onClick={() => navigatePage("/auth/forgotPassword")}
              >
                {translate("forgot_password")}
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
