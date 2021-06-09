export function assertNever(value: never): never {
  throw new Error(`${value} is an unexpected value. Should have been never.`);
}
