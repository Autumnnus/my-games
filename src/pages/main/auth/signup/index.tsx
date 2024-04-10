import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Box, Stack } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { useNavigate } from "react-router-dom"

import Button from "@components/button"
import Link from "@components/link"
import TextInput from "@components/text_input"
import { PRIMARY } from "@constants/colors"
import AuthImageSide from "@pages/main/auth/sub_components/image_side"
import AuthInputSide from "@pages/main/auth/sub_components/input_side"
import sleep from "@utils/functions/sleep"
import log from "@utils/log"
import { useAuthSignUpPageContext } from "context/auth/signup"
import { AuthSignupData } from "types/auth"

export default function AuthSignupPage() {
  const { translate, control, handleSubmit, isValid } =
    useAuthSignUpPageContext()
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  function navigatePage(pathname: string) {
    navigate(pathname)
  }
  async function onSubmit(data: AuthSignupData) {
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
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </AuthInputSide>
    </Grid>
  )
}
