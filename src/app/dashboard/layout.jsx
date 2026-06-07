import { DashboardSidebar } from '@/Components/dashboard/DashboardSidebar'
import React from 'react'


const DashboardLayout = ({ children }) => {
    return (
        <div className='mt-20 flex min-h-screen'>

            <DashboardSidebar />
            <div className="flex-1"> {children}</div>
        </div>
    )
}

export default DashboardLayout