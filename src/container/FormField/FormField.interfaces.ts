import type { HTMLAttributes, ReactNode } from "react"
import type { ControllerRenderProps, FieldError, FieldValues, Path, UseControllerProps } from "react-hook-form"
import { Require } from "../../../types/types"

type ExtraElement<ControllerProps extends FieldValues> = (
  values: ControllerRenderProps<ControllerProps, FormFieldProps<ControllerProps>["name"]>,
) => ReactNode | ReactNode[]

export type FormFieldChildren<ControllerProps extends FieldValues = FieldValues> = {
  error?: FieldError
  checked?: ControllerRenderProps["value"]
} & ControllerRenderProps<ControllerProps, Path<ControllerProps>>

export type FormFieldChildrenFn<ControllerProps extends FieldValues = FieldValues> = (
  props: FormFieldChildren<ControllerProps>,
) => JSX.Element

export interface FormFieldProps<ControllerProps extends FieldValues = FieldValues>
  extends Require<UseControllerProps<ControllerProps>, "control">,
    Omit<HTMLAttributes<HTMLDivElement | HTMLLabelElement>, "defaultValue" | "children" | "onChange"> {
  ExtraElement?: ExtraElement<ControllerProps>
  label?: string | JSX.Element
  infoText?: string | JSX.Element
  hideError?: boolean
  noLabelTag?: boolean
  keepErrorSpace?: boolean
  disableController?: boolean
  transformChange?: (value: ControllerRenderProps["value"], ...rest: any) => ControllerRenderProps["value"]
  transformValue?: (value: ControllerRenderProps["value"]) => ControllerRenderProps["value"]
  onChange?: (value: ControllerRenderProps["value"], ...rest: any) => void
  children: JSX.Element | FormFieldChildrenFn<ControllerProps>
  className?: string
}

export interface FormFieldSwitcherProps
  extends Partial<FormFieldChildren>,
    Omit<
      Partial<FormFieldProps>,
      | "name"
      | "onBlur"
      | "onChange"
      | "ref"
      | "value"
      | "checked"
      | "disabled"
      | "error"
      | "noLabelTag"
      | "rules"
      | "className"
      | "keepErrorSpace"
      | "control"
      | "shouldUnregist"
      | "transformChange"
      | "transformValue"
      | "shouldUnregister"
    >,
    Record<string, any> {
  editting?: boolean
  renderValue?: (props: FormFieldSwitcherProps) => JSX.Element
}
