// import React from 'react';

// import renderer from 'react-test-renderer';

// import { App } from './App';

// describe('<App />', () => {
//   it('has 1 child', () => {
//     const tree = renderer.create(<App />).toJSON();
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     expect(tree.children.length).toBe(1);
//   });
// });

import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { App } from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = render(<App />).toJSON();
    screen.debug();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(tree.children.length).toBe(1);
  });
});
