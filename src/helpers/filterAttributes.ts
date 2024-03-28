export function filterAttributes(obj: any): any {
  const filteredAttributes: any = {},
    filteredQuery: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === "1" || value === "-1") {
        filteredAttributes[key] = Number(value);
      } else filteredQuery[key] = value;
    }
  }

  return { filteredAttributes, filteredQuery };
}
