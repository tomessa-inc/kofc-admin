import reducer, {getAuthentication, useAppDispatch, useAppSelector} from "@/views/auth/ResetPassword/store";
import {useEffect} from "react";
//import reducer, {getAccessList, useAppSelector} from "@/views/user/View/store";
import {injectReducer, setUser, signInSuccess} from "@/store";
import {redirect, useNavigate} from "react-router-dom";
import appConfig from "@/configs/app.config";

injectReducer('GetAuthentication', reducer)

const ResetPassword = () => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const fetchDataAccess = () => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )

        dispatch(getAuthentication({id: path}))

    }

    const getAuthenticationData = useAppSelector(
        (state) => state.GetAuthentication.data.userData
    )

    const loading = useAppSelector(
        (state) => state.GetAuthentication.data.loading
    )



    console.log("getAuthentication data")

    console.log(getAuthenticationData);

    if (getAuthenticationData.data) {
        const token = getAuthenticationData.token
        dispatch(signInSuccess(token))

        if (getAuthenticationData.data) {

            dispatch(
                setUser(getAuthenticationData.data)
            )
        }

        navigate(
           `/user/edit/${getAuthenticationData.data?.id}`
        )
    }






        useEffect(() => {
        fetchDataAccess()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
        </>
    )
}
/*
    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
           console.log('path')
          console.log(path)
     //   const requestParam = { id: path }
   //     fetchData(requestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const success = await  getAuthenication({ id: path })
    }, [location.pathname])

*/


export default ResetPassword
