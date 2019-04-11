# flow-execa

> flow execa

## Install

```
$ npm install --save flow-execa
```

## API

### `getFlowBin(cwd: string): string`

return flow-bin path.

### `versionInfo(cwd: string): Promise<?Object>`

### `typeAtPos(cwd: string, filePath: string, row: number, column: number): Promise<TypeInfo>`

```js
type TypeInfo = ?{ type: string }
```

### `typeAtPosSync(cwd: string, filePath: string, row: number, column: number): TypeInfo`

### `getTypeFromFile(cwd: string, filePath: string, row: number, column: number): Promise<?string>`

### `getTypeFromFileSync(cwd: string, filePath: string, row: number, column: number): ?string`
