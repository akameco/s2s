// @flow
export type Path = string
export type Code = string

export type EventType = 'add' | 'change' | 'unlink'
export type Only = EventType[]

export type AnymatchPath = RegExp | string | (RegExp | string)[]

export type HandlerOpts = {
  eventPath: Path,
  filename: Path,
  // eslint-disable-next-line no-use-before-define
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

/**
 * @see https://github.com/paulmillr/chokidar
 * @see https://github.com/es128/anymatch
 */
export type Config = {
  watch: Path, // file, dir, glob, or array
  plugins?: Plugin[],
  templatesDir?: string,
  templates?: Template[],
  afterHooks?: AfterHook[],
  prettier: boolean,
  handlerMapper?: { [extensions: string]: Handler },
  ignored?: AnymatchPath, // file, dir, glob, regexp, or array
}

export type HandlerType = 'S2S' | 'TEMPLATE'
