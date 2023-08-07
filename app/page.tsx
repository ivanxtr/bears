'use client';
import { useEffect, useCallback, useState, useRef } from 'react';
import { Grid, AutoSizer } from 'react-virtualized';
import { type Result } from '../types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { NFTS_URL } from '@/constants';
import { fetcher } from '@/helpers/fetch';
import CardComponent from '@/components/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	const count = 0;
	const [nftData, setNftData] = useState<Result[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const pulledNfts = useRef<Result[]>([]);

	const loadMoreItems = async () => {
		const response = await fetcher(NFTS_URL + nftData.length / 20);
		setNftData(prev => prev.concat(response.results));
		pulledNfts.current = pulledNfts.current.concat(response.results);
		setLoading(false);
	};

	const getNFTs = useCallback(async () => {
		const response = await fetcher(NFTS_URL + count);
		setNftData(response.results);
		pulledNfts.current = response.results;
	}, []);

	const onScrollFunc = (e: any) => {
		const { scrollTop, scrollHeight, clientHeight } = e;
		const isNearBottom = scrollTop + clientHeight >= scrollHeight;

		if (isNearBottom) {
			loadMoreItems();
			setLoading(true);
		}
	};

	const onSearch = (e: any) => {
		const { value } = e.target;
		const filteredNfts: any = pulledNfts.current.filter((nft: any) => {
			return nft.title.toLowerCase().includes(value.toLowerCase());
		});
		setNftData(filteredNfts);
	};

	useEffect(() => {
		getNFTs();
	}, [getNFTs]);

	return (
		<Container fluid className="py-4">
			<Row className="d-flex justify-content-center">
				<Col sm={4}>
					<Form className="d-flex">
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							onChange={onSearch}
						/>
					</Form>
				</Col>
			</Row>
			<div style={{ flex: '1 1 auto', height: '85vh', top: '3vh' }}>
				<AutoSizer>
					{({ height, width }) => {
						return (
							<Grid
								width={width}
								height={height}
								rowHeight={500}
								columnWidth={400}
								rowCount={Math.round(nftData.length / 4)}
								columnCount={4}
								onScroll={onScrollFunc}
								cellRenderer={({ columnIndex, key, rowIndex, style }) => (
									<CardComponent
										index={Math.round(rowIndex * 4 + columnIndex)}
										style={style}
										nft={nftData}
										key={key}
									/>
								)}
							/>
						);
					}}
				</AutoSizer>
			</div>
			{loading && (
				<Row className="d-flex justify-content-center">
					<Spinner animation="border" variant="primary" />
				</Row>
			)}
		</Container>
	);
};

export default App;
