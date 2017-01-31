import React,{Component} from 'react';
// import Calendar from 'rc-calendar';
// import moment from 'moment';
// import DatePicker from 'rc-calendar/lib/Picker'
// import 'rc-calendar/assets/index.css'
// import 'react-datepicker/dist/react-datepicker.css';

export default class NewExpense extends Component {
  constructor(props){
      super(props);
      this.state = {
        description: "",
        amount: 0,
        transactionDate: ""
      };


    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      description: newProps.activeExpense.description,
      amount: newProps.activeExpense.amount,
      transactionDate: newProps.activeExpense.transactionDate,
      _id: newProps.activeExpense._id
    });

  }

  deleteButton() {
    if (this.props.isEditting) {
      return (
        <button
          onClick={this.handleDelete}
          >Delete</button>
      )
    }
  }

  handleDelete() {
    this.props.deleteExpense(this.state._id)
  }

    handleSubmit () {
      if (this.props.isEditting) {
        this.props.updateExpense(this.state)
      } else {
      this.props.createExpense(this.state);
      }
    }

    update(field) {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }

    render() {
        return (

            <div className="new-expense-form">
              <label>Description<input
                type='text'
                value={this.state.description}
                onChange={this.update("description")}
                /></label>
              <label>Date<input
                value={this.state.transactionDate}
                type='text'
                onChange={this.update("transactionDate")}
                /></label>
              <label>Amount<input
                type="text"
                value={this.state.amount}
                onChange={this.update("amount")}
                /></label>
              <button
                onClick={this.handleSubmit}
                >Submit</button>
              {this.deleteButton()}
            </div>
        );
    }
}
