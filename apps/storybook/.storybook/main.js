

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
import path from "path";

const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  webpackFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "react": path.resolve(__dirname, "../node_modules/react"),
      "react-dom": path.resolve(__dirname, "../node_modules/react-dom"),
    };

    // Tailwind v4 + @apply in @acko/css — ensure postcss-loader runs (including nested oneOf rules)
    const postcssLoader = {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          config: path.resolve(__dirname, "../postcss.config.mjs"),
        },
      },
    };

    function injectPostcss(rule) {
      if (!rule) return;
      if (Array.isArray(rule.oneOf)) {
        for (const r of rule.oneOf) injectPostcss(r);
        return;
      }
      if (Array.isArray(rule.rules)) {
        for (const r of rule.rules) injectPostcss(r);
        return;
      }
      if (
        rule.test &&
        rule.test.toString().includes("css") &&
        Array.isArray(rule.use)
      ) {
        const cssLoaderIndex = rule.use.findIndex((use) => {
          if (typeof use === "string") return use.includes("css-loader");
          if (use && typeof use.loader === "string")
            return use.loader.includes("css-loader");
          return false;
        });
        if (cssLoaderIndex === -1) return;

        const hasPostcss = rule.use.some((use) => {
          const l = typeof use === "string" ? use : use?.loader;
          return l && String(l).includes("postcss-loader");
        });
        if (hasPostcss) return;

        rule.use.push(postcssLoader);
        const cssUse = rule.use[cssLoaderIndex];
        if (typeof cssUse === "object" && cssUse.options) {
          cssUse.options.importLoaders =
            (cssUse.options.importLoaders ?? 0) + 1;
        }
      }
    }

    const rules = config.module?.rules;
    if (rules) {
      for (const rule of rules) injectPostcss(rule);
    }

    return config;
  },
};
export default config;