import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import {HiOutlineEye, HiOutlinePencil, HiOutlineTrash} from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getUsers,
    setTableData,
    setSelectedProduct,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'

type Product = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
}

type Gallery = {
    id: string
    firstName:string
    lastName:string
    name: string
    img: string
    description: string
    tag: string
    createdAt: string
    updatedAt: string
}


const inventoryStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'In Stock',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Limited',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: {
        label: 'Out of Stock',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}


const ActionColumn = ({ row }: { row: Gallery }) => {


    const { avatar, userName, authority, email, access, id } = useAppSelector(
        (state) => state.auth.user
    )

    console.log("access")
    console.log(access)
    console.log("id")
    console.log(id);
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/user/view/${row.id}`)
    }


    const onEdit = () => {
        navigate(`/user/edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }
    let accessCheck = false;

    if (access === undefined) {
        accessCheck = false;
    }

    access.map((acce) => {
        if (acce.id === "accss") {
            accessCheck = true
        }
    })
    console.log(row);
    if (accessCheck || (row.id === id)) {
        return (
            <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                <HiOutlineTrash />
            </span>
            </div>
        )

    } else {
        return (
            <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onView}
            >
                <HiOutlineEye/>
            </span>
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                <HiOutlineTrash/>
            </span>
            </div>
        )
    }
}

const ProductColumn = ({ row }: { row: Product }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const GalleryColumn = ({ row }: { row: Gallery }) => {
    const avatar = (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const ProductTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.userList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.userList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.userList.data.loading
    )

    const data = useAppSelector(
        (state) => state.userList.data.userList
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getUsers({ pageIndex, pageSize, sort, query, filterData }))
    }
    

    const columns: ColumnDef<Gallery>[] = useMemo(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.id}</span>
                },
            },
            {
                header: 'First Name',
                accessorKey: 'firstName',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.firstName}</span>

                },
            },
            {
                header: 'Last Name',
                accessorKey: 'lastName',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.lastName}</span>
                },
            },
            {
                header: 'Description',
                accessorKey: 'description',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.description}</span>
                },
            },
            {
                header: 'Tag',
                accessorKey: 'tag',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.tag}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductDeleteConfirmation />
        </>
    )
}

export default ProductTable
