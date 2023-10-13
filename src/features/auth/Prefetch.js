import { store } from '../../app/store'
import { applicationsApiSlice } from '../notes/applicationsApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const applications = store.dispatch(applicationsApiSlice.endpoints.getApplications.initiate())

        return () => {
            console.log('unsubscribing')
            applications.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch