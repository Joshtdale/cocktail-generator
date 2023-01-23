import Navbar from './Navbar'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <>
            <div className="headContainer sticky-top">
                <Header />
                <Navbar />
            </div>
            <main>{children}</main>
        </>
    )
}