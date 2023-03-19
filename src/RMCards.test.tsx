import RMCards from './RMCards';
import {render, screen} from '@testing-library/react';

test('App renders', () => {
  render(<RMCards />);
});

test('First page of results renders', async () => {
  render(<RMCards />);
  await screen.findByText(/rick sanchez/i, undefined, {timeout: 3000});
});


test('Character details render when \"flip\" is clicked', async () => {
  render(<RMCards />);
  const flipButtons = await screen.findAllByText(/flip/i);
  flipButtons[0].click();
  screen.findByText(/Citadel of Ricks/i, undefined, {timeout: 3000});
});
