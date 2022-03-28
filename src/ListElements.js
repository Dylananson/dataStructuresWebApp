import React from "react";
import Square from './Square'

class ListElements extends React.Component {
  constructor(props) {
    super(props)
  }

  renderSquare(item, i) {
    let className = 'square'
    if ((this.props.pivot && this.props.pivot === i) || this.props.selectedIndex === i) {
      // class name should be pivot
      className = 'square-highlight square'
    } else if (this.props.left && i < this.props.left) {
      // set to be grey?
      className = 'square-grey square'
    } else if (this.props.right && i > this.props.right) {
      // set to be grey
      className = 'square-grey square'
    } 
    return (
      <Square
        key={i}
        value={this.props.list[i]}
        className={className}
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
    console.log(squares)
    return (
      <div>
        {squares}
      </div>
      // {/* <div>
      // {squares.map((item, index) =>{
      // return item
      // }
      // )} 
      // </div> */}
    );
  }
}

export default ListElements