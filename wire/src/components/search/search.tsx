
   
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  searchPackages, setSearch} from "../../store/slices/package";

import './search.css'
function Search() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const setSearchText = useCallback((e: any) => {
        dispatch(setSearch(searchTerm));
        setSearchTerm(e.target.value);
    }, []);

    const search = useCallback((e: any) => {
        e.preventDefault();
        
        dispatch(searchPackages(searchTerm, 1));
    }, [searchTerm]);

    const handleKeyPress = useCallback((e: any) => {
        if(e.which === 13) {
            dispatch(searchPackages(searchTerm,1));
        }
    }, [searchTerm]);

    return (
        <>
            <div className="wrapper">
                <div className="search-container">
                    <input type="text" value={searchTerm} onChange={setSearchText} onKeyPress={handleKeyPress} className="input" placeholder="What are you looking for?"  />
                    <input type="button" value="search" onClick={search} className="close-btn" />
                </div>
            </div>
        </>
    )
}

export default Search;
