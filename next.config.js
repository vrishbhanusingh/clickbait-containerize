/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    typescript:{
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    output:"standalone",
};

export default config;


// // next.config.js
// const webpack = require('webpack');

// module.exports = {
//   experimental: {
//     runtime: 'edge', // Enable the edge runtime
//   },
//   webpack: (config) => {
//     config.plugins.push(new webpack.IgnorePlugin({
//       resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
//     }));
//     return config;
//   },
// };