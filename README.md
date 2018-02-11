# react-jsx-super-table

#### A lightweight table for a React app which takes JSX for the body (instead of a config). There's also config options for searching fields and sorting columns.

If you have a need for a table with huge amounts of data, this is probably not the table for you and you'd be better using a component with fairly complex config options, that's why they have them (although you could write a really nice pagination function and put it in the `footer`). This table was born out of frustation of using too much boilerplate for a simple table, I just wanted to write JSX for the body instead of passing down all my data, all my functions and their params and everything else that's required. If you have a need for a simple table with manageable amounts of data then this may be perfect for you.

## Installation

```
$ npm install react-jsx-super-table
```

## Usage

This is a very simple component to use, the only props it requires are `data` (an array of objects containing `values`, a string to be searched on for the row and `row`, the row you want to display) and `headers` (an array obf objects containing `key`, `value` pairs which should be both strings along with an optional `sort` param to disable to column sorting).

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

There are other props you can avail of which are included in the table below:

| Props        | Type         | Required |
| ------------ | ------------ | ---------|
| bodyClassName | string | No |
| className | string | No |
| colSpanForEmpty | string | No |
| data | Array<{values: string, row: node}> | Yes |
| emptyMessage | string | No |
| errorBodyClassName | string | No |
| headClassName | string | No |
| headers | Array<{key: string, value: string, sort?: boolean}> | Yes |
| onHeaderSortClick | Function ((key: string) => void) | No |
| searchInputClassName | string | No |
| searchPlaceholderText | string | No |
| sortingIconClassName | string | No |
| footer | node | No |
| tableClassName | string | No |
| titleText | string/node | No |
| titleTextClassName | string | No |

## Development

We welcome any pull requests and here's how you can get started:

Install dependencies:

```
$ npm install
```

Run the example app at [http://localhost:8080](http://localhost:8080):

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

Generate UMD output in the `lib` folder (runs implicitly on `npm version`):

```
$ npm run build
```

## Releasing

After ensuring all the tests pass/writing new ones when adding features, version the component (we follow [https://semver.org/](https://semver.org/)) using `npm version <patch/minor/major>`.

Then run `npm publish` and make sure to pull it into your project, just as a final test.

## License

MIT
