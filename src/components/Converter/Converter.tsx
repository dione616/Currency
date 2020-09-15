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
  const [reversed2, setReversed2] = useState({ done: false, firsTime: true })

  let convertedValue: number

  const mapedData = data.map((item) => {
    parseFloat(item.base_ccy)
    parseFloat(item.ccy)
    return item
  })

  const handleDropdown = (count: number, currency: string, side: string) => {
    if (!reversed2.done) {
      if (side === "left") {
        setLeftCurrency({ count, currency })
      } else {
        setRIghtCurrency({ count, currency })
      }
    } else {
      if (side === "left") {
        setRIghtCurrency({ count, currency })
      } else {
        setLeftCurrency({ count, currency })
      }
    }
  }

  const handleConvert = () => {
    if (!reversed2.done) {
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
    } else {
      const searchCurrency = mapedData.filter((note) => {
        return note.ccy === leftCurrency.currency && note.base_ccy === rightCurrency.currency
      })

      if (searchCurrency.length > 0) {
        //calculate
        //onReverse Click just swap BUT then calculate
        if (!reversed2.firsTime) {
          convertedValue = rightCurrency.count
          console.log(convertedValue)
        } else {
          convertedValue = rightCurrency.count / parseFloat(searchCurrency[0].sale)
          console.log(convertedValue)
        }
        /* / parseFloat(searchCurrency[0].sale) */

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
    /*  setLeftCurrency(r)
    setRIghtCurrency(l) */
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
        console.log("Effect !!!!reversed")
        setRIghtCurrency(handleConvert())
      }
    } else {
      console.log(rightCurrency.count, leftCurrency.count)
      if (handleConvert().count !== rightCurrency.count || handleConvert().currency !== rightCurrency.currency) {
        console.log(handleConvert().count, leftCurrency.count)

        console.log("Effect reversed")
        if (reversed2.firsTime) {
          console.log("firstTime:", reversed2.firsTime)

          setRIghtCurrency(rightCurrency)
          setReversed2({ done: reversed2.done, firsTime: !reversed2.firsTime })
        }
      } else {
        console.log("need convert", rightCurrency.count)
      }
    }

    return () => {
      setConverted(true)
    }
  }, [rightCurrency, leftCurrency, reversed2])

  return (
    <div className="wrapper">
      <div className="box">
        <div className="card left">
          <h3>Change</h3>
          <div className="bottom">
            <Dropdown
              data={mapedData}
              value={!reversed2.done ? leftCurrency : rightCurrency}
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
              value={!reversed2.done ? rightCurrency : leftCurrency}
              onChange={handleDropdown}
              side={"right"}
              reversed={reversed2.done}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default connector(Converter)
