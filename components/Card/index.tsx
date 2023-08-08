import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { type Result } from '../../types'
import { CARD_WIDTH } from '@/constants'

interface CardProps {
  nft: Result[]
  index: number
  style: {}
}

const CardComponent = ({ index, style, nft }: CardProps) => {
  if (nft[index]?.img === undefined) return <></>
  return (
    <div style={{ ...style, width: CARD_WIDTH }} id="card">
      <Card style={{ width: CARD_WIDTH }} data-cy="card-container">
        <Card.Img variant="top" src={nft[index]?.img} data-cy="card-img" />
        <Card.Body>
          <Card.Title>
            <Container className="d-flex justify-content-between p-0">
              <Card.Text data-cy="card-title">{nft[index]?.title}</Card.Text>
              <Card.Text data-cy="card-price">{nft[index]?.price}</Card.Text>
            </Container>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CardComponent
