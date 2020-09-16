import React, { useState, useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import { selectCurrencyData } from "../../redux/currency"
import { RootState } from "../../redux/store"
import Dropdown from "./Dropdown"

const mapStateToProps = (state: RootState) => {
  return {
    data: selectCurrencyData(state),
  }
}

export interface Currency {
  count: number
  currency: string
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {}

const Converter: React.FC<Props> = (props) => {
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
  const [reversed, setReversed] = useState(false)
  const [reversed2, setReversed2] = useState({ done: false, firsTime: false })

  let convertedValue: number

  const mapedData = data.map((item) => {
    parseFloat(item.base_ccy)
    parseFloat(item.ccy)
    return item
  })

  const handleDropdown = (count: number, currency: string, side: string) => {
    let newCurr = { count, currency: leftCurrency.currency }

    if (!reversed2.done) {
      if (side === "left") {
        setLeftCurrency({ count, currency })
      } else {
        setRIghtCurrency({ count, currency })
      }
    } else {
      if (side === "left") {
        setLeftCurrency({ count, currency })
      } else {
        setRIghtCurrency({ count, currency })
      }
    }
  }

  const handleConvert = () => {
    if (!reversed2.done) {
      const searchCurrency = mapedData.filter((note) => {
        if (note.base_ccy === leftCurrency.currency && note.ccy === rightCurrency.currency) return note
        else if (note.ccy === leftCurrency.currency || note.ccy === rightCurrency.currency) {
          return note
        }
        /* return note.base_ccy === leftCurrency.currency && note.ccy === rightCurrency.currency */
      })

      console.log(searchCurrency)

      if (searchCurrency.length > 1) {
        convertedValue = (leftCurrency.count * parseFloat(searchCurrency[1].buy)) / parseFloat(searchCurrency[0].sale)

        return {
          count: convertedValue,
          currency: rightCurrency.currency,
        }
      } else if (searchCurrency.length > 0) {
        //calculate convertedValue=leftCurrency.count * searchCurrency[1].buy /rightCurrency
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
    } else {
      const searchCurrency = mapedData.filter((note) => {
        return note.ccy === leftCurrency.currency && note.base_ccy === rightCurrency.currency
      })

      if (searchCurrency.length > 0) {
        //calculate
        //onReverse Click just swap BUT then calculate
        if (reversed2.firsTime) {
          convertedValue = rightCurrency.count
        } else {
          convertedValue = rightCurrency.count / parseFloat(searchCurrency[0].sale)
        }

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
  }

  const handleReverse = () => {
    setReversed2({ done: !reversed2.done, firsTime: !reversed2.firsTime })
    let l = leftCurrency
    let r = rightCurrency
    setLeftCurrency(r)
    setRIghtCurrency(l)
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
    if (!reversed2.done) {
      if (handleConvert().count !== rightCurrency.count || handleConvert().currency !== rightCurrency.currency) {
        setRIghtCurrency(handleConvert())
      }
    } else {
      if (reversed2.firsTime) {
        setReversed2({ done: reversed2.done, firsTime: !reversed2.firsTime })
      } else {
      }
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
              reversed={reversed2.done}
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
            <Dropdown
              data={mapedData}
              value={rightCurrency}
              onChange={handleDropdown}
              side={"right"}
              reversed={reversed2.done}
            />
          </div>
        </div>
      </div>
      <p className="note">
        Note: converting USD to EUR will first convert USD to UAH and then to EUR. Wich will cost additioonal cost
      </p>
    </div>
  )
}

export default connector(Converter)
