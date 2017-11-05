// @flow weak
import path from 'path'

export default function fromPlugin() {
  return {
    visitor: {
      Identifier(idPath, { opts }) {
        idPath.node.name += path.basename(path.dirname(opts.from))
      },
    },
  }
}
