import { createGlobalStyle } from 'styled-components';

export const colors = {
  primary: '#FFC93F',
};

export const GlobalStype = createGlobalStyle`
body {
    background: #222;
    color: #fff;
}

border-style, input {
    font-family: 'Roboto', sans-serif;
}`;
