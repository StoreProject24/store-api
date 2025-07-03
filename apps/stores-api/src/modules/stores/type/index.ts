import { Store } from '@shared/types/store.types';

export type StoreWithOutUser = Omit<Store, 'userId'>;