/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type TextFieldProps } from "@mui/material"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import Typography from "@mui/material/Typography"
import React, { useId, useState } from "react"
import type { Control, FieldValues } from "react-hook-form"
import { Controller } from "react-hook-form"
import Select from "react-select"

import styles from "./styles"

type OptionType = {
  value: string
  label: string
}

export type MultiSelectInputProps<T extends FieldValues> = TextFieldProps & {
  name: keyof T
  control: Control<T>
  placeholder?: string
  label?: string
  value?: OptionType[]
  defaultValue?: OptionType[]
}

export default function MultiSelectInput<T extends FieldValues>(
  props: MultiSelectInputProps<T>
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
        render={({ fieldState: { error } }) => (
          <>
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
            <Select
              isMulti
              isDisabled={props.disabled}
              value={props.value}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              id={componentId}
              isClearable={false}
              defaultValue={props.defaultValue}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "0.211rem",
                  backgroundColor: "#4b5563",
                  color: "#000"
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  marginTop: 0
                }),
                multiValueLabel: (baseStyles) => ({
                  ...baseStyles,
                  color: "#000",
                  backgroundColor: "#c7c5c5"
                }),
                multiValueRemove: (baseStyles) => ({
                  ...baseStyles,
                  display: "none"
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
            />
            {error && (
              <Typography color="error" fontSize={12}>
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  )
}
