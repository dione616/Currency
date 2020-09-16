import axios from "axios"

const instanse = axios.create({
  //also work with more values https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=12
  baseURL: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
})

export const currencyAPI = {
  getCurrencyData: () => {
    return instanse.get(``).then((response) => {
      return response.data
    })
  },
}
