import type { Meta, StoryObj } from "@storybook/react";
import AppTemplate from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AppTemplate> = {
  title: "Layout/AppTemplate",
  component: AppTemplate,
  tags: ["autodocs"],
  argTypes: {
    // children: {
    //   control: "Button",
    // },
  },
};

export default meta;
type Story = StoryObj<typeof AppTemplate>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: <>App Template</>,
  },
};
