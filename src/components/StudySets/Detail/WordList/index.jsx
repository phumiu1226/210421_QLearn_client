import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List as VList, CellMeasurer, CellMeasurerCache, InfiniteLoader, WindowScroller } from 'react-virtualized';
import WordItem from './WordItem'
import { Skeleton, Empty } from 'antd';
import './index.less';

function WordList(props) {


    const { wordList, total, loadMoreRows } = props;
    let rowCount = wordList.length + 1;

    if (total !== null && total !== undefined) {
        if (total === 0) {
            rowCount = 1;
        } else {
            rowCount = rowCount < total ? rowCount : total;
        }
    }





    const cache = new CellMeasurerCache({
        minHeight: 30,
        fixedWidth: true,
    });


    useEffect(() => {
        const handleResize = () => {
            cache.clearAll();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    const rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The wordList is currently being scrolled
        isVisible, // This row is visible within the wordList (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
        parent
    }) => {
        return (
            <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index} >
                {
                    ({ measure, registerChild }) => {
                        return (
                            total === 0 ? <div onLoad={measure} ref={registerChild} style={style} key={key}> <Empty /> </div> :
                                !wordList[index] ?
                                    <div onLoad={measure} ref={registerChild} style={style} key={key}> <Skeleton active /> </div>
                                    :
                                    <WordItem measure={measure} ref={registerChild} index={index} style={style} item={wordList[index]} key={key} />
                        )
                    }
                }
            </CellMeasurer>
        )
    }



    function isRowLoaded({ index }) {
        return !!wordList[index];
    }

    return (
        <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
        >
            {
                ({ onRowsRendered, registerChild }) => (
                    <WindowScroller>
                        {
                            ({ height, isScrolling, scrollTop }) =>
                            (
                                <AutoSizer disableHeight>
                                    {
                                        ({ width }) => (
                                            <VList
                                                width={width}
                                                height={height}
                                                scrollTop={scrollTop}

                                                autoHeight

                                                ref={registerChild}
                                                rowCount={rowCount}
                                                onRowsRendered={onRowsRendered}

                                                rowRenderer={rowRenderer}
                                                deferredMeasurementCache={cache}
                                                rowHeight={cache.rowHeight}


                                                overscanRowCount={10}

                                            />
                                        )
                                    }
                                </AutoSizer>
                            )
                        }
                    </WindowScroller>
                )
            }
        </InfiniteLoader>

    )
}

WordList.propTypes = {
    wordList: PropTypes.array,
    total: PropTypes.number,
}

export default React.memo(WordList);

