import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import PlayerEditContent, { FormikRef } from './PlayerEditContent'
import {
    setDrawerClose,
    setSelectedPlayer,
    useAppDispatch,
    useAppSelector,
} from '../store'
import type { MouseEvent } from 'react'

type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Save
            </Button>
        </div>
    )
}

const PlayerEditDialog = () => {
    const dispatch = useAppDispatch()
    const drawerOpen = useAppSelector(
        (state) => state.playerList.data.drawerOpen,
    )

    const onDrawerClose = () => {
        dispatch(setDrawerClose())
        dispatch(setSelectedPlayer({}))
    }

    const formikRef = useRef<FormikRef>(null)

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <Drawer
            isOpen={drawerOpen}
            closable={false}
            bodyClass="p-0"
            footer={
                <DrawerFooter
                    onCancel={onDrawerClose}
                    onSaveClick={formSubmit}
                />
            }
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
        >
            <PlayerEditContent ref={formikRef} />
        </Drawer>
    )
}

export default PlayerEditDialog
