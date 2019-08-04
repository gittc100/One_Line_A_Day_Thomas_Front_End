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
        <NotesList {...this.props}/>
      </div>
    );
  }
}

export default JournalView;

