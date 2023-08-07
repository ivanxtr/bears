/* eslint-disable no-unused-vars */
import type { Meta, StoryObj } from '@storybook/react'
import SearchBarComponent from './index'

const meta: Meta<typeof SearchBarComponent> = {
  component: SearchBarComponent,
  title: 'General/SearchBar',
  tags: ['autodocs']
}
export default meta
type Story = StoryObj<typeof SearchBarComponent>

export const SearchBar: Story = {
  args: {
    debouncedResults: () => {}
  }
}
