# @nguyentc21/react-native-toast

Simple Toast for React native app

## Installation

```sh
yarn add @nguyentc21/react-native-toast
```

## Usage

```js
// App.jsx
// ...
import { ToastSection } from '@nguyentc21/react-native-toast';

export function App(props) {
  return (
    <>
      {/* ... */}
      <ToastSection
        // position="bottom"
      />
    </>
  )
}
```

```js
// ANiceView.jsx
// ...
import Toast from '@nguyentc21/react-native-toast';

export function ANiceView(props) {
  const _showToast = () => {
    Toast.show([
      {
        content: "A successful message!",
        type: "success",
      },
      {
        content: "A danger message!",
        type: "danger",
        duration: 5000,
      },
      {
        content: "A warning message!",
        type: "warning",
        textColor: 'red'
      },
      {
        content: "A standard message!",
      },
    ])
  }
  return (
    <>
      {/* ... */}
      <Pressable
        onPress={_showToast}
      />
      {/* ... */}
    </>
  )
}
```

## Props
Customize all your `Toast`
| Name                | Type                                             | Default        | description                                             |
|---------------------|--------------------------------------------------|----------------|---------------------------------------------------------|
| duration            | number                                           | 3000           | Shown time (ms)                                         |
| type                | 'standard' \| 'success' \| 'danger' \| 'warning' | 'standard'     | Default Toast type                                      |
| position            | 'top' \| 'bottom'                                | 'top'          |                                                         |
| holdable            | boolean                                          | true           | Allow to hole your Toast by pressing on it              |
| colors              | ColorsType                                       | DEFAULT_COLORS | Background color and text color for each position type. |
| toastTextStyle      | StyleProp<TextStyle>                             |                | Default text style of toast                             |
| toastContainerStyle | StyleProp<ViewStyle>                             |                | Default container style of toast                        |

** Please find `ColorsType`, `DEFAULT_COLORS` in source code.

And customize each of your `Toast` (`ToastItemOptions`)
| Name            | Type                                             | Default    | description                 |
|-----------------|--------------------------------------------------|------------|-----------------------------|
| content         | string                                           |            | Toast message               |
| type            | 'standard' \| 'success' \| 'danger' \| 'warning' | 'standard' | Toast type                  |
| duration        | number                                           | 3000       | Shown time (ms)             |
| backgroundColor | ColorValue                                       |            |                             |
| textColor       | ColorValue                                       |            | Text color of Toast message |
| textStyle       | StyleProp<TextStyle>                             |            | Text style of Toast message |
| AdditionItem    | Reactnode                                        |            | Try it.                     |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
