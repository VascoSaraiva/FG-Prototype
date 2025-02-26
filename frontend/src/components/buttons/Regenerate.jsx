import React from 'react'
import { Button } from "@/components/ui/button"
import { RotateCw } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Regenerate = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='ghost' size='sm'><RotateCw /> Regenerate</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          Regenerate prompt
        </p>
      </TooltipContent>
    </Tooltip>

  )
}

export default Regenerate