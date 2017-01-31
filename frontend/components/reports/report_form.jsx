import React,{Component} from 'react';
// import Calendar from 'rc-calendar';
// import moment from 'moment';
// import DatePicker from 'rc-calendar/lib/Picker'
// import 'rc-calendar/assets/index.css'
// import 'react-datepicker/dist/react-datepicker.css';

export default class NewReport extends Component {
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
      description: newProps.activeReport.description,
      amount: newProps.activeReport.amount,
      transactionDate: newProps.activeReport.transactionDate,
      _id: newProps.activeReport._id
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
    this.props.deleteReport(this.state._id)
  }

    handleSubmit () {
      if (this.props.isEditting) {
        this.props.updateReport(this.state)
      } else {
      this.props.createReport(this.state);
      }
    }

    update(field) {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }

    render() {
        return (

            <div className="new-report-form">
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
