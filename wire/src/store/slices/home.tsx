import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback, useState, useMemo } from 'react';
import Pagination from "../../components/pagination/pagination";
import Header from "../../components/header/header";
import Search from "../../components/search/search";
import SideBar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import PackagesItem from "../../components/packagesItem/packagesItem";
import Loader from "../../components/loader/loader";
import "./home.css";
import { IPackage } from "../../models/package";
import { searchPackages } from "../../store/slices/package";
import { packages } from "../../store/selectors";
let PageSize = 5;

function Home() {
    const dispatch = useDispatch();

    const packageData = useSelector(packages);
    //load packages on page load
    useEffect(() => {
        dispatch(searchPackages('',1));
    }, []);

   

    const [currentPage, setCurrentPage] = useState(1);

    const getPaginatedData = (pageNumber:number) =>{
        dispatch(searchPackages('', pageNumber));
    }
    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return packageData.PackageList.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);


    return (
        <>
            <div className='home'>
                <Header></Header>
                <SideBar></SideBar>
                <div className="container">
                    <Search></Search>
                    {/* {packageData.isError && <div className="error">{packageData.error}</div>} */}
                    <div className='home-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Language</th>
                                    <th className='onhoverHand'>Star </th>
                                </tr>
                            </thead>
                            <tbody id='employee-table-body'>
                                {packageData.PackageList.map((item: IPackage, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <PackagesItem key={index} item={item} ></PackagesItem>
                                            </td>
                                            <td>{item.language}</td>
                                            <td>{item.stars}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination-wrapper">
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={packageData.PackageListCount}
                            pageSize={PageSize}
                            onPageChange={(page: any) => getPaginatedData(page)}
                        />
                    </div>
                </div>





                <Footer></Footer>
            </div>


        </>
    )
}

export default Home;