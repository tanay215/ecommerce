import React, { Fragment } from 'react'
import { ChartNoAxesCombined } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBasket, Folders } from 'lucide-react';
import { Sheet,SheetContent,SheetHeader, SheetTitle } from '../ui/sheet';

export const adminSideBarMenuItems =[
    {
        id:'dashboard',
        label:'Dashboard',
        path:'/admin/dashboard',
        icons: <LayoutDashboard />
    },
    {
        id:'products',
        label:'Products',
        path:'/admin/products',
        icons:<ShoppingBasket />
    },
    {
        id:'orders',
        label:'Orders',
        path:'/admin/orders',
        icons:<Folders />
    },
]

function MenuItems({setOpen}){

    const navigate = useNavigate()

    return <nav className='mt-8 flex-col flex gap-2 cursor-pointer'>
        {
            adminSideBarMenuItems.map(menuItem=> 
                <div className='flex text-2xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground' key={menuItem.id} 
                onClick={()=>{
                    navigate(menuItem.path)
                    setOpen?setOpen(false):null
                }}>
                    {menuItem.icons}
                    <span>{menuItem.label}</span>
                </div>
            )
        }
    </nav>
}

function AdminSideBar({open, setOpen}){

    const navigate = useNavigate()
    

    return(
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side='left' className='w-64 '>
                    <div
                    className='flex flex-col h-full'>
                        <SheetHeader className='border-b'>
                                   
                            <SheetTitle className='flex gap-2'><ChartNoAxesCombined />Admin Panel</SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen}/>
                    </div>
                </SheetContent>
            </Sheet>

            <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
                <div onClick={()=>navigate("/admin/dashboard")} className='flex items-center gap-2 cursor-pointer'>
                    <ChartNoAxesCombined />
                    <h1 className='text-xl font-extrabold'>Admin Panel</h1>
                </div>
                <MenuItems setOpen={setOpen}/>
            </aside>
        </Fragment>
    )
}

export default AdminSideBar;