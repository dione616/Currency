import React, { useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import CurrencyList from "./CurrencyList"

import { selectData, loadCurrencyData } from "../../redux/currency"
import { RootState } from "../../redux/store"

const mapStateToProps = (state: RootState) => {
  return {
    data: selectData(state),
  }
}
const mapDispatch = { loadCurrencyData }

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {}

const Featured: React.FC<Props> = (props) => {
  console.log("FROM:", props)

  const [currency, setCurrency] = useState(props.data)
  useEffect(() => {
    props.loadCurrencyData()
    return () => {}
  }, [])

  return (
    <div>
      <CurrencyList prop={props.data} />
    </div>
  )
}

export default connector(Featured)
