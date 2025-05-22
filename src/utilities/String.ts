export function camelCaseToSnakeCase(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function camelCaseToPath(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function snakeCaseToPath(input: string) {
  return input.replace(/_/, '-').toLowerCase();
}

export function spaceToPath(input: string) {
  return input.replace(/\s+/g, '-').toLowerCase();
}

export function pathToSpace(input: string) {
  return input.replace(/-/, ' ').toLowerCase();
}

export function formatTime(input: string) {
  const date = new Date(input);

  const pad = (num: number) => String(num).padStart(2, '0');

  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const yyyy = date.getFullYear();

  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${mm}/${dd}/${yyyy} @ ${hh}:${min}:${ss}`;
}
