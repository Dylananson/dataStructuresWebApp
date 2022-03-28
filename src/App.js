import logo from './logo.svg';
import './App.css';
import React from 'react';
import ValueForm from './ValueForm'
import ListElements from './ListElements'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddValueChange = this.handleAddValueChange.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleFindValueChange = this.handleFindValueChange.bind(this);
    this.handleFindSubmit = this.handleFindSubmit.bind(this);
    this.handleBinSearchSubmit = this.handleBinSearchSubmit.bind(this);
    this.handleBinSearchValueChange = this.handleBinSearchValueChange.bind(this);
    this.handleRemoveSubmit = this.handleRemoveSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selectedIndex: 0,
      list: [1, 4, 8, 10, 26, 47, 48, 99, 100, 102, 124, 125, 130, 136, 156, 156, 236, 237],
      addValue: '',
      findValue: '',
      keyNumber: 0,
      binSearchValue: '',
      pivot: null,
      left: null,
      right: null,
      found: null,
    }
  }

  handleSort() {
    const newList = this.state.list.slice()
    newList.sort((a, b) => a - b);
    this.setState({
      list: newList
    })
  }

  handleAddValueChange(value) {
    this.setState({
      addValue: value
    })
  }

  handleAddSubmit(value) {
    this.addItem(value)
    this.setState({
      addValue: ''
    })
  }

  handleFindValueChange(value) {
    this.setState({
      findValue: value
    })

  }
  handleFindSubmit(value) {
    const index = parseInt(value)
    if (index > 0 && index < this.state.list.length) {
      this.setState({
        selectedIndex: index,
      })
    }
    this.setState({
      findValue: ''
    })

  }

  handleRemoveSubmit() {
    let newList = this.state.list.slice()
    if (! this.state.selectedIndex) {
      return
    }
    newList.splice(this.state.selectedIndex, 1)
    this.setState({
      list: newList,
      selectedIndex: null,
    })
  }

  handleBinSearchSubmit(value) {
    let newList = this.state.list.slice()
    value = parseInt(value)
    let searchHistory = this.binarySearch(newList, value)
    this.setState({
      selectedIndex: null,
    })
    this.visualizeBinarySearch(searchHistory)
  }

  handleBinSearchValueChange(value) {
    this.setState({
      binSearchValue: value
    })
  }

  addItem(value) {
    const newList = this.state.list.slice();
    try {
      value = parseInt(value)
    }
    catch {
      return
    }
    if (!value) {
      return
    }
    newList.push(value);
    this.setState({
      list: newList
    })
  }

  removeItem(value) {
    const newList = this.state.list.slice();
    newList.push(value);
    this.setState({
      list: newList
    })
  }

  visualizeBinarySearch(searchHistory) {
    for (let i = 0; i < searchHistory.length; i++) {
      setTimeout(
        function () {
          this.setState({
            pivot: searchHistory[i]['pivot'],
            left: searchHistory[i]['left'],
            right: searchHistory[i]['right'],
            found: searchHistory[i]['found']
          })
        }
        .bind(this), i * 1000
      )
    }
    setTimeout(
      function(){
        this.setState({
            pivot: null,
            left: null,
            right: null,
            found: null,
        })
      }.bind(this), searchHistory.length * 1000
    )
  }

  binarySearch(list, target) {
    let history = []
    let left = 0;
    let right = list.length - 1;
    let pivot;
    while (left <= right) {
      pivot = parseInt(left + ((right - left) / 2))
      history.push({
        "left": left,
        "right": right,
        "pivot": pivot,
        "found": null
      })
      if (list[pivot] === target) {
        history.push({
          "left": left,
          "right": right,
          "pivot": pivot,
          "found": true
        })
        return history
      }
      else if (list[pivot] < target) {
        left = pivot + 1
      } else {
        right = pivot - 1
      }
    }
    history.push({
        "left": left,
        "right": right,
        "pivot": pivot,
        "found": false
      })
    return history
    }

  handleClick(index){
    this.setState({
      selectedIndex: index
    })
  }

  render() {
    const addValue = this.state.addValue;
    const findValue = this.state.findValue;
    const binSearchValue = this.state.binSearchValue;
    return (
      <div className='game'>
        <div className='container-row'>
          <ListElements
            list={this.state.list}
            handleClick={this.handleClick}
            selectedIndex={this.state.selectedIndex}
            pivot={this.state.pivot}
            left={this.state.left}
            right={this.state.right}
            found={this.state.found}
          />
          <ValueForm
            inputValue={addValue}
            handleInputChange={this.handleAddValueChange}
            handleSubmitInput={this.handleAddSubmit}
            submitIcon='Add'
          />
          <ValueForm
            inputValue={binSearchValue}
            handleInputChange={this.handleBinSearchValueChange}
            handleSubmitInput={this.handleBinSearchSubmit}
            submitIcon='Find value with binary search'
            className='input-value'
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24"
            value='Remove'
            onClick={() => this.handleRemoveSubmit()}> Remove</button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24"
            value='Sort'
            onClick={() => this.handleSort()}> Sort</button>
        </div>
      </div>
    );
  }
}

export default List;
