import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogPostDetails from './Components/BlogPostDetails';

const mockPost = {
    title: "Mock Post Title",
    urlToImage: "https://example.com/image.jpg",
    content: "This is the content of the mock post."
};

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ articles: [mockPost] }),
    })
);

describe('BlogPostDetails', () => {
    it('renders loading state initially', () => {
        render(
            <MemoryRouter initialEntries={['/post/0']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetails />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders blog post details after fetching data', async () => {
        render(
            <MemoryRouter initialEntries={['/post/0']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText(mockPost.title)).toBeInTheDocument());
        expect(screen.getByText(mockPost.content)).toBeInTheDocument();
        expect(screen.getByAltText(mockPost.title)).toHaveAttribute('src', mockPost.urlToImage);
    });

    it('renders error state when fetch fails', async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject("API is down"));

        render(
            <MemoryRouter initialEntries={['/post/0']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
    });

    it('back button works correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/post/0']}>
                <Routes>
                    <Route path="/" element={<div>Blog List</div>} />
                    <Route path="/post/:id" element={<BlogPostDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText(mockPost.title)).toBeInTheDocument());

        screen.getByText('Back to list').click();

        await waitFor(() => expect(screen.getByText('Blog List')).toBeInTheDocument());
    });
});