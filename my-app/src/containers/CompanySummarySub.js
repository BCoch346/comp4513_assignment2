import React, { Component } from 'react';
// import axios from 'axios';
import { Chart } from 'react-google-charts';

//a.For the Summary sub-view, the other information for the company. Also display a bar chart of the average close price for each month. You are free to use any react-friendly JS charting library.

//TODO: IMPLEMENT THE HISTORICAL DATA 
//TODO: CSS
//TODO: change to google graphs

class CompanySummarySub extends Component {
    constructor(props){
        super(props);
        this.state ={
            company : {symbol: props.symbol, name:props.name, sector: props.sector, subindustry: props.subindustry, address: props.address, date_added: props.date_added, CIK: props.CIK, frequency: props.frequency},
            options: {
                title: 'Something',
                animation:{
                    duration: 1000,
                    easing: 'linear',
                    startup: true,
                },
            },
            data : ([
              ['Year', 'Sales'],
              ['2014', 1000],
              ['2015', 1170],
              ['2016', 660],
              ['2017', 1030]
            ])
        };
    }
    
    componentDidMount(){
        
        //GET THE HISTORICAL DATA FOR THE AVERAGE CLOSE PRICE FOR EACH MONTH 
        
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
    }
    
    render(){
        if (!this.state.company) {return null;}
            else return (
                <div>
                    <div>{this.state.company.symbol}</div>
                    <div>{this.state.company.name}</div>
                    <div>{this.state.company.sector}</div>
                    <div>{this.state.company.subindustry}</div>
                    <div>{this.state.company.address}</div>
                    <div>{this.state.company.date_added}</div>
                    <div>{this.state.company.CIK}</div>
                    <div>{this.state.company.frequency}</div>
                    <div>
                        <Chart
                              chartType="BarChart"
                              data={this.state.data}
                              options={this.state.options}
                              graph_id="BarChart"
                              width="100%"
                              height="400px"
                              legend_toggle
                            />
                    </div>
                    
                </div>
            );
           
    }
}
export default CompanySummarySub;