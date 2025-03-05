import { render, screen } from '@testing-library/react';
import { PhotoCounter } from '../PhotoCounter';

// Mock framer-motion to avoid issues with animations in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    )),
  },
AnimatePresence: jest.fn(({ children }) => <>{children}</>),
}));

describe('PhotoCounter', () => {
  it('displays the correct count and limit', () => {
    render(<PhotoCounter count={3} limit={5} orientation="portrait" />);
    
    // Check if the counter shows the correct values
    expect(screen.getByText('3 / 5')).toBeInTheDocument();
  });
  
  it('shows red text when count reaches limit', () => {
    render(<PhotoCounter count={5} limit={5} orientation="portrait" />);
    
    // Check if the text has the red color class when at limit
    const countText = screen.getByText('5 / 5');
    expect(countText).toHaveClass('text-red-500');
  });
  
  it('shows white text when below the limit', () => {
    render(<PhotoCounter count={4} limit={5} orientation="portrait" />);
    
    // Check if the text has the white color class when below limit
    const countText = screen.getByText('4 / 5');
    expect(countText).toHaveClass('text-white');
  });
  
  it('positions counter correctly in landscape orientation', () => {
    render(<PhotoCounter count={3} limit={5} orientation="landscape" />);
    
    // Get the container with the absolute positioning class
    const container = screen.getByTestId('motion-div');
    expect(container).toHaveClass('absolute top-4 left-4');
  });
  
  it('positions counter correctly in portrait orientation', () => {
    render(<PhotoCounter count={3} limit={5} orientation="portrait" />);
    
    // Get the container with the absolute positioning class
    const container = screen.getByTestId('motion-div');
    expect(container).toHaveClass('absolute top-4 right-4');
  });
});