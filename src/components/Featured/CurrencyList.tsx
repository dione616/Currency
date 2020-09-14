import React, { useState } from "react"
import CurrencyComponent from "./Item"
import { Currency } from "../../redux/currency"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { TextField } from "@material-ui/core"
import Item from "./Item"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles({
  label: {
    maxWidth: "650px",
  },
  table: {
    maxWidth: "650px",
    margin: "0 auto",
  },
  row: {
    background: "#f7931b",
  },
})

const CurrencyList = (props: any) => {
  const classes = useStyles()

  //SideEffect ...don't rerender on Hover

  return (
    <div className="list">
      <TableContainer component={Paper} className={classes.label}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell>Currency/Date</TableCell>
              <TableCell>Buy</TableCell>
              <TableCell /* align="right" */>Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.prop.data
              ? props.prop.data.map((item: Currency, i: number) => {
                  return <Item item={item} key={i} />
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CurrencyList
