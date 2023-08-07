import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

interface SearchBarPropsTypes {
  debouncedResults: (e: { target: { value: string } }) => void
}

const SearchBarProps = ({ debouncedResults }: SearchBarPropsTypes) => {
  return (
    <Row className="d-flex justify-content-center">
      <Col sm={4}>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search Okay Bear"
            className="me-2"
            aria-label="Search"
            onChange={debouncedResults}
          />
        </Form>
      </Col>
    </Row>
  )
}

export default SearchBarProps
