import { Grid, AutoSizer } from 'react-virtualized'
import { type Result } from '../../types'
import { ROW_HEIGHT, COLUMN_WIDTH, COLUMN_COUNT } from '@/constants'
import CardComponent from '@/components/Card'

interface VirtualizedPropsTypes {
  nftData: Result[]
  searchTerm: string
  onScrollFunc: (e: any) => void
}

const Virtualized = ({
  nftData,
  searchTerm,
  onScrollFunc
}: VirtualizedPropsTypes) => (
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
)

export default Virtualized
