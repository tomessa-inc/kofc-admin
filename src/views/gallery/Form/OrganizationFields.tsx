import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'

type Options = {
    label: string
    value: string
}[]

type viewOptions = {
    label: string
    value: boolean
}

type FormFieldsName = {
    tags: Options
    viewing: viewOptions
}

type tagList = {
    label: string,
    value: string
}


type OrganizationFieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    tagList: tagList[],
    values: {
        tags: Options
        [key: string]: unknown
    }
}

const OrganizationFields = (props: OrganizationFieldsProps) => {
    const { values = { category: '', tags: [], viewing: {}}, touched, errors, tagList } = props

    const viewList =  [{
        label: "public",
        value:true,
    },{
        label: "private",
        value:false,
    }]

    let viewValue = {};
    switch(values.viewing) {
        case true:
            viewValue = {label:"public", value:true}
            break;
        case false:
            viewValue = {label:"private", value:false}
            break;
    }

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Organizations</h5>
            <p className="mb-6">Section to config the product attribute</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Tags"
                        invalid={
                            (errors.tags && touched.tags) as unknown as boolean
                        }
                        errorMessage={errors.tags as string}
                    >
                        <Field name="tags">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={tagList}
                                    value={values.tags}
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
                    <FormItem
                        label="Viewing"
                        invalid={
                            (errors.viewing && touched.viewing) as unknown as boolean
                        }
                        errorMessage={errors.viewing as string}
                    >
                        <Field name="viewing">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={viewList}
                                    value={viewValue}
                                    onChange={(option) => {
                                        console.log('option');
                                        console.log(option)
                                        console.log('field.name');
                                        console.log(field.name);
                                        console.log(option.value)

                                        form.setFieldValue(field.name, option.value)
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
