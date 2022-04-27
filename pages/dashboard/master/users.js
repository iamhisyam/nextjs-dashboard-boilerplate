import Head from "next/head";
import { Header } from "@/components/Dashboard/Layout"
import { AvatarCell, MultiSelectColumnFilter, TableData } from "@/components/Dashboard/Table";
import React from 'react'
import { useUsers } from "@/lib/users";
import { SkeletonTableData } from "@/components/Dashboard/Skeleton";
import ModalUserForm from "@/page-components/Dashboard/master/users/ModalForm";
import { useState } from "react";
import ModalDelete from "@/page-components/Dashboard/master/users/ModalDelete";
import ModalDeleteBulk from "@/page-components/Dashboard/master/users/ModalDeleteBulk";
import { Badge } from "@mantine/core";


const UsersPage = () => {

    const [opened, setOpened] = useState(false)
    const [deleteOpened, setDeleteOpened] = useState(false)
    const [deleteBulkOpened, setDeleteBulkOpened] = useState(false)
    const [selectData, setSelectData] = useState({})
    const [selectDatas, setSelectDatas] = useState([])



    const items = [
        { title: " Dashboard", href: "#" },
        { title: " Master", href: "#" },
        { title: " Users", href: "#" },
    ]

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                imgAccessor: 'image',
                Cell: AvatarCell
            },
            {
                Header: 'Email',
                accessor: 'email',

            },
            {
                Header: 'Role',
                accessor: 'userRole.code',
                Cell: ({ value }) => {
                    if (!value) return "";
               
                    return <Badge color="blue" variant="outline">{value}</Badge>;
                },
                Filter: MultiSelectColumnFilter,
                filter: "includesSome",

            },
            {
                Header: 'Login',
                accessor: 'login_at',
                disableFilters: true
            },
            {
                Header: 'Joined Date',
                accessor: 'joined_at',
                disableFilters: true
            },
        ]
    )


    const handleEditData = ({ original }) => {
        //open modal
        setOpened(true);
        setSelectData(original)

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

    const { users, isLoading, isError, mutate } = useUsers()


    if (isLoading) return <SkeletonTableData />

    return (
        <>
            <Head>
                <title>Users</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Users" items={items} />
            <ModalDeleteBulk opened={deleteBulkOpened} setOpened={setDeleteBulkOpened} data={selectDatas} mutate={mutate} />
            <ModalDelete opened={deleteOpened} setOpened={setDeleteOpened} data={selectData} mutate={mutate} />
            <ModalUserForm opened={opened} setOpened={setOpened} data={selectData} mutate={mutate} />
            <div className="mt-10 bg-white  rounded-md px-6 py-6 text-xs">
                <TableData
                    columns={columns}
                    data={users}
                    handleEditData={handleEditData}
                    handleAddData={handleAddData}
                    handleDeleteData={handleDeleteData}
                    handleDeleteBulk={handleDeleteBulk}
                />
            </div>
        </>
    )
}

export default UsersPage;