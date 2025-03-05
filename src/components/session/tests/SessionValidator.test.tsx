import { render, screen, waitFor } from '@testing-library/react';
import { SessionValidator } from '../SessionValidator';
import { useSession } from '../../../contexts/SessionContext';
import { BrowserRouter } from 'react-router-dom';

// Mock React Router's useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ eventId: 'test-event-id' }),
}));

// Mock SessionContext
jest.mock('../../contexts/SessionContext', () => ({
  useSession: jest.fn(),
}));

describe('SessionValidator', () => {
  const mockIsValidSession = jest.fn();
  const mockChildren = <div data-testid="test-children">Test Children</div>;
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
      isValidSession: mockIsValidSession,
    });
  });
  
  it('shows loading state initially', () => {
    mockIsValidSession.mockImplementation(() => new Promise(() => {})); // Never resolves to keep in loading state
    
    render(
      <BrowserRouter>
        <SessionValidator>{mockChildren}</SessionValidator>
      </BrowserRouter>
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByTestId('test-children')).not.toBeInTheDocument();
  });
  
  it('renders children when session is valid', async () => {
    mockIsValidSession.mockResolvedValue(true);
    
    render(
      <BrowserRouter>
        <SessionValidator>{mockChildren}</SessionValidator>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });
  });
  
  it('shows invalid session message when session is invalid', async () => {
    mockIsValidSession.mockResolvedValue(false);
    
    render(
      <BrowserRouter>
        <SessionValidator>{mockChildren}</SessionValidator>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Invalid Session')).toBeInTheDocument();
      expect(screen.queryByTestId('test-children')).not.toBeInTheDocument();
    });
  });
  
  it('validates session with the correct event ID', async () => {
    mockIsValidSession.mockResolvedValue(true);
    
    render(
      <BrowserRouter>
        <SessionValidator>{mockChildren}</SessionValidator>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(mockIsValidSession).toHaveBeenCalledWith('test-event-id');
    });
  });
});