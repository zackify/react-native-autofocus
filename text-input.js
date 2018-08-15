import React from 'react';
import { TextInput as Input } from 'react-native';

const TextInput = ({ onSubmitEditing, onEnter, inputRef, component=null, ...props }) => {
  const InputComponent = component || Input;
  return (
    <InputComponent
      ref={ref => inputRef && inputRef(ref)}
      onSubmitEditing={() => {
        if (onEnter) onEnter();
        if (onSubmitEditing) onSubmitEditing();
      }}
      {...props}
    />
  );
};

export default TextInput;