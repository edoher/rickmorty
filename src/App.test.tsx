import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import api from './api';

vi.mock('./api');

describe('Basic App test', () => {
    beforeEach(() => {
        vi.mocked(api).mockResolvedValue({
            data: [],
            count: 0,
        });

        render(<App />);
    });

    it('Initially renders the App component', async () => {
        await waitFor(async () => {
            expect(
                await screen.findByText('Create new elements!')
            ).toBeTruthy();
        });
    });
});

describe('Checks for App details', () => {
    beforeEach(() => {
        vi.mocked(api).mockResolvedValue({
            data: [
                {
                    title: 'We believe',
                    description: 'We believe',
                    imagePath: 'sample',
                },
                {
                    title: 'Avengers',
                    description: 'Avengers',
                    imagePath: 'sample',
                },
                {
                    title: 'Yes',
                    description: 'Yes',
                    imagePath: 'sample',
                },
            ],
            count: 10,
        });
    });

    it('Renders 3 elements', async () => {
        const { container } = render(<App />);

        await waitFor(async () => {
            expect(
                container.getElementsByClassName('grid-element').length
            ).toBe(3);
        });
    });
});
