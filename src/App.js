import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import BlogPostList from './Components/BlogPostList';
import BlogPostItem from './Components/BlogPostItem';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" exact element={<BlogPostList />} />
          <Route path="/post/:id" element={<BlogPostItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;