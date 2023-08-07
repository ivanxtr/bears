import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { type Result } from '../../types';

interface CardProps {
	nft: Result[];
	index: number;
	style: {};
}

const CardComponent = ({ index, style, nft }: CardProps) => {
	return (
		<div style={{ ...style, width: 360 }} id="card">
			<Card style={{ width: '360px' }}>
				<Card.Img variant="top" src={nft[index]?.img} />
				<Card.Body>
					<Card.Title>
						<Container className="d-flex justify-content-between p-0">
							<Card.Text>{nft[index]?.title}</Card.Text>
							<Card.Text>{nft[index]?.price}</Card.Text>
						</Container>
					</Card.Title>
				</Card.Body>
			</Card>
		</div>
	);
};

export default CardComponent;
