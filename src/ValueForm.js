import React from "react";

class ValueForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.props.handleInputChange(event.target.value);
  }
  
  handleSubmit(event){
    this.props.handleSubmitInput(this.props.inputValue);
    event.preventDefault();
  }

  render(){
    return(
    <form onSubmit={this.handleSubmit}>
      <label htmlFor="name" className="block text-sm text-gray-700">
        {this.props.submitIcon}
      </label>
      <input
        type="text"
        name={this.props.submitIcon}
        id="price"
        className="focus:ring-indigo-500 focus:border-indigo-500 w-15 pl-7 pr-12 sm:text-sm border-blue-500 rounded-md "
        placeholder="0"
        value={this.props.inputValue}
        onChange={this.handleChange}
      />
    </form>
    )
  }
}

export default ValueForm;