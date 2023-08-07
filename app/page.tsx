'use client'
import { useEffect, useCallback, useState, useRef, useMemo } from 'react'
import { Grid, AutoSizer } from 'react-virtualized'
import Container from 'react-bootstrap/Container'
import debouce from 'lodash.debounce'

import {
  NFTS_URL,
  NFTS_LIMIT,
  ROW_HEIGHT,
  COLUMN_WIDTH,
  COLUMN_COUNT
} from '@/constants'
import { fetcher } from '@/helpers/fetch'
import CardComponent from '@/components/Card'
import Loader from '@/components/Loader'
import SearchBar from '@/components/SearchBar'
import { type Result } from '../types'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const count = 0
  const [nftData, setNftData] = useState<Result[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const pulledNfts = useRef<Result[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const loadMoreItems = async () => {
    const response = await fetcher(NFTS_URL + nftData.length / NFTS_LIMIT)
    setNftData((prev) => prev.concat(response.results))
    pulledNfts.current = pulledNfts.current.concat(response.results)
    setLoading(false)
  }

  const getNFTs = useCallback(async () => {
    const response = await fetcher(NFTS_URL + count)
    setNftData(response.results)
    pulledNfts.current = response.results
  }, [])

  const onScrollFunc = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e
    const isNearBottom = scrollTop + clientHeight - 10 === scrollHeight - 10

    if (isNearBottom) {
      loadMoreItems()
      setLoading(true)
    }
  }

  const onSearch = (e: { target: { value: string } }) => {
    const { value } = e.target
    setSearchTerm(value)
    const filteredNfts: Result[] = pulledNfts.current.filter((nft: Result) => {
      return nft.title.toLowerCase().includes(value.toLowerCase())
    })
    setNftData(filteredNfts)
  }

  const debouncedResults = useMemo(() => debouce(onSearch, 300), [])

  useEffect(() => {
    getNFTs()
  }, [getNFTs])

  return (
    <Container fluid className="py-4">
      <SearchBar debouncedResults={debouncedResults} />
      <div style={{ flex: '1 1 auto', height: '85vh', top: '3vh' }}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <Grid
                width={width}
                height={height}
                rowHeight={ROW_HEIGHT}
                columnWidth={COLUMN_WIDTH}
                rowCount={Math.round(nftData.length / COLUMN_COUNT)}
                columnCount={COLUMN_COUNT}
                onScroll={searchTerm === '' ? (e) => onScrollFunc(e) : () => {}}
                cellRenderer={({ columnIndex, key, rowIndex, style }) => (
                  <CardComponent
                    index={Math.round(rowIndex * COLUMN_COUNT + columnIndex)}
                    style={style}
                    nft={nftData}
                    key={key}
                  />
                )}
              />
            )
          }}
        </AutoSizer>
      </div>
      {loading && <Loader />}
    </Container>
  )
}

export default App
