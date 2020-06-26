export default function (data: any): any {
  return JSON.parse(JSON.stringify(data));
}