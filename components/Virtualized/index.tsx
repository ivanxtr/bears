import { useState, useLayoutEffect } from 'react'
import { Grid, AutoSizer } from 'react-virtualized'
import { type Result } from '../../types'
import { ROW_HEIGHT, COLUMN_WIDTH, COLUMN_COUNT, CARD_WIDTH } from '@/constants'
import CardComponent from '@/components/Card'
import './virtualized.css'

interface VirtualizedPropsTypes {
  nftData: Result[]
  searchTerm: string
  onScrollFunc: (e: any) => void
}

const Virtualized = ({
  nftData,
  searchTerm,
  onScrollFunc
}: VirtualizedPropsTypes) => {
  const [columnCount, setColumnCount] = useState<number>(COLUMN_COUNT)

  useLayoutEffect(() => {
    function getColumns() {
      const virtualizeMain = document.getElementById('virtualize-main')
      if (virtualizeMain) {
        const { scrollWidth } = virtualizeMain
        setColumnCount(Math.floor(scrollWidth / (CARD_WIDTH + 30)))
      }
    }
    window.addEventListener('resize', getColumns)
    getColumns()
    return () => {
      window.removeEventListener('resize', getColumns)
    }
  }, [])

  return (
    <div
      style={{ flex: '1 1 auto', height: '85vh', top: '3vh' }}
      id="virtualize-main"
    >
      <AutoSizer>
        {({ height, width }) => {
          return (
            <Grid
              width={width}
              height={height}
              rowHeight={ROW_HEIGHT}
              columnWidth={COLUMN_WIDTH}
              rowCount={Math.round(nftData.length / columnCount)}
              columnCount={columnCount}
              onScroll={searchTerm === '' ? (e) => onScrollFunc(e) : () => {}}
              cellRenderer={({ columnIndex, key, rowIndex, style }) => (
                <CardComponent
                  index={Math.round(rowIndex * columnCount + columnIndex)}
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
  )
}

export default Virtualized
