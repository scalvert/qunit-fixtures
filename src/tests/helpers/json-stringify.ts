export default function toJson(json: object): string {
  return JSON.stringify(json, null, 2);
}
