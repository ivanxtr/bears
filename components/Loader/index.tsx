import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

const Loader = () => (
  <Row className="d-flex justify-content-center" data-cy="loader-container">
    <Spinner animation="border" variant="primary" data-cy="loader-spinner" />
  </Row>
)

export default Loader
