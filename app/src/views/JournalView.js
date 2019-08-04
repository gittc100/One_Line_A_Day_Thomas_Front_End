import React from "react";
import NotesList from "../components/NotesList";


class JournalView extends React.Component {
  render() {
    return (
      <div className="main-notes-container">
        <NotesList {...this.props}/>
      </div>
    );
  }
}

export default JournalView;

