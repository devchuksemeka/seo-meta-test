import type { Meta, StoryObj } from "@storybook/react";
import Icon from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Icon> = {
  title: "Atom/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    // children: {
    //   control: "Button",
    // },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    name: "password-show",
  },
};
