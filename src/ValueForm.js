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
        <label>
        <input
          className="input-value"
          type="text"
          value={this.props.inputValue}
          onChange={this.handleChange}/>
        </label>
        <input className='submit-btn' type="submit" value={this.props.submitIcon}/>
      </form>
    )
  }
}

export default ValueForm;