import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import { Currency } from "../../redux/currency"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Item from "./Item"

const useStyles = makeStyles({
  label: {
    maxWidth: "650px",
  },
  table: {
    maxWidth: "650px",
    margin: "0 auto",
  },
  row: {
    background: "#f7941b8a",
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
              <TableCell>
                <span> Currency/Date</span>
              </TableCell>
              <TableCell>
                <span>Buy</span>
              </TableCell>
              <TableCell>
                <span>Sale</span>
              </TableCell>
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
