# Interface: BaseCodeFragment

## Hierarchy

- **`BaseCodeFragment`**

  ↳ [`SpecialCodeFragment`](SpecialCodeFragment.md)

  ↳ [`OtherCodeFragment`](OtherCodeFragment.md)

## Table of contents

### Properties

- [code](BaseCodeFragment.md#code)
- [display](BaseCodeFragment.md#display)
- [errors](BaseCodeFragment.md#errors)
- [namespaceId](BaseCodeFragment.md#namespaceid)
- [replacements](BaseCodeFragment.md#replacements)
- [type](BaseCodeFragment.md#type)

## Properties

### <a id="code" name="code"></a> code

• `Readonly` **code**: [`CodeFragmentCodes`](../README.md#codefragmentcodes)

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:680](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L680)

___

### <a id="display" name="display"></a> display

• `Readonly` **display**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:681](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L681)

___

### <a id="errors" name="errors"></a> errors

• `Readonly` **errors**: [`ErrorMessage`](ErrorMessage.md)[]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:685](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L685)

___

### <a id="namespaceid" name="namespaceid"></a> namespaceId

• `Optional` `Readonly` **namespaceId**: `string`

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:683](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L683)

___

### <a id="replacements" name="replacements"></a> replacements

• `Optional` `Readonly` **replacements**: [`string`, ...string[]]

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:682](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L682)

___

### <a id="type" name="type"></a> type

• `Readonly` **type**: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"null"`` \| ``"Date"`` \| ``"Block"`` \| ``"Blank"`` \| ``"Record"`` \| ``"Array"`` \| ``"Error"`` \| ``"Spreadsheet"`` \| ``"Row"`` \| ``"Cell"`` \| ``"Column"`` \| ``"Range"`` \| ``"Cst"`` \| ``"Reference"`` \| ``"Function"`` \| ``"Predicate"`` \| ``"Button"`` \| ``"Switch"`` \| ``"literal"`` \| ``"Pending"`` \| ``"Waiting"`` \| ``"NoPersist"`` \| ``"any"`` \| ``"void"``

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:684](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L684)