import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { irBlack } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Button from '@/components/shared/Button';
import { Copy, RotateCw, LoaderCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CodeBlock = ({ title = 'title', type, setType, setOpen, data, fetchStatus, status, error, disabled }) => {

    const header = (
        <div className='flex font-medium items-center justify-between px-5 py-2 text-neutral-400'>
            <p className='text-sm'>{title}</p>
            <div className='flex gap-2'>

                <Button
                    variant='ghost'
                    size='sm'
                    icon={<RotateCw />}
                    text='Regenerate'
                    tooltip={true}
                    tooltipContent='Regenerate response'
                />

                <Button
                    variant='ghost'
                    size='sm'
                    icon={<Copy />}
                    text='Copy'
                    tooltip={true}
                    tooltipContent='Copy to clipboard'
                />

            </div>
        </div>
    )

    const handleClick = () => {
        setOpen(true)
        setType(type)
    }

    // console.log(fetchStatus)
    // console.log(status)

    return (
        <div className='flex flex-col rounded-md border-[0.5px] shadow-xs relative bg-black border-neutral-800 w-full h-full overflow-hidden'>
            {header}

            {fetchStatus === 'fetching' && (
                <div className='flex items-center justify-center h-full animate-spin'><LoaderCircle size={35} /></div>
            )}

            {fetchStatus !== 'fetching' && status === 'success' && (
                <div className='relative overflow-auto scrollbar scrollbar-w-2 scrollbar-h-2 scrollbar-thumb-neutral-700 scrollbar-thumb-rounded scrollbar-hover:bg-neutral-300'>

                    <div className='sticky flex gap-2.5 flex-wrap top-2 left-0 right-0 px-4.5'>
                        <Badge variant='secondary'>Concurso</Badge>
                        <Badge variant='secondary'>Killers</Badge>
                    </div>

                    <SyntaxHighlighter customStyle={{ width: 'fit-data', overflow: 'unset', padding: '2rem 1.3rem 7rem 1.3rem' }} style={irBlack} language='json'>
                        {JSON.stringify(data, null, 2)}
                    </SyntaxHighlighter>
                </div>
            )}

            <div className='flex flex-col gap-2 mt-2 m-6 bg-background absolute left-0 right-0 bottom-0'>
                <Button
                    onClick={handleClick}
                    disabled={disabled}
                    variant='default'
                    size='xl'
                    text='Run prompt'
                />
            </div>


        </div >
    )
}

export default CodeBlock