import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@acko/button";
import { ArrowRight, Download, Search, Trash2 } from "lucide-react";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "inverted", "ghost", "link", "danger"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    iconOnly: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Get a quote",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Learn more",
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="sb-surface">
      <div className="sb-section">
        <h2 className="sb-section-title">With icons</h2>
        <div className="sb-row">
          <Button variant="primary" iconLeft={<Download />}>
            Download
          </Button>
          <Button variant="primary" iconRight={<ArrowRight />}>
            Continue
          </Button>
          <Button variant="danger" iconLeft={<Trash2 />}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="sb-surface">
      <div className="sb-row">
        <Button variant="secondary" size="md" iconOnly iconLeft={<Search />}>
          Search
        </Button>
        <Button variant="ghost" size="md" iconOnly iconLeft={<Download />}>
          Download
        </Button>
        <Button variant="danger" size="md" iconOnly iconLeft={<Trash2 />}>
          Delete
        </Button>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="sb-surface">
      <div className="sb-col">
        <Button variant="primary" fullWidth iconRight={<ArrowRight />}>
          Continue to payment
        </Button>
        <Button variant="secondary" fullWidth>
          Go back
        </Button>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Submitting",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Unavailable",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="sb-surface">
      <div className="sb-row">
        {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
          <Button key={size} variant="primary" size={size}>
            Size {size}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="sb-surface">
      <div className="sb-row">
        {(
          [
            "primary",
            "secondary",
            "inverted",
            "ghost",
            "link",
            "danger",
          ] as const
        ).map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
    </div>
  ),
};
