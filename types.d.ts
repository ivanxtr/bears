export interface APIMainnetMagicedenIo {
  results: Result[]
  nextCursor: string
}

export interface Result {
  mintAddress: string
  supply: number
  title: string
  primarySaleHappened: boolean
  updateAuthority: UpdateAuthority
  onChainCollection: OnChainCollection
  sellerFeeBasisPoints: number
  creators: Creator[]
  price: number
  escrowPubkey: string
  owner: string
  v2: V2
  id: string
  tokenDelegateValid: boolean
  isFrozen: boolean
  tokenStandard: number
  mip1State: number
  img: string
  attributes: Attribute[]
  externalURL: string
  content: string
  collectionName: CollectionName
  collectionTitle: CollectionTitle
  isTradeable: boolean
  rarity: Rarity
  listingType: ListingType
  listingUpdatedAt: ListingUpdatedAt
  lastSalePriceWithFees: number
  createdAt: Date
  updatedAt: Date
  lastSalePrice?: number
}

export interface Attribute {
  trait_type: TraitType
  value: string
}

export enum TraitType {
  Background = 'Background',
  Clothes = 'Clothes',
  Eyes = 'Eyes',
  Eyewear = 'Eyewear',
  Fur = 'Fur',
  Hat = 'Hat',
  Mouth = 'Mouth'
}

export enum CollectionName {
  OkayBears = 'okay_bears'
}

export enum CollectionTitle {
  OkayBears = 'Okay Bears'
}

export interface Creator {
  address: Address
  verified: number
  share: number
}

export enum Address {
  The3XVDoLaecZwXXtN59O6T3Gfxwjcgf8Hc9RfoqBn995P9 = '3xVDoLaecZwXXtN59o6T3Gfxwjcgf8Hc9RfoqBn995P9',
  The7ZL7HVn85F5YFT6XM3BsJcQF7PBcNE7R2BT5GyfunpKe = '7zL7HVn85F5yFT6XM3BsJcQF7PBcNE7R2BT5GyfunpKe'
}

export enum ListingType {
  M2 = 'M2'
}

export interface ListingUpdatedAt {
  updatedAt: Date
  slot: number
}

export interface OnChainCollection {
  key: Key
  verified: number
  data: Data
}

export interface Data {
  name: CollectionTitle
  image: string
  description: string
}

export enum Key {
  The3SaAedkM9O5G1U5DCqsuMZuC4GRqPB4TuMkvSsSVvGQ3 = '3saAedkM9o5g1u5DCqsuMZuC4GRqPB4TuMkvSsSVvGQ3'
}

export interface Rarity {
  howrare: Howrare
  moonrank: Moonrank
}

export interface Howrare {
  rank: number
}

export interface Moonrank {
  rank: number
  absolute_rarity: number
  crawl: Crawl
}

export interface Crawl {}

export enum UpdateAuthority {
  The4Zj22Pu8YRyenFHwLmue28CqVMGFgVQt5FmVvwdP5FLa = '4zj22pu8yRyenFHwLmue28CqVmGFgVQt5FmVvwdP5fLa'
}

export interface V2 {
  auctionHouseKey: AuctionHouseKey
  sellerReferral: SellerReferral
  expiry: number
}

export enum AuctionHouseKey {
  E8CU1WiRWjanGxmn96EwBgk9VPTcL6AEZ1T6F6FkgUWe = 'E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe'
}

export enum SellerReferral {
  AutMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2 = 'autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2',
  Cr5A8ULq6NqxvYz9HCrrhrprPRr5PVRKPNPPGDk8AZo = 'cr5a8uLq6NqxvYz9HCrrhrprPRr5PVRKPNPPgDk8aZo'
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toAPIMainnetMagicedenIo(json: string): APIMainnetMagicedenIo {
    return cast(JSON.parse(json), r('APIMainnetMagicedenIo'))
  }

