import { useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import SecuredNavBar from '../components/NavBar/SecuredNavBar'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const APPLICATIONS_REGEX = /^\/dash\/applications(\/)?$/

const DashHeader = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !APPLICATIONS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const content = (
        <>
        <SecuredNavBar onSelectLogout={sendLogout} />
        <header className="dash-header" >
            
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dash">
                    <h1 className="dash-header__title">Finance Applications</h1>
                </Link>
                
            </div>
        </header>
        </>
        
    )

    return content
}
export default DashHeader