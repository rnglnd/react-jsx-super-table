import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SuperTable from '../src/';

configure({ adapter: new Adapter() });

describe('<SuperTable />', () => {
  const callback = jest.fn();
  const superTable = shallow(
    <SuperTable
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
      footer={<p>Pagination could go here.</p>}
      headers={[
        {
          key: 'name',
          value: 'Name'
        }
      ]}
      sortingIcon="sortingIcon"
      titleClassName="titleClassName"
      onHeaderSortClick={callback}
    />
  );

  it('Should test all class names', () => {
    expect(superTable.find('.className')).toHaveLength(1);
    expect(superTable.find('.titleClassName')).toHaveLength(1);
  });

  it('should trigger the onHeaderSortClick callback', () => {
    superTable.find('button').simulate('click');
    expect(callback).toHaveBeenCalled();
  });
});
