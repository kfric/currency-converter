import axios from 'axios'
import React, { useEffect, useState } from 'react'

export function App() {
  const [currencies, setCurrencies] = useState({ rates: [] })
  const [amount, setAmount] = useState(0)

  useEffect(async function () {
    // THIS is where I want my API access to go!
    const response = await axios.get(
      'http://api.exchangeratesapi.io/v1/latest?access_key=5990734baff0a572d673ff87580da218'
    )

    if (response.status === 200) {
      console.log(response.data)
    }

    setCurrencies(response.data)
  }, [])

  return (
    <div>
      <header>
        <h1>Currency Converter</h1>
      </header>
      <main>
        <section>
          $
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />{' '}
          USD
        </section>
        <section>
          <ul>
            {Object.entries(currencies.rates).map(
              ([currency, currencyValue], index) => {
                return (
                  <li key={index}>
                    {currency}: {(currencyValue * amount * 0.82).toFixed(2)}
                  </li>
                )
              }
            )}
          </ul>
        </section>
      </main>
    </div>
  )
}
