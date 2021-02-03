# React Wrappable Fluid Grid

[![npm](https://img.shields.io/npm/v/react-wrappable-fluid-grid.svg)](https://www.npmjs.com/package/react-wrappable-fluid-grid) ![license](https://img.shields.io/npm/l/react-wrappable-fluid-grid.svg) ![github-issues](https://img.shields.io/github/issues/gone369/react-wrappable-fluid-grid.svg) ![npm-downloads](https://img.shields.io/npm/dt/react-wrappable-fluid-grid.svg)


react-wrappable-fluid-grid is exactly like it sounds: A simple to use react fluid grid component that auto wraps its items.

No need to define breakpoints or spans. Give the grid item a min and max width and you're good to go.

![Example GIF](https://i.imgur.com/rnGDjPY.gif)  

[Original Size GIF](https://i.imgur.com/i0hft6t.gifv)

```jsx
import React from 'react';
import Grid from 'react-wrappable-fluid-grid'

function GridParent(){
  const data = [
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5},
    {value: 6},
  ]
  return (
    <Grid data={data} minColWidth={160} maxColWidth={200} gap={10}>
      {(dataItem, i, colWidth) => {
        return (
          <div style={{background: '#efefef', textAlign: 'center'}}>
            <div>{dataItem.value}</div>
            <div style={{fontSize: '0.7rem'}}>width: {colWidth}</div>
          </div>
        )
      }}
    </Grid>
  )
}
```



## Compatibility

React > v16.8  (relies on hooks)

Uses [resize-observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) under the hood  

https://caniuse.com/?search=resizeObserver
thus IE is not supported :sunglasses:

## Installation

npm
```bash
npm install react-wrappable-fluid-grid
```
yarn
```bash
yarn add react-wrappable-fluid-grid
```

## Basic Usage

[visit live docs](https://react-wrappable-fluid-grid.vercel.app/)


## Typescript

```tsx
import React from 'react';
import Grid from 'react-wrappable-fluid-grid';

interface DataItem {
  value: number;
}

function GridParent: React.FC<any>(){
  const data: DataItem[] = [
    { value: 1 }
  ];

  return (
    <Grid<DataItem>
      data={data}
    >
      {(dataItem, i, colWidth) => {
        return (
          <div>{dataItem.value}</div>
        )
      }}
    </Grid>
  );
}

```



