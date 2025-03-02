import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"


function Dialog(props) {

  const {
    open = false,
    onOpenChange,
    className,
    trigger,
    title,
    description,
    content,
    footer,
  } = props


  return (
    <DialogComponent open={open} onOpenChange={onOpenChange}>

      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className={className}>


        {(title || description) &&
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        }

        {content}
        {footer && <DialogFooter>{footer}</DialogFooter>}

      </DialogContent>
    </DialogComponent>

  )
}

Dialog.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  trigger: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.node,
  footer: PropTypes.node,
}

export default Dialog