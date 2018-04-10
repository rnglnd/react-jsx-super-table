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
  headClassName?: string,
  headers: Array<{ key: string, value: string, sort?: boolean }>,
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
    debounceTimeout: 200,
    emptyMessage: '',
    onHeaderSortClick: () => {},
    searchPlaceholderText: 'Search...',
    footer: null,
    titleText: ''
  };

  state = {
    searchTerm: ''
  };

  debouncedFilter = debounce(
    (searchTerm: string) => this.setState({ searchTerm }),
    this.props.debounceTimeout
  );

  filterData = ({ target: { value } }: Object) => {
    const searchTerm = value;
    return this.debouncedFilter(searchTerm);
  };

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

    const newData = this.props.data.filter((dataItem: Array<any>) =>
      dataItem.values
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase())
    );

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
