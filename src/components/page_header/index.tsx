import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp"
import MenuIcon from "@mui/icons-material/Menu"
import { Popover } from "@mui/material"
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
  const { translate, token } = useAppContext()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

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
              onClick={() => navigateToPage(`/games/${token?.data.id}`)}
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
          <ListItem
            onClick={() => navigateToPage("/auth/login")}
            disablePadding
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={translate("login")} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={handleLogout} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={translate("logout")} />
            </ListItemButton>
          </ListItem>
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
              onClick={() => navigateToPage(`/games/${token?.data.id}`)}
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
            <AccountCircleSharpIcon sx={{ color: "#fff" }} />
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
              onClick={() => navigateToPage(`/profile/${token?.data.id}`)}
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
    handleLogout,
    handlePopoverClick,
    isDrawer,
    navigateToPage,
    token,
    translate
  ])
  return MemorizedNavigation
}
