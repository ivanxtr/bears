import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

const Loader = () => (
  <Row className="d-flex justify-content-center">
    <Spinner animation="border" variant="primary" />
  </Row>
)

export default Loader
