import React, { useState, Fragment } from 'react'
import CodeBlock from '@/components/CodeBlock';
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from './components/ui/resizable';
import Dialog from '@/components/shared/Dialog';
import Button from '@/components/shared/Button';
import Form from '@/components/shared/Form';
import Input from '@/components/shared/Input';
import { z } from "zod";
import ENDPOINTS from '@/api/endpoints';
import api from '@/api/axios';
import { useQuery } from '@tanstack/react-query';

function App() {

    const [params, setParams] = useState({})

    const fetchInitiativeStructure = async () => {
        try {
            const { data } = await api.get(ENDPOINTS.INITIATIVE.GET.STRUCTURE, { params })
            console.log('Fetched data:', data)
            return data
        } catch (error) {
            console.error('Error fetching data:', error)
            throw error
        }
    }


    const fetchNarrativeIngredients = async () => {
        try {
            const { data } = await api.get(ENDPOINTS.NARRATIVE.GET.INGREDIENTS, { params })
            console.log('Fetched data:', data)
            return data
        } catch (error) {
            console.error('Error fetching data:', error)
            throw error
        }
    }


    const fecthNarrativeMoments = async () => {
        try {
            const { data } = await api.get(ENDPOINTS.NARRATIVE.GET.MOMENTS, { params })
            console.log('Fetched data:', data)
            setParams({})
            return data
        } catch (error) {
            console.error('Error fetching data:', error)
            throw error
        }
    }



    const {
        fetchStatus: initiativeStructureFetchStatus,
        status: initiativeStructureStatus,
        data: initiativeStructureData,
        error: initiativeStructureError,
        refetch: initiativeStructureRefetch
    } = useQuery({
        queryKey: ['initiativeStructure'],
        queryFn: fetchInitiativeStructure,
        enabled: false
    })

    const {
        fetchStatus: narrativeIngredientsFetchStatus,
        status: narrativeIngredientsStatus,
        data: narrativeIngredientsData,
        error: narrativeIngredientsError,
        refetch: narrativeIngredientsRefetch
    } = useQuery({
        queryKey: ['narrativeIngredients'],
        queryFn: fetchNarrativeIngredients,
        enabled: false
    })

    const {
        fetchStatus: narrativeMomentsFetchStatus,
        status: narrativeMomentsStatus,
        data: narrativeMomentsData,
        error: narrativeMomentsError,
        refetch: narrativeMomentsRefetch
    } = useQuery({
        queryKey: ['narrativeMoments'],
        queryFn: fecthNarrativeMoments,
        enabled: false
    })

    const panels = [
        {
            title: 'Initiative Structure',
            type: 'i',
            form: true,
            schema: z.object({
                typology: z.string().min(2, {
                    message: "Typology must be at least 2 characters.",
                }).optional(),
                area: z.string().min(2, {
                    message: "Areas must be at least 2 characters.",
                }).optional(),
                education: z.string().min(2, {
                    message: "Education level must be at least 2 characters.",
                }).optional(),
                player: z.string().min(2, {
                    message: "Player type must be at least 2 characters.",
                }).optional(),
                objective: z.string().min(2, {
                    message: "Objective must be at least 2 characters.",
                }).optional(),
            }),
            fields: (
                <div className='grid gap-6 py-4'>
                    <Input name='typology' label='Typology' placeholder='Ex: Concurso' />
                    <Input name='objective' label='Objective' placeholder='Tornar o espaço da escola mais sustentável.' />
                    <Input name='area' label='Areas' placeholder='Ex: [Ciências, Biologia, Atividade Física]' />
                    <Input name='education' label='Educational Level' placeholder='Ex: Ensino Superior' />
                    <Input name='player' label='Player Type' placeholder='Ex: Killer' />
                </div>
            ),
            query: {
                fetchStatus: initiativeStructureFetchStatus,
                status: initiativeStructureStatus,
                data: initiativeStructureData,
                error: initiativeStructureError,
                refetch: initiativeStructureRefetch
            },
            data: initiativeStructureData,
            error: initiativeStructureError,
            refetch: initiativeStructureRefetch,
            status: initiativeStructureStatus,
            fetchStatus: initiativeStructureFetchStatus,
        },
        {
            title: 'Narrative Ingredients',
            type: 'n',
            form: false,
            query: {
                fetchStatus: narrativeIngredientsFetchStatus,
                status: narrativeIngredientsStatus,
                data: narrativeIngredientsData,
                error: narrativeIngredientsError,
                refetch: narrativeIngredientsRefetch
            },
            data: narrativeIngredientsData,
            error: narrativeIngredientsError,
            refetch: narrativeIngredientsRefetch,
            status: narrativeIngredientsStatus,
            fetchStatus: narrativeIngredientsFetchStatus,
        },
        {
            title: 'Story Moments',
            type: 'm',
            form: false,
            query: {
                fetchStatus: narrativeMomentsFetchStatus,
                status: narrativeMomentsStatus,
                data: narrativeMomentsData,
                error: narrativeMomentsError
            },
            data: narrativeMomentsData,
            error: narrativeMomentsError,
            refetch: narrativeMomentsRefetch,
            status: narrativeMomentsStatus,
            fetchStatus: narrativeMomentsFetchStatus,
        }
    ]

    const [open, setOpen] = useState(false)
    const [type, setType] = useState(panels[0].type)

    const currentPanel = panels.find(panel => panel.type === type)

    const onSubmit = (data) => {
        setOpen(false)
        setParams(data)
        setTimeout(() => currentPanel.refetch(), 0)
    }

    const onClick = () => {
        setOpen(false)
        currentPanel.refetch()
    }

    console.log(initiativeStructureFetchStatus, initiativeStructureStatus)

    const checkDisabled = (type) => {
        switch (type) {
            case 'i':
                return false
            case 'n':
                return initiativeStructureStatus !== 'success' || panels.some(panel => panel.fetchStatus === 'fetching')
            case 'm':
                return initiativeStructureStatus !== 'success' || narrativeIngredientsStatus !== 'success' || panels.some(panel => panel.fetchStatus === 'fetching')
        }
    }

    return (
        <>

            <ResizablePanelGroup direction='horizontal'>

                {panels.map((panel, index) => (
                    <Fragment key={index}>
                        <ResizablePanel className='px-6 flex'>
                            <div className='flex flex-col flex-1 overflow-hidden'>
                                <CodeBlock
                                    type={panel.type}
                                    setType={setType}
                                    title={panel.title}
                                    data={panel.data}
                                    fetchStatus={panel.fetchStatus}
                                    status={panel.status}
                                    error={panel.error}
                                    setOpen={setOpen}
                                    disabled={checkDisabled(panel.type)}
                                />
                            </div>
                        </ResizablePanel>

                        {index < panels.length - 1 && <ResizableHandle withHandle />}
                    </Fragment>
                ))}

            </ResizablePanelGroup>

            <Dialog
                open={open}
                onOpenChange={setOpen}
                className='sm:max-w-[425px]'
                title={`Generate ${currentPanel.title}`}
                description='Fill out the form to define any prompt fields, or leave it empty to proceed without customization.'
                content={currentPanel.form && (
                    <Form
                        id='generate-prompt'
                        schema={currentPanel.schema}
                        defaultValues={{}}
                        onSubmit={onSubmit}
                    >
                        {currentPanel.fields}
                    </Form>
                )}
                footer={
                    <div className='grid w-full mt-1'>
                        <Button
                            onClick={!currentPanel.form ? onClick : undefined}
                            form={currentPanel.form ? 'generate-prompt' : undefined}
                            type={currentPanel.form ? 'submit' : 'button'}
                            text='Generate now'
                        />
                    </div>
                }
            />

        </>

    )
}

export default App
