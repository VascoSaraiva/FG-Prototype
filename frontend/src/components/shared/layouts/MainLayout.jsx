import React from 'react'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <main className='max-h-screen h-screen p-4 flex flex-col overflow-hidden'> 
            <Outlet />
        </main>
    )
}

export default MainLayout