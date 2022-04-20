import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback, useState } from 'react';
import Header from "../../components/header/header";
import Search from "../../components/search/search";
import PackagesItem from "../../components/packagesItem/packagesItem";
import Pagination from "../../components/pagination/pagination";
import Loader from "../../components/loader/loader";
import "./home.css";
import { IPackage } from "../../models/package";
import { searchPackages } from "../../store/slices/package";
import { packages } from "../../store/selectors";

function Home() {
    const dispatch = useDispatch();

    const packageData = useSelector(packages);
    //load packages on page load
    useEffect(() => {
        dispatch(searchPackages(''));
    }, []);
    const [currentPage, setCurrentPage] = useState(1);
    let LIMIT = 5;
    const onPageChanged = useCallback(
        (event, page) => {
            event.preventDefault();
            setCurrentPage(page);
        },
        [setCurrentPage]
    );



    return (
        <>
            <Header></Header>
            <Search></Search>
            <div className="home">
                {packageData.isError && <div className="error">{packageData.error}</div>}
                {packageData.isPackageLoading ? <Loader></Loader> : ''}
                <div className="container">
                    {packageData.PackageList.map((item: IPackage, index: number) => {
                        return (
                            <PackagesItem key={index} item={item} ></PackagesItem>
                        )
                    })}
                </div>
            </div>
            <div className="pagination-wrapper">
                <Pagination
                    totalRecords={packageData.PackageListCount}
                    totalPages={~~(packageData.PackageListCount / LIMIT) + 1}
                    pageLimit={LIMIT}
                    pageNeighbours={0}
                    onPageChanged={onPageChanged}
                    currentPage={currentPage}
                />
            </div>
        </>
    )
}

export default Home;