import React from 'react';
import memoize from 'fast-memoize';
import chunk from 'lodash.chunk';

import useResizeObserver from 'use-resize-observer';

const { useState, useEffect } = React;

const getColSize = memoize((colWidth, rowWidth, gap) => {
  // mathematical formula to get total number of columns;
  return (rowWidth - 2 * colWidth - gap) / (gap + colWidth) + 2;
});

const getColWidth = memoize((colSize, rowWidth, gap) => {
  // mathematical formula to get the column width;
  return (rowWidth - gap * (colSize - 1)) / colSize;
});

export function Grid<DataItem extends any>(props: {
  style?: Record<string, any>;
  className?: string;
  itemClassName?: string;
  data: DataItem[];
  gap?: number | { x: number; y: number };
  minColWidth?: number;
  maxColWidth?: number;
  minMaxWeight?: number; // [0 - 1] default: 0.5. weighted average of column width min/max balance. 1 is more lenient towards maximum column width, meaning wider columns. 0 is more lenient towards minimum column width, meaning skinnier columns
  children: (dataItem: DataItem, index: number, columnWidth: number) => any;
}) {
  const {
    data,
    gap = 0,
    children,
    style = {},
    className = '',
    itemClassName = '',
    minColWidth = 0,
    maxColWidth = 99999,
    minMaxWeight = 0.5,
  } = props;

  const [colWidth, setColWidth] = useState<number | undefined>();
  const [colSize, setColSize] = useState<number | undefined>();

  const { ref, width } = useResizeObserver<HTMLDivElement>();

  let gapx = 0;
  let gapy = 0;
  if (typeof gap === 'number') {
    gapx = gap;
    gapy = gap;
  } else {
    ({ x: gapx, y: gapy } = gap);
  }

  useEffect(() => {
    if (
      typeof width === 'number' &&
      typeof minColWidth === 'number' &&
      typeof maxColWidth === 'number' &&
      typeof minMaxWeight === 'number' &&
      typeof gapx === 'number' &&
      Array.isArray(data)
    ) {
      const maxColSize = Math.min(
        getColSize(minColWidth, width, gapx),
        data.length
      );
      const minColSize = Math.max(getColSize(maxColWidth, width, gapx), 1);

      const range = maxColSize - minColSize;
      // weight to either lean towards min or max
      let colSize = Math.round(maxColSize - range * minMaxWeight);

      const colWidth = Math.max(
        Math.min(getColWidth(colSize, width, gapx), maxColWidth),
        minColWidth
      );

      if (colSize * colWidth + (colSize - 1) * gapx > width) {
        colSize -= 1;
      }

      setColWidth(colWidth);
      setColSize(colSize);
    }
  }, [width, minColWidth, maxColWidth, gapx, data, minMaxWeight]);

  const rows: DataItem[][] = chunk(data, colSize);

  return (
    <div style={{ width: '100%', ...style }} ref={ref} className={className}>
      {typeof colWidth === 'number' &&
        typeof colSize === 'number' &&
        Array.isArray(data) &&
        rows.map((row, i: number) => {
          return (
            <div
              className="rwfg-row"
              key={i}
              style={{ marginBottom: i < rows.length - 1 ? gapy : 0 }}
            >
              {row.map((col, j) => {
                const gridItemStyle = {
                  display: 'inline-block',
                  width: colWidth,
                  paddingLeft: j % colSize === 0 ? 0 : gapx / 2,
                  paddingRight: j % colSize === colSize - 1 ? 0 : gapx / 2,
                };
                return (
                  <div
                    className={`rwfg-item ${itemClassName}`}
                    style={gridItemStyle}
                    key={j}
                  >
                    {typeof children === 'function' &&
                      children(col, j + i * colSize, colWidth)}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default Grid;
