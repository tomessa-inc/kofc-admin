import {forwardRef, useEffect} from 'react'
import {
    setPlayerList,
    putPlayer,
    setDrawerClose,
    useAppDispatch,
    useAppSelector,
    Player,
    getTeams, getPlayers
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import PlayerForm, { FormikRef, FormModel } from '@/views/golf/player/Form'
import dayjs from 'dayjs'

const PlayerEditContent = forwardRef<FormikRef>((_, ref) => {
    const dispatch = useAppDispatch()

    const player = useAppSelector(
        (state) => state.playerList.data.selectedPlayer,
    )
    const data = useAppSelector((state) => state.playerList.data.playerList)

    const filterData = useAppSelector(
        (state) => state.playerList.data.filterData,
    )

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.playerList.data.teamTableData
    )

    const teamLoading = useAppSelector(
        (state) => state.playerList.data.teamLoading
    )


  //  const teamList = useAppSelector((state) => state.playerList.data.teamList)

    const { id } = player

    const onFormSubmit = (values: FormModel) => {
        const {
            name,
            email,
            img,
            phone,
            TeamId,
        } = values

        const basicInfo = { name, email, img }
        const personalInfo = {
            location,
            title,
            phone,
            TeamId,
        }

        const fetchData = () => {
            dispatch(getTeams({ pageIndex, pageSize, sort, query, filterData }))
        }


        useEffect(() => {
            fetchData()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])



        let newData = cloneDeep(data)
        let editedCustomer: Partial<Player> = {}
        newData = newData.map((elm:any) => {
            if (elm.id === id) {
                elm = { ...elm, ...basicInfo }
                elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                editedCustomer = elm
            }
            return elm
        })
        if (!isEmpty(editedCustomer)) {
            dispatch(putPlayer(editedCustomer as Player))
        }
        dispatch(setDrawerClose())
       // dispatch(getTeams({ pageIndex, pageSize, sort, query, filterData }))
        dispatch(setPlayerList(newData))
    }

    return (
        <PlayerForm
            ref={ref}
            customer={player}
            loading={teamLoading}
            onFormSubmit={onFormSubmit}
        />
    )
})

PlayerEditContent.displayName = 'PlayerEditContent'

export type { FormikRef }

export default PlayerEditContent
