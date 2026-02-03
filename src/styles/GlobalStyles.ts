import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Inter', -apple-system, BlinkMaxSystemFont, sans-serif;
        background-color: #1e1e1e;
        color: #ffffff;
        overflow: hidden;
    }

    button {
        cursor: pointer;
        border: none;
        outline: none;
    }
`