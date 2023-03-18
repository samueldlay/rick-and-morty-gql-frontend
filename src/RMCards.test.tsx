import RMCards from './RMCards';
import {render, prettyDOM} from '@testing-library/react';

test('App Runs', () => {
  const {container} = render(<RMCards />);
  console.log(prettyDOM(container));
});
