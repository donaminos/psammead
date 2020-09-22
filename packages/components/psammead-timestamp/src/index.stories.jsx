import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { text, select, boolean, withKnobs } from '@storybook/addon-knobs';
import * as typography from '@bbc/gel-foundations/typography';
import { withServicesKnob, themes } from '@bbc/psammead-storybook-helpers';
import { latin } from '@bbc/gel-foundations/scripts';

import Timestamp from '.';

const styles = Object.keys(typography)
  .map(key => {
    if (
      typeof typography[key] === 'function' &&
      key.substring(0, 3) === 'get'
    ) {
      return key.substring(3);
    }
    return null;
  })
  .filter(style => style);

// eslint-disable-next-line react/prop-types
const ExampleTimestamp = ({ children, ...props }) => {
  const padding = boolean('Padding', true);
  const style = select('Typography', styles, 'Brevier');
  const typographyFunc = typography[`get${style}`];

  return (
    <Timestamp
      datetime="1530947227000"
      typographyFunc={typographyFunc}
      script={latin}
      padding={padding}
      {...props}
    >
      {children}
    </Timestamp>
  );
};

storiesOf('Components/Timestamp', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) => (
    <ExampleTimestamp service={service}>
      {text('Timestamp Text', '7 July 2018')}
    </ExampleTimestamp>
  ))
  .add(
    'dark mode',
    ({ service }) => (
      <ExampleTimestamp service={service} darkMode>
        {text('Timestamp Text', '7 July 2018')}
      </ExampleTimestamp>
    ),
    { options: { theme: themes.dark } },
  )
  .add('with "updated" prefix', ({ service }) => (
    <ExampleTimestamp service={service}>
      {text('Timestamp Text', 'Updated 7 July 2018')}
    </ExampleTimestamp>
  ));
