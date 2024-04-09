import { Box } from "@mui/material"

import UserDataTable from "@components/data_table/user_data_table"

export default function UsersPage() {
  return (
    <Box px={5} py={2}>
      <UserDataTable />
    </Box>
  )
}

// function TableHeader() {
//   const { translate } = useUsersPageContext()
//   return (
//     <Stack
//       spacing={2}
//       justifyContent="space-between"
//       sx={{
//         backgroundColor: TABLE_ROW_BACKGROUND_COLOR,
//         p: 2,
//         width: "100%",
//         flexDirection: {
//           xs: "column",
//           sm: "row"
//         }
//       }}
//     >
//       <Stack
//         justifyContent={"space-around"}
//         sx={{
//           alignItems: {
//             xs: "center",
//             sm: "flex-start"
//           }
//         }}
//       >
//         <Typography fontSize={24} fontWeight="bold" color={"white"}>
//           {translate("games")}
//         </Typography>
//         <Typography color={TABLE_HEADER_COLOR} variant="body2">
//           {translate("all_played_games_by_user", {
//             user: "Vector"
//           })}
//         </Typography>
//       </Stack>
//       <Stack
//         direction={"row"}
//         alignItems={"center"}
//         gap={1}
//         sx={{
//           justifyContent: {
//             xs: "center",
//             sm: "flex-end"
//           }
//         }}
//       >
//         <IconButton onClick={setIsAddGameDialogOpen}>
//           <AddCircleOutlineIcon
//             sx={{ width: "40px", height: "40px", color: "white" }}
//           />
//         </IconButton>
//         <SearchBar translate={translate} />
//       </Stack>
//     </Stack>
//   )
// }
