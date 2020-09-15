import React, { useState, useEffect } from "react"

const Dropdown = (props: any) => {
  const { value, data, onChange, side } = props

  const [currency, setCurrency] = useState(value.currency)
  const [count, setCount] = useState(value.count)

  const handleCurrChange = (event: any, side: string) => {
    console.log(event.target.tagName)

    const currency = event.target.value

    setCurrency(currency)

    onChange(count, currency, side) //callback
  }
  const handlePriceChange = (event: any, side: string) => {
    console.log(event.target.tagName)

    const count = event.target.value
    setCount(count)

    onChange(count, currency, side) //callback
  }

  const handleChange = (event: any, side: string) => {
    if (event.target.tagName == "SELECT") {
      const currency = event.target.value
      setCurrency(currency)
      onChange(count, currency, side)
    } else {
      const count = event.target.value
      setCount(count)

      onChange(count, currency, side)
    }
  }

  return (
    <div className={`form-group`}>
      {side === "left" ? (
        <div>
          <input type="number" value={value.count} onChange={(e) => handleChange(e, "left")} />
          <select value={value.currency} className="form-control" onChange={(e) => handleCurrChange(e, "left")}>
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
          <div className="rightResult">{value.count}</div>
          <select value={value.currency} className="form-control" onChange={(e) => handleCurrChange(e, "rigth")}>
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

export default Dropdown
