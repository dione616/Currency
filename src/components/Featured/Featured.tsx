import React, { useEffect, useState } from "react"
import { connect, ConnectedProps, useDispatch } from "react-redux"
import CurrencyList from "./CurrencyList"

import { selectCurrencyData, loadCurrencyData } from "../../redux/currency"
import { RootState } from "../../redux/store"
import Converter from "./Converter"

const mapStateToProps = (state: RootState) => {
  return {
    data: selectCurrencyData(state),
  }
}
const mapDispatch = { loadCurrencyData }

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {}

const Featured: React.FC<Props> = (props) => {
  const [show, setShow] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const count = localStorage.getItem("count")
    if (count) {
      let increase = parseInt(count)
      if (increase % 5 !== 0 && increase !== 0) {
        dispatch(loadCurrencyData())
        increase += 1
        const valToSend = String(increase)
        localStorage.setItem("count", valToSend)
      } else {
        setShow(false)
        let increase = parseInt(count)
        increase += 1
        const valToSend = String(increase)
        localStorage.removeItem("count")
      }
    } else {
      dispatch(loadCurrencyData())
      localStorage.setItem("count", "2")
    }

    return () => {}
  }, [])

  return (
    <div>
      {show ? (
        <div>
          <CurrencyList prop={props.data} /> <h2>Exchenge</h2>
          <Converter />
        </div>
      ) : (
        <div className="error">To many requests</div>
      )}
    </div>
  )
}

export default connector(Featured)
