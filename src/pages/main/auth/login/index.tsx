import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Avatar, Box, Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "@components/button"
import Link from "@components/link"
import TextInput from "@components/text_input"
import { PRIMARY } from "@constants/colors"
import AuthImageSide from "@pages/main/auth/sub_components/image_side"
import AuthInputSide from "@pages/main/auth/sub_components/input_side"
import sleep from "@utils/functions/sleep"
import log from "@utils/log"
import { useAuthLoginPageContext } from "context/auth/login"
import { AuthLoginData } from "types/auth"

export default function AuthLoginPage() {
  const { translate, control, handleSubmit, isValid } =
    useAuthLoginPageContext()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function navigatePage(pathname: string) {
    navigate(pathname)
  }
  async function onSubmit(data: AuthLoginData) {
    setLoading(true)
    await sleep(3000)
    log(`${data.email} is added: `, data)
    setLoading(false)
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
            <Grid gap={5} container>
              <Grid item xs>
                <Link
                  sx={{ cursor: "pointer", color: PRIMARY }}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link
                  onClick={() => navigatePage("/auth/signup")}
                  sx={{
                    cursor: "pointer",
                    color: PRIMARY,
                    textAlign: "center"
                  }}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </AuthInputSide>
    </Grid>
  )
}
