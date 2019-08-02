import React from "react";
import NotesList from "../components/NotesList";


class JournalView extends React.Component {
  constructor() {
    super();
    this.state = {
      // reduce: "month"
    };
  }

  // sortHandler = e => {
  //   console.log(e.target.value);
  //   e.preventDefault();
  //   this.setState({ ...this.state, reduce: e.target.value });
  // };

  render() {
    return (
      <div className="main-notes-container">
      {/* <div className="sort">
          <select onChange={this.sortHandler}>
            <option selected="selected" value="month">Current Monthly Entries</option>
            <option value="year">Current Yearly Entries</option>
            <option value="all">All Entries</option>
          </select>
      </div> */}
      {/* <div className="notes-list-wrapper"> */}
        {/* <NotesList {...this.props} reduce={this.state.reduce}/> */}

        <NotesList {...this.props}/>
      {/* </div> */}
      </div>
    );
  }
}

export default JournalView;

