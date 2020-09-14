import React from "react"
import { render } from "react-dom"
/* import Layout from "./components/Layout"; */
import Featured from "./components/Featured/Featured"
import { Provider } from "react-redux"
import "./styles.css"
import store from "./redux/store"

interface Props {}

const App: React.FC<Props> = (props) => {
  return (
    <div className="App">
      <h1>Currency Exchange</h1>
      <h2>Currency Rate</h2>
      {/* <Calculator /> */}
      <Featured />
    </div>
  )
}

export default App

console.log(store.getState())

const rootElement = document.getElementById("root")
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
