import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"
import { Stack, TableHead, TableRow, Typography } from "@mui/material"
import TableCell from "@mui/material/TableCell"
import { useCallback, useMemo } from "react"

import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_COLOR
} from "@constants/colors"
import { useGamesPageContext } from "context/games"
import { DataTableColumnData } from "types/data_table"

export function GameDataTableTitle() {
  const { order, sortBy, setOrder, setSortBy, columns } = useGamesPageContext()

  const sort = useMemo(() => {
    return location.search.split("sortBy=")[1]?.split("&")[0]
  }, [location.search])

  const handleSortOrder = useCallback(
    (sortBy: DataTableColumnData["id"]) => {
      setSortBy?.(sortBy)
      setOrder?.((prevOrder) => {
        if (prevOrder === "asc" && sort === sortBy) return "desc"
        if (prevOrder === "desc" && sort === sortBy) return "asc"
        return "asc"
      })
    },
    [setOrder, setSortBy, sort]
  )

  const MemoizedColumns = useMemo(() => {
    return columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        style={{
          minWidth: column.minWidth,
          backgroundColor: TABLE_HEADER_BACKGROUND_COLOR,
          color: TABLE_HEADER_COLOR,
          padding: "1rem 2rem 1rem 2rem",
          border: "none"
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={column.id === "name" ? "flex-start" : "flex-end"}
          gap={1}
          onClick={() => handleSortOrder(column.id)}
          sx={{ cursor: "pointer" }}
        >
          <Typography>{column.label}</Typography>
          <UnfoldMoreIcon
            sx={{
              display:
                column.id === "actions" ||
                column.id === "photo" ||
                column.id === sortBy
                  ? "none"
                  : "block"
            }}
            color="inherit"
          />
          <KeyboardArrowUpIcon
            sx={{
              display:
                column.id === "actions" ||
                column.id === "photo" ||
                column.id !== sortBy ||
                order === "desc"
                  ? "none"
                  : "block"
            }}
            color="inherit"
          />
          <KeyboardArrowDownIcon
            sx={{
              display:
                column.id === "actions" ||
                column.id === "photo" ||
                column.id !== sortBy ||
                order === "asc"
                  ? "none"
                  : "block"
            }}
            color="inherit"
          />
        </Stack>
      </TableCell>
    ))
  }, [columns, handleSortOrder, order, sortBy])
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
