import { Avatar, TableBody, TableRow, Typography } from "@mui/material"
import TableCell from "@mui/material/TableCell"
import { useMemo } from "react"

import {
  TABLE_ROW_BACKGROUND_COLOR,
  TABLE_ROW_BACKGROUND_COLOR_HOVER
} from "@constants/colors"
import { useUsersPageContext } from "context/users"

export function UserDataTableBody() {
  const { columns, rows } = useUsersPageContext()

  const MemorizedRows = useMemo(() => {
    return rows?.map((row, index) => {
      return (
        <TableRow
          sx={{
            backgroundColor: TABLE_ROW_BACKGROUND_COLOR,
            ":hover": { backgroundColor: TABLE_ROW_BACKGROUND_COLOR_HOVER }
          }}
          key={index}
          hover
          role="checkbox"
          tabIndex={-1}
        >
          {columns.map((column) => {
            const value = row[column.id as keyof typeof row]
            return (
              <TableCell
                sx={{
                  color: "white",
                  p: "1rem 2rem",
                  borderBottom: "1px solid #666666"
                }}
                key={column.id}
                align={column.align}
              >
                {column.id === "profileImage" ? (
                  <Avatar
                    src={String(value)}
                    alt={String(value)}
                    sx={{ width: "60px", height: "60px" }}
                  />
                ) : (
                  <Typography>
                    {column.id === "actions" ? null : value || 0}
                  </Typography>
                )}
              </TableCell>
            )
          })}
        </TableRow>
      )
    })
  }, [rows, columns])
  return <TableBody>{MemorizedRows}</TableBody>
}
