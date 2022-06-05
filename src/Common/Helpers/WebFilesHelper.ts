export function getFilePath(relativePath?: string) {
  if (relativePath == undefined) {
    return undefined;
  }
  return process.env.REACT_APP_API_URL! + relativePath;
}