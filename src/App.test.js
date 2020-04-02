import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import News from './component/news';


it("testing correct", ()=>{
  const {queryByTestId} = render(<News />);
  expect(queryByTestId('pagination-button')).toBeInTheDocument();
});
