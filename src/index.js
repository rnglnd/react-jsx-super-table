/* @flow */
import * as React from 'react';
import {isEmpty, pluck} from 'ramda';
import {DebounceInput} from 'react-debounce-input';

type Props = {
  bodyClassName?: string,
  className?: string,
  colSpanForEmpty?: string,
  data: Array<any>,
  emptyMessage?: string,
  errorBodyClassName?: string,
  headClassName?: string,
  headers: Array<any>,
  onHeaderSortClick: (key: string) => void,
  searchPlaceholderText?: string,
  tableFooter?: React.Node,
  footerClassName?: string,
  titleText?: string
};

type State = {
  searchTerm: string
};

/*
Only data and headers props are required to get this table to work.
headers has a key as well as a value to get the sorting to work, passing back this via onHeaderSortClick.

For use with pagination the viewMoreButton can be set (showViewMoreButton) and used by onClickViewMoreButton.
*/

class SuperTable extends React.Component<Props, State> {
  static defaultProps = {
    bodyClassName: '',
    className: '',
    emptyMessage: '',
    errorBodyClassName: '',
    headClassName: '',
    onHeaderSortClick: () => {},
    searchPlaceholderText: 'Search...',
    tableFooter: null,
    titleText: ''
  };

  state = {
    searchTerm: ''
  };

  filterData = ({ target: { value } }: Object) => (
    this.setState({ searchTerm: value })
  );

  render() {
    const {
      bodyClassName,
      colSpanForEmpty,
      data,
      emptyMessage,
      errorBodyClassName,
      headClassName,
      headers,
      onHeaderSortClick,
      searchPlaceholderText,
      className,
      tableFooter,
      footerClassName,
      titleText
    } = this.props;

    const newData = this.props.data.filter((dataItem) => (
      dataItem.values.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    ));


    return (
      <table
        className={className}
      >
        <div className="table__title-bar">
          <div className="table__title">
            {titleText}
          </div>
          <div className="table__actions">
            <label className="r7-label table__search">
              <div className="input-w-icon input-w-icon--post">
                <i className="r7-icon r7-icon-search input-icon table__search-icon" />
                <DebounceInput
                  className="r7-input table__search-input"
                  debounceTimeout={200}
                  minLength={0}
                  onChange={this.filterData}
                  placeholder={searchPlaceholderText}
                />
              </div>
            </label>
          </div>
        </div>
        <div className="table__data">
          <thead className={headClassName}>
            <tr>
            {headers.map((header) =>
              <th key={header.key}>
                {header.value}
                {header.sort !== false
                  && (
                    <button
                      className="r7-icon r7-icon-sort-arrows"
                      onClick={() => onHeaderSortClick(header.key)}
                    />
                  )
                }
              </th>
            )}
            </tr>
          </thead>
          {isEmpty(data)
            ? (
              <tbody className={errorBodyClassName}>
                <tr>
                  <td
                    className="empty--cell"
                    colSpan={colSpanForEmpty}
                  >
                    <p>{emptyMessage}</p>
                  </td>
                </tr>
              </tbody>
            )
            : (
              <tbody className={bodyClassName}>
                {pluck('row', newData)}
              </tbody>
            )
          }
        </div>
        {tableFooter}
      </table>
    );
  };
};

export default SuperTable;