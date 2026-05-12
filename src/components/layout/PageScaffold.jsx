import Navbar from '../Navbar'
import Footer from '../Footer'

const PageScaffold = ({ children, withFooter = true }) => {
  return (
    <div className="tmh-page-shell">
      <Navbar />
      <div className="tmh-content-offset">{children}</div>
      {withFooter ? <Footer /> : null}
    </div>
  )
}

export default PageScaffold