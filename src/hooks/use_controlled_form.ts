import { FieldValues, useForm, UseFormProps } from "react-hook-form"

import useUnloadEvent from "@hooks/use_unload_event"

export default function useControlledForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues
>(props?: UseFormProps<TFieldValues, TContext>, checkDirty: boolean = true) {
  const form = useForm<TFieldValues, TContext, TTransformedValues>(props)

  useUnloadEvent(() => checkDirty && form.formState.isDirty)

  return form
}
