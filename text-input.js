/*
import React from 'react';
import { TextInput as Input } from 'react-native';

export const InputBuilder = (Element, submitFunctionNames) => ({ onEnter, inputRef, ...props }) => {
  const enterProp = {};
  const functionNamesArray = [].concat(submitFunctionNames);
  for (let functionName of functionNamesArray) {
    enterProp[functionName] = onEnter;
  }
  return (
    <Element
      ref={ ref => inputRef(ref) }
      { ...enterProp, ...props }
    />
  );
}


const TextInput = InputBuilder(Input);


const TextInput = ({ onSubmitEditing, onEnter, inputRef, ...props }) => (
  <Input
    ref={ref => inputRef(ref)}
    onSubmitEditing={() => {
      if (onEnter) onEnter();
      if (onSubmitEditing) onSubmitEditing();
    }}
    {...props}
  />
);

export default TextInput;
*/
