# React Wrappable Fluid Grid

react-wrappable-fluid-grid is exactly like it sounds: A simple to use react fluid grid component that auto wraps its items.

No need to define breakpoints or spans. Give the grid item a min and max width and you're good to go.

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

![Example GIF](https://i.imgur.com/i0hft6t.gifv)


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





