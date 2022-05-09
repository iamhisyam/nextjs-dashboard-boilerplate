import Head from "next/head";
import { Header } from "@/components/Dashboard/Layout"
import { AvatarCell, MultiSelectColumnFilter, TableDataDynamic } from "@/components/Dashboard/Table/TableDataDynamic";
import React, { useCallback, useEffect, useState } from 'react'
import { useUsers } from "@/lib/users";
import { SkeletonTableData } from "@/components/Dashboard/Skeleton";
import ModalUserForm from "@/page-components/Dashboard/master/userspage/ModalForm";

import ModalDelete from "@/page-components/Dashboard/master/userspage/ModalDelete";
import ModalDeleteBulk from "@/page-components/Dashboard/master/userspage/ModalDeleteBulk";
import { Badge } from "@mantine/core";
import { fetcher } from "@/lib/fetch";
import { useUserRoles } from "@/lib/users";





const UsersPage = () => {



    const [opened, setOpened] = useState(false)
    const [deleteOpened, setDeleteOpened] = useState(false)
    const [deleteBulkOpened, setDeleteBulkOpened] = useState(false)
    const [selectData, setSelectData] = useState({})
    const [selectDatas, setSelectDatas] = useState([])


    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [pageCount, setPageCount] = useState(0)

    const [filters, setFilters] = useState([])
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sortBy, setSortBy] = useState([])
    const [globalFilter, setGlobalFilter] = useState("")


    const [loadingData, setLoadingData] = useState(true)
    const fetchIdRef = React.useRef(0)

    const { userRoles, isLoading, isError } = useUserRoles()

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
                accessor: 'userRoleCode',
                Cell: ({ value }) => {

                    if (!value) return "";

                    return <Badge color="blue" variant="outline">{value}</Badge>;
                },
                Filter: MultiSelectColumnFilter,
                filter: "includesSome",
                options: userRoles.map(({ code, name }) => ({ label: name, value: code }))


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



    const fetchData = useCallback(async ({
        pageSize,
        pageIndex,
        sortBy,
        globalFilter,
        filters,

    }) => {
        setPageSize(pageSize)
        setPageIndex(pageIndex)
        setFilters(filters)
        setGlobalFilter(globalFilter)
        setSortBy(sortBy)

    }, [])

    useEffect(() => {
        const clearMode = (!filters.length && !globalFilter) ? true : false;
        if (clearMode) applyFilters()
    }, [filters, globalFilter])

    useEffect(() => {
        let isMounted = true;
        if (isMounted) applyFilters();
        return () => { isMounted = false };
    }, [pageSize, pageIndex, sortBy])


    const applyFilters = async () => {

        const fetchId = ++fetchIdRef.current

        if (fetchId === fetchIdRef.current) {

            setLoadingData(true)
            const startRow = pageIndex * pageSize;

            const globalFilterValue = columns.filter(item => !item.disableFilters).map(({ accessor }) => ({
                [accessor]: {
                    contains: globalFilter,
                    mode: 'insensitive'
                }
            }))

            const sort = sortBy.map(({ id, desc }) => {
                return { [id]: desc ? "desc" : "asc" }
            })

            const filterValues = filters.map(({ id, value }) => {
                return {
                    [id]: {
                        ...(!Array.isArray(value) ? { contains: value } : { in: value }),
                        mode: 'insensitive'
                    }
                }
            })

            //add condition to check is it filtering or not
            const searchingMode = (filterValues.length || globalFilter) ? true : false;

            const { users, count } = await fetcher(
                //reset row to 0 if this search mode
                `/api/users?row=${searchingMode ? 0 : startRow}
                    &limit=${pageSize}
                    &filter=${filterValues.length && JSON.stringify(filterValues) || null}
                    &sort=${JSON.stringify(sort)}
                    &global=${globalFilter && JSON.stringify(globalFilterValue) || null}`)


            setData(users)
            setCount(count)
            setPageCount(Math.ceil(count / pageSize))
            setLoadingData(false)
        }
    }


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

    // if (loadingData) return <SkeletonTableData />

    return (
        <>
            <Head>
                <title>Users</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Users" items={items} />
            <ModalDeleteBulk opened={deleteBulkOpened} setOpened={setDeleteBulkOpened} data={selectDatas} mutate={applyFilters} />
            <ModalDelete opened={deleteOpened} setOpened={setDeleteOpened} data={selectData} mutate={applyFilters} />
            <ModalUserForm opened={opened} setOpened={setOpened} data={selectData} mutate={applyFilters} />
            <div className="mt-10 bg-white  rounded-md px-6 py-6 text-xs">
                <TableDataDynamic
                    columns={columns}
                    data={data}
                    handleEditData={handleEditData}
                    handleAddData={handleAddData}
                    handleDeleteData={handleDeleteData}
                    handleDeleteBulk={handleDeleteBulk}
                    fetchData={fetchData}
                    pageCount={pageCount}
                    manualPagination={true}
                    count={count}
                    applyFilters={applyFilters}
                    loading={loadingData}

                />
            </div>
        </>
    )
}

export default UsersPage;