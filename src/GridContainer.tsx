import { useState } from 'react';
import api from './api';
import Grid from './Grid';
import NoElements from './NoElements';
import { useQuery } from '@tanstack/react-query';
import { Character, Info } from './types';

const GridContainer = () => {
    /**
     * Query options
     */
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { data, isFetching } = useQuery({
        queryKey: ['api', search, page],
        queryFn: () =>
            api({
                search: search,
                page: page,
            }),
        placeholderData: {
            info: { count: 0, pages: 0, next: null, prev: null },
            results: [],
        },
    });

    // Get data from query (or placeholder data)
    const { info, results } = data as Info<Character[]>;

    /**
     * Logic for displaying number of pages
     * and creating array with page number option
     */
    const pagesOptionsArray = [];

    if (info?.pages) {
        for (let i = 1; i <= info.pages; i++) {
            pagesOptionsArray.push(i);
        }
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

            {isFetching ? (
                <div>Loading characters...</div>
            ) : results && results?.length > 0 ? (
                <Grid elements={results} count={info?.count ?? 0} />
            ) : (
                <NoElements />
            )}
        </div>
    );
};

export default GridContainer;
