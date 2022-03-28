import logo from './logo.svg';
import './App.css';
import React from 'react';
import ValueForm from './ValueForm'
import ListElements from './ListElements'
import { binarySearch } from './ListUtils';
import Button from './Button'

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
      subLists: [],
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
    let searchHistory = binarySearch(newList, value)
    this.setState({
        pivot: null,
        left: null,
        right: null,
        found: null,
        subLists: []
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
    // const newSubList = this.state.subLists.slice()
    for (let i = 0; i < searchHistory.length; i++) {
      let left = searchHistory[i]['left']
      let right = searchHistory[i]['right']
      
      // newSubList.push(this.state.list.slice(left,right+1))
      // console.log(newSubList, this.state.left, this.state.right)
      // this.setState({
      //   pivot: searchHistory[i]['pivot'],
      //   selectedIndex: searchHistory[i]['pivot'],
      //   left: left,
      //   right: right,
      //   found: searchHistory[i]['found'],
      //   subLists: newSubList
      // })
      setTimeout(
        function () {
          const newSubList = this.state.subLists.slice()
          newSubList.push(this.state.list.slice(left,right+1))
          console.log(newSubList, this.state.left, this.state.right)
          this.setState({
            pivot: searchHistory[i]['pivot'],
            selectedIndex: searchHistory[i]['pivot'],
            left: left,
            right: right,
            found: searchHistory[i]['found'],
            subLists: newSubList
          })
        }
        .bind(this), i * 1000
      )
    }
  }


  handleClick(index){
    this.setState({
      selectedIndex: index === this.state.selectedIndex ? null : index
    })
  }

  render() {
    const addValue = this.state.addValue;
    const findValue = this.state.findValue;
    const binSearchValue = this.state.binSearchValue;
    const subLists = this.state.subLists.map((value,index) =>{
      return <div className={`translate-y-10 justify-center md: transition-all delay-300 content-center flex space-y-10 py-10`}>
        <ListElements
            list={value}
            handleClick={this.handleClick}
            pivot={parseInt(value.length/2)}
            selectedIndex={parseInt(value.length/2)}
            left={null}
            right={null}
            found={this.state.found}
          />
      </div>
    })
    console.log(subLists)
    return (
      <div className='game'>

        <div className='justify-center'>
          <ListElements
            list={this.state.list}
            handleClick={this.handleClick}
            selectedIndex={this.state.selectedIndex}
            pivot={this.state.pivot}
            left={this.state.left}
            right={this.state.right}
            found={this.state.found}
          />
          {subLists}
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
          <Button text="Remove" onClick={()=>this.handleRemoveSubmit()}/>
          <Button text="Sort" onClick={() =>this.handleSort()}/>
        </div>
      </div>
    );
  }
}

export default List;
