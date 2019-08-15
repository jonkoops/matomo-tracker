import typescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./src/index.ts",
  output: {
    file: "./bundle.min.js",
    format: "iife"
  },
  plugins: [typescript({ target: "es5" }), uglify()]
};
