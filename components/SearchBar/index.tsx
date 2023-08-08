import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

interface SearchBarPropsTypes {
  debouncedResults: (e: { target: { value: string } }) => void
}

const SearchBarProps = ({ debouncedResults }: SearchBarPropsTypes) => {
  return (
    <Row className="d-flex justify-content-center" data-cy="search-row">
      <Col sm={4} data-cy="search-col">
        <Form className="d-flex" data-cy="search-form">
          <Form.Control
            type="search"
            placeholder="Search Okay Bear"
            className="me-2"
            aria-label="Search"
            onChange={debouncedResults}
            data-cy="search-bar"
          />
        </Form>
      </Col>
    </Row>
  )
}

export default SearchBarProps
