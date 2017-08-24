import React from 'react';
import { View } from 'react-native';

export default class Form extends React.Component {
  constructor() {
    super();
    this.inputs = [];
  }

  renderChildren(children) {
    return React.Children.map(children, (child, index) => {
      if (child.children)
        return React.cloneElement(child, this.renderChildren(children));
      if (child.type.name !== 'TextInput') return child;

      return React.cloneElement(child, {
        onEnter: () =>
          this.inputs[index + 1] ? this.inputs[index + 1].focus() : null,
        inputRef: ref => (this.inputs[index] = ref),
      });
    });
  }

  render() {
    let { children, ...props } = this.props;
    return (
      <View {...props}>
        {this.renderChildren(children)}
      </View>
    );
  }
}
