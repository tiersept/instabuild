import { v4 as uuidv4 } from "uuid";

export function generateUuid(props?: Parameters<typeof uuidv4>[0]): string {
  return uuidv4(props);
}
