import React, { useEffect, useState } from "react"
import { connect, ConnectedProps, useDispatch } from "react-redux"
import CurrencyList from "./CurrencyList"

import { selectCurrencyData, loadCurrencyData } from "../../redux/currency"
import { RootState } from "../../redux/store"

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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCurrencyData())
    return () => {}
  }, [])

  return (
    <div>
      <CurrencyList prop={props.data} />
    </div>
  )
}

export default connector(Featured)
