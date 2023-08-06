'use client';
import { useEffect, useCallback, useState } from 'react';
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

	const isItemLoaded = index => index < nftData.length && nftData[index] !== null;
	const loadMoreItems = (startIndex, stopIndex) => {
		return nftData;
	};

	const getNFTs = useCallback(async () => {
		const response = await fetcher(NFTS_URL);
		setNftData(response.results);
	}, []);

	useEffect(() => {
		getNFTs();
	}, [getNFTs]);

	const columnWidth = 400;
	const rowHeight = 500;

	return (
		<Container fluid className="py-4">
			<div style={{ flex: '1 1 auto', height: '100vh' }}>
				<InfiniteLoader isItemLoaded={isItemLoaded} itemCount={nftData.length} loadMoreItems={loadMoreItems}>
					{({ onItemsRendered, ref }) => (
						<AutoSizer>
							{({ height, width }) => {
								return (
									<Grid
										width={width}
										height={height}
										rowHeight={rowHeight}
										columnWidth={columnWidth}
										rowCount={nftData.length / 4}
										columnCount={4}
										cellRenderer={({ columnIndex, key, rowIndex, style }) => (
											<CardComponent
												index={rowIndex * 4 + columnIndex}
												style={style}
												nft={nftData}
												key={key}
											/>
										)}
										ref={ref}
										onItemsRendered={onItemsRendered}
									/>
								);
							}}
						</AutoSizer>
					)}
				</InfiniteLoader>
			</div>
		</Container>
	);
};

export default App;
