import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import BlogPostList from './Components/BlogPostList';
import BlogPostItem from './Components/BlogPostItem';
//mock the blogpost list and items component
jest.mock('./Components/BlogPostList', () => () => <div>BlogPostList Component</div>);
jest.mock('./Components/BlogPostItem', () => () => <div>BlogPostItem Component</div>);

test('renders BlogPostList component for the default route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('BlogPostList Component')).toBeInTheDocument();
});

test('renders BlogPostItem component for a post detail route', () => {
  render(
    <MemoryRouter initialEntries={['/post/0']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('BlogPostItem Component')).toBeInTheDocument();
});