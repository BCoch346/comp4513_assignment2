/*Single Company. For this view, display the logo and the company name. As well, display two tabs that allow the user to view either the Summary sub-view or the List sub-view. 

    a.For the Summary sub-view, the other information for the company. Also display a bar chart of the average close price for each month. You are free to use any react-friendly JS charting library.
    
    b.For the List sub-view, display a drop-down list with the months of the year. When the user selects a month, display a table with the price information (date, low, high, close) for each day of the month that has data. */


//TODO: CSS for the image and the name
import React, { Component } from 'react';
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';
import CompanySummarySub from './CompanySummarySub.js';
import CompanyListSub from './CompanyListSub.js';

import jsondata from '../jsonFiles/companies.json';

/*
SingleCompany returns a page with a company information which is queried from a passed id. 
This information is the company logo, name and two tabs which have specific information about the chosen company.
*/
class SingleCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            symbol: props.match.params.id,
            defaultTab: true,
            company:''
        }
    }
    
    componentDidMount(){
        //remove the line below once the api has been implemented!
        this.setState({company:jsondata.find(data=>data.symbol === this.state.symbol)});
        
        /*axios.get().then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });*/
    }
    
    // function which switches the tabs in the page by changing the state of defaultTab and the class within 
    changeTab = ()=>{
        if (this.state.defaultTab) {
            this.setState({defaultTab:false});
            document.querySelector("#details").classList.remove("is-active");
            document.querySelector("#portfolio").classList.add("is-active");
        }
        else {
            this.setState({defaultTab:true});
            document.querySelector("#portfolio").classList.remove("is-active");
            document.querySelector("#details").classList.add("is-active");            
        }
    }
    
    render(){
        {/* Check the state of the company property and render if its existent and meaningful */}
        if (! this.state.company || this.state.company.length === 0){
            return null;
        }else{
        return(
            <article className="section">
                <div className="card-image box is-marginless column">
                    <div className="container logo">
                        <figure className="image image is-3by2">
                            {/* https://stackoverflow.com/questions/44154939/load-local-images-in-react-js */}
                            {/* gets the relative public url to retrieve the logos in the public logos */}
                          <img src={process.env.PUBLIC_URL + '/logos/'+ this.state.symbol+ '.svg'} alt={this.state.symbol} />
                        </figure>
                        {/* Displays the name from the state of company set by the query and result upon loading this page. */}
                        <div>{this.state.company.name}</div>
                    </div>
                </div>
                {/* Render tabs and pass in props*/}
                <div className="tabs is-boxed is-fullwidth is-marginless">
                    <ul>
                        <li className="is-active" id="details"><a onClick={this.changeTab} >Summary</a></li>
                        <li id="portfolio"><a onClick={this.changeTab}>List</a></li>
                    </ul>
                </div>
                <div className="box is-radiusless singleUserBox">
                    {
                    /* Check for the state of default tab to decide whether to display ComanySummarySub or CompanyListSub it. Upon rendering submits parameters to the props of the rendered child to allow for the specific company details */
                    this.state.defaultTab? 
                        /* Render the CompanySummarySub */
                        <div><CompanySummarySub symbol={this.state.symbol} 
                            name= {this.state.company.name}
                            sector= {this.state.company.sector}
                            subindustry= {this.state.company.subindustry}
                            address= {this.state.company.address}
                            date_added= {this.state.company.date_added}
                            CIK= {this.state.company.CIK}
                            frequency= {this.state.company.frequency}/></div>
                        /* There is a colon needed under this line for the rendering if statement to work */
                        :
                        /* Render the CompanyListSub */
                        <div><CompanyListSub company={this.state.company} /></div>
                    }
                </div>
            </article>
        );}
    }
}
export default SingleCompany;