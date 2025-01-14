# Interface: MakeContextResult

## Hierarchy

- `Omit`<[`FunctionContext`](FunctionContext.md), `"meta"`\>

  ↳ **`MakeContextResult`**

## Table of contents

### Properties

- [buildMeta](MakeContextResult.md#buildmeta)
- [fetchUUID](MakeContextResult.md#fetchuuid)
- [formulaContext](MakeContextResult.md#formulacontext)
- [interpretContext](MakeContextResult.md#interpretcontext)
- [interpretDirectly](MakeContextResult.md#interpretdirectly)
- [parseDirectly](MakeContextResult.md#parsedirectly)

## Properties

### <a id="buildmeta" name="buildmeta"></a> buildMeta

• **buildMeta**: (`args`: [`BaseTestCase`](BaseTestCase.md)<{}\>) => [`VariableMetadata`](VariableMetadata.md)

#### Type declaration

▸ (`args`): [`VariableMetadata`](VariableMetadata.md)

##### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `args` | [`BaseTestCase`](BaseTestCase.md)<{}\> |

##### Returns

[`VariableMetadata`](VariableMetadata.md)

#### Defined in

[packages/formula/src/tests/testType.ts:237](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L237)

---

### <a id="fetchuuid" name="fetchuuid"></a> fetchUUID

• **fetchUUID**: (`uuid`: [`MockedUUIDV4`](../README.md#mockeduuidv4)) => `string`

#### Type declaration

▸ (`uuid`): `string`

##### Parameters

| Name   | Type                                        |
| :----- | :------------------------------------------ |
| `uuid` | [`MockedUUIDV4`](../README.md#mockeduuidv4) |

##### Returns

`string`

#### Defined in

[packages/formula/src/tests/testType.ts:240](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L240)

---

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• `Readonly` **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Inherited from

Omit.formulaContext

#### Defined in

[packages/formula/src/type/index.ts:415](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L415)

---

### <a id="interpretcontext" name="interpretcontext"></a> interpretContext

• `Readonly` **interpretContext**: [`InterpretContext`](InterpretContext.md)

#### Inherited from

Omit.interpretContext

#### Defined in

[packages/formula/src/type/index.ts:420](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L420)

---

### <a id="interpretdirectly" name="interpretdirectly"></a> interpretDirectly

• **interpretDirectly**: (`args`: [`BaseTestCase`](BaseTestCase.md)<{}\>) => `Promise`<[[`VariableData`](VariableData.md), [`ParseResult`](../README.md#parseresult)]\>

#### Type declaration

▸ (`args`): `Promise`<[[`VariableData`](VariableData.md), [`ParseResult`](../README.md#parseresult)]\>

##### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `args` | [`BaseTestCase`](BaseTestCase.md)<{}\> |

##### Returns

`Promise`<[[`VariableData`](VariableData.md), [`ParseResult`](../README.md#parseresult)]\>

#### Defined in

[packages/formula/src/tests/testType.ts:238](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L238)

---

### <a id="parsedirectly" name="parsedirectly"></a> parseDirectly

• **parseDirectly**: (`args`: [`BaseTestCase`](BaseTestCase.md)<{}\>) => [`ParseResult`](../README.md#parseresult)

#### Type declaration

▸ (`args`): [`ParseResult`](../README.md#parseresult)

##### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `args` | [`BaseTestCase`](BaseTestCase.md)<{}\> |

##### Returns

[`ParseResult`](../README.md#parseresult)

#### Defined in

[packages/formula/src/tests/testType.ts:239](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/tests/testType.ts#L239)
