/* @flow */
import React from "react";
import SuperTable from "../src/index";

const initOrganizations = [
  {
    id: 1,
    name: "First Org",
    type: "first"
  },
  {
    id: 2,
    name: "Second Org",
    type: "first"
  },
  {
    id: 3,
    name: "Third Org",
    type: "second"
  },
  {
    id: 4,
    name: "Fourth Org",
    type: "second"
  }
];

const moreOrganizations = [
  {
    id: 5,
    name: "Fifth Org",
    type: "third"
  },
  {
    id: 6,
    name: "Sixth Org",
    type: "third"
  }
];

/* eslint-disable */
// https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
// This is a really nice sorting function
// which I've found to be much more accurate than anything else I've tried.
const compareSortingValues = (key: string, order: boolean = true): Function => (
  a: Object,
  b: Object
): number | boolean => {
  if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
    // property doesn't exist on either object
    return 0;
  }

  const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
  const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

  let comparison = 0;

  if (varA > varB) {
    comparison = 1;
  } else if (varA < varB) {
    comparison = -1;
  }

  return order ? comparison * -1 : comparison;
};
/* eslint-enable */

type State = {
  columnSortAsc: boolean,
  columnToSort: string,
  filteredOrganizations: Array<Object>,
  organizations: Array<Object>
};

type Props = {};

class ExternalSearch extends React.Component<Props, State> {
  state = {
    columnToSort: "",
    columnSortAsc: false,
    filteredOrganizations: initOrganizations,
    organizations: initOrganizations
  };

  onHeaderSortClick = (key: string): void =>
    this.setState({
      columnSortAsc: !this.state.columnSortAsc,
      columnToSort: key
    });

  loadMoreOrgs = (): void =>
    this.setState({
      filteredOrganizations: [
        ...this.state.filteredOrganizations,
        ...moreOrganizations
      ]
    });

  externalSearchFunction = (searchTerm: string): void => {
    const newData = this.state.organizations.filter((organization: Object) =>
      `${organization.name}${organization.type}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    this.setState({
      filteredOrganizations: newData
    });
  };

  render() {
    const { columnToSort, columnSortAsc, filteredOrganizations } = this.state;

    return (
      <div>
        <h2>External Search</h2>

        <SuperTable
          className="container"
          data={filteredOrganizations
            .sort(compareSortingValues(columnToSort, columnSortAsc))
            .map(organization => ({
              values: `${organization.name}${organization.type}`,
              row: (
                <tr key={organization.id}>
                  <td>{organization.name}</td>
                  <td>{organization.type}</td>
                </tr>
              )
            }))}
          footer={
            <button onClick={this.loadMoreOrgs}>Click to load more</button>
          }
          getSearchString={this.externalSearchFunction}
          headers={[
            {
              key: "name",
              value: "Name"
            },
            {
              key: "type",
              value: "Type"
            }
          ]}
          onHeaderSortClick={this.onHeaderSortClick}
          isExternalSearch
          searchPlaceholderText="Search..."
          titleClassName="table__title"
          title="This is a table title."
        />
      </div>
    );
  }
}

export default ExternalSearch;
