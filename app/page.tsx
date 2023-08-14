'use client'
import { useEffect, useCallback, useState, useRef, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import debouce from 'lodash.debounce'

import { NFTS_URL, NFTS_LIMIT } from '@/constants'
import { fetcher } from '@/helpers/fetch'
import Loader from '@/components/Loader'
import SearchBar from '@/components/SearchBar'
import Virtualized from '@/components/Virtualized'
import { type Result } from '../types'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [nftData, setNftData] = useState<Result[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const pulledNfts = useRef<Result[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const loadMoreItems = async () => {
    const response = await fetcher(NFTS_URL + Math.round(nftData.length / NFTS_LIMIT) * NFTS_LIMIT)
    setNftData((prev) => prev.concat(response.results))
    pulledNfts.current = pulledNfts.current.concat(response.results)

    setLoading(false)
  }

  const getNFTs = useCallback(async () => {
    const response = await fetcher(NFTS_URL + 0)
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
      <Virtualized
        nftData={nftData}
        searchTerm={searchTerm}
        onScrollFunc={onScrollFunc}
      />
      {loading && <Loader />}
    </Container>
  )
}

export default App
