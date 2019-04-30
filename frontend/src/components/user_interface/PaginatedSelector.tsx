
import * as React from "react";


interface IProps {
  refetchQuery: any;
  currentPage: number;
  totalPages: number;
}

class AudioDataFields extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const  {currentPage, totalPages, refetchQuery } = this.props;
    return (

        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        {
          (currentPage - 1) <= 0 ?
          <a className="pagination-previous" data-disabled={true}>
            Previous
          </a>
        :
          <a className="pagination-previous" onClick={() => refetchQuery(currentPage - 1)} >
            Previous
          </a>
        }
        {
          currentPage === totalPages ?
          <a className="pagination-next" data-disabled={true}>Next page</a>
        :
          <a className="pagination-next" onClick={() => refetchQuery(currentPage + 1)}>Next page</a>
        }


          <ul className="pagination-list">
            <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li><a className="pagination-link" aria-label="Goto page 45">45</a></li>
            <li><a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
            <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li><a className="pagination-link" aria-label="Goto page 86">86</a></li>
          </ul>
        </nav>

    );
  }
}

export default AudioDataFields;
