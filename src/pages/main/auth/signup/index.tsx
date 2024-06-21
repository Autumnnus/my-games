import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Box, Stack } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import axios from "axios"
import * as React from "react"
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
import { useAuthSignUpPageContext } from "context/auth/signup"
import { AuthSignupData } from "types/auth"
import { AxiosErrorMessage } from "types/axios"

export default function AuthSignupPage() {
  const { translate, control, handleSubmit, isValid, backendUrl } =
    useAuthSignUpPageContext()
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  function navigatePage(pathname: string) {
    navigate(pathname)
  }
  async function onSubmit(data: AuthSignupData) {
    setLoading(true)
    await sleep(500)
    axios
      .post(`${backendUrl}/api/auth/register`, data)
      .then(() => {
        axios
          .post(`${backendUrl}/api/auth/login`, data)
          .then((res) => {
            log(`${data.email} is added: `, data)
            localStorage.setItem("my-games-user", JSON.stringify(res.data))
            window.location.href = "/"
          })
          .catch((error: AxiosErrorMessage) => {
            console.error(error)
            showErrorToast("Login failed: " + error.response?.data.message)
          })
        showSuccessToast("Signup successful")
      })
      .catch((error: AxiosErrorMessage) => {
        console.error(error)
        showErrorToast("Signup failed: " + error.response?.data.message)
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
              {translate("signup")}
            </Typography>
          </Stack>
          <Stack gap={1} mt={1}>
            <TextInput<AuthSignupData>
              type="text"
              control={control}
              name="name"
              label={translate("name")}
              placeholder="My Nickname"
            />
            <TextInput<AuthSignupData>
              type="email"
              control={control}
              name="email"
              label={translate("email")}
              placeholder="abcdef@gmail.com"
            />
            <TextInput<AuthSignupData>
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
              {translate("signup")}
            </Button>
            <Grid gap={5} container>
              <Grid item xs>
                <Link
                  sx={{ cursor: "pointer", color: PRIMARY }}
                  onClick={() => navigatePage("/auth/login")}
                  variant="body2"
                >
                  {translate("already_have_account")}
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </AuthInputSide>
    </Grid>
  )
}
