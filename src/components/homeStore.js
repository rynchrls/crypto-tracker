import { create } from 'zustand'
import axios from 'axios'
import debounce from '../helper/debounce'

const HomeStore = create((set) => ({
  coins: [],
  trending: [],
  query: '',
  searched: false,
  setQuery: (e) => {
    set({query: e.target.value})
    HomeStore.getState().searchCoins()
  },
  searchCoins: debounce(async () => {
    set({searched: true})
    const {query} = HomeStore.getState()
    const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
    if(query.length > 2) {
      const coins = res.data.coins.map(coin => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        }
      })
      set({coins, searched: true})
    }else {
      set({coins: HomeStore.getState().trending, searched: false})
    }
  }, 500),
  fetchCoins: async () => {
    const [res, btcRes] = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/search/trending'),
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
    ])
    
    const btcPrice = btcRes.data.bitcoin.usd
  

    const coins = res.data.coins.map(response => {
      return {
        name: response.item.name,
        image: response.item.large,
        priceBtc: (response.item.price_btc).toFixed(10),
        id: response.item.id,
        priceUsd: (response.item.price_btc * btcPrice).toFixed(6),
      }
    })
    set({ coins, trending: coins })
  }
}))

export default HomeStore