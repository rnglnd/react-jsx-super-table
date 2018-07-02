/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import WithSorting from './WithSorting';
import WithoutSorting from './WithoutSorting';
import WithSimplePagination from './WithSimplePagination';
import OneWithEverything from './OneWithEverything';
import ExternalSearch from './ExternalSearch';

const div = document.createElement('div');

if (document.body) {
  document.body.appendChild(div);
}

const Example = () => (
  <div>
    <h1>react-jsx-super-table</h1>
    <WithSorting />
    <hr />
    <WithoutSorting />
    <hr />
    <WithSimplePagination />
    <hr />
    <OneWithEverything />
    <hr />
    <ExternalSearch />
  </div>
);

ReactDOM.render(<Example />, div);
