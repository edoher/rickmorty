import { useCallback, useEffect, useState } from 'react';
import api from './api';
import { Character } from './types';
import Grid from './Grid';
import NoElements from './NoElements';

const App = () => {
    const [elements, setElements] = useState<Character[]>();
    const [elementCount, setElementCount] = useState<number>();
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
        setElementCount(info?.count);
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
    const pages =
        elementCount && elementCount > 0 ? Math.floor(elementCount / 20) : 1;
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
                        ) => setSearch(event.target.value)}
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
                <Grid elements={elements} />
            ) : (
                <NoElements />
            )}
        </div>
    );
};

export default App;
