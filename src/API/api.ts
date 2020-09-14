import axios from "axios"

const instanse = axios.create({
  baseURL: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
})

export const currencyAPI = {
  getCurrencyData: () => {
    return instanse.get(``).then((response) => {
      return response.data
    })
  },
}
