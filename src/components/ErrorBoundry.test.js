import { shallow } from 'enzyme';
import React from 'react';
import ErrorBoundry from './ErrorBoundry';

it('expect to render ErrorBoundry component', () => {
  expect(shallow(<ErrorBoundry  />)).toMatchSnapshot();
})
