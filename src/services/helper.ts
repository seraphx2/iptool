export const saveLocalStorage = (key: string, object: any) => {
  console.log(`${typeof object}`);
  if (typeof object === "string") localStorage.setItem(key, object);
  if (typeof object === "number") localStorage.setItem(key, object.toString());
  if (typeof object === "object")
    localStorage.setItem(key, JSON.stringify(object));
};

export const isValidInput = (text: string) => text && text.trim() !== "";

export const formatSizeUnits = (bytes: number): string => {
  if (bytes >= 1073741824) {
    return (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    return (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    return bytes + " bytes";
  } else if (bytes === 1) {
    return bytes + " byte";
  } else {
    return "0 bytes";
  }
};
