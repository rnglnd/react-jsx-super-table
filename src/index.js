import React, { type Node } from "react";
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
  className?: string,
  data: Array<any>,
  debounceTimeout?: number,
  footer?: string | Node,
  getSearchString: (searchTerm: string) => string,
  headers: Array<{ key: string, value: string, sort?: boolean }>,
  isExternalSearch?: boolean,
  onHeaderSortClick?: (key: string) => void,
  searchPlaceholderText?: string,
  sortingIcon?: string | Node,
  title?: string | Node,
  titleClassName?: string
};

type State = {
  searchTerm: string
};

class SuperTable extends React.Component<Props, State> {
  static defaultProps = {
    debounceTimeout: 200,
    footer: null,
    getSearchString: () => {},
    isExternalSearch: false,
    onHeaderSortClick: () => {},
    searchPlaceholderText: "Search...",
    title: null
  };

  state = {
    searchTerm: ""
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
      className,
      data,
      footer,
      headers,
      isExternalSearch,
      onHeaderSortClick,
      searchPlaceholderText,
      sortingIcon,
      title,
      titleClassName
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
        <div className={titleClassName}>
          {title}
          <input
            onChange={this.filterData}
            placeholder={searchPlaceholderText}
          />
        </div>
        <table>
          <thead>
            <tr>
              {headers.map(header => (
                <th key={header.key}>
                  {header.value}
                  {onHeaderSortClick &&
                    header.sort !== false && (
                      <button onClick={() => onHeaderSortClick(header.key)}>
                        {sortingIcon}
                      </button>
                    )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{newData.map(({ row }) => row)}</tbody>
        </table>
        {footer}
      </div>
    );
  }
}

export default SuperTable;
