import React from 'react';
import { View } from 'react-native';

import TextInput from "./text-input";

export default class Form extends React.Component {
  constructor() {
    super();
    this.inputs = [];
  }

  renderChildren(children, recursive=false) {
    if(!recursive) this.count = 0;
    let inputTypes = this.props.inputTypes || [ TextInput ];
    let elements = React.Children.map(children, (child, index) => {
      if(!child)
        return;
  
      if (!inputTypes.some(input => input === child.type)) {
        if (child.props && child.props.children) {
          return React.cloneElement(child, {
            ...child.props, 
            children: this.renderChildren(child.props.children, true)
          });
        }  
        return child;
      }

      const realIndex = this.count;
      this.count++;

      return React.cloneElement(child, {
        onSubmitEditing: () => {
          if(this.inputs[realIndex + 1] && this.inputs[realIndex + 1].focus) {
            this.inputs[realIndex + 1].focus();
          }
        },
        inputRef: ref => {
          this.inputs[realIndex] = ref;
          if(child.props.inputRef) {
            child.props.inputRef(ref);
          }
        },
      });
    });

    if(children && !Array.isArray(children) && elements.length == 1) {
      return elements[0];
    }

    return elements;
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
