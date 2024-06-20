import MoreVertIcon from "@mui/icons-material/MoreVert"
import {
  Avatar,
  IconButton,
  Stack,
  TableBody,
  TableRow,
  Typography
} from "@mui/material"
import TableCell from "@mui/material/TableCell"
import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"

import PlatformIcon from "@assets/platform_icons"
import Link from "@components/link"
import {
  RATING_0_COLOR,
  RATING_4_COLOR,
  RATING_8_COLOR,
  RATING_9_COLOR,
  TABLE_GRAY_COLOR,
  TABLE_ROW_BACKGROUND_COLOR,
  TABLE_ROW_BACKGROUND_COLOR_HOVER
} from "@constants/colors"
import { TABLE_TEXT_SIZE } from "@constants/sizes"
import ratingTableColor from "@utils/functions/ratingTableColor"
import { useGamesPageContext } from "context/games"
import { DataTableRowData } from "types/data_table"
import { Platform, Status } from "types/games"

export function GameDataTableBody() {
  const {
    translate,
    setSelectedGame,
    columns,
    rows,
    setAnchorEl,
    page,
    rowsPerPage,
    token
  } = useGamesPageContext()
  const { id } = useParams()
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: DataTableRowData) => {
      setAnchorEl?.(event.currentTarget)
      setSelectedGame?.(row)
    },
    [setAnchorEl, setSelectedGame]
  )
  const isOwner = useMemo(() => id === token?.data.id, [id, token?.data.id])
  const MemorizedRows = useMemo(() => {
    return rows
      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        return (
          <TableRow
            sx={{
              backgroundColor: TABLE_ROW_BACKGROUND_COLOR,
              ":hover": { backgroundColor: TABLE_ROW_BACKGROUND_COLOR_HOVER }
            }}
            key={index}
            role="checkbox"
            tabIndex={-1}
          >
            {columns.map((column) => {
              const value = row[column.id as keyof typeof row]
              let cellContent
              if (column.id === "photo") {
                cellContent = (
                  <Avatar
                    src={String(value)}
                    alt={row.name}
                    sx={{ width: "60px", height: "60px" }}
                    variant="square"
                  />
                )
              } else if (column.id === "actions") {
                cellContent = (
                  <IconButton
                    sx={{ display: isOwner ? "block" : "none" }}
                    onClick={(event) => handleClick(event, row)}
                  >
                    <MoreVertIcon color="secondary" />
                  </IconButton>
                )
              } else if (column.id === "status") {
                cellContent = (
                  <Typography
                    sx={{
                      color:
                        value === Status.ToBeCompleted
                          ? RATING_4_COLOR
                          : value === Status.Abandoned
                            ? RATING_0_COLOR
                            : value === Status.Completed
                              ? RATING_8_COLOR
                              : RATING_9_COLOR,
                      fontSize: TABLE_TEXT_SIZE
                    }}
                  >
                    {translate(value as string)}
                  </Typography>
                )
              } else if (column.id === "rating") {
                cellContent = (
                  <Typography
                    sx={{
                      color: ratingTableColor(value as number),
                      fontSize: TABLE_TEXT_SIZE
                    }}
                  >
                    {value}
                    {value !== null && value !== undefined
                      ? "/10"
                      : translate("not_rated")}
                  </Typography>
                )
              } else if (column.id === "lastPlay") {
                cellContent = (
                  <Typography
                    sx={{ color: TABLE_GRAY_COLOR, fontSize: TABLE_TEXT_SIZE }}
                  >
                    {column.id === "lastPlay" &&
                      value &&
                      new Date(value).toLocaleDateString()}
                  </Typography>
                )
              } else if (column.id === "platform") {
                cellContent = (
                  <Stack
                    direction={"row"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <Typography
                      sx={{
                        color: TABLE_GRAY_COLOR,
                        fontSize: TABLE_TEXT_SIZE
                      }}
                    >
                      {column.id === "platform" && translate(value as string)}
                    </Typography>
                    <PlatformIcon platform={value as Platform} />
                  </Stack>
                )
              } else if (
                column.id === "playTime" ||
                column.id === "screenshotSize"
              ) {
                cellContent = (
                  <Typography
                    sx={{ color: TABLE_GRAY_COLOR, fontSize: TABLE_TEXT_SIZE }}
                  >
                    {value}
                  </Typography>
                )
              } else {
                cellContent = (
                  <Link
                    sx={{
                      ":hover": { color: "#075985" },
                      cursor: "pointer",
                      fontSize: TABLE_TEXT_SIZE,
                      display: "inline-block"
                    }}
                    href={`/game/${row._id}`}
                  >
                    {typeof value === "string" && value.length > 40
                      ? value.substring(0, 40) + "..."
                      : value}
                  </Link>
                )
              }

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
                  {cellContent}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })
  }, [rows, page, rowsPerPage, columns, translate, handleClick])
  return <TableBody>{MemorizedRows}</TableBody>
}
