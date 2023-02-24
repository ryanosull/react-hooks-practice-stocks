import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const baseUrl = "http://localhost:3001"
const stockUrl = baseUrl + "/stocks"

function MainContainer() {

  useEffect (() => fetchStocks(), [])

  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])

  const [filter, setFilter] = useState("All")

  const [sortBy, setSortBy] = useState("None")

  const fetchStocks = () => {
    fetch (stockUrl)
    .then(r => r.json())
    .then(stockData => setStocks(stockData))
  }

  const filterStocks = stocks.filter(stock => stock.type === filter || filter === "All")

  const changeFilter = (event) => setFilter (event.target.value)

  const changeSort = (event) => setSortBy(event.target.value)

  const sortStocks = () => {

    if (sortBy == "Alphabetically")
      return filterStocks.sort((stock1, stock2) => stock1.name.localeCompare(stock2.name))
    else if (sortBy === "Price")
      return filterStocks.sort((stock1, stock2) => stock1.price - stock2.price)
    else return filterStocks
  }



  const addStockToPortfolio = (stock) => {
    // console.log('I clicked a stock', stock.name)
    if (!portfolio.includes(stock.id))
      setPortfolio([...portfolio, stock.id])
  }

  const removeStockFromPortfolio = (stock) => {
    const updatePortfolio = [...portfolio]
    setPortfolio(updatePortfolio.filter(id => id !== stock.id))
  }





  return (
    <div>
      <SearchBar 
      changeFilter = {changeFilter}
      sortBy = {sortBy}
      changeSort = {changeSort}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
          stocks={sortStocks()} 
          addStockToPortfolio={addStockToPortfolio}
          
          />
        </div>
        <div className="col-4">
          <PortfolioContainer  
          stocks = {stocks}
          portfolio = {portfolio}
          removeStockFromPortfolio = {removeStockFromPortfolio}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
