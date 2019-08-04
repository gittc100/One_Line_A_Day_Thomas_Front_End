import React, { Component } from "react";
import { connect } from "react-redux";
import { getNotes, editNote } from "../actions";
const moment = require("moment");

class NotesList extends Component {
  constructor() {
    super();
    this.state = {
      reduce: "month",
      sorting: false,
    };
  }
  componentDidMount() {
    if(this.props.userID === null){
      this.props.history.push("/login");
    }else{
      this.props.getNotes(this.props.userID);
    }
  }

  sortHandler = e => {
    this.setState({ 
      ...this.state, 
      reduce: e.target.value,
      sorting: true
    });
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
        let body = {
          entry: val,
          user_id: userID + ""
        };
        this.props.editNote(userID,entryID,body);
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
    let sorted = this.props.entries;
    let sortedArray = [];

    let reduce = this.state.reduce;
    let dateSort = moment().format('YYYY-MM-DD');
    let monthSort = dateSort.slice(5, 7);
    let yearSort = dateSort.slice(0, 4);

    if(reduce === "month" || reduce === "year"){
      for(let i = 0; i < sorted.length; i++){
        if(reduce === "month"){
          if(sorted[i].date.slice(5, 7) === monthSort && sorted[i].date.slice(0, 4) === yearSort){
            sortedArray.push(sorted[i]);
          }else{
            continue;
          }
        }else if(reduce === "year"){
          if(sorted[i].date.slice(0, 4) === yearSort){
            sortedArray.push(sorted[i]);
          }else{
            continue;
          }
        }
      }
    }else if(reduce === "all"){
      sortedArray = sorted;
    }
    
    for(let i = 0; i < sortedArray.length; i++){
      let sliceYear;
      let sliceMonth;
      let sliceDayNumber;
      let sliceDayAcronym;
      let entry;
      let month;
      let year;

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
      }
    }
      return resultArray
  }

  entriesContainer = () =>{
    if (this.props.isFetching || this.props.entries === null) {
      return <h4>Loading items...</h4>;
    }else{
        return this.createEntries();
    }
  }

  render() {
    let jwt = localStorage.getItem("jwt");
    if(jwt === null){
      this.props.history.push("/login");
    }
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
        this.entriesContainer()
      }
      </div>
    </>
    );
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
  