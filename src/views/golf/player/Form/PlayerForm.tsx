import { forwardRef } from 'react'
import Tabs from '@/components/ui/Tabs'
import { FormContainer } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import {Team} from "@/views/golf/team/List/store";
import {injectReducer,  useAppDispatch} from "@/store";
import reducer, {putPlayer} from "@/views/golf/player/Form/store";
import {updateGallery} from "@/views/gallery/Edit/store";
import {SetSubmitting} from "@/views/gallery/Form";


injectReducer('playerListWithoutTeams', reducer)

type BaseCustomerInfo = {
    id: number
    name: string
    email: string
    phone:string
    TeamId: string
    img: string
    values: {
        TeamId: string
        [key: string]: unknown
    }
}


export type Customer = BaseCustomerInfo

export interface FormModel extends Customer {
}

export type FormikRef = FormikProps<FormModel>

export type CustomerProps = Partial<
    BaseCustomerInfo
>

export type TeamProps = Partial<
   Team
>


type CustomerFormProps = {
    customer: CustomerProps
    onFormSubmit: (values: FormModel) => void
    loading: boolean


}

dayjs.extend(customParseFormat)

const handleFormSubmit = async (
    values: FormModel,
    setSubmitting: SetSubmitting
) => {
    setSubmitting(true)
    const success = await updateGallery(values)
    setSubmitting(false)
    if (success) {
   //     popNotification('updated')
    }
//    navigate('/gallery')
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    name: Yup.string().required('User Name Required'),
    TeamId: Yup.string(),
    phoneNumber: Yup.string().matches(
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
        'Phone number is not valid',
    ),
    img: Yup.string(),
})

const { TabNav, TabList, TabContent } = Tabs

const PlayerForm = forwardRef<FormikRef, CustomerFormProps>((props, ref) => {

    const dispatch = useAppDispatch()
    const { customer, onFormSubmit } = props

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        console.log("submit")

        const success = await putPlayer(values)
        setSubmitting(false)
        if (success) {
            //  popNotification('updated')
        }
        // navigate('/gallery')
    }



    console.log("customer")
    console.log(customer)
    return (
        <Formik<FormModel>
            innerRef={ref}
            initialValues={{
                id: customer.id || 0,
                name: customer.name || '',
                email: customer.email || '',
                img: customer.img || '',
                phone: customer.phone || '',
                TeamId: customer.TeamId || '',
                values: { TeamId: ''},
            }}
            validationSchema={validationSchema}
            onSubmit={async (values: FormModel, { setSubmitting }) => {
                console.log("hello there")

              //  setSubmitting(true)
             //   onFormSubmit?.(values)
                console.log("the values")
                console.log(values);
                console.log("set submiting")
                console.log(setSubmitting)

                 dispatch(putPlayer(values))

              //  const success = await putPlayer(values)

                console.log("after put")
                //   setSubmitting(false) */
            }}
        >
            {({ values, touched, errors }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">

                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                        values={values}

                                    />
                                </TabContent>
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

PlayerForm.displayName = 'PlayerForm'

export default PlayerForm
