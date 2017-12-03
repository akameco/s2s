// @flow
export type Path = string
export type Code = string

export type EventType = 'add' | 'change' | 'unlink'
export type Only = EventType[]

export type HandlerOpts = {
  eventPath: Path,
  filename: Path,
  // eslint-disable-next-line
  plugin?: Plugin,
}

type Meta = {
  handlerName: string,
  pluginName?: string,
}

export type Handler = (
  code: Code,
  opts: HandlerOpts
) => { code: Code, meta: Meta }

export type Plugin = {|
  test: RegExp | string | string[],
  plugin?: *,
  handler?: Handler,
  only?: Only,
  input?: Path,
  output?: Path,
|}

export type Template = {|
  test: RegExp | string | string[],
  input: Path,
  output?: Path,
|}

export type AfterHook = (code: Code, path: Path) => Code

export type Config = {
  watch: Path, // file, dir, glob, or array
  plugins?: Plugin[], // eslint-disable-line
  templatesDir?: string,
  templates?: Template[], // eslint-disable-line
  afterHooks?: AfterHook[], // eslint-disable-line
  prettier: boolean,
  handlerMapper?: { [extensions: string]: Handler },
}

export type HandlerType = 'S2S' | 'TEMPLATE'
