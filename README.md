# react-native-autofocus
`npm install react-native-autofocus`

Autofocus the next input field on enter in React Native.

Have you started with React Native, added a few inputs, and then realized you had to add refs just to focus onto the next input field? This little package solves that problem. Import your text input from this library and wrap them in a form:

```js
import { Form, TextInput } from 'react-native-autofocus'

export default () => (
  <Form>
    <TextInput placeholder="test" />
    <TextInput placeholder="test 2" />
  </Form>
)
```

Hit enter inside your first input, and the next field will be focused. The logic is all abstracted for you!