  public static aPIMainnetMagicedenIoToJson(
    value: APIMainnetMagicedenIo
  ): string {
    return JSON.stringify(uncast(value, r('APIMainnetMagicedenIo')), null, 2)
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ)
  const parentText = parent ? ` on ${parent}` : ''
  const keyText = key ? ` for key "${key}"` : ''
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  )
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a)
        })
        .join(', ')}]`
    }
  } else if (typeof typ === 'object' && typ.literal !== undefined) {
    return typ.literal
  } else {
    return typeof typ
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }))
    typ.jsonToJS = map
  }
  return typ.jsonToJS
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }))
    typ.jsToJSON = map
  }
  return typ.jsToJSON
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = '',
  parent: any = ''
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val
    return invalidValue(typ, val, key, parent)
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length
    for (let i = 0; i < l; i++) {
      const typ = typs[i]
      try {
        return transform(val, typ, getProps)
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent)
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val
    return invalidValue(
      cases.map((a) => {
        return l(a)
      }),
      val,
      key,
      parent
    )
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l('array'), val, key, parent)
    return val.map((el) => transform(el, typ, getProps))
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null
    }
    const d = new Date(val)
    if (isNaN(d.valueOf())) {
      return invalidValue(l('Date'), val, key, parent)
    }
    return d
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue(l(ref || 'object'), val, key, parent)
    }
    const result: any = {}
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key]
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined
      result[prop.key] = transform(v, prop.typ, getProps, key, ref)
    })
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref)
      }
    })
    return result
  }

  if (typ === 'any') return val
  if (typ === null) {
    if (val === null) return val
    return invalidValue(typ, val, key, parent)
  }
  if (typ === false) return invalidValue(typ, val, key, parent)
  let ref: any = undefined
  while (typeof typ === 'object' && typ.ref !== undefined) {
    ref = typ.ref
    typ = typeMap[typ.ref]
  }
  if (Array.isArray(typ)) return transformEnum(typ, val)
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent)
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val)
  return transformPrimitive(typ, val)
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps)
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps)
}

function l(typ: any) {
  return { literal: typ }
}

function a(typ: any) {
  return { arrayItems: typ }
}

function u(...typs: any[]) {
  return { unionMembers: typs }
}

function o(props: any[], additional: any) {
  return { props, additional }
}

function m(additional: any) {
  return { props: [], additional }
}

function r(name: string) {
  return { ref: name }
}

const typeMap: any = {
  APIMainnetMagicedenIo: o(
    [
      { json: 'results', js: 'results', typ: a(r('Result')) },
      { json: 'nextCursor', js: 'nextCursor', typ: '' }
    ],
    false
  ),
  Result: o(
    [
      { json: 'mintAddress', js: 'mintAddress', typ: '' },
      { json: 'supply', js: 'supply', typ: 0 },
      { json: 'title', js: 'title', typ: '' },
      { json: 'primarySaleHappened', js: 'primarySaleHappened', typ: true },
      {
        json: 'updateAuthority',
        js: 'updateAuthority',
        typ: r('UpdateAuthority')
      },
      {
        json: 'onChainCollection',
        js: 'onChainCollection',
        typ: r('OnChainCollection')
      },
      { json: 'sellerFeeBasisPoints', js: 'sellerFeeBasisPoints', typ: 0 },
      { json: 'creators', js: 'creators', typ: a(r('Creator')) },
      { json: 'price', js: 'price', typ: 3.14 },
      { json: 'escrowPubkey', js: 'escrowPubkey', typ: '' },
      { json: 'owner', js: 'owner', typ: '' },
      { json: 'v2', js: 'v2', typ: r('V2') },
      { json: 'id', js: 'id', typ: '' },
      { json: 'tokenDelegateValid', js: 'tokenDelegateValid', typ: true },
      { json: 'isFrozen', js: 'isFrozen', typ: true },
      { json: 'tokenStandard', js: 'tokenStandard', typ: 0 },
      { json: 'mip1State', js: 'mip1State', typ: 0 },
      { json: 'img', js: 'img', typ: '' },
      { json: 'attributes', js: 'attributes', typ: a(r('Attribute')) },
      { json: 'externalURL', js: 'externalURL', typ: '' },
      { json: 'content', js: 'content', typ: '' },
      {
        json: 'collectionName',
        js: 'collectionName',
        typ: r('CollectionName')
      },
      {
        json: 'collectionTitle',
        js: 'collectionTitle',
        typ: r('CollectionTitle')
      },
      { json: 'isTradeable', js: 'isTradeable', typ: true },
      { json: 'rarity', js: 'rarity', typ: r('Rarity') },
      { json: 'listingType', js: 'listingType', typ: r('ListingType') },
      {
        json: 'listingUpdatedAt',
        js: 'listingUpdatedAt',
        typ: r('ListingUpdatedAt')
      },
      { json: 'lastSalePriceWithFees', js: 'lastSalePriceWithFees', typ: 0 },
      { json: 'createdAt', js: 'createdAt', typ: Date },
      { json: 'updatedAt', js: 'updatedAt', typ: Date },
      { json: 'lastSalePrice', js: 'lastSalePrice', typ: u(undefined, 0) }
    ],
    false
  ),
  Attribute: o(
    [
      { json: 'trait_type', js: 'trait_type', typ: r('TraitType') },
      { json: 'value', js: 'value', typ: '' }
    ],
    false
  ),
  Creator: o(
    [
      { json: 'address', js: 'address', typ: r('Address') },
      { json: 'verified', js: 'verified', typ: 0 },
      { json: 'share', js: 'share', typ: 0 }
    ],
    false
  ),
  ListingUpdatedAt: o(
    [
      { json: 'updatedAt', js: 'updatedAt', typ: Date },
      { json: 'slot', js: 'slot', typ: 0 }
    ],
    false
  ),
  OnChainCollection: o(
    [
      { json: 'key', js: 'key', typ: r('Key') },
      { json: 'verified', js: 'verified', typ: 0 },
      { json: 'data', js: 'data', typ: r('Data') }
    ],
    false
  ),
  Data: o(
    [
      { json: 'name', js: 'name', typ: r('CollectionTitle') },
      { json: 'image', js: 'image', typ: '' },
      { json: 'description', js: 'description', typ: '' }
    ],
    false
  ),
  Rarity: o(
    [
      { json: 'howrare', js: 'howrare', typ: r('Howrare') },
      { json: 'moonrank', js: 'moonrank', typ: r('Moonrank') }
    ],
    false
  ),
  Howrare: o([{ json: 'rank', js: 'rank', typ: 0 }], false),
  Moonrank: o(
    [
      { json: 'rank', js: 'rank', typ: 0 },
      { json: 'absolute_rarity', js: 'absolute_rarity', typ: 0 },
      { json: 'crawl', js: 'crawl', typ: r('Crawl') }
    ],
    false
  ),
  Crawl: o([], false),
  V2: o(
    [
      {
        json: 'auctionHouseKey',
        js: 'auctionHouseKey',
        typ: r('AuctionHouseKey')
      },
      {
        json: 'sellerReferral',
        js: 'sellerReferral',
        typ: r('SellerReferral')
      },
      { json: 'expiry', js: 'expiry', typ: 0 }
    ],
    false
  ),
  TraitType: [
    'Background',
    'Clothes',
    'Eyes',
    'Eyewear',
    'Fur',
    'Hat',
    'Mouth'
  ],
  CollectionName: ['okay_bears'],
  CollectionTitle: ['Okay Bears'],
  Address: [
    '3xVDoLaecZwXXtN59o6T3Gfxwjcgf8Hc9RfoqBn995P9',
    '7zL7HVn85F5yFT6XM3BsJcQF7PBcNE7R2BT5GyfunpKe'
  ],
  ListingType: ['M2'],
  Key: ['3saAedkM9o5g1u5DCqsuMZuC4GRqPB4TuMkvSsSVvGQ3'],
  UpdateAuthority: ['4zj22pu8yRyenFHwLmue28CqVmGFgVQt5FmVvwdP5fLa'],
  AuctionHouseKey: ['E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe'],
  SellerReferral: [
    'autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2',
    'cr5a8uLq6NqxvYz9HCrrhrprPRr5PVRKPNPPgDk8aZo'
  ]
}
