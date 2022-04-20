import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IPackage  } from "../../models/package";
import { Thunk } from '../types';
import PackageService from "../../services/api";
import { SEARCHENDPOINT, apiKey } from '../../constants/constant';

export interface IPackageStore  {
    PackageList:Array<IPackage> 
    PackageListCount:number, 
    isPackageLoaded: boolean,
    isPackageLoading: boolean,
    isError: boolean,
    error: string,
}
const initialState: IPackageStore = {
  PackageList: [] ,
  PackageListCount: 0,
  isPackageLoaded: false,
  isPackageLoading: false,
  isError: false,
  error: '', 
}


export const PackageSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        fetchingPackage: (state) => {
            state.isPackageLoading = true;
            state.isPackageLoaded = false;
        },
        loadPackage(state, action: PayloadAction<IPackage[]>) {
            state.PackageList = action.payload;
            state.PackageListCount = action.payload.length;
            state.isPackageLoaded = true;
            state.isPackageLoading = false;
            state.isError = false;
        },
        failure(state, action: PayloadAction<string>) {
            state.isPackageLoading = false;
            state.isPackageLoaded = false;
            state.isError = true;
            state.error = action.payload;
        },
       
        clearPackages(state) {
            state.PackageList = [];
            state.PackageListCount = 0;
        },


    },
})

export const { fetchingPackage, loadPackage, failure,  clearPackages } = PackageSlice.actions

export default PackageSlice.reducer


export const searchPackages = (search: string): Thunk => {
    return async (dispatch) => {
        dispatch(clearPackages())
        dispatch(fetchingPackage());
        try {
            const { data } = await PackageService.searchPacakage(`${SEARCHENDPOINT}q=${search}&api_key=${apiKey}`);
            dispatch(loadPackage(data))
        } catch (e: any) {
            dispatch(failure(e.message))
        }
    }
}


