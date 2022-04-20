import React, { useState } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { Group, Table, Input, Text, Button, Popover, Stack, InputWrapper, TextInput, MultiSelect, Checkbox, Pagination, Select } from '@mantine/core'
import { ArrowsSort, SortAscending, SortDescending, Search, Filter, NewSection, Trash } from 'tabler-icons-react'
import { matchSorter } from 'match-sorter';
import { useMediaQuery } from '@mantine/hooks';


const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <Group>
            
            <Text size='sm' color="gray" weight={700}>Search </Text>
            <Input
             placeholder={`${count} records...`}
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                icon={<Search size={16}
                   
                />} />
        </Group>
    )
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
    const count = preFilteredRows.length

    return (

        <TextInput
            label={Header}
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}

        />

    )
}

export const MultiSelectColumnFilter = ({ column: { Header, filterValue, preFilteredRows, setFilter, id } }) => {
    const count = preFilteredRows.length

    // using the preFilteredRows
    const data = React.useMemo(() => {
        const options = []
        preFilteredRows.forEach(row => {
            if (options.filter(function(e) { return e.value === row.values[id]; }).length > 0) {
                
              }else{
                options.push({ label: row.values[id], value: row.values[id] })
              }
            
        })

        return [...options.values()]
    }, [id, preFilteredRows])

    return (

        <MultiSelect
            withinPortal={true}
            label={Header}
            data={data}
            value={filterValue || ''}
            clearable
            onChange={(e) => { setFilter(e) }}
        />

    )
}

const FilterForm = ({ headerGroups, opened, setOpened, isMobile }) => {

    const items = headerGroups.map(headerGroup =>
        headerGroup.headers.filter(column => column.canFilter).map(column => {
            return <div key={column.id}>
                {column.render("Filter")}
            </div>
        }
        ));

    return (
        <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
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


export const TableData = ({ columns, data }) => {
    const [opened, setOpened] = useState(false)
    const isMobile = useMediaQuery('(max-width: 755px');
    const filterTypes = React.useMemo(
        () => ({
            multiSelect: (rows, id, filterValues) => {
                if (filterValues.length === 0) return rows;
                return rows.filter((r) => filterValues.includes(r.values[id]));
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
        rows,
        page,
        prepareRow,
        state: { globalFilter, pageIndex, pageSize, selectedRowIds },
        setGlobalFilter,
        preGlobalFilteredRows,
        selectedFlatRows,


        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

    } = useTable({ columns, data, defaultColumn, filterTypes },
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
            ])
        },
    )

    const selectedItems = selectedFlatRows.map((item) => item.original)
    const count = preGlobalFilteredRows.length

    // Render the UI for your table
    return (
        <div>
            <Group mb={40} position='apart'>
                <Group>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    <FilterForm headerGroups={headerGroups}
                        opened={opened}
                        setOpened={setOpened}
                        isMobile={isMobile}
                    />
                  
                    
                </Group>
                <Group>
                    
                    {selectedItems.length > 0 ?
                        <Group>
                            <Text size='sm' >{selectedItems.length} Selected</Text>
                            <Button leftIcon={<Trash />} variant="filled" color="red">
                                Delete
                            </Button>
                        </Group>
                        :
                        <Button leftIcon={<NewSection />} variant="filled" color="blue">
                            New
                        </Button>
                    }


                </Group>
            </Group>
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
            
            <Group position='apart' mt={40}>
                    <Group >
                    <Text size='sm' color="gray" weight={700}>Page Size </Text>
                    <div className='w-16'>
                    <Select
                        size='sm'
                        value={pageSize}
                        defaultValue={`${pageSize}`}
                        onChange={(value=>setPageSize(value))}
                        data={[
                            {value:"10",label:"10"},
                            {value:"25",label:"25"},
                            {value:"50",label:"50"},
                        ]}
                    />
                    </div>
                    </Group>
                    
                
                <Pagination
                    page={pageIndex + 1}
                    onChange={(page) => {
                        console.log(page)
                        gotoPage(page - 1)
                    }}
                    color="blue"
                    total={pageCount}
                    radius="md"
                    withEdges
                />
            </Group>
        </div>
    )
}