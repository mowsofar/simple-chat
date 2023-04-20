import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import {store} from "./store";

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;