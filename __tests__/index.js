import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SuperTable from '../src/';

configure({ adapter: new Adapter() });

describe('<SuperTable />', () => {
  const callback = jest.fn();
  const superTable = shallow(
    <SuperTable
      bodyClassName="bodyClassName"
      className="className"
      data={[
        {
          values: 'First Org',
          row: (
            <tr key={1}>
              <td>First Org</td>
            </tr>
          )
        }
      ]}
      errorBodyClassName="errorBodyClassName"
      footer={<p>Pagination could go here.</p>}
      headers={[
        {
          key: 'name',
          value: 'Name'
        }
      ]}
      headClassName="headClassName"
      searchInputClassName="searchInputClassName"
      sortingIconClassName="sortingIconClassName"
      tableClassName="tableClassName"
      titleTextClassName="titleTextClassName"
      onHeaderSortClick={callback}
    />
  );

  it('Should test all class names', () => {
    expect(superTable.find('.bodyClassName')).toHaveLength(1);
    expect(superTable.find('.className')).toHaveLength(1);
    expect(superTable.find('.headClassName')).toHaveLength(1);
    expect(superTable.find('.searchInputClassName')).toHaveLength(1);
    expect(superTable.find('.sortingIconClassName')).toHaveLength(1);
    expect(superTable.find('.tableClassName')).toHaveLength(1);
    expect(superTable.find('.titleTextClassName')).toHaveLength(1);
  });

  it('should trigger the onHeaderSortClick callback', () => {
    superTable.find('button').simulate('click');
    expect(callback).toHaveBeenCalled();
  });
});
