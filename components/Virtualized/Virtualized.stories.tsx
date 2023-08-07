/* eslint-disable no-unused-vars */
import type { Meta, StoryObj } from '@storybook/react'
import VirtualizedComponent from './index'
import './virtualized.css'

const meta: Meta<typeof VirtualizedComponent> = {
  component: VirtualizedComponent,
  title: 'General/Virtualized',
  tags: ['autodocs']
}
export default meta
type Story = StoryObj<typeof VirtualizedComponent>

export const Default: Story = {
  args: {
    nftData: [
      {
        title: 'Okay Bear #1917',
        price: 124,
        img: 'https://arweave.net/rO6eLwXD5dTQNWngf5Jx7rPIuuUdHw_KXbrWP5rL1z0'
      },
      {
        title: 'Okay Bear #114',
        price: 420,
        img: 'https://arweave.net/lvX28kAjjh0-uLTAQwuzMx541Nn8Nbry6rPYvZfc4ow'
      },
      {
        title: 'Okay Bear #1305',
        price: 50,
        img: 'https://arweave.net/Y4xNnZh0EObwpGR_KzqpUejdm3yVQFOx0uc-P0EaMPg'
      },
      {
        title: 'Okay Bear #6137',
        price: 120,
        img: 'https://arweave.net/S-X_Z577GDpjoPrSfdg9ZOUyog9Mlb3NZNL2MTcDaz8'
      }
    ],
    searchTerm: '',
    onScrollFunc: () => {}
  }
}
