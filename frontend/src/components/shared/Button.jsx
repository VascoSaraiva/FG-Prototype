import React from 'react'
import { Button as ButtonComponent } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function Button(props) {

  const {
    type = 'button',
    onClick,
    className,
    tooltip,
    tooltipContent,
    variant,
    size,
    font,
    icon,
    text,
    form,
    disabled
  } = props

  const button = (
    <ButtonComponent
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
      variant={variant}
      size={size}
      font={font}
      form={form}
    >
      {icon} {text}
    </ButtonComponent>
  )

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    )
  }

  return button
}

export default Button