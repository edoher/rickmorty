import { useCallback, useEffect, useState } from 'react';
import api from './api';
import { Character } from './types';
import Grid from './Grid';
import NoElements from './NoElements';

const GridContainer = () => {
    const [elements, setElements] = useState<Character[]>();
    const [pages, setPages] = useState(0);
    const [elementCount, setElementCount] = useState(0);
    /**
     * Query options
     */
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const fetchData = useCallback(async () => {
        const { results, info } = await api({
            search: search,
            page: page,
        });

        setElements(results);
        setPages(info?.pages ?? 0);
        setElementCount(info?.count ?? 0);
    }, [search, page]);

    /**
     * Initial app data fetch
     * (and subsequent when the fetch function changes)
     */
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /**
     * Logic for estimating number of pages
     * and creating array with page number option
     */
    const pagesOptionsArray = [];

    for (let i = 1; i <= pages; i++) {
        pagesOptionsArray.push(i);
    }

    return (
        <div className="container">
            <div className="pagination-and-search flex justify-center gap-6 p-6">
                <div>
                    <label htmlFor="searchBox">Search</label>
                    <input
                        id="searchBox"
                        className="border ml-2"
                        tabIndex={0}
                        value={search}
                        type="text"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setSearch(event.target.value);
                            // reset page number, since newer search might have less results
                            setPage(1);
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="pageSelect">Page</label>
                    <select
                        id="pageSelect"
                        className="ml-2"
                        tabIndex={0}
                        value={page}
                        onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                        ) => setPage(Number(event.target.value))}
                    >
                        {pagesOptionsArray.map((pagesOption) => (
                            <option key={`page-option-${pagesOption}`}>
                                {pagesOption}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {elements && elements.length > 0 ? (
                <Grid elements={elements} count={elementCount} />
            ) : (
                <NoElements />
            )}
        </div>
    );
};

export default GridContainer;
