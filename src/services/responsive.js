import React from 'react';
import { useMediaQuery } from 'react-responsive';

export const isBigScreen = useMediaQuery({ query: '(min-width: 1650px)' });