import React, { useState, useRef } from "react"
import { Currency, changeCurrencyData } from "../../redux/currency"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { makeStyles } from "@material-ui/core"
import { useDispatch, connect } from "react-redux"

interface Props {
  item: Currency
  changeCurrencyData: Function
}
const useStyles = makeStyles({
  cell: {},
})

type prev = { ccy: string; base_ccy: string; buy: string; sale: string }
let prevPrice: prev

const Item: React.FC<Props> = ({ item, changeCurrencyData }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [price, setPrice] = useState({
    ccy: item.ccy,
    base_ccy: item.base_ccy,
    buy: item.buy,
    sale: item.sale,
  })
  const [isShown, setIsShown] = useState(false)
  const [editable, setEditable] = useState(false)
  const [valid, setValid] = useState(true)

  type newPr = { ccy: string; base_ccy: string; buy: string; sale: string }
  let newPrice: newPr //data to Redux

  const changePrice = (event: React.ChangeEvent<HTMLInputElement>, option: string) => {
    let inputPrice = event.currentTarget.value

    if (option == "buy") {
      newPrice = {
        ccy: item.ccy,
        base_ccy: item.base_ccy,
        buy: inputPrice,
        sale: item.sale,
      }
    } else {
      newPrice = {
        ccy: item.ccy,
        base_ccy: item.base_ccy,
        buy: item.buy,
        sale: inputPrice,
      }
    }

    console.log("newPrice:", newPrice, "prevPrice:", prevPrice)

    setPrice(validatePrice(prevPrice, newPrice))
  }

  const validatePrice = (prevPrice: prev, newPrice: newPr) => {
    if (
      parseFloat(prevPrice.buy) > parseFloat(newPrice.buy) * 1.1 ||
      parseFloat(prevPrice.buy) < parseFloat(newPrice.buy) * 0.9
    ) {
      setValid(false)
      return newPrice
    } else if (
      parseFloat(prevPrice.sale) > parseFloat(newPrice.sale) * 1.1 ||
      parseFloat(prevPrice.sale) < parseFloat(newPrice.sale) * 0.9
    ) {
      setValid(false)
      return newPrice
    }
    setValid(true)
    return newPrice
  }

  return (
    <TableRow key={item.ccy}>
      <TableCell component="th" scope="row">
        <span>{`${item.ccy}/${item.base_ccy}`}</span>
      </TableCell>

      {isShown ? (
        editable ? (
          <TableCell component="th" scope="row">
            <input className="item-input" type="text" value={price.buy} onChange={(e) => changePrice(e, "buy")} />

            <button
              className="btn btn-send"
              onClick={() => {
                setEditable(false)
                //change store
                dispatch(changeCurrencyData(price))
              }}
              disabled={!valid}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>

            <button
              className="btn btn-cancel"
              onClick={() => {
                setEditable(false)
                setPrice(prevPrice)
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </TableCell>
        ) : (
          <TableCell
            component="th"
            scope="row"
            className={classes.cell}
            onMouseLeave={() => {
              setIsShown(false)
            }}
          >
            {price.buy}
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                setEditable(true)
                prevPrice = { ...price }
              }}
            />
          </TableCell>
        )
      ) : (
        <TableCell component="th" scope="row">
          <div onMouseEnter={() => setIsShown(true)}>{price.buy}</div>
        </TableCell>
      )}

      {isShown ? (
        editable ? (
          <TableCell component="th" scope="row">
            <input className="item-input" type="text" value={price.sale} onChange={(e) => changePrice(e, "sale")} />
            <button
              className="btn btn-send"
              onClick={() => {
                setEditable(false)
                //change store
                dispatch(changeCurrencyData(price))
              }}
              disabled={!valid}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              className="btn btn-cancel"
              onClick={() => {
                setEditable(false)
                setPrice(prevPrice)
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </TableCell>
        ) : (
          <TableCell
            component="th"
            scope="row"
            className={classes.cell}
            onMouseLeave={() => {
              setIsShown(false)
            }}
          >
            {price.sale}
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                setEditable(true)
                prevPrice = { ...price }
              }}
            />
          </TableCell>
        )
      ) : (
        <TableCell component="th" scope="row">
          <div className="cell" onMouseEnter={() => setIsShown(true)}>
            {price.sale}
          </div>
        </TableCell>
      )}
    </TableRow>
  )
}
const mapDispatch = {
  changeCurrencyData,
}

export default connect(null, mapDispatch)(Item)
