export enum Privacy {
  Private = 'private',
  Public = 'public',
}

export function privacyFromString(privacy: string): Privacy {
  if (Object.values(Privacy).includes(privacy as Privacy)) {
    return privacy as Privacy;
  }
  throw new Error('Invalid privacy value');
}
