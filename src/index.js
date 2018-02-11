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
  headers: Array<{key: string, value: string, sort?: boolean}>,
  onHeaderSortClick?: (key: string) => void,
  searchInputClassName?: string,
  searchPlaceholderText?: string,
  sortingIconClassName?: string,
  footer?: React.Node,
  tableClassName?: string,
  titleText?: string | React.Node,
  titleTextClassName?: string
};

type State = {
  searchTerm: string
};

class SuperTable extends React.Component<Props, State> {
  static defaultProps = {
    emptyMessage: '',
    onHeaderSortClick: () => { },
    searchPlaceholderText: 'Search...',
    footer: null,
    titleText: ''
  };

  state = {
    searchTerm: ''
  };

  filterData = ({target: {value}}: Object) => (
    this.setState({searchTerm: value})
  );

  render() {
    const {
      bodyClassName,
      className,
      colSpanForEmpty,
      data,
      emptyMessage,
      errorBodyClassName,
      headClassName,
      headers,
      onHeaderSortClick,
      searchPlaceholderText,
      footer,
      searchInputClassName,
      sortingIconClassName,
      tableClassName,
      titleText,
      titleTextClassName
    } = this.props;

    const newData = this.props.data.filter((dataItem) => (
      dataItem.values.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    ));

    return (
      <div
        className={className}
      >
        <div className={titleTextClassName}>
          {titleText}
          <DebounceInput
            className={searchInputClassName}
            debounceTimeout={200}
            minLength={0}
            onChange={this.filterData}
            placeholder={searchPlaceholderText}
          />
        </div>
        <table className={tableClassName}>
          <thead className={headClassName}>
            <tr>
              {headers.map((header) =>
                <th key={header.key}>
                  {header.value}
                  {onHeaderSortClick && header.sort !== false
                    && (
                      <button
                        className={sortingIconClassName}
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
        </table>
        {footer}
      </div>
    );
  };
};

export default SuperTable;
