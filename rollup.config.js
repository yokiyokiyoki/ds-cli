import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/main.ts",
  output: [
    {
      name: "ds",
      file: "bin/ds.js",
      format: "umd"
    }
  ],
  plugins: [typescript()]
};
