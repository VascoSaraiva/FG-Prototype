import React from 'react'
import { Button } from "@/components/ui/button"
import { Copy } from 'lucide-react';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const CopyButton = () => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant='ghost' size='sm'><Copy /> Copy</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Copy to clipboard</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default CopyButton