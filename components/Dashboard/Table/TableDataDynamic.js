import React, { useState, useReducer } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { Group, Table, Input, Text, Button, Popover, Stack, InputWrapper, TextInput, MultiSelect, Checkbox, Pagination, Select, Avatar, ActionIcon } from '@mantine/core'
import { ArrowsSort, SortAscending, SortDescending, Search, Filter, NewSection, Trash, Edit } from 'tabler-icons-react'
import { matchSorter } from 'match-sorter';
import { useMediaQuery } from '@mantine/hooks';
import { SkeletonTableData } from '../Skeleton';


const GlobalFilter = ({
    globalFilter,
    setGlobalFilter,
    count,

}) => {
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || "")
    }, 50)


    return (
        <Group>

            <Text size='sm' color="gray" weight={700}>Search </Text>
            <Input
                placeholder={`${count} records...`}
                value={globalFilter || ""}
                onChange={e => {

                    onChange(e.target.value);
                }}
                icon={<Search size={16}
                />} />
        </Group>
    )
}

export const AvatarCell = ({ value, column, row }) => {
    return <Group>
        <Avatar radius="xl" src={row.original[column.imgAccessor]} />
        <Text size='sm'>{value}</Text>
    </Group>
}

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <Checkbox ref={resolvedRef} {...rest} />
            </>
        )
    }
)

const DefaultColumnFilter = ({ column: { Header, filterValue, preFilteredRows, setFilter } }) => {

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 50)

    return (

        <TextInput
            label={Header}
            value={filterValue || ''}
            onChange={e => {

                onChange(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search records...`}

        />

    )
}

export const MultiSelectColumnFilter = ({ column: { Header, filterValue, setFilter, id, options } }) => {
    const data = React.useMemo(() => {
        return [...options.values()]
    }, [id, filterValue])

    return (
        <MultiSelect
            withinPortal={true}
            label={Header}
            data={data}
            value={filterValue || ''}
            clearable
            onChange={(e) => {
                setFilter(e)
            }}
        />
    )
}

const FilterForm = ({ headerGroups, opened, setOpened, isMobile, applyFilters, setAllFilters }) => {

    const items = headerGroups.map(headerGroup =>
        headerGroup.headers.filter(column => column.canFilter).map(column => {
            return <div key={column.id}>
                {column.render("Filter")}
            </div>
        }
        ));

    return (
        <Popover
            withinPortal={false}
            opened={opened}
            onClose={() => setOpened(false)}
            position="right"
            placement="end"
            withCloseButton
            title="Filter"
            transition="pop-top-right"
            width={isMobile ? 220 : 300}
            target={
                <Button onClick={() => setOpened((o) => !o)} leftIcon={<Filter />} variant="outline" color="blue">
                    Filter
                </Button>
            }
        >
            {items}
        </Popover>
    );
}


function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val



export const TableDataDynamic = ({
    columns,
    data,
    handleEditData,
    handleAddData,
    handleDeleteData,
    handleDeleteBulk,
    fetchData,
    pageCount: controlledPageCount,
    count,
    applyFilters,
    loading

}) => {
    const [opened, setOpened] = useState(false)


    const isMobile = useMediaQuery('(max-width: 755px');
    const filterTypes = React.useMemo(
        () => ({
            multiSelect: (rows, id, filterValue) => {

                if (filterValue.length === 0) return rows;

                return rows.filter((r) => {

                    return filterValue.includes(r.values[id])
                });

            },
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )


    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,

        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { globalFilter, pageIndex, pageSize, sortBy, filters, selectedRowIds },
        setGlobalFilter,
        preGlobalFilteredRows,
        selectedFlatRows,
        toggleAllRowsSelected,
        setAllFilters,

        pageCount,
        gotoPage,
        setPageSize,

    } = useTable({
        columns,
        data,
        defaultColumn,
        filterTypes,

        manualPagination: true,
        pageCount: controlledPageCount,
        autoResetPage: false,

        manualSortBy: true,
        manualGlobalFilter: true,
        manualFilters: true,
        //autoResetFilters: false


    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,


        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    disableSort: true,
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
                {
                    id: 'action',
                    disableSort: true,

                    Header: () => (
                        <div>
                            <Text size='sm'>Action</Text>
                        </div>
                    ),

                    Cell: ({ row }) => (
                        <Group>
                            <ActionIcon component={Button} onClick={() => handleEditData(row)}>
                                <Edit size={20} />
                            </ActionIcon>
                            <ActionIcon component={Button} onClick={() => handleDeleteData(row)}>
                                <Trash color="red" size={20} />
                            </ActionIcon>
                        </Group>
                    ),
                },
            ])
        },
    )

    React.useEffect(() => {

        fetchData({ pageIndex, pageSize, sortBy, globalFilter, filters })
    }, [fetchData, pageIndex, pageSize, sortBy, globalFilter, filters])




    const selectedItems = selectedFlatRows.map((item) => item.original)

    if (loading) return <SkeletonTableData />
    // Render the UI for your table
    return (
        <div>
            <Group mb={40} position='apart'>
                <Group>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        count={count}
                    />
                    <FilterForm headerGroups={headerGroups}
                        opened={opened}
                        setOpened={setOpened}
                        isMobile={isMobile}
                        count={count}
                        setAllFilters={setAllFilters}
                        applyFilters={applyFilters}
                    />
                    <Button
                        color="blue"
                        onClick={() => {
                            setGlobalFilter("")
                            setAllFilters([])
                        }}
                        variant="default">Clear</Button>
                    <Button color="blue" onClick={() => {
                        //reset page Index first

                        applyFilters()

                    }} variant="filled">Apply</Button>
                </Group>
                <Group>

                    {selectedItems.length > 0 ?
                        <Group>
                            <Text size='sm' >{selectedItems.length} Selected</Text>
                            <Button onClick={() => toggleAllRowsSelected(false)} variant="outline" color="red">
                                Clear
                            </Button>
                            <Button onClick={() => handleDeleteBulk(selectedItems)} leftIcon={<Trash />} variant="filled" color="red">
                                Delete
                            </Button>
                        </Group>
                        :
                        <Button onClick={handleAddData} leftIcon={<NewSection />} variant="filled" color="blue">
                            New
                        </Button>
                    }


                </Group>
            </Group>
            <div className='overflow-x-auto'>
                <Table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        <Group position='left'>
                                            {column.canSort ?
                                                <span>
                                                    {column.isSorted ?
                                                        column.isSortedDesc ? <SortDescending size={14} color="blue" />
                                                            : <SortAscending size={14} color="blue" />
                                                        : <ArrowsSort size={14} />
                                                    }
                                                </span> : null}
                                            {column.render('Header')}

                                        </Group>

                                    </th>

                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

            <Group position='apart' mt={40}>
                <Group >
                    <Text size='sm' color="gray" weight={700}>Page Size </Text>
                    <div className='w-16'>
                        <Select
                            size='sm'
                            value={pageSize}
                            defaultValue={`${pageSize}`}
                            onChange={(value => setPageSize(value))}
                            data={[
                                { value: "10", label: "10" },
                                { value: "25", label: "25" },
                                { value: "50", label: "50" },
                            ]}
                        />
                    </div>
                </Group>


                <Pagination
                    page={pageIndex + 1}
                    onChange={(page) => {
                        // console.log(page)
                        //setLoadingData(true)
                        gotoPage(page - 1)

                    }}
                    color="blue"
                    total={pageCount}
                    radius="md"
                    size="md"
                    withEdges
                />
            </Group>
        </div>
    )
}