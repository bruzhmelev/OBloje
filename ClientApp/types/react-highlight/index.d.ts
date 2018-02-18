// Type definitions for react-highlight
// Project: 
// Definitions by: 
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6


// declare module 'react-highlight' {
//     class Highlight extends React.Component {}
    
//     export default Highlight;
// }




// Highlight.defaultProps = {
//     innerHTML: false,
//     className: null,
//     element: null
// };



declare module 'react-highlight' {
    import * as React from 'react';
    
    export default class Highlight extends React.Component<HighlightProps> {
    }

    export interface HighlightProps {
        /**
         * innerHTML: enable to render markup with dangerouslySetInnerHTML
         * @default false
         */
        innerHTML?: boolean;
        /**
         * className: custom class name for syntax
         * @default null
         */
        className?: string;
        /**
         * element: render code snippet inside specified element
         * @default null
         */
        element?: any;
    }
}


