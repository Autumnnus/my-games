import { TableHead, TableRow } from "@mui/material"
import TableCell from "@mui/material/TableCell"
import { useMemo } from "react"

import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_COLOR
} from "@constants/colors"
import { useUsersPageContext } from "context/users"

export function UserDataTableTitle() {
  const { columns } = useUsersPageContext()

  const MemoizedColumns = useMemo(() => {
    return columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        sx={{
          minWidth: column.minWidth,
          backgroundColor: TABLE_HEADER_BACKGROUND_COLOR,
          color: TABLE_HEADER_COLOR,
          p: {
            xs: "0.75rem",
            sm: "1rem 2rem"
          },
          border: "none"
        }}
      >
        {column.label}
      </TableCell>
    ))
  }, [columns])
  return (
    <>
      <TableHead>
        <TableRow
          sx={{
            p: 2,
            borderBottom: "none",
            borderRadius: 5
          }}
        >
          {MemoizedColumns}
        </TableRow>
      </TableHead>
    </>
  )
}
