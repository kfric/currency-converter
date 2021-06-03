import axios from 'axios'
import React, { useEffect, useState } from 'react'

export function App() {
  // declare a STATE and a setSTATE for array from API...pull .rates array
  const [currencies, setCurrencies] = useState({ rates: [] })
  // declare a STATE and setSTATE for the value of the input
  const [amount, setAmount] = useState(0)

  // create empty [] useEffect so it runs just once upon mount
  useEffect(async function () {
    // access API via axios (npm install axios)
    const response = await axios.get(
      'http://api.exchangeratesapi.io/v1/latest?access_key=5990734baff0a572d673ff87580da218'
    )
    // check to make sure getting good response
    // if (response.status === 200) {
    //   console.log(response.data)
    // }
    // setSTATE as the response.data from API
    setCurrencies(response.data)
    // no input
  }, [])

  return (
    <div>
      <header>
        <h1>Currency Converter</h1>
      </header>
      <section className="input-field">
        ${/* create input type 'number' */}
        <input
          type="number"
          // set value to AMOUNT
          value={amount}
          min="0"
          // create onChange event setSTATE of AMOUNT
          onChange={(event) => setAmount(event.target.value)}
        />{' '}
        USD
      </section>
      <section className="results">
        <ul>
          {/* get each entry of the array of rates from the 
            currencies array */}
          {Object.entries(currencies.rates).map(
            // accept the two properties of the array AND the index of each object
            ([currency, currencyValue], index) => {
              return (
                // assign a key for the li's to use
                <li key={index}>
                  {/* API default rate from EU...*0.82 to get USD*/}
                  {/* around the int down to 2 decimals */}
                  {currency}: {(currencyValue * amount * 0.82).toFixed(2)}
                </li>
              )
            }
          )}
        </ul>
      </section>
    </div>
  )
}
