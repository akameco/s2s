// @flow
export type Path = string
export type Code = string
type FileName = string
type PluginName = string

export type PluginOpts = PluginName | [PluginName, Object]

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

export type AfterHook = Function

export type Opts = {|
  watch: Path, // file, dir, glob, or array
  plugins?: Plugin[],
  templatesDir?: string,
  templates?: Template[],
  afterHooks: AfterHook[],
  prettier: boolean,
|}

export type HandlerType = 'S2S' | 'TEMPLATE'
