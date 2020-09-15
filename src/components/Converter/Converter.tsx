import React, { useState, useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { selectData } from "../../redux/currency"
import { RootState } from "../../redux/store"
import Dropdown from "./Dropdown"

const mapStateToProps = (state: RootState) => {
  return {
    data: selectData(state),
  }
}

interface Currency {
  count: number
  currency: string
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {}

const Converter: React.FC<Props> = (props) => {
  console.log(props)

  const { data } = props.data
  const [leftCurrency, setLeftCurrency] = useState<Currency>({
    count: 100,
    currency: "UAH",
  })
  const [rightCurrency, setRIghtCurrency] = useState<Currency>({
    count: 3.54,
    currency: "USD",
  })
  const [converted, setConverted] = useState(true)
  let convertedValue: number

  const mapedData = data.map((item) => {
    parseFloat(item.base_ccy)
    parseFloat(item.ccy)
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
    const searchCurrency = mapedData.filter((note) => {
      return note.base_ccy === leftCurrency.currency && note.ccy === rightCurrency.currency
    })

    if (searchCurrency.length > 0) {
      //calculate
      convertedValue = leftCurrency.count / parseFloat(searchCurrency[0].sale)

      return {
        count: convertedValue,
        currency: rightCurrency.currency,
      }
    } else {
      setConverted(false)
      return {
        count: rightCurrency.count,
        currency: rightCurrency.currency,
      }
    }
  }

  const handleReverse = () => {
    console.log("reverse")
  }

  const color = () => {
    switch (rightCurrency.currency) {
      case "USD": {
        return "usd"
      }
      case "EUR": {
        return "eur"
      }
      case "RUR": {
        return "rur"
      }
      case "BTC": {
        return "btc"
      }
      default:
        return "white"
    }
  }

  useEffect(() => {
    if (handleConvert().count !== rightCurrency.count || handleConvert().currency !== rightCurrency.currency) {
      setRIghtCurrency(handleConvert())
    }

    return () => {
      setConverted(true)
    }
  }, [rightCurrency, leftCurrency])

  return (
    <div className="wrapper">
      <div className="box">
        <div className="card left">
          <h3>Change</h3>
          <div className="bottom">
            <Dropdown
              data={mapedData}
              value={leftCurrency}
              placeholder="Select curr"
              onChange={handleDropdown}
              side={"left"}
            />
          </div>
        </div>
        <div className="middle">
          <button className="revers" onClick={handleReverse}>
            Revers
          </button>
          {!converted ? <div className="error">Wrong pair to convert</div> : null}
        </div>
        <div className={`card right ${color()}`}>
          <h3>Get</h3>
          <div className="bottom">
            <Dropdown data={mapedData} value={rightCurrency} onChange={handleDropdown} side={"right"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default connector(Converter)
