import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class ExampleChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          options: {
            title: 'Age vs. Weight comparison',
            hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
            vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
            legend: 'none',
          },
          data: [
            ['Age', 'Weight'],
            [8, 12],
            [4, 5.5],
            [11, 14],
            [4, 5],
            [3, 3.5],
            [6.5, 7],
          ],
        // rows: [
        //     [8, 12],
        //     [4, 5.5],
        //     [11, 14],
        //     [4, 5],
        //     [3, 3.5],
        //     [6.5, 7],
        //   ],
        //   columns: [
        //     {
        //       type: 'number',
        //       label: 'Age',
        //     },
        //     {
        //       type: 'number',
        //       label: 'Weight',
        //     },
        //   ],
        };
      }

      render = () => {
        return (
            <div>
                <p>Example Chart</p>

                <Chart
                    chartType="ScatterChart"
                    data={this.state.data}
                    options={this.state.options}
                    graph_id="ScatterChart"
                    width="100%"
                    height="400px"
                    legend_toggle
                />

                    {/* <Chart
                    chartType="ScatterChart"
                    rows={this.state.rows}
                    columns={this.state.columns}
                    options={this.state.options}
                    graph_id="ScatterChart"
                    width={'100%'}
                    height={'400px'}
                    legend_toggle
                /> */}
            </div>
        );
      }
}

export default ExampleChart;