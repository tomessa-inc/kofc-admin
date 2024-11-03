import { useEffect, useMemo } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getGallery,
    getAccessList,
    updateGallery,
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

injectReducer('UserNew', reducer)

const New = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.UserNew.data.tableData
    )

    const location = useLocation()
    const navigate = useNavigate()

    const accessList = useAppSelector(
        (state) => state.UserNew.data.accessList
    )
    const loading = useAppSelector(
        (state) => state.UserNew.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getGallery(data))
    }

    const fetchDataTag = () => {
        dispatch(getAccessList({ pageIndex, pageSize, sort, query}))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await updateGallery(values)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
        navigate('/gallery')
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
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
        const requestParam = { id: path }
        fetchData(requestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        fetchDataTag()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    console.log('access')
    console.log(accessList);

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(accessList) && (
                    <>
                        <UserForm
                            type="edit"
                        //    initialData={galleryData}
                            accessList={accessList}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                        //    onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(accessList) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No gallery found!</h3>
                </div>
            )}
        </>
    )
}

export default New
