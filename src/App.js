import React, { Component } from "react";
import "./styles.css";
import marked from "marked";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: defaultText
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const tests = document.createElement("script");
    tests.src =
      "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    tests.async = true;
    const marked = document.createElement("script");
    marked.src =
      "https://cdnjs.cloudflare.com/ajax/libs/marked/0.5.0/marked.js";
    marked.async = true;
    document.body.appendChild(tests);
    document.body.appendChild(marked); // including marked.js as via CDN link in order for fCC test suite to work
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  render() {
    return (
      <div className="App">
        <Editor input={this.state.input} handleChange={this.handleChange} />
        <Previewer className="windowStyle" input={this.state.input} />
      </div>
    );
  }
}

class Editor extends Component {
  render() {
    return (
      <section className="window small">
        <div className="header">Editor</div>
        <textarea
          id="editor"
          value={this.props.input}
          onChange={this.props.handleChange}
        />
      </section>
    );
  }
}

class Previewer extends Component {
  constructor(props) {
    super(props);
    this.getMarkdownText = this.getMarkdownText.bind(this);
  }
  getMarkdownText() {
    const rawMarkup = marked(this.props.input, { sanitize: true });
    return { __html: rawMarkup };
  }
  render() {
    return (
      <section className="window large">
        <div className="header">Previewer</div>
        <div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()} />
      </section>
    );
  }
}
const defaultText =
`# Markdown Previewer
## Heading 2
### Heading 3
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

export default App;
