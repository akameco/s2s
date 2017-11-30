// @flow
import path from 'path'
import execa from 'execa'

type TypeInfo = ?{ type: string }

const noop = () => null
// eslint-disable-next-line flowtype/no-weak-types
type JsonType = Object

const FLOW_BIN_PATH = path.join('node_modules', '.bin', 'flow')

async function execFlow(
  cwd: string,
  params: $ReadOnlyArray<string>
): Promise<JsonType> {
  const output = await execa.stdout(getFlowBin(cwd), params).catch(noop)
  return JSON.parse(output)
}

function execFlowSync(cwd: string, params: $ReadOnlyArray<string>): JsonType {
  try {
    const output = execa.sync(getFlowBin(cwd), params).stdout
    return JSON.parse(output)
  } catch (err) {
    return {}
  }
}

export function getFlowBin(cwd: string) {
  return path.resolve(cwd, FLOW_BIN_PATH)
}

export type FlowVersionInfo = {
  semver: string,
  binary: string,
  build_id: string,
}

export async function versionInfo(cwd: string): Promise<?FlowVersionInfo> {
  const json = await execFlow(cwd, ['version', '--json']).catch(noop)
  return json
}

export async function typeAtPos(
  cwd: string,
  filePath: string,
  row: number,
  column: number
) {
  const json: TypeInfo = await execFlow(cwd, [
    'type-at-pos',
    '--json',
    filePath,
    String(row),
    String(column),
  ])
  return json
}

export function typeAtPosSync(
  cwd: string,
  filePath: string,
  row: number,
  column: number
) {
  const json: TypeInfo = execFlowSync(cwd, [
    'type-at-pos',
    '--json',
    filePath,
    String(row),
    String(column),
  ])
  return json
}

export async function getTypeFromFile(
  cwd: string,
  filePath: string,
  row: number,
  column: number
) {
  const json = await typeAtPos(cwd, filePath, row, column)
  if (json && json.type) {
    return json.type
  }
  return null
}

export function getTypeFromFileSync(
  cwd: string,
  filePath: string,
  row: number,
  column: number
) {
  const json = typeAtPosSync(cwd, filePath, row, column)
  if (json && json.type) {
    return json.type
  }
  return null
}
