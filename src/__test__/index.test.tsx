import React from 'react';
import renderer from 'react-test-renderer';
import {QRCodeSVG, QRCodeCanvas} from '..';

const BASIC_PROPS = {
  value: 'http://picturesofpeoplescanningqrcodes.tumblr.com/',
  size: 128,
  bgColor: '#ffffff',
  fgColor: '#000000',
  level: 'L',
  includeMargin: false,
};

const TEST_CONFIGS = [
  {includeMargin: true},
  {includeMargin: false},
  {level: 'L'},
  {level: 'M'},
  {level: 'Q'},
  {level: 'H'},
  {
    imageSettings: {
      src: 'https://static.zpao.com/favicon.png',
      x: null,
      y: null,
      height: 24,
      width: 24,
      excavate: true,
    },
  },
  {
    imageSettings: {
      src: 'https://static.zpao.com/favicon.png',
      x: null,
      y: null,
      height: 24,
      width: 24,
      excavate: false,
    },
  },
  {value: '1234567890'},
  {value: 'single byte emoji ✅'},
  {value: 'double byte emoji 👌'},
  {value: 'four byte emoji 👌🏽'},
  {value: '火と氷'},
];

describe('SVG rendering', () => {
  test('renders basic SVG correctly', () => {
    const tree = renderer.create(<QRCodeSVG {...BASIC_PROPS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(TEST_CONFIGS)('renders SVG variation (%o) correctly', (config) => {
    const tree = renderer
      .create(<QRCodeSVG {...BASIC_PROPS} {...config} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Canvas rendering', () => {
  test('renders basic Canvas correctly', () => {
    const tree = renderer.create(<QRCodeCanvas {...BASIC_PROPS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(TEST_CONFIGS)(
    'renders Canvas variation (%o) correctly',
    (config) => {
      const tree = renderer
        .create(<QRCodeCanvas {...BASIC_PROPS} {...config} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    }
  );
});
