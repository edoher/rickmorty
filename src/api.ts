import { ApiRequest, ApiResponse, GridElement } from './types';

const api = async ({
    search,
    page,
    per_page,
}: ApiRequest): Promise<ApiResponse> => {
    const dataFetch = await fetch('/data.json', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    const data: GridElement[] = await dataFetch.json();
    let count = data.length;

    let processedData = data;

    if (search) {
        const searchRegex = new RegExp(search, 'i');

        processedData = processedData.filter((element) =>
            searchRegex.test(element.title)
        );

        count = processedData.length;
    }

    if (page && per_page) {
        const start = page === 1 ? 0 : (page - 1) * per_page;
        const end = start + per_page;

        processedData = processedData.slice(start, end);
    }

    return { data: processedData, count };
};

export default api;
