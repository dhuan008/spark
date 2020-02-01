import * as React from 'react';
import {withA11y} from '@storybook/addon-a11y';
import "../../../../../style/index.scss";
import "./UserInfoInput.scss";
import UserInfoInput from './UserInfoInput';

export default {
  title: 'UserInfoInput',
  decorators: [withA11y],
};

export const DefaultUserInfoInput = () => <UserInfoInput ratio={3}/>;

DefaultUserInfoInput.story = {
  parameters: {
    notes: 'User information input panel component',
  },
};

