import {useState, useCallback, useEffect} from 'react';
import {useHttp} from './http.hook.js';

export const useNavigation = () => {
    const {request} = useHttp();
    let menuItems, subItems;

    const fetchData = async () => {
        menuItems = await request('/api/catalog/sections', 'GET', null);
    }

    fetchData().finally(()=>{
        console.log(menuItems);
        return menuItems;
    });
}