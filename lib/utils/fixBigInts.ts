type BigIntConvertible =
  | string
  | number
  | boolean
  | Date
  | bigint
  | null
  | undefined
  | BigIntConvertible[]
  | { [key: string]: BigIntConvertible };

export function fixBigInts(obj: BigIntConvertible): BigIntConvertible {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'bigint') return obj.toString();

  if (Array.isArray(obj)) return obj.map(fixBigInts);

  if (typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, fixBigInts(value)])
    );
  }

  return obj;
}
