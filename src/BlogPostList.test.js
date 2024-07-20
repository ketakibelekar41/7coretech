import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogPostList from './Components/BlogPostList';

// Mocking the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                articles: [
                    { title: 'Post 1', description: 'Description 1' },
                    { title: 'Post 2', description: 'Description 2' },
                ],
            }),
    })
);

describe('BlogPostList', () => {
    beforeEach(() => {
        // Clear the mock call history before each test
        fetch.mockClear();
    });

    test('renders blog post list', async () => {
        render(
            <BrowserRouter>
                <BlogPostList />
            </BrowserRouter>
        );

        // Ensure the fetch is called
        expect(global.fetch).toHaveBeenCalledTimes(1);

        // Wait for the posts to be rendered
        await waitFor(() => expect(screen.getByText('Post 1')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Post 2')).toBeInTheDocument());

        // Check if links are rendered
        expect(screen.getAllByText('View Details').length).toBe(2);
    });

    test('renders error message on fetch failure', async () => {
        // Mock the fetch to reject
        global.fetch.mockImplementationOnce(() =>
            Promise.reject('API is down')
        );

        render(
            <BrowserRouter>
                <BlogPostList />
            </BrowserRouter>
        );

        // Ensure the fetch is called
        expect(global.fetch).toHaveBeenCalledTimes(1);

        // Wait for the component to handle the error
        await waitFor(() => expect(screen.queryByText('Post 1')).not.toBeInTheDocument());
        expect(screen.queryByText('Post 2')).not.toBeInTheDocument();
    });
});