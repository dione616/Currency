import React, { useState, useEffect } from "react"
import { Currency } from "../../redux/currency"

const Dropdown = (props: any) => {
  const { value, data, onChange, side, reversed } = props
  const [currency, setCurrency] = useState(value.currency)
  const [count, setCount] = useState(value.count)

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

  let ar: string[] = []
  data.map((item: Currency) => {
    ar.push(item.base_ccy)
    ar.push(item.ccy)
  })
  let removeDuplicates = (names: any) => ar.filter((v, i) => ar.indexOf(v) === i)
  let allCurr = removeDuplicates(ar)

  return (
    <div className={`form-group`}>
      {side === "left" ? (
        <div>
          <input type="number" value={value.count} onChange={(e) => handleChange(e, "left")} />
          <select value={value.currency} className="form-control" onChange={(e) => handleChange(e, "left")}>
            {data.map((item: any, key: any) => {
              return (
                <option key={key} value={!reversed ? allCurr[key] : allCurr[key]}>
                  {!reversed ? allCurr[key] : allCurr[key]}
                </option>
              )
            })}
          </select>
        </div>
      ) : (
        <div>
          <div className="rightResult">{value.count}</div>
          <select value={value.currency} className="form-control" onChange={(e) => handleChange(e, "rigth")}>
            {data.map((item: any, key: any) => {
              return (
                <option key={key} value={!reversed ? allCurr[key] : allCurr[key]}>
                  {!reversed ? allCurr[key] : allCurr[key]}
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
