import * as React from 'react';
import { ReactNode } from 'react-redux';
import * as hljs from "highlight.js";


type CodeBlockProps = 
{
  language: string;
  value: string | undefined;
};

export class CodeBlock extends React.PureComponent<CodeBlockProps> {

  private codeEl: ReactNode;

  constructor(props: any) {
    super(props)
    this.setRef = this.setRef.bind(this)
  }

  setRef(el: ReactNode) {
    this.codeEl = el
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl)
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}