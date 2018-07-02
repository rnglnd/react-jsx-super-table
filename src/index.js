import * as React from 'react';
/* @flow */

const debounce = (callback, timeout) => {
  let interval;

  return (...args) => {
    if (timeout <= 0) {
      return callback(...args);
    }

    clearTimeout(interval);

    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, timeout);
  };
};

type Props = {
  bodyClassName?: string,
  className?: string,
  colSpanForEmpty?: string,
  data: Array<any>,
  debounceTimeout?: number,
  emptyMessage?: string,
  errorBodyClassName?: string,
  footer?: React.Node,
  getSearchString: () => string,
  headClassName?: string,
  headers: Array<{ key: string, value: string, sort?: boolean }>,
  onHeaderSortClick?: (key: string) => void,
  isExternalSearch: boolean,
  searchInputClassName?: string,
  searchPlaceholderText?: string,
  sortingIconClassName?: string,
  tableClassName?: string,
  titleText?: string | React.Node,
  titleTextClassName?: string
};

type State = {
  searchTerm: string
};

class SuperTable extends React.Component<Props, State> {
  static defaultProps = {
    debounceTimeout: 200,
    emptyMessage: '',
    footer: null,
    getSearchString: () => {},
    isExternalSearch: false,
    onHeaderSortClick: () => {},
    searchPlaceholderText: 'Search...',
    titleText: ''
  };

  state = {
    searchTerm: ''
  };

  debouncedFilter = debounce(
    (searchTerm: string) =>
      this.setState({ searchTerm }, () => {
        if (this.props.isExternalSearch) {
          this.props.getSearchString(searchTerm);
        }
      }),
    this.props.debounceTimeout
  );

  filterData = ({ target: { value } }: Object) => this.debouncedFilter(value);

  render() {
    const {
      bodyClassName,
      className,
      colSpanForEmpty,
      data,
      emptyMessage,
      errorBodyClassName,
      footer,
      headClassName,
      headers,
      onHeaderSortClick,
      isExternalSearch,
      searchPlaceholderText,
      searchInputClassName,
      sortingIconClassName,
      tableClassName,
      titleText,
      titleTextClassName
    } = this.props;
    const { searchTerm } = this.state;

    let newData = data;

    if (!isExternalSearch) {
      newData = this.props.data.filter((dataItem: Array<any>) =>
        dataItem.values.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return (
      <div className={className}>
        <div className={titleTextClassName}>
          {titleText}
          <input
            className={searchInputClassName}
            onChange={this.filterData}
            placeholder={searchPlaceholderText}
          />
        </div>
        <table className={tableClassName}>
          <thead className={headClassName}>
            <tr>
              {headers.map(header => (
                <th key={header.key}>
                  {header.value}
                  {onHeaderSortClick &&
                    header.sort !== false && (
                      <button
                        className={sortingIconClassName}
                        onClick={() => onHeaderSortClick(header.key)}
                      />
                    )}
                </th>
              ))}
            </tr>
          </thead>
          {!data.length ? (
            <tbody className={errorBodyClassName}>
              <tr>
                <td className="empty--cell" colSpan={colSpanForEmpty}>
                  <p>{emptyMessage}</p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className={bodyClassName}>
              {newData.map(({ row }) => row)}
            </tbody>
          )}
        </table>
        {footer}
      </div>
    );
  }
}

export default SuperTable;
