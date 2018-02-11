import React from 'react';
import renderer from 'react-test-renderer';
import SuperTable from '../src/index';

describe('<SuperTable />', () => {
  it('renders placeholder div', () => {
    const tree = renderer.create(
      <SuperTable />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
