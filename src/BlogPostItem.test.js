import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogPostItem from './Components/BlogPostItem';

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '0' }),
}));

// Mocking the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                articles: [
                    {
                        title: 'Post 1',
                        content: 'Content 1',
                        urlToImage: 'https://example.com/image1.jpg',
                    },
                    {
                        title: 'Post 2',
                        content: 'Content 2',
                        urlToImage: 'https://example.com/image2.jpg',
                    },
                ],
            }),
    })
);

describe('BlogPostItem', () => {
    beforeEach(() => {
        // Clear the mock call history before each test
        fetch.mockClear();
    });

    test('renders loading state initially', () => {
        render(
            <MemoryRouter initialEntries={['/post/0']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostItem />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders blog post details after fetching data', async () => {
        render(
            <MemoryRouter initialEntries={['/post/0']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostItem />} />
                </Routes>
            </MemoryRouter>
        );

        // Wait for the post to be fetched and rendered
        await waitFor(() => expect(screen.getByText('Post 1')).toBeInTheDocument());
        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.getByAltText('Post 1')).toHaveAttribute('src', 'https://example.com/image1.jpg');
        expect(screen.getByText('Back to list')).toBeInTheDocument();
    });

    test('renders error state when fetch fails', async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));

        render(
            <MemoryRouter initialEntries={['/post/0']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostItem />} />
                </Routes>
            </MemoryRouter>
        );

        // Wait for the component to handle the error
        await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());

        // Ensure the post is not rendered when fetch fails
        expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
});