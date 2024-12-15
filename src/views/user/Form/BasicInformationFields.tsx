import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import {Field, FormikErrors, FormikTouched, FieldProps, FormikValues} from 'formik'
import CreatableSelect from 'react-select/creatable'
import Select from '@/components/ui/Select'
import {string} from "yup";

type Options = {
    label: string
    value: string
}[]


type FormFieldsName = {
    id: string
    name: string
    firstName: string
    lastName: string
    email: string
    description: string
    password: string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
}

const tags = [
    { label: 'trend', value: 'trend' },
    { label: 'unisex', value: 'unisex' },
]


const BasicInformationFields = (props: BasicInformationFields) => {
    const { touched, errors, type } = props
    //const { values = { tags: [] }, touched, errors } = props
    let disabledcheck = false;

    if (type === "view") {
        disabledcheck = true
    }
    return (
        <AdaptableCard divider className="mb-4">
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config galley information</p>
            <FormItem
                label="ID"
                invalid={(errors.id && touched.id) as boolean}
                errorMessage={errors.id}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="id"
                    placeholder="id"
                    component={Input}
                    disabled={true}
                />
            </FormItem>

            <FormItem
                label="First Name"
                invalid={(errors.firstName && touched.firstName) as boolean}
                errorMessage={errors.firstName}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="firstName"
                    placeholder="First Name"
                    component={Input}
                    disabled={disabledcheck}
                />
            </FormItem>
            <FormItem
                label="Last Name"
                invalid={(errors.lastName && touched.lastName) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="lastName"
                    placeholder="Last Name"
                    component={Input}
                    disabled={disabledcheck}
                />
            </FormItem>

            <FormItem
                label="Email"
                labelClass="!justify-start"
                invalid={(errors.email && touched.email) as boolean}
                errorMessage={errors.email}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                    disabled={disabledcheck}
                />
            </FormItem>
            <FormItem
                label="Reset Password"
                labelClass="!justify-start"
                invalid={(errors.password && touched.password) as boolean}
                errorMessage={errors.password}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="new_password"
                    placeholder="Password"
                    component={Input}
                    disabled={disabledcheck}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
