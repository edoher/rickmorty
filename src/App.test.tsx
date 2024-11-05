import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import api from './api';

vi.mock('./api');

describe('Basic App test', () => {
    beforeEach(() => {
        vi.mocked(api).mockResolvedValue({});

        render(<App />);
    });

    it('Initially renders the App component', async () => {
        await waitFor(async () => {
            expect(await screen.findByText('No results found :(')).toBeTruthy();
        });
    });
});

describe('Checks for App details', () => {
    beforeEach(() => {
        vi.mocked(api).mockResolvedValue({
            info: {
                count: 826,
                pages: 42,
                next: 'https://rickandmortyapi.com/api/character/?page=20',
                prev: 'https://rickandmortyapi.com/api/character/?page=18',
            },
            results: [
                {
                    id: 361,
                    name: 'Toxic Rick',
                    status: 'Dead',
                    species: 'Humanoid',
                    type: "Rick's Toxic Side",
                    gender: 'Male',
                    origin: {
                        name: 'Alien Spa',
                        url: 'https://rickandmortyapi.com/api/location/64',
                    },
                    location: {
                        name: 'Earth',
                        url: 'https://rickandmortyapi.com/api/location/20',
                    },
                    image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
                    episode: ['https://rickandmortyapi.com/api/episode/27'],
                    url: 'https://rickandmortyapi.com/api/character/361',
                    created: '2018-01-10T18:20:41.703Z',
                },
                {
                    id: 361,
                    name: 'Toxic Rick',
                    status: 'Dead',
                    species: 'Humanoid',
                    type: "Rick's Toxic Side",
                    gender: 'Male',
                    origin: {
                        name: 'Alien Spa',
                        url: 'https://rickandmortyapi.com/api/location/64',
                    },
                    location: {
                        name: 'Earth',
                        url: 'https://rickandmortyapi.com/api/location/20',
                    },
                    image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
                    episode: ['https://rickandmortyapi.com/api/episode/27'],
                    url: 'https://rickandmortyapi.com/api/character/361',
                    created: '2018-01-10T18:20:41.703Z',
                },
            ],
        });
    });

    it('Renders 2 elements', async () => {
        const { container } = render(<App />);

        await waitFor(async () => {
            expect(
                container.getElementsByClassName('grid-element').length
            ).toBe(2);
        });
    });
});
