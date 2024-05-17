import { useState, useCallback, useEffect, memo } from 'react'
import './App.css'

function Button({ onClick, children, index }) {
  console.log(`%c${index} Rendering the Button component`, 'background: #222; color: orange')
  return <button onClick={onClick}>{children}</button>
}

const ButtonMemo = memo(Button)

//blocking sleep function
function sleep(ms) {
  const start = Date.now()
  while (Date.now() < start + ms);
}

function ButtonWithInnerState() {
  const [count, setCount] = useState(0)

  console.log('%cRendering the ButtonWithInnerState component', 'background: #222; color: #bada55')

  sleep(5000)

  const onClick = useCallback(() => {
    setCount((count) => count + 1)
  }, [])

  useEffect(() => {
    console.log('%cButtonWithInnerState component mounted', 'background: #222; color: green')

    return () => {
      console.log('%cButtonWithInnerState component unmounted', 'background: #222; color: red')
    }
  }, [])

  return (
    <>
      <ButtonMemo onClick={onClick} index="   - ">
        inner state
      </ButtonMemo>
      count: {count}
    </>
  )
}

const ButtonWithInnerStateMemo = memo(ButtonWithInnerState)

function App() {
  const [count, setCount] = useState(0)

  console.log('Rendering the App component')

  const onClick = useCallback(() => {
    setCount((count) => count + 1)
  }, [])

  return (
    <>
      <h1>React basics</h1>
      <div className="card">
        <ButtonMemo onClick={onClick} index="- ">
          outter state
        </ButtonMemo>
        count: {count}
        {(count < 10 || count > 15) && <ButtonWithInnerStateMemo />}
      </div>
      <p>
        Open the <strong>console</strong> and click the buttons
      </p>
      <div className="list">
        <a href="https://react.dev/learn/understanding-your-ui-as-a-tree" target='_blank'>Check react documentation for this topic</a>
        <a href="https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.24.5&externalPlugins=&assumptions=%7B%7D" target='_blank'>Check how JSX works</a>
      </div>
    </>
  )
}

export default App
