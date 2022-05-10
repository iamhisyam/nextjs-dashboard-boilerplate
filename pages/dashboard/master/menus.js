import Head from "next/head";
import { Header } from "@/components/Dashboard/Layout"
import { TableData } from "@/components/Dashboard/Table/TableData";
import React, { useCallback, useEffect, useState } from 'react'

import ModalUserForm from "@/page-components/Dashboard/master/menus/ModalForm";
import ModalDelete from "@/page-components/Dashboard/master/menus/ModalDelete";
import ModalDeleteBulk from "@/page-components/Dashboard/master/menus/ModalDeleteBulk";

import { Badge } from "@mantine/core";
import { useMenus } from '@/lib/menus'


const MenusPage = () => {



    const [opened, setOpened] = useState(false)
    const [deleteOpened, setDeleteOpened] = useState(false)
    const [deleteBulkOpened, setDeleteBulkOpened] = useState(false)
    const [selectData, setSelectData] = useState({})
    const [selectDatas, setSelectDatas] = useState([])

    const items = [
        { title: " Dashboard", href: "#" },
        { title: " Master", href: "#" },
        { title: " Menus", href: "#" },
    ]

    const  { menus, isLoading, isError, mutate} = useMenus()
  
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Slug',
                accessor: 'slug',

            },
            {
                Header: 'Icon Name',
                accessor: 'iconName',
                Cell: ({ value }) => {

                    if (!value) return "";

                    return <Badge color="gray" variant="outline">{value}</Badge>;
                }

            },
            {
                Header: 'Authorization',
                accessor: 'menuAuths',
                Cell: ({ value }) => {

                    if (value.length<=0) return "";

                    return value.map(({userRoleCode})=>{
                       return <Badge key={userRoleCode} color="blue" ml="xs" variant="outline">{userRoleCode}</Badge>;
                    }) 
                }

            },
 
        ]
    )


    const handleEditData = ({ original }) => {
        //open modal
        setOpened(true);
        const userRoleCode = original.menuAuths.map(item=>{
            return item.userRoleCode
         })
         const parentMenuId = original.parentMenuId && original.parentMenuId.toString()
         const updatedData = {...original,userRoleCode,parentMenuId}
        setSelectData(updatedData)

    }

    const handleAddData = () => {
        //open modal
        setOpened(true);
        setSelectData({})

    }

    const handleDeleteData = ({ original }) => {
        //open modal
        setDeleteOpened(true);
        setSelectData(original)

    }

    const handleDeleteBulk = (selectedItems) => {
        //open modal
        setDeleteBulkOpened(true);
        setSelectDatas(selectedItems)
    }

    

    return (
        <>
            <Head>
                <title>Menus</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Menus" items={items} />
             <ModalDeleteBulk opened={deleteBulkOpened} setOpened={setDeleteBulkOpened} data={selectDatas} mutate={mutate} />
            <ModalDelete opened={deleteOpened} setOpened={setDeleteOpened} data={selectData} mutate={mutate} />
            <ModalUserForm opened={opened} setOpened={setOpened} data={selectData} mutate={mutate} />
            <div className="mt-10 bg-white  rounded-md px-6 py-6 text-xs">
                <TableData
                    columns={columns}
                    data={menus}

                    handleEditData={handleEditData}
                    handleAddData={handleAddData}
                    handleDeleteData={handleDeleteData}
                    handleDeleteBulk={handleDeleteBulk}
                    

                />
            </div> 
        </>
    )
}

export default MenusPage;