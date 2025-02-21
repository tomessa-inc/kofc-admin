import AccessForm , {
    FormModel,
    SetSubmitting,
} from '@/views/access/Form'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateAccess } from '@/services/AccessService'

const New = () => {
    const navigate = useNavigate()

    const addAccess = async (data: FormModel) => {

        const response = await apiCreateAccess<boolean, FormModel>(data)
        console.log('tje response');
        console.log(response.data)

        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addAccess(values)
        setSubmitting(false)
        console.log('the succ')
        console.log(success);
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Tag successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/sales/product-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
    }

    return (
        <>
            <AccessForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default New
