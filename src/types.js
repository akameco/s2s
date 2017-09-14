// @flow
export type Path = string
type FileName = string
type PluginName = string

export type PluginOpts = PluginName | [PluginName, Object]

export type Plugin = {|
  test: RegExp,
  plugin: PluginOpts,
  output: FileName,
|}

export type Template = {|
  test: RegExp,
  input: Path,
|}

export type AfterHook = Function

export type Opts = {|
  watch: Path, // file, dir, glob, or array
  plugins?: Plugin[],
  templatesDir?: string,
  templates?: Template[],
  afterHooks?: AfterHook[],
|}
