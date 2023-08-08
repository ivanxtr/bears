/* eslint-disable no-unused-vars */
import type { Meta, StoryObj } from '@storybook/react'
import CardComponent from './index'

const meta: Meta<typeof CardComponent> = {
  component: CardComponent,
  title: 'General/Card',
  tags: ['autodocs']
}
export default meta
type Story = StoryObj<typeof CardComponent>

export const Card: Story = {
  args: {
    nft: [
      {
        title: 'Okay Bear #1917',
        price: 124,
        img: 'https://arweave.net/rO6eLwXD5dTQNWngf5Jx7rPIuuUdHw_KXbrWP5rL1z0'
      }
    ],
    index: 0,
    style: {}
  }
}
