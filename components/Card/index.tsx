import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { type Result } from '../../types';
import { CARD_WIDTH } from '@/constants';

interface CardProps {
	nft: Result[];
	index: number;
	style: {};
}

const CardComponent = ({ index, style, nft }: CardProps) => {
	if (nft[index]?.img === undefined) return <></>;
	return (
		<div style={{ ...style, width: CARD_WIDTH }} id="card">
			<Card style={{ width: CARD_WIDTH }}>
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
