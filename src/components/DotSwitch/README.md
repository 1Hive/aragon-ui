# DotSwitch

A simple dot switch component.

## Usage

```jsx
import React, { useState } from 'react'
import { DotSwitch } from '@1hive/1hive-ui'

const App = () => {
  const [checked, setChecked] = useState(false)
  return <DotSwitch checked={checked} onChange={setChecked} />
}
```

## Props

### `checked`

| Type      | Default value |
| --------- | ------------- |
| `Boolean` | `false`       |

### `onChange`

| Type                                  | Default value |
| ------------------------------------- | ------------- |
| `Function`: `(checked: Boolean) -> *` | `() => {}`    |
