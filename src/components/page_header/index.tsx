import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp"
import MenuIcon from "@mui/icons-material/Menu"
import { Popover, Stack } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import useTranslate from "@hooks/use_translate"
import { useAppContext } from "context/app_context"

interface Props {
  window?: () => Window
}

const drawerWidth = 240

export default function PageHeader(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }
  //? Mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        My Games
      </Typography>
      <Divider />
      <List>
        <Navigations handleDrawerToggle={handleDrawerToggle} isDrawer={true} />
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  //?WEB
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer"
            }}
          >
            My Games
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Navigations
              handleDrawerToggle={handleDrawerToggle}
              isDrawer={false}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}

function Navigations({
  handleDrawerToggle,
  isDrawer
}: {
  handleDrawerToggle: () => void
  isDrawer: boolean
}) {
  const { token, users } = useAppContext()
  const { translate, changeLanguage, currentLanguage } = useTranslate()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const user = useMemo(
    () => users.find((user) => user._id === token?.id),
    [token, users]
  )

  const handlePopoverClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (token) {
        setAnchorEl(event.currentTarget)
      } else {
        navigate("/auth/login")
      }
    },
    [token, setAnchorEl, navigate]
  )
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const navigateToPage = useCallback(
    (path: string) => {
      navigate(path)
      handleDrawerToggle()
    },
    [navigate, handleDrawerToggle]
  )
  const handleLogout = useCallback(() => {
    localStorage.removeItem("my-games-user")
    navigateToPage("/auth/login")
  }, [navigateToPage])
  const MemorizedNavigation = useMemo(() => {
    if (isDrawer) {
      return (
        <>
          <ListItem onClick={() => navigateToPage("/")} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={translate("home")} />
            </ListItemButton>
          </ListItem>
          {token && (
            <ListItem
              onClick={() => navigateToPage(`/games/${token?.id}`)}
              disablePadding
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={translate("games")} />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem onClick={() => navigateToPage("/users")} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={translate("users")} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ justifyContent: "center" }} disablePadding>
            <Stack direction={"row"}>
              <Box
                onClick={() => changeLanguage("en")}
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  backgroundColor: currentLanguage === "en" ? "#fff" : "",
                  color: currentLanguage === "en" ? "#000" : "",
                  ":hover": {
                    backgroundColor: "#fff",
                    color: "#000"
                  },
                  p: 1.5
                }}
              >
                <Typography align="center">EN</Typography>
              </Box>
              <Box
                onClick={() => changeLanguage("tr")}
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  backgroundColor: currentLanguage === "tr" ? "#fff" : "",
                  color: currentLanguage === "tr" ? "#000" : "",
                  ":hover": {
                    backgroundColor: "#fff",
                    color: "#000"
                  },
                  p: 1.5
                }}
              >
                <Typography align="center">TR</Typography>
              </Box>
            </Stack>
          </ListItem>
          {!token ? (
            <ListItem
              onClick={() => navigateToPage("/auth/login")}
              disablePadding
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={translate("login")} />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem onClick={handleLogout} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={translate("logout")} />
              </ListItemButton>
            </ListItem>
          )}
        </>
      )
    } else {
      return (
        <>
          <Button onClick={() => navigateToPage("/")} sx={{ color: "#fff" }}>
            {translate("home")}
          </Button>
          {token && (
            <Button
              onClick={() => navigateToPage(`/games/${token?.id}`)}
              sx={{ color: "#fff" }}
            >
              {translate("games")}
            </Button>
          )}
          <Button
            onClick={() => navigateToPage("/users")}
            sx={{ color: "#fff" }}
          >
            {translate("users")}
          </Button>
          <IconButton onClick={(event) => handlePopoverClick(event)}>
            {user?.profileImage ? (
              <Box
                component={"img"}
                src={user.profileImage}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            ) : (
              <AccountCircleSharpIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <Box
              onClick={() => navigateToPage(`/profile/${token?.id}`)}
              sx={{
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#000"
                },
                p: 1.5,
                cursor: "pointer"
              }}
            >
              {translate("profile")}
            </Box>
            <Stack direction={"row"}>
              <Box
                onClick={() => changeLanguage("en")}
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  backgroundColor: currentLanguage === "en" ? "#fff" : "",
                  color: currentLanguage === "en" ? "#000" : "",
                  ":hover": {
                    backgroundColor: "#fff",
                    color: "#000"
                  },
                  p: 1.5
                }}
              >
                <Typography align="center">EN</Typography>
              </Box>
              <Box
                onClick={() => changeLanguage("tr")}
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  backgroundColor: currentLanguage === "tr" ? "#fff" : "",
                  color: currentLanguage === "tr" ? "#000" : "",
                  ":hover": {
                    backgroundColor: "#fff",
                    color: "#000"
                  },
                  p: 1.5
                }}
              >
                <Typography align="center">TR</Typography>
              </Box>
            </Stack>
            <Box
              onClick={handleLogout}
              sx={{
                p: 1.5,
                cursor: "pointer",
                color: "red",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "red"
                }
              }}
            >
              {translate("logout")}
            </Box>
          </Popover>
        </>
      )
    }
  }, [
    anchorEl,
    changeLanguage,
    currentLanguage,
    handleLogout,
    handlePopoverClick,
    isDrawer,
    navigateToPage,
    token,
    translate
  ])
  return MemorizedNavigation
}
