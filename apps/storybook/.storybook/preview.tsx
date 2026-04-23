import type { Preview } from "@storybook/react";

import "../src/preview.css";

const preview: Preview = {
  parameters: {
    docs: {
      story: { inline: true },
      /** Show the code panel below Canvas by default (toggle still available). */
      canvas: {
        sourceState: "shown",
      },
    },
  },
};

export default preview;
