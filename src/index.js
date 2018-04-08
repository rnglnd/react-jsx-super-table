import * as React from 'react';
import debounce from 'lodash.debounce';
/* @flow */

type Props = {
  bodyClassName?: string,
  className?: string,
  colSpanForEmpty?: string,
  data: Array<any>,
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
  titleTextClassName?: string,
};

type State = {
  searchTerm: string,
};

class SuperTable extends React.Component<Props, State> {
  static defaultProps = {
    emptyMessage: '',
    onHeaderSortClick: () => {},
    searchPlaceholderText: 'Search...',
    footer: null,
    titleText: '',
  };

  state = {
    searchTerm: '',
  };

  debouncedFilter = debounce((searchTerm: string) => this.setState({ searchTerm }), 200);

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
      titleTextClassName,
    } = this.props;

    const newData = this.props.data.filter((dataItem: Array<any>) =>
      dataItem.values.toLowerCase().includes(this.state.searchTerm.toLowerCase()),
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
            <tbody className={bodyClassName}>{newData.map(({ row }) => row)}</tbody>
          )}
        </table>
        {footer}
      </div>
    );
  }
}

export default SuperTable;
