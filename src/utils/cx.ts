export type ClassValue = string | number | false | null | undefined;

/** Joins truthy class names with a single space. */
export function cx(...classes: ClassValue[]): string {
  let out = '';
  for (const c of classes) {
    if (c || c === 0) out += (out ? ' ' : '') + String(c);
  }
  return out;
}
