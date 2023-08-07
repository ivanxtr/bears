/* eslint-disable no-unused-vars */
import type { Meta, StoryObj } from '@storybook/react'
import LoaderComponent from './index'

const meta: Meta<typeof LoaderComponent> = {
  component: LoaderComponent,
  title: 'General/Loader',
  tags: ['autodocs']
}
export default meta
type Story = StoryObj<typeof LoaderComponent>

export const Loader: Story = {
  args: {}
}
