import type { Meta, StoryObj } from "@storybook/react";
import Input from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
  title: "Atom/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    // children: {
    //   control: "Button",
    // },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: "Enter Email",
    // variant: "contained",
    // children: "Button",
  },
};
