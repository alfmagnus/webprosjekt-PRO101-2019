import React, { Component } from "react";
import './App.css';

class ListElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
      <li key={this.props.item.title}>
        <div className="re">
            {this.props.renderImportance(this.props.priStatus, this.props.item.id, this.props.listId)}
            <button
              className="btnBasic"
              id="KortSlett"
              onClick={() => this.props.removeItem(this.props.item.id)}
            >
              <i className="fas fa-trash" />
            </button>
            <br/>   
          <div className="KortNavn">{this.props.item.title}</div>
          <br/>
          <div className="KortDivBottom">
            <div className="KortLagtTil">{this.props.unixToTime(this.props.item.creation)}</div>
            <button
              className="btnBasic"
              id="KortEdit"
              onClick={() => this.props.editKortText(this.props.listId, this.props.item.id)}
            >
              <i class="far fa-edit"></i>
            </button>
          </div>
        </div>
      </li>
      </div>
    );
  }
}

export default ListElement;
