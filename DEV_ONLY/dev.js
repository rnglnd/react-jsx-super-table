import React from 'react';
import ReactDOM from 'react-dom';
import SuperTable from '../src/index';
import './style.css';

const div = document.createElement('div');
document.body.appendChild(div);
const organizations = [{
  id: 1,
  name: 'First Org',
  type: 'first',
}, {
  id: 2,
  name: 'Second Org',
  type: 'first',
}, {
  id: 3,
  name: 'Third Org',
  type: 'second',
}, {
  id: 4,
  name: 'Fourth Org',
  type: 'second',
}];

/* eslint-disable */
// https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
// This is a really nice sorting function
// which I've found to be much more accurate than anything else I've tried.
const compareSortingValues = (key: string, order: boolean = true): Function =>
  (a: Object, b: Object): number | boolean => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;

    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return (
      order ? (comparison * -1) : comparison
    );
  };
/* eslint-enable */

class Example extends React.Component {
  state = {
    columnToSort: '',
    columnSortAsc: false,
  };

  onHeaderSortClick = (key: string): void => (
    this.setState({
      columnSortAsc: !this.state.columnSortAsc,
      columnToSort: key,
    })
  );

  render() {
    const {
      columnToSort,
      columnSortAsc,
    } = this.state;

    return (
      <div>
        <h1>react-jsx-super-table</h1>

        <SuperTable
          className="container"
          colSpanForEmpty="2"
          data={
            organizations
              .sort(compareSortingValues(columnToSort, columnSortAsc))
              .map(organization => ({
                values: `${organization.name}${organization.type}`,
                row: (
                  <tr
                    key={organization.id}
                  >
                    <td>
                      {organization.name}
                    </td>
                    <td>
                      {organization.type}
                    </td>
                  </tr>
                ),
              }))
          }
          footer={<p>Pagination could go here.</p>}
          emptyMessage={"There's no data."}
          headers={[
            {
              key: 'name',
              value: 'Name',
            },
            {
              key: 'type',
              value: 'Type',
            },
          ]}
          onHeaderSortClick={this.onHeaderSortClick}
          tableClassName="table"
          titleTextClassName="table__title"
          titleText="This is a table title."
        />
      </div>
    );
  }
}

ReactDOM.render(<Example />, div);
