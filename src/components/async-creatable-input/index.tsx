/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type TextFieldProps } from "@mui/material"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import React, { useId, useState } from "react"
import type { Control, FieldValues } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { GroupBase, OptionsOrGroups } from "react-select"
import { AsyncPaginate } from "react-select-async-paginate"

import { IGDBGamesData } from "types/games"

import styles from "./styles"

type OptionType = {
  value: string
  label: string
}

export type AsyncCreatableInputProps<T extends FieldValues> = TextFieldProps & {
  name: keyof T
  control: Control<T>
  placeholder?: string
  label?: string
  loadOptions: (
    search: string,
    prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
  ) => Promise<{
    options: { value: string; label: string; additional?: IGDBGamesData }[]
    hasMore: boolean
  }>
  value?: { value: string; label: string }
  setSelectedGameData?: (additional: IGDBGamesData | null) => void
}

export default function AsyncCreatableInput<T extends FieldValues>(
  props: AsyncCreatableInputProps<T>
) {
  const [isFocus, setIsFocus] = useState(false)
  const componentId = useId()

  function handleOnFocus(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    setIsFocus(true)
    props?.onFocus && props?.onFocus(e)
  }

  function handleOnBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    setIsFocus(false)
    props?.onBlur && props?.onBlur(e)
  }

  return (
    <Box sx={styles.container}>
      <Controller<FieldValues>
        name={props.name}
        control={props.control as unknown as Control<FieldValues>}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <Stack
              justifyContent={"space-between"}
              direction={"row"}
              spacing={2}
            >
              <InputLabel
                error={!!error}
                htmlFor={componentId}
                sx={styles.labelContainer(isFocus)}
                required={props?.required}
              >
                <Typography fontSize={props?.size === "small" ? 12 : undefined}>
                  {props.label}
                </Typography>
              </InputLabel>
            </Stack>
            <AsyncPaginate
              //@ts-ignore
              loadOptions={props.loadOptions}
              helperText={error ? error.message : null}
              error={!!error}
              //@ts-ignore
              onChange={(newValue) => {
                onChange((newValue as { value: string })?.value)
                props.setSelectedGameData?.(
                  (newValue as unknown as { additional: IGDBGamesData })
                    ?.additional
                )
              }}
              cacheOptions={true}
              value={props.value}
              fullWidth
              variant="outlined"
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              id={componentId}
              {...props}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "0.211rem",
                  backgroundColor: "#4b5563"
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  marginTop: 0
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "#fff"
                }),
                option: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "gray",
                    cursor: "pointer"
                  }
                })
              }}
              label={undefined}
              inputProps={{
                style: { color: "#000" }
              }}
            />
          </>
        )}
      />
    </Box>
  )
}
