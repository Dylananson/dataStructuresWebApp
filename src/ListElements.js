import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import Square from './Square'

class ListElements extends React.Component {
  constructor(props) {
    super(props)
  }

  renderSquare(item, i) {
    let background = 'bg-transparent'
    console.log(this.props.list, 'pivot', this.props.pivot, this.props.selectedIndex)
    if ((this.props.pivot && this.props.pivot === i || this.props.selectedIndex === i) ) {
      // class name should be pivot
      if((this.props.found)){
        background = 'bg-green-500'
      } else{
        if(this.props.found === null){
          background = 'bg-blue-500'
        }
        else{
          background = 'bg-red-500'
        }
      }
    } else if (this.props.left && i < this.props.left) {
      // set to be grey?
      background = 'bg-gray-500'
    } else if (this.props.right && i > this.props.right) {
      // set to be grey
      background = 'bg-gray-500'
    } 
    return (
      <Square 
        key={i}
        value={this.props.list[i]}
        className= {`transition-all ease-in-out duration-500 ${background} hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    this.props.handleClick(i);
  }

  renderRow(row) {
    return row.map((item, index) => {
      return this.renderSquare(item, index)
    })
  }

  render() {
    const squares = this.renderRow(this.props.list)
    return (
      <div>
        {squares}
      </div>
    );
  }
}

export default ListElements