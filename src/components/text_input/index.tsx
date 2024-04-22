import { type TextFieldProps } from "@mui/material"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import React, { useId, useMemo, useState } from "react"
import type { Control, FieldValues } from "react-hook-form"
import { Controller } from "react-hook-form"

import styles from "./styles"

export type TextInputProps<T extends FieldValues> = TextFieldProps & {
  name: keyof T
  control: Control<T>
  placeholder?: string
  label?: string
  TitleRight?: React.ReactNode
  TextLeft?: React.ReactNode
}

export default function TextInput<T extends FieldValues>(
  props: TextInputProps<T>
) {
  const [isFocus, setIsFocus] = useState(false)
  const componentId = useId()

  const TitleRightMemo = useMemo(() => {
    if (!props?.TitleRight) {
      return undefined
    }

    return props.TitleRight
  }, [props])

  const TextLeftMemo = useMemo(() => {
    if (!props?.TextLeft) {
      return undefined
    }

    return props.TextLeft
  }, [props])

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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
              {TitleRightMemo}
            </Stack>
            <TextField
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value as FieldValues}
              fullWidth
              variant="outlined"
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              id={componentId}
              {...props}
              InputProps={{
                startAdornment: TextLeftMemo
              }}
              sx={{
                " input": {
                  padding: 2,
                  color: "#ffffff"
                },
                ".MuiFormHelperText-root": {
                  marginLeft: 0
                },
                ".MuiSelect-select caption": {
                  color: "text.disabled"
                },
                "& input[type=number]": {
                  "-moz-appearance": "textfield"
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0
                },
                backgroundColor: "#4b5563",
                "& input::placeholder": { color: "#ffffff" },
                "&-webkit-calendar-picker-indicator": {
                  color: "red"
                },
                "input[type='date']::-webkit-calendar-picker-indicator": {
                  opacity: 1,
                  display: "block",
                  color: "rgba(255, 255, 255, 0)",
                  backgroundColor: "white",
                  borderRadius: "1000px",
                  width: "20px",
                  height: "20px",
                  borderWidth: "thin",
                  cursor: "pointer"
                },
                ...props?.sx
              }}
              label={undefined}
              inputProps={{
                style: { color: "#fff" }
              }}
            />
          </>
        )}
      />
    </Box>
  )
}
