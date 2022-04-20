import Head from "next/head";
import { Header } from "@/components/Dashboard/Layout"
import { useSession, signIn, signOut } from "next-auth/react"
import { AvatarCell, MultiSelectColumnFilter, TableData } from "@/components/Dashboard/Table";

import React from 'react'
import { useUsers } from "@/lib/users";
import { DotsLoader } from "@/components/Dashboard/Loaders";
import { SkeletonTableData } from "@/components/Dashboard/Skeleton";

const UsersPage = () => {
   

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
                accessor: 'UserRole',
                Cell: ({value})=>{
                    const { name }= value
                    return name;
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

    const { users  , isLoading, isError } = useUsers()
    

    if(isLoading) return <SkeletonTableData/>
   console.log(users)
    const data = users
    
    

    return (
        <>
            <Head>
                <title>Users</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Users" items={items} />
            <div className="mt-10 bg-white  rounded-md px-6 py-6 text-xs">
                <TableData columns={columns} data={data} />
            </div>
        </>
    )
}

export default UsersPage;