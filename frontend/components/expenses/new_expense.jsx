import React,{Component} from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker'

export default class NewExpense extends Component {
  constructor(props){
      super(props);
      this.state = {
        description: "",
        amount: 0.00,
        transactionDate: moment()
      };


    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.updateCurrency = this.updateCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    let date = moment(newProps.activeExpense.transactionDate)
    let amount = (newProps.activeExpense.amount / 100).toFixed(2)
    this.setState({
      description: newProps.activeExpense.description,
      amount: amount,
      transactionDate: date,
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

    updateCurrency(event) {
      let amount = event.target.value
      amount = parseFloat(amount.replace(/,/g, ""))
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({amount})
    }

    update(field) {

      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }

    handleChange(date) {
    this.setState({
      transactionDate: date
    });
  }

    render() {
        return (

            <div className="new-expense-form">
              <label>Description
              <br/>
                <input
                type='text'
                value={this.state.description}
                onChange={this.update("description")}
                /></label>
              <label>Date
                <br/>
                  <DatePicker
                    selected={this.state.transactionDate}
                    onChange={this.handleChange}
                    /></label>
              <label>Amount
                <br/>
                <input
                type="text"
                value={this.state.amount}
                onBlur={this.updateCurrency}
                onChange={this.update('amount')}
                /></label>
              <button
                onClick={this.handleSubmit}
                >Submit</button>
              {this.deleteButton()}
            </div>
        );
    }
}
