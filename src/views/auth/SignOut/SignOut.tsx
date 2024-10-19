import useAuth from '@/utils/hooks/useAuth'
import {sign} from "node:crypto";

const SignOut = () => {

    const { signOut } = useAuth()

    signOut();

    return (<></>)
}

export default SignOut
