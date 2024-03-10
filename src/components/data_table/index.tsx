import { Avatar, Box } from "@mui/material"
import type { GridColDef } from "@mui/x-data-grid"
import { DataGrid } from "@mui/x-data-grid"

type RenderCellAvatarData = {
  value?: { avatar?: string; username?: string }
}

const columns: GridColDef[] = [
  {
    field: "game",
    headerName: "Game",
    width: 200,
    renderCell: (params: RenderCellAvatarData) => {
      return <Avatar src={params.value?.avatar} />
    }
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110
  }
]

const rows = [
  {
    id: 1,
    game: {
      avatar:
        "https://assets.materialup.com/uploads/bebad102-7f40-4941-99cd-54366113003e/avatar-08.png"
    },
    lastName: "Snow",
    firstName: "Jon",
    age: 14
  },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
]
export default function DataTable() {
  return (
    <Box p={2} sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20
            }
          }
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        // slots={{
        //   toolbar: GridToolbar
        // }}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
