[notion-blogger](../README.md) / [Exports](../modules.md) / default

# Class: default

```typescript
const notionBlogger = new NotionBlogger(config);

```

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [blogger](default.md#blogger)
- [notion](default.md#notion)

### Methods

- [publish](default.md#publish)

## Constructors

### constructor

• **new default**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/Config.md) |

#### Defined in

[app.ts:15](https://github.com/Souvikns/Notion-Blogger/blob/9240a5e/lib/app.ts#L15)

## Properties

### blogger

• `Private` `Readonly` **blogger**: `Blogger`

#### Defined in

[app.ts:14](https://github.com/Souvikns/Notion-Blogger/blob/9240a5e/lib/app.ts#L14)

___

### notion

• `Private` `Readonly` **notion**: `NotionAdapter`

#### Defined in

[app.ts:13](https://github.com/Souvikns/Notion-Blogger/blob/9240a5e/lib/app.ts#L13)

## Methods

### publish

▸ **publish**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`PublishConfig`](../interfaces/PublishConfig.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[app.ts:28](https://github.com/Souvikns/Notion-Blogger/blob/9240a5e/lib/app.ts#L28)
