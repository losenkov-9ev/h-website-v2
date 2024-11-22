export type Mods = Record<string, boolean | string | undefined>;

export enum ELocation {
  home = '/',
  profile = '/profile',
  reviews = '/reviews',
}

export enum ELoadingStatus {
  loading = 'loading',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}
