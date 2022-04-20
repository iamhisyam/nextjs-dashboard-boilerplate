import Head from "next/head";
import { Header } from "@/components/Dashboard/Layout"
import { useSession, signIn, signOut } from "next-auth/react"
import { MultiSelectColumnFilter, TableData } from "@/components/Dashboard/Table";

import React from 'react'

const UsersPage = () => {
    const { data: session } = useSession()
    const items = [
        { title: " Dashboard", href: "#" },
        { title: " Master", href: "#" },
        { title: " Users", href: "#" },
    ]

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'email'
            },
            {
                Header: 'Role',
                accessor: 'role',
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

    const data = React.useMemo(
        () => [
            {
                email: "ahmad@gmail.com",
                role: "Admin",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "hisyam@gmail.com",
                role: "Hisyam",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "ahmad@gmail.com",
                role: "Admin",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "hisyam@gmail.com",
                role: "Hisyam",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "ahmad@gmail.com",
                role: "Admin",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "hisyam@gmail.com",
                role: "Hisyam",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "ahmad@gmail.com",
                role: "Admin",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "hisyam@gmail.com",
                role: "Hisyam",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "ahmad@gmail.com",
                role: "Admin",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "hisyam@gmail.com",
                role: "Hisyam",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "ahmad@gmail.com",
                role: "Admin",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
            {
                email: "hisyam@gmail.com",
                role: "Hisyam",
                login_at: "22 November 2022 17:50",
                joined_at: "22 November 2022 17:50"
            },
        ]
    )

    return (
        <>
            <Head>
                <title>Users</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Users" items={items} />
            <div className="mt-10 bg-white  rounded-md px-6 py-6 text-xs">
                <TableData columns={columns} data={data}/>
            </div>
        </>
    )
}

export default UsersPage;