import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class StockMarket extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            myCompanies: ['GOOG', 'FB', 'AMZN'],
            options: {
                // title: 'Company Stock Performance',
                legend: 'none',
                backgroundColor: '#fde6de',
                // chartArea: {left:60,top:20,width:'90%',height:'82%'},
                height: 365,
                hAxis: { textStyle : {
                          color: "gray", // #3D7FCF
                          fontSize: 11 // or the number you want
                      }
                  },
                vAxis: { format: 'currency', 
                         textStyle : {
                                color: "gray",
                                fontSize: 11 // or the number you want
                            }
                             // gridlines: { count: 4 }
                 },
                 series: {
                    0: { color: '#f1ca3a' }, //f1ca3a, e2431e, e7711b, 6f9654, 1c91c0, 43459d
                    1: { color: '#e7711b' },
                  },
              },
            
            mystocks: [{ company_name:'', ticker:'',  data:[]}],
            stockMetData: [{}],
            // chartData: [],
            stock_activity_date: null,
            real_date_time: null,
            series_status: '1D',
            sample_interval: 5,
            companyName: null,
            stock_data: {},
            months: ["Jan","Jan", "Feb", "Mar", "Apr", "May", 
                        "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            higher_limit: 78,
            loading: true,
        }
    }

    componentDidMount() {
        this.getStockPerformanceData();
    }


    getStockPerformanceData = () => {
        const alpha_api = "CXUNEIO848QDTYRC";
        // const alph_url = "https://www.alphavantage.co";
        // const apiUrl = "https://cors-anywhere.herokuapp.com/" + alph_url;

        const myCompanies = this.state.myCompanies;
        let mystocks = [];
        myCompanies.forEach(e => //console.log("Company: ", e) );
        {
            // console.log("Stock Company: ", e);
            
            const market_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${e}&interval=5min&apikey=${alpha_api}`;
            // const market_url = stock_url + alpha_api;

            // const person = `https://swapi.co/api/people/${characterId}/`;
            fetch(market_url)
            .then(response => response.json())
            .then(data => {
                console.log("Company stock data: ", data);
                // console.log(data["Meta Data"]["2. Symbol"]);
                let chartData = this.findStockData(data);
                //   var stockPerform = this.processStockData(data);
                //   console.log("Stock-Performance: ", stockPerform);
                let comp_name = this.getStockMetaData(e);
                console.log("The new company name is:", comp_name);
                console.log("Checking company name: ", this.state.companyName);
                mystocks.push({ company_name: comp_name, ticker: e, data: chartData});

                this.setState(() => {
                    return { 
                       
                        // chartData: stockPerform,
                        mystocks: mystocks,
                        loading: false
                    };
                });

                

                // console.log("Chart Data is: ", this.state.chartData);
                
            })
            .catch(error => {
                console.log(error)
                this.setState((prevState, props) => {
                return {
                    loading: false,
                    error: 'Error when drawing google chart.'
                };
                })
            });
            // .catch(error => console.log(error));
        });

        // find company metadata
        // this.getStockMetaData();
    }


    getStockMetaData = (ticker) => {
        let comp_name = '';
        var quandl_api = "89wdkfPK7YciSxS7kDaZ";
        // var quandl = "https://www.quandl.com/api/v3/datasets/EOD/AAPL.json?api_key=89wdkfPK7YciSxS7kDaZ";
        var quandl = "https://www.quandl.com/api/v3/datasets/EOD/";
        // var quandl_url = "https://cors-anywhere.herokuapp.com/" + quandl;
        var quandl_metadata = 'https://www.quandl.com/api/v3/datasets/WIKI/';
        var quandl_url = "https://cors-anywhere.herokuapp.com/" + quandl_metadata;
        // var stockTicker = "GS"
        // var market_url = quandl_url + stockTicker + "/metadata.json?api_key=" + quandl_api;
        var market_url = `https://www.quandl.com/api/v3/datasets/WIKI/${ticker}/metadata.json?api_key=${quandl_api}`;
        fetch(market_url)
        .then(response => response.json())
        .then(data => {
            console.log("Company Metadata: ", data);
            let name = data.dataset.name;
            console.log("Company Name: ", name)
            name = name.split("Prices")[0];
            console.log("Revised  Company name: ", name);
            comp_name = name;

            let stocks = this.state.mystocks;
            for (var i=0; i < stocks.length; i++ )
            {
                if(stocks[i].ticker === ticker) 
                {
                    stocks[i].company_name = name;
                }
            }

            this.setState(() => {
                return{
                    companyName: stocks
                };
            });

            console.log("Re-Revised  Company name: ", comp_name);
            return name;
        })
        .catch(error => {
            console.log(error)
            this.setState((prevState, props) => {
            return {
                loading: false,
                error: 'Error when drawing google chart.'
            };
            })
        });

        console.log("Hello World Company name: ");
        return comp_name;
    }


    processStockData = (data) => {
        // console.log(data);

        // let higher_limit = 78;
        const stock_data = Object.keys(data).map((key, index) => data[key]);
        // console.log("Stock Data: ", stock_data);
        const stock_activity_date = Object.keys(stock_data[1])[0].split(" ")[0];
        // console.log("Stock Activity Date: ", stock_activity_date);
        const real_date_time = Object.keys(stock_data[1])[this.state.higher_limit];
        // console.log("Real Data Time: ", real_date_time);

        // var comp = document.getElementById("company-ticker");
        // comp.innerHTML = stock_data[0]["2. Symbol"];

        // var activity = document.getElementById("activity-date");
        // activity.innerHTML = stock_activity_date;

        var stockValues = Object.keys(stock_data[1]).map((s, indx) => stock_data[1][s]);
        // console.log("Stock Values: ", stockValues);
        if (this.state.higher_limit === 0) {
            this.setState(() => {
                return {
                    higher_limit: stockValues.length
                };
            });
            // this.state.higher_limit = stockValues.length;
        }

        this.setState((prevState, props) => {
            return {
                stock_data: stock_data,
                real_date_time: real_date_time,
                stock_activity_date: stock_activity_date 
            };
        });

        var sdata = stockValues.reverse();
        return sdata;
      }


      findStockData = (data) => {
        var stockPerform = this.processStockData(data);
        var chartData = [];
        // let higher_limit = 78;
        var index = 0;
        // console.log("Stock-data length: ",   stockPerform.length);
        let start_index = stockPerform.length - 1 - this.state.higher_limit;
        start_index = (start_index < 0) ? 0 : start_index;

        for (var i = start_index; i < stockPerform.length; i++) {
          var closeVal = stockPerform[i]["4. close"];
          var stockVal = parseFloat(closeVal.trim())
          let arr = [ this.hAxisValues(index), {v: stockVal, f: stockVal.toFixed(2)}]
          index++;

          chartData.push(arr);
        }

        // this.setState(() => {
        //     return {
        //         chartData: chartData
        //     };
        // });

        return chartData;
      }

      hAxisValues = (inc) => {
        let series_status = '1D';
        let sample_interval = 5; // time interval

        if (series_status === '1D') {

            var howMany = inc * sample_interval;
            var active_date = new Date(this.state.real_date_time);

            active_date.setMinutes(active_date.getMinutes() + howMany)

            var hrs = active_date.getHours();
            var mnts = active_date.getMinutes();
            var tday = (hrs >= 12) ? "PM" : "AM";
            var hr = (hrs >= 12) ? (hrs - 12) : hrs;
            hr = (hr === 0) ? 12 : hr;
            mnts = mnts < 10 ? "0" + mnts : mnts;

            return  hr + ":" + mnts + " " + tday;
          } else {
            var active_date = Object.keys(this.state.stock_data[1])[this.state.higher_limit  - inc];
            var dt = new Date(active_date);
            var mon = dt.getMonth() + 1;
            var dd = dt.getDate();
            var yr = dt.getFullYear();
            var month = this.state.months[mon];
            var date = month + " " + dd + ",'" + yr.toString().substr(-2); // substr(2,2)
            // var d = dt.getDay();
            // var day = this.state.weekDays[d];

            // active_date.setDate(active_date.getDate() + inc)
            // var stime = inc;
            if (series_status === '5M' || series_status === 'YTD' || 
                series_status === '1Y' || series_status === '5Y') {
                return date;
            }
            return active_date;
          }
      }

    render() {
        // const chartData = this.state.chartData;
        // console.log("Length is : ", chartData.length);

        // const myCompanies = this.state.myCompanies;
        // console.log("My companies are: ", myCompanies);
        const mystocks = this.state.mystocks;


        const stockTicker = mystocks.map((e, indx) => 
        //  <p key={indx}>{e}</p>
            <div className="stock-data" key={indx}>
                <div className="chart-header">
                    <div className="company-ticker-data">
                        <h2 id="company-ticker">{e.ticker}</h2>
                        <p id="activity-date">{this.state.stock_activity_date}</p>
                    </div>
                    <div className="company-stock-info">
                        <h2>{e.name}</h2>
                    </div>
                </div>
                <div className="page-setting">
                    {/* <div className="stock-market-chart-display"> */}
                        <Chart
                            chartType="AreaChart"
                            data={e.data}
                            options={this.state.options}
                            // graph_id="AreaChart"
                            width="100%"
                            height="365"
                            legend_toggle
                            title="ABC"
                        />
                    {/* </div> */}
                </div>
            </div>
        );

        // const stockData = chartData.map((a, indx) => 
        //     // <p key={indx}>{a[0]} |::| {a[1].f}</p>
        // );
        //   console.log("JSX array: ", stockData);
      
        return (
            <div>
                {this.state.loading ? <p>Loading ...</p> : null}
                {this.state.error ? <p>{this.state.error}</p> : null}
                <div className="search-stock-ticker">
                    <div className="input-controls">
                        <input className="form-control stock-ticker-input"
                        type="text" name="stock-symbol" id="stock-ticker" 
                        placeholder="Enter Stock Ticker" />
                        <input type="submit" value="Add Stock Ticker" id="addStockTicker" 
                        title="Click to add stock ticker to your collection" />
                        <input type="submit" value="Remove Stock Ticker" id="removeStockTicker" 
                        title="Click to remove stock ticker from your collection" />
                    </div>
                </div>
                {stockTicker}
            </div>
        );
    }
}

export default StockMarket;