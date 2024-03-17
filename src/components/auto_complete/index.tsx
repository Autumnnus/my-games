import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useId, useState } from "react"
import { Control, Controller, FieldValues } from "react-hook-form"

import { TextInputProps } from "@components/text_input"
import { INPUT_LABEL_BLUR, PRIMARY } from "@constants/colors"
import useTranslate from "@hooks/use_translate"
import { toArray } from "@utils/functions/to_array"

import styles from "./styles"

type AutoCompleteInputProps = {
  selectOptions: { label: string; value: number | string }[]
}

export default function AutoCompleteInput<T extends FieldValues>(
  props: TextInputProps<T> & AutoCompleteInputProps
) {
  const [isFocus, setIsFocus] = useState(false)
  const componentId = useId()
  const { translate } = useTranslate()

  function onFocus(event: React.FocusEvent<HTMLInputElement>) {
    setIsFocus(true)
    props?.onFocus && props?.onFocus(event)
  }

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    setIsFocus(false)
    props?.onBlur && props?.onBlur(event)
  }

  return (
    <Box sx={styles.container}>
      <Controller<FieldValues>
        name={props.name}
        control={props.control as unknown as Control<FieldValues>}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <InputLabel
              sx={{
                ...styles.labelContainer,
                color: isFocus ? PRIMARY : INPUT_LABEL_BLUR
              }}
              error={!!error}
              htmlFor={componentId}
              required={props?.required}
            >
              <Typography>{props.label}</Typography>
            </InputLabel>

            <Autocomplete<{ label: string; value: number | string }>
              options={props.selectOptions || []}
              disabled={props.disabled}
              disableClearable={true as unknown as false}
              noOptionsText={translate("no_options")}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} placeholder={props.placeholder} />
              )}
              onChange={(_, selectedOption) => {
                onChange({ target: { value: selectedOption?.value } })
              }}
              value={toArray(props.selectOptions).find(
                (option) => option.value === value
              )}
              onFocus={onFocus}
              onBlur={onBlur}
              id={componentId}
              sx={{
                "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                  pt: 0,
                  pl: 0,
                  pb: 0
                },
                " input": {
                  padding: "7px 4px!important"
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: error ? "#d32f2f" : undefined
                },
                ".MuiSelect-select caption": {
                  color: "text.disabled"
                },
                ...props?.sx
              }}
            />
            <FormHelperText
              error={!!error}
              sx={{ display: !!error ? "block" : "none" }}
            >
              {error ? error?.message : <></>}
            </FormHelperText>
          </>
        )}
      />
    </Box>
  )
}
