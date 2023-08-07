'use client';
import { useEffect, useCallback, useState, useRef } from 'react';
import CardComponent from '@/components/Card';
import { Grid, AutoSizer } from 'react-virtualized';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Container from 'react-bootstrap/Container';

import { NFTS_URL } from '@/constants';
import { fetcher } from '@/helpers/fetch';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	const [nftData, setNftData] = useState<[]>([]);
	const [isFetching, setIsFetching] = useState(false);

	const loadMoreItems = async () => {
		setIsFetching(true);
		const response = await fetcher(NFTS_URL);
		setNftData(prev => prev.concat(response.results));
	};

	const getNFTs = useCallback(async () => {
		const response = await fetcher(NFTS_URL);
		setNftData(response.results);
	}, []);

	const onScrollFunc = (e: any) => {
		const { scrollTop, scrollHeight, clientHeight } = e;
		const isNearBottom = scrollTop + clientHeight >= scrollHeight;

		if (isNearBottom) {
			console.log('Reached bottom');
			loadMoreItems();
		}
	};

	useEffect(() => {
		getNFTs();
	}, [getNFTs]);

	return (
		<Container fluid className="py-4">
			<div style={{ flex: '1 1 auto', height: '100vh' }}>
				<AutoSizer>
					{({ height, width }) => {
						return (
							<Grid
								width={width}
								height={height}
								rowHeight={500}
								columnWidth={400}
								rowCount={nftData.length / 4}
								columnCount={4}
								onScroll={onScrollFunc}
								cellRenderer={({ columnIndex, key, rowIndex, style }) => (
									<CardComponent
										index={rowIndex * 4 + columnIndex}
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
		</Container>
	);
};

export default App;
