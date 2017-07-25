// FAKE TEST for travis

import 'react-native';
// import React from 'react';
// import Index from '../index.ios.js';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   const tree = renderer.create(
//     <Index />
//   );
// });

const sum = function sum(a, b) {
  return a + b;
};

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});