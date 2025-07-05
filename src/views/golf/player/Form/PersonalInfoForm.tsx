import DatePicker from '@/components/ui/DatePicker'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import { FormItem } from '@/components/ui/Form'
import {
    HiUserCircle,
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiCake,
    HiOutlineUser,
} from 'react-icons/hi'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import CreatableSelect from "react-select/creatable";
import Select from "@/components/ui/Select";
import {useEffect} from "react";
import {getTeamsMissingPlayers, useAppDispatch, useAppSelector} from "@/views/golf/player/Form/store";

type FormFieldsName = {
    upload: string
    name: string
    id: number
    email: string
    phone: string
    TeamId: string
}

type PersonalInfoFormProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        TeamId: string
        [key: string]: unknown
    }

}

const PersonalInfoForm = (props: PersonalInfoFormProps) => {
    const { values = { TeamId: null }, touched, errors } = props

    const dispatch = useAppDispatch()


    const filterData = useAppSelector(
        (state) => state.playerListWithoutTeams.data.filterData
    )


    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.playerListWithoutTeams.data.tableData
    )

    const data = useAppSelector(
        (state) => state.playerListWithoutTeams.data.teamList
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    const fetchData = () => {
        let sort = {key:"label",order: 'asc'}
        dispatch(getTeamsMissingPlayers({ pageIndex, pageSize, sort, query, filterData }))
    }
//console.log(values);
    const teamId = values.TeamId
  //  console.log(teamId)
    return (
        <>
            <FormItem
                label="ID"
                invalid={errors.id && touched.id}
                errorMessage={errors.id}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="id"
                    placeholder="ID"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Name"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
            >
                <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                    prefix={<HiMail className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Team"
                invalid={
                    (errors.TeamId && touched.TeamId)  as boolean}
                errorMessage={errors.TeamId}
            >
                <Field name="TeamId">
                    {({ field, form }: FieldProps) => (
                        <Select
                            componentAs={CreatableSelect}
                            field={field}
                            form={form}
                            options={data}
                            value={data.filter(
                                (teamList) =>
                                    teamList.value === values.TeamId
                            )}
                            onChange={async (option) => {

                               await form.setFieldValue(field.name, option?.value).then(() => console.log("Value set successfully"))
                                   .catch(err => console.error("Error setting field value:", err));
                            }}


                        />

                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Phone Number"
                invalid={errors.phone && touched.phone}
                errorMessage={errors.phone}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="phone"
                    placeholder="Phone Number"
                    component={Input}
                    prefix={<HiPhone className="text-xl" />}
                />
            </FormItem>

        </>
    )
}

export default PersonalInfoForm
