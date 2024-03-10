import Badge from "@mui/joy/Badge"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Dropdown from "@mui/joy/Dropdown"
import IconButton from "@mui/joy/IconButton"
import Input from "@mui/joy/Input"
import ListDivider from "@mui/joy/ListDivider"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import Menu from "@mui/joy/Menu"
import MenuButton from "@mui/joy/MenuButton"
import MenuItem from "@mui/joy/MenuItem"
import Typography from "@mui/joy/Typography"
import { AiFillPieChart, AiOutlineArrowDown } from "react-icons/ai"
import { BiBookAdd } from "react-icons/bi"
import { IoIosNotifications } from "react-icons/io"
import { useNavigate } from "react-router-dom"

import PageHeader from "@components/page_header"

export default function HomePageHeader() {
  const navigate = useNavigate()
  const navigateToPage = (pathname: string) => {
    navigate(pathname)
  }
  return (
    <PageHeader>
      <Box sx={{ flex: 1, display: "flex", gap: 1, px: 2 }}>
        <Dropdown>
          <MenuButton
            sx={{
              "--Button-radius": "1.5rem"
            }}
            variant="outlined"
            endDecorator={<AiOutlineArrowDown />}
          >
            Main
          </MenuButton>
          <Menu
            variant="outlined"
            placement="bottom-start"
            disablePortal
            size="sm"
            sx={{
              "--ListItemDecorator-size": "24px",
              "--ListItem-minHeight": "40px",
              "--ListDivider-gap": "4px",
              minWidth: 200
            }}
          >
            <MenuItem onClick={() => navigateToPage("/")}>
              <ListItemDecorator>
                <AiFillPieChart />
              </ListItemDecorator>
              Home
            </MenuItem>
            <ListDivider />
            <MenuItem onClick={() => navigateToPage("/users")}>Users</MenuItem>
            <MenuItem onClick={() => navigateToPage("/games")}>Games</MenuItem>
          </Menu>
        </Dropdown>
      </Box>
      <Box sx={{ display: "flex", flexShrink: 0, gap: 2 }}>
        <Button
          startDecorator={<BiBookAdd />}
          sx={{ display: { xs: "none", md: "inline-flex" } }}
        >
          New invoice
        </Button>
        <Input
          placeholder="Search"
          variant="soft"
          size="sm"
          endDecorator={
            <Typography
              component="span"
              variant="outlined"
              level="body-xs"
              sx={{ bgcolor: "background.surface", mx: 0 }}
            >
              ⌘K
            </Typography>
          }
          sx={{
            "--Input-paddingInline": "12px",
            width: 160,
            display: { xs: "none", lg: "flex" }
          }}
        />
        <Badge badgeContent={2} variant="solid" color="danger">
          <IconButton variant="soft" sx={{ borderRadius: "50%" }}>
            <IoIosNotifications />
          </IconButton>
        </Badge>
      </Box>
    </PageHeader>
  )
}
