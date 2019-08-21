import typescript from 'rollup-plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/index.ts',
  output: {
    file: 'bundle.min.js',
    format: 'iife',
    name: 'MatomoTracker',
  },
  plugins: [typescript({ target: 'es5', declarationMap: false }), uglify()],
}
