
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

        <nav className="pagination is-rounded is-small is-centered" role="navigation" aria-label="pagination">

          {
            currentPage === 1 ?
            <span
              className={`pagination-previous is-disabled`}
              data-disabled={true}
              >
                Previous
            </span>
          :
          <span
            className={`pagination-previous`}
            onClick={() => refetchQuery(currentPage - 1)}
            >
              Previous
          </span>
          }

           {
             currentPage === totalPages ?
             <span
               className={`pagination-next is-disabled`}
               data-disabled={true}
               >
                 Next page
             </span>
             :
             <span
               className={`pagination-next`}
               onClick={() => refetchQuery(currentPage + 1)}
               >
                 Next page
             </span>
           }

          <ul className="pagination-list">
            <li>
              {
                currentPage === 1 ?
                <span
                  className={`pagination-link is-disabled`}
                  data-disabled={true}
                  >
                  1
                </span>
                :

                <span

                  className={`pagination-link `}
                  aria-label="Goto page 1"
                  onClick={() => refetchQuery(1)}>
                  1
                </span>
              }

            </li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li>
            {
              currentPage === 1?
              <span
                className={`pagination-link is-disabled`}
                data-disabled={true}
                />
              :
              <span
                className={`pagination-link`}
                aria-label={`Goto page ${currentPage - 1}`}
                onClick={() => refetchQuery(currentPage - 1) }
                >
                  { currentPage -1 }
                </span>
            }

            </li>
            <li>
              <span
                className="pagination-link is-current is-disabled"
                aria-label={`Goto page ${currentPage}`}
                aria-current="page"
                data-disabled={true}
                >
                  {currentPage}
              </span>
            </li>
            <li>
            {
              (currentPage + 1) > totalPages ?
              <span
                className={`pagination-link is-disabled`}
                data-disabled={true}
                />
              :
              <span
                className={`pagination-link `}
                aria-label={`Goto page ${(currentPage + 1)}`}
                onClick={() => refetchQuery(currentPage + 1 )}
                >
                { currentPage + 1 }
              </span>

            }
            </li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li>
            {
              totalPages === currentPage ?
                <span
                  className={`pagination-link is-disabled`}
                  data-disabled={true}
                  >
                    {totalPages}
                  </span>
              :

              <span
                className={`pagination-link`}
                aria-label={`Goto page ${totalPages}`}
                onClick={() => refetchQuery(totalPages )}
                >
                  {totalPages}
              </span>
            }
            </li>
          </ul>
        </nav>

    );
  }
}

export default AudioDataFields;
