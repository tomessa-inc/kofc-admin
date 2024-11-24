import { useEffect, useMemo } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getUserById,
    getAccessList,
    updateUser,
    deleteProduct,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import UserForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/user/Form'

import isEmpty from 'lodash/isEmpty'

injectReducer('UserEdit', reducer)

const Edit = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.UserEdit.data.tableData
    )

    const location = useLocation()
    const navigate = useNavigate()

    const userData = useAppSelector(
        (state) => state.UserEdit.data.userData
    )

    const accessList = useAppSelector(
        (state) => state.UserEdit.data.accessList
    )
    const loading = useAppSelector(
        (state) => state.UserEdit.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getUserById(data))
    }


    const fetchDataAccess = () => {
        dispatch(getAccessList({ pageIndex, pageSize, sort, query}))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await updateUser(values)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
        navigate('/user')
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteProduct({ id: galleryData.id })
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Product successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/sales/product-list')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
    //    console.log('path')
      //  console.log(path)
        const requestParam = { id: path }
        fetchData(requestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        fetchDataAccess()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(userData) && (
                    <>
                        <UserForm
                            type="edit"
                            initialData={userData}
                            accessList={accessList}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(userData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No User found!</h3>
                </div>
            )}
        </>
    )
}

export default Edit
