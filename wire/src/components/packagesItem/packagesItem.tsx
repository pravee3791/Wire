import './packagesItem.css';
import { IPackage } from "../../models/package";
import { isTemplateExpression } from 'typescript';
import { Link } from 'react-router-dom';
import { ReactChild, ReactFragment, ReactPortal, MouseEventHandler } from 'react';


interface IPackageItem{
  item: IPackage
}
function PackagesItem(props: IPackageItem) {
  
  return (
    <>
     
      <div>
        <figure className="card">
         
          <figcaption>
            <h2>{props.item.name}</h2>
            <p>{props.item.stars}</p>
            <span className="read-more">
              Read More
            </span>
          </figcaption>
        </figure>
      </div>
    </>

  );
}

export default PackagesItem;