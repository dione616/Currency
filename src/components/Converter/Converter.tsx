import React, { useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { selectData } from "../../redux/currency"
import { RootState } from "../../redux/store"
import { Currency } from "../../redux/currency"
import PropTypes from "prop-types"

const mapStateToProps = (state: RootState) => {
  return {
    data: selectData(state),
  }
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {}

const Converter: React.FC<Props> = (props) => {
  const { data } = props.data
  const [leftCurrency, setLeftCurrency] = useState({ count: 101, currency: "UAH" })
  const [rightCurrency, setRIghtCurrency] = useState({ count: 3.63, currency: "USD" })
  const [converted, setConverted] = useState(true)

  const mapData = data.map((item) => {
    parseInt(item.base_ccy)
    parseInt(item.ccy)
    return item
  })

  const handleDropdown = (count: number, currency: string, side: string) => {
    if (side === "left") {
      setLeftCurrency({ count, currency })
    } else {
      setRIghtCurrency({ count, currency })
    }
  }

  const handleConvert = () => {
    const searchCurrency = mapData.filter(
      (note) => note.base_ccy === leftCurrency.currency && note.ccy === rightCurrency.currency
    )

    let found = searchCurrency[0]
    if (found) {
      console.log(found)
      console.log("Bef:", leftCurrency.count, parseFloat(found.sale))

      let convertedValue = leftCurrency.count / parseFloat(found.sale)

      setRIghtCurrency({ count: convertedValue, currency: rightCurrency.currency })
    } else {
      setConverted(false)
    }
  }

  return (
    <div className="wrapper">
      <div className="box">
        <div className="left">
          <h3>Change</h3>
          <div className="bottom">
            <Dropdown
              data={mapData}
              value={leftCurrency}
              placeholder="Select curr"
              onChange={handleDropdown}
              side={"left"}
            />
          </div>
        </div>
        <div className="middle">
          <button onClick={handleConvert}>Convert</button>
          {!converted ? <div className="error">Wrong pair to convert</div> : null}
        </div>
        <div className="right">
          <h3>Get</h3>
          <div className="bottom">
            <Dropdown
              data={mapData}
              value={rightCurrency}
              placeholder="Select"
              onChange={handleDropdown}
              side={"right"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Dropdown = (props: any) => {
  const { value, data, styleClass, placeholder, onChange, side } = props

  const [currency, setCurrency] = useState(value.currency)
  const [count, setCount] = useState(value.count)

  const handleCurrChange = (event: any, side: string) => {
    const currency = event.target.value

    setCurrency(currency)

    onChange(count, currency, side) //callback
  }
  const handlePriceChange = (event: any, side: string) => {
    const count = event.target.value
    setCount(count)

    onChange(count, currency, side) //callback
  }

  return (
    <div className={`form-group ${styleClass}`}>
      {side === "left" ? (
        <div>
          <input type="number" value={value.count} onChange={(e) => handlePriceChange(e, "left")} />
          <select value={value.currency} className="form-control" onChange={(e) => handleCurrChange(e, "left")}>
            <option value="">{placeholder}</option>
            {data.map((item: any, key: any) => {
              return (
                <option key={key} value={item.base_ccy}>
                  {item.base_ccy}
                </option>
              )
            })}
          </select>
        </div>
      ) : (
        <div>
          <input type="number" value={value.count} onChange={(e) => handlePriceChange(e, "right")} />
          <select value={value.currency} className="form-control" onChange={(e) => handleCurrChange(e, "rigth")}>
            <option value="">{placeholder}</option>
            {data.map((item: any, key: any) => {
              return (
                <option key={key} value={item.ccy}>
                  {item.ccy}
                </option>
              )
            })}
          </select>
        </div>
      )}
    </div>
  )
}

export default connector(Converter)
