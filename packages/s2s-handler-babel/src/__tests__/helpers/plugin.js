// @flow weak
import path from 'path'

export default function fromPlugin() {
  return {
    name: 'from-plugin',
    visitor: {
      Identifier(idPath, { opts }) {
        idPath.node.name += path.basename(path.dirname(opts.from))
      },
    },
  }
}
