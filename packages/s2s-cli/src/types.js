// @flow
export type Path = string
export type Code = string
type FileName = string

// eslint-disable-next-line
export type PluginOpts = string | Function | [string | Function, Object]

export type EventType = 'add' | 'change' | 'unlink'
export type Only = EventType[]

export type HandlerOpts = {
  eventPath: Path,
  filename: Path,
  // eslint-disable-next-line
  plugin: Plugin,
}

export type HanlderFunc = (code: Code, opts: HandlerOpts) => Code

export type Plugin = {|
  test: RegExp,
  plugin: PluginOpts,
  handler?: HanlderFunc,
  only?: Only,
  input?: FileName,
  output?: FileName,
|}

export type Template = {|
  test: RegExp,
  input: Path,
  output?: Path,
|}

// eslint-disable-next-line
export type AfterHook = Function

export type Opts = {|
  watch: Path, // file, dir, glob, or array
  plugins?: Plugin[], // eslint-disable-line
  templatesDir?: string,
  templates?: Template[], // eslint-disable-line
  afterHooks: AfterHook[], // eslint-disable-line
  prettier: boolean,
|}

export type HandlerType = 'S2S' | 'TEMPLATE'
