import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Need to grow your business?</h1>
                <h1>We'll help you with asset finance.</h1>
            </header>
            <main className="public__main">
                <p>Yas Financial has helped businesses achieve their ambitions by funding more than $6bn worth of assets over the last 30 years.</p>
                <br />
                <button>Learn more</button>
            </main>
            <footer>
                <Link to="/login">Login</Link>
                <br />
                <Link to="/signup">Signup</Link>
            </footer>
        </section>

    )
    return content
}
export default Public