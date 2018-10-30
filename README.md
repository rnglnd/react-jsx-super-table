# react-jsx-super-table
[![npm](https://img.shields.io/npm/v/react-jsx-super-table.svg)](https://www.npmjs.com/package/react-jsx-super-table)


#### A lightweight table with search and soring options for a React app which takes regular JSX to render the body.

This table was born out of frustation of using too much boilerplate for simple tables. I just wanted to write JSX for the body instead of passing down all my data, all my functions and their params and all the other props that were required. Don't get me wrong, if you have a need for a fairly complex table or grid those types of components are probably what you need, that's why they were created. This component is made specifically for smaller tables so you can develop them a little quicker and manage them a lot more easily, although for more complex uses you could write a really nice pagination function and put it in the `footer` to use this component

## Installation

```
$ npm install react-jsx-super-table
```

## Usage

The best way to see usages of the component is to look through our [examples](examples), you should be able to find an example for your needs. Also if you have a created a really nice implementation then please add it to the examples!

The only props required to use this component are `data` (an array of objects containing `values`, a string to be searched on for the row and `row`, the row you want to display) and it looks like this:

```
data={randomData
  .map(random => ({
    values: `${random.name}${random.type}`,
    row: (
      <tr key={random.id}>
        <td>{random.name}</td>
        <td>{random.type}</td>
      </tr>
    )
  }))}
```

and `headers` (an array obf objects containing `key`, `value` pairs which should be both strings along with an optional `sort` param to disable to column sorting) which looks like this:

```
  headers={[
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'type',
      value: 'Type'
    }
  ]}
```

#### Sorting

You can also pass it a `onHeaderSortClick` function to sort the headers, in which you would keep `columnToSort`: string in state, a simple example of function would be this:

```
onHeaderSortClick = (key) => (
  this.setState({
    columnToSort: key
  })
);
```

Then add a sort, like Ramda's `sortBy` to the data before passing it to the component:

```
import {sortBy, prop} from 'ramda';

sortBy(prop(columnToSort), data).map((...
```

#### Searching

Client side searching is enabled by default but from version 1.3 and above you can have external searching (including the ability to do server side searching). This requires two props `isExternalSearch` which is a boolean and should be set to true and `getSearchString` which is a function that will return the search string to the client, from there the client will have to minipulate the `data` themselves.

An example of this is included in the project [here](examples/ExternalSearch.js)

#### All props

There are other props you can avail of which are included in the table below:

| Props        | Type         | Required |
| ------------ | ------------ | ---------|
| className | string | No |
| debounceTimeout | number | No |
| data | Array<{values: string, row: node}> | Yes |
| getSearchString | () => string | No (Yes for external search) |
| headers | Array<{key: string, value: string, sort?: boolean}> | Yes |
| isExternalSearch | boolean | No |
| onHeaderSortClick | Function ((key: string) => void) | No |
| searchPlaceholderText | string | No |
| sortingIcon | string | No |
| footer | node | No |
| title | string/node | No |
| titleClassName | string | No |

## Development

We welcome any pull requests and here's how you can get started:

Install dependencies:

```
$ npm install
```

Run the example app at [http://localhost:3000](http://localhost:3000):

```
$ npm start
```

Run tests and watch for code changes using [jest](https://github.com/facebook/jest):

```
$ npm test
```

Lint `src` and `test` files:

```
$ npm run lint
```

## License

MIT
