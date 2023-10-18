import { store } from '../../app/store'

import { applicationsApiSlice } from '../applications/applicationsApiSlice'
import { userApiSlice } from '../user/userApiSlice';

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        // subscribing
        const applications = store.dispatch(applicationsApiSlice.endpoints.getApplications.initiate())
        const user = store.dispatch(userApiSlice.endpoints.getUser.initiate())

        return () => {
            // unsubscribing
            applications.unsubscribe()
            user.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch