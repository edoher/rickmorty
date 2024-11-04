import { useCallback, useEffect, useMemo, useState } from 'react';
import api from './api';
import { GridElement } from './types';
import Grid from './Grid';
import NoElements from './NoElements';

const App = () => {
    const [elements, setElements] = useState<GridElement[]>([]);
    const [elementCount, setElementCount] = useState(0);
    /**
     * Query options
     */
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    /**
     * New grid element
     */
    const emptyNew: GridElement = useMemo(
        () => ({
            title: '',
            description: '',
            imagePath: '',
        }),
        []
    );
    const [newElement, setNewElement] = useState<GridElement>(emptyNew);
    const [customElements, setCustomElements] = useState<GridElement[]>([]);

    const fetchData = useCallback(async () => {
        const { data, count } = await api({
            search: search,
            page: page,
            per_page: perPage,
        });

        setElements(data);
        setElementCount(count);
    }, [search, page, perPage]);

    const editNew = useCallback(
        (prop: string, value: string) => {
            const newVersion = { ...newElement, [prop]: value };

            setNewElement(newVersion);
        },
        [newElement]
    );

    const createNew = useCallback(() => {
        const { title, description, imagePath } = newElement;

        if (!title || !description || !imagePath) {
            return;
        }

        setCustomElements([...customElements, newElement]);
        setNewElement(emptyNew);
    }, [newElement, customElements, emptyNew]);

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
    const pages = elementCount > 0 ? Math.floor(elementCount / perPage) : 1;
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

                <div>
                    <label htmlFor="perPageSelect">Elements per page</label>
                    <select
                        id="perPageSelect"
                        className="ml-2"
                        tabIndex={0}
                        value={perPage}
                        onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                        ) => {
                            setPerPage(Number(event.target.value));

                            // Avoid error when changing page size, as this page might not exist anymore
                            setPage(1);
                        }}
                    >
                        <option>2</option>
                        <option>5</option>
                        <option>10</option>
                    </select>
                </div>
            </div>

            {elements.length > 0 ? (
                <Grid elements={elements} />
            ) : (
                <NoElements />
            )}

            <h2 className="font-bold text-2xl text-center mt-10">
                Create new elements!
            </h2>

            <div className="create-new flex justify-center gap-6 p-6">
                <div>
                    <label htmlFor={'field-title'}>Title</label>
                    <input
                        id={'field-title'}
                        className="border mt-1 block"
                        tabIndex={0}
                        value={newElement.title}
                        type="text"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => editNew('title', event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor={'field-description'}>Description</label>
                    <input
                        id={'field-description'}
                        className="border mt-1 block"
                        tabIndex={0}
                        value={newElement.description}
                        type="text"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => editNew('description', event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor={'field-image'}>Image path</label>
                    <input
                        id={'field-image'}
                        className="border mt-1 block"
                        tabIndex={0}
                        value={newElement.imagePath}
                        type="text"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => editNew('imagePath', event.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <button
                        className="border rounded-md bg-blue-700 disabled:bg-gray-400 px-2 py-1 text-white"
                        type="button"
                        disabled={
                            !newElement.title ||
                            !newElement.description ||
                            !newElement.imagePath
                        }
                        onClick={() => createNew()}
                    >
                        Create!
                    </button>
                </div>
            </div>

            {customElements.length > 0 && <Grid elements={customElements} />}
        </div>
    );
};

export default App;
