import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import {string} from "yup";

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    tags: Options
}

type accessList = {
    label: string,
    value: string
}


type OrganizationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    accessList: accessList[],
    values: {
        tags: Options
        [key: string]: unknown
    },
    type: string
}

const OrganizationFields = (props: OrganizationFieldsProps) => {
    const { values = { category: '', access: [{label:null, value:null}]}, touched, errors, accessList } = props

//    console.log('go')
  //  console.log(accessList)

    let accessDisabled = true;
    values.access.map((access:{label:null, value:null}) => {
         if ("access" === access.value) {
             accessDisabled = false
         }
    })

    return (
        <AdaptableCard divider isLastChild className="mb-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Access"
                        invalid={
                            (errors.tags && touched.tags) as unknown as boolean
                        }
                        errorMessage={errors.tags as string}
                    >
                        <Field name="access">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    isDisabled={accessDisabled}
                                    options={accessList}
                                    value={values.access}
                                    onChange={(option) => {
                                        console.log('option');
                                        console.log(option)
                                        console.log('field.name');
                                        console.log(field.name);

                                        form.setFieldValue(field.name, option)
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields
