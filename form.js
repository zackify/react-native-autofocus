import React from 'react';
import { View } from 'react-native';

export default class Form extends React.Component {
  constructor() {
    super();
    this.count = 0;
    this.inputs = [];
  }

  renderChildren(children, context) {
    const that = context;

    return React.Children.map(children, (child, index) => {
      const countClone = that.count;
      const componentName = child.type.displayName || child.type.name

      if (child.props.children)
        return React.cloneElement(child, { children: this.renderChildren(child.props.children, that) });
      if (componentName !== 'TextInput') return child;
      that.count = that.count + 1;

      return React.cloneElement(child, {
        onEnter: () =>
          that.inputs[countClone + 1] ? that.inputs[countClone + 1].focus() : null,
        inputRef: ref => (that.inputs[countClone] = ref),
      });
    });
  }

  render() {
    let { children, ...props } = this.props;
    return (
      <View {...props}>
        {this.renderChildren(children, this)}
      </View>
    );
  }
}
