import { ApiRequest, Character, Info } from './types';

const api = async ({
    search,
    page,
}: ApiRequest): Promise<Info<Character[]>> => {
    const params = {
        ...(page && { page }),
        ...(search && { name: search }),
    };

    const queryString = new URLSearchParams(
        params as Record<string, string>
    ).toString();

    const response = await fetch(
        'https://rickandmortyapi.com/api/character?' + queryString
    );

    return response.json();
};

export default api;
