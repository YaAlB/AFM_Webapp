import { Link } from 'react-router-dom'

import NavBar from '../components/NavBar/NavBar'

const Public = () => {

    const content = (
        <>
        <NavBar />
        <section className="public publicBg">
            
            <header>
                <h1>Need to grow your business?</h1>
                <h1>We'll help you with asset finance.</h1>
            </header>
            <main className="public__main">
                <p>AFM has helped businesses achieve their ambitions by funding more than $6bn worth of assets over the last 30 years.</p>
                <br />
                <Link to="/aboutus" className="button">Learn more</Link>
            </main>
            <footer>
                <Link to="/auth/login">Login</Link>
                <br />
                <Link to="/auth/signup">Signup</Link>
            </footer>
        </section>
        </>

    )
    return content
}
export default Public