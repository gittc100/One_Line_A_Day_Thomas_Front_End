import React, { Component } from "react";
import { connect } from "react-redux";
import { getNotes, editNote } from "../actions";
const moment = require("moment");

class NotesList extends Component {
  constructor() {
    super();
    this.state = {
      sortedArray: null,
      reduce: "month"
    };
    this.sortEntries = this.sortEntries.bind(this);
  }
  async componentDidMount() {
    this.props.getNotes(1);
    // this.setState({
    //   ...this.state,
    //   reduce: this.props.reduce
    // });
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.reduce !== prevProps.reduce) {
      console.log("run ----------------------- reduce did update");
      this.setState({
        ...this.state,
        reduce: this.props.reduce,
        sortedArray: null
      });
      this.sortEntries(this.state.reduce);
    }
  }
  sortHandler = e => {
    console.log(e.target.value);
    e.preventDefault();
    this.setState({ ...this.state, reduce: e.target.value });
    this.sortEntries(this.props.reduce);
  };

  handleEdit = (name) => {
      let mod = name;
      let id = mod.slice(0,-1);
      this.setState({
        ...this.state,
        [id]: !this.state[id],
        prevValue: this.state[mod]
      }); 
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (mod, obj) => {
    let val = this.state[mod];
    if (val) {
        let id = mod.slice(0,-1);
        this.setState({
          ...this.state,
          [mod]: val,
          [id]: !this.state[id]
        });
        let userID = obj.user_id
        let entryID = obj.entry_id
        let option = {
          entry: val,
          user_id: userID + ""
        };
        this.props.editNote(userID,entryID,option);
      }
  }

  handleCancel = (mod) => {
    let val = this.state[mod];
    if (val) {
        let id = mod.slice(0,-1);
        this.setState({
          ...this.state,
          [mod]: this.state.prevValue,
          [id]: !this.state[id]
        });
      }
  }

  async sortEntries(reduce){
    let entries = this.props.entries;
    let sortedArray;
    let date = moment().format('YYYY-MM-DD');
    let month = date.slice(5, 7);
    let year = date.slice(0, 4);
    console.log("date",date);
    console.log("month",month);
    console.log("year",year);

    function sortEnt(entries){
      let arrayRes = [];
      let sorted = entries.sort((a,b)=>{
        return moment(a.date).format('YYYY-MM-DD') - moment(b.date).format('YYYY-MM-DD');
      });
      console.log("sorted",sorted);
      if(reduce === "month" || reduce === "year"){
        for(let i = 0; i < sorted.length; i++){
          if(reduce === "month"){
            if(sorted[i].date.slice(5, 7) === month && sorted[i].date.slice(0, 4) === year){
              arrayRes.push(sorted[i]);
            }else{
              continue;
            }
          }else if(reduce === "year"){
            if(sorted[i].date.slice(0, 4) === year){
              arrayRes.push(sorted[i]);
            }else{
              continue;
            }
          }
        }
        return arrayRes;
      }else if(reduce === "all"){
        return sorted;
      }
    };
    sortedArray = await sortEnt(entries);
    this.setState({
      ...this.state,
      sortedArray: sortedArray
    });
  }

  createEntries = () => {
    let months = {
      January: "01", 
      February: "02", 
      March: "03", 
      April: "04", 
      May: "05", 
      June: "06", 
      July: "07", 
      August: "08", 
      September: "09", 
      October: "10", 
      November: "11", 
      December: "12"
    }
    let resultArray = [];
    let curYearArray = [];
    let curMonthArray = [];
    let curYear = null;
    let curMonth;
    let curDay;
    let curMonthConversion;
    let sortedArray = this.state.sortedArray;
    // let sortedArray = this.props.entries;
    
    for(let i = 0; i < sortedArray.length; i++){
      let sliceYear;
      let sliceMonth;
      let sliceDayNumber;
      let sliceDayAcronym;
      let entry;
      let month;
      let year;

      // curMonthConversion = Object.keys(months).find(key => months[key] === curMonth);
      // curDay = sortedArray[i];
      // sliceYear = sortedArray[i].date.slice(0, 4);
      // sliceMonth = sortedArray[i].date.slice(5, 7);
      // sliceDayNumber = sortedArray[i].date.slice(8, 10);
      // sliceDayAcronym = sortedArray[i].date.slice(11);

      curMonthConversion = Object.keys(months).find(key => months[key] === curMonth);
      curDay = sortedArray[i];
      sliceYear = moment(curDay.date).format('YYYY-MM-DD ddd').slice(0, 4);
      sliceMonth = moment(curDay.date).format('YYYY-MM-DD ddd').slice(5, 7);
      sliceDayNumber = moment(curDay.date).format('YYYY-MM-DD ddd').slice(8, 10);
      sliceDayAcronym = moment(curDay.date).format('YYYY-MM-DD ddd').slice(11);

      let id = curDay.id;
				let mod = id + "a";
        if(this.state[id] === undefined){
          this.setState({
            ...this.state,
            [id]: false,
            [mod]: curDay.entry
          });
        }

      entry = <div className="entries-container-entry">
                <p className="day-number">{sliceDayNumber}</p>
                <p className="day-acr">{sliceDayAcronym}</p>
                <p
                  className={this.state[id] ? "hidden" : "entry"}
                  onDoubleClick={()=>this.handleEdit(mod)}
                >
                  {this.state[mod]}
                </p>
                <input
                  name={mod}
                  type="text"
                  className={this.state[id] ? "entry-input" : "hidden"}
                  value={this.state[mod]}
                  onChange={this.handleChange}
                />
                <button 
                  className={this.state[id] ? "entry-button" : "hidden"}
                  onClick={
                    ()=>this.handleSubmit(mod, {
                      user_id: curDay.user_id,
                      entry_id: id
                    })
                }>
                  Submit
                </button>
                <button 
                  className={this.state[id] ? "entry-button" : "hidden"}
                  onClick={
                    ()=>this.handleCancel(mod)
                }>
                  Cancel
                </button>
              </div>
      month = <div className="entries-container-month">
                <h2>{curMonthConversion} {curYear}</h2>
                <div className="entries-container-entries">
                  {curMonthArray}
                </div>
              </div>;
      year = <div className="entries-container-year">
                <div className="entries-container-months">
                  {curYearArray}
                </div>
              </div>;

      if(curYear === null){
        curYear = sliceYear;
        curMonth = sliceMonth;
        curMonthArray.push(entry);
      }else if(sliceYear !== curYear){
        curYearArray.push(month);
        resultArray.push(year);
        curMonth = sliceMonth;
        curYear = sliceYear;
        curMonthArray = [];
        curYearArray = [];
        curMonthArray.push(entry);
      }else if(sliceMonth !== curMonth){
        curYearArray.push(month);
        curMonth = sliceMonth;
        curMonthArray = [];
        curMonthArray.push(entry);
      }else{
        curMonthArray.push(entry);
      }
      if(i === sortedArray.length - 1){
        curYearArray.push(month);
        resultArray.push(year);
        return resultArray;
      }
    }
  }

  entry = () =>{
    if (this.props.isFetching || this.props.entries === null) {
      return <h4>Loading items...</h4>;
    }else{
      if( this.state.sortedArray === null ){
        this.sortEntries(this.state.reduce);
      }
      if( this.state.sortedArray !== null ){
        return (
          <>
            {this.createEntries()}
          </>
        );
      }
      else{
        return <h4>Loading items...</h4>;
      }
    }
  }

  render() {
    return(
    <>
    <div className="sort">
          <select onChange={this.sortHandler}>
            <option selected="selected" value="month">Current Monthly Entries</option>
            <option value="year">Current Yearly Entries</option>
            <option value="all">All Entries</option>
          </select>
      </div>
      <div className="notes-list-wrapper">
      {
        this.entry()
        
      }
      </div>
    </>
    );
    // if (this.props.isFetching || this.props.entries === null) {
    //   return <h4>Loading items...</h4>;
    // }else{
    //   if( this.state.sortedArray === null){
    //     this.sortEntries(this.state.reduce);
    //   }
    //   if( this.state.sortedArray !== null){
    //     return (
    //       <>
    //         {this.createEntries()}
    //       </>
    //     );
    //   }
    //   else{
    //     return <h4>Loading items...</h4>;
    //   }
    // }
  }
};

const mapStateToProps = state => ({
  userID: state.userID,
  entries: state.entries,
  fetching: state.fetching,
  error: state.error,
  loggedIn: state.loggedIn
});

export default connect(
  mapStateToProps,
  { getNotes, editNote }
  )(NotesList); 
  