import { render, screen } from '@testing-library/react';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('renders the logo with default className', () => {
    render(<Logo />);
    
    // Check if the SVG element is in the document
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    
    // Verify it has the default class
    expect(svgElement).toHaveClass('w-auto h-8');
    
    // Check if the text "spevents" is rendered
    expect(screen.getByText('spevents')).toBeInTheDocument();
  });
  
  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<Logo className={customClass} />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveClass(customClass);
    expect(svgElement).not.toHaveClass('w-auto h-8');
  });
});