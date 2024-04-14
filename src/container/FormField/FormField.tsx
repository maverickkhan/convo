import type { ChangeEvent } from "react"
import { cloneElement } from "react"
import type { ControllerRenderProps, FieldError, FieldValues, Path } from "react-hook-form"
import { Controller } from "react-hook-form"
import type { FormFieldProps } from "./FormField.interfaces"

interface getPropsPrams<T extends FieldValues = FieldValues> {
  element?: JSX.Element
  field: ControllerRenderProps<T, Path<T>>
  error?: FieldError
  change: (event: ChangeEvent<HTMLInputElement & HTMLSelectElement>, ...rest: any[]) => void
  transformValue?: (value: any) => any
  disabled?: boolean
}

const getProps = <T extends FieldValues = FieldValues>({
  change,
  field,
  element,
  disabled,
  error,
  transformValue,
}: getPropsPrams<T>) => ({
  ...field,
  error,
  disabled,
  onChange: change,
  value: transformValue ? transformValue(field.value) : field.value,
  ...(element?.type?.propTypes?.checked && {
    checked: transformValue ? transformValue(field.value) : field.value,
  }),
})

export const FormField = <T extends FieldValues = FieldValues>(props: FormFieldProps<T>): JSX.Element => {
  const {
    ExtraElement,
    className,
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    label,
    children,
    infoText,
    transformChange,
    transformValue,
    onChange,
    hideError,
    noLabelTag,
    keepErrorSpace,
    disabled,
    disableController,
    ...rest
  } = props

  if (!control) throw `control in missing in ${name}`

  return (
    <Controller
      disabled={disableController}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState: { error } }) => {
        const change = (event: ChangeEvent<HTMLInputElement & HTMLSelectElement>, ...rest: any[]) => {
          const prev = field.value
          let val: any = event
          if (event.target) {
            const { type, checked, value, files } = event.target
            val = type === "checkbox" ? checked : type === "file" ? files : value
          }
          onChange?.(val, prev, ...rest)
          return field.onChange(transformChange ? transformChange(val, prev, ...rest) : val, ...rest)
        }

        const Wrapper = noLabelTag ? "div" : "label"

        return (
          <Wrapper className={`block ${className}`} {...rest}>
            {label &&
              (typeof label === "string" ? (
                <div className="mb-2 font-semibold">{label}</div>
              ) : (
                cloneElement(label, { className: `mb-1 font-semibold ${label.props.className}` })
              ))}

            {typeof children === "function"
              ? children(getProps({ field, error, change, transformValue, disabled }))
              : Array.isArray(children)
                ? cloneElement(
                    children[0],
                    getProps({ element: children[0], field, error, change, transformValue, disabled }),
                  )
                : cloneElement(
                    children,
                    getProps({ element: children, field, error, change, transformValue, disabled }),
                  )}

            {(!hideError || infoText) && (
              <div className={`flex items-center text-xs ${infoText ? "justify-between" : "justify-center"}`}>
                {!hideError && (
                  <div
                    className={`text-red-600 transition-[height,opacity] ${
                      keepErrorSpace
                        ? "mt-1 h-[1.5em] opacity-100"
                        : error?.message
                          ? "mt-1 opacity-100"
                          : "h-0 opacity-0"
                    }`}
                  >
                    {error?.message}
                  </div>
                )}
                {infoText && <div className="text-muted-foreground mt-1">{infoText}</div>}
              </div>
            )}
            {ExtraElement?.(getProps({ field, error, change, transformValue, disabled }))}
          </Wrapper>
        )
      }}
    />
  )
}
