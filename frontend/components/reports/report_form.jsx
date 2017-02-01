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
        startDate: "",
        endDate: 0,
        transactionDate: ""
      };


    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      startDate: newProps.activeReport.startDate,
      endDate: newProps.activeReport.endDate,
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
              <label>Start Date<input
                type='text'
                value={this.state.startDate}
                onChange={this.update("startDate")}
                /></label>
              <label>End Date<input
                type="text"
                value={this.state.endDate}
                onChange={this.update("endDate")}
                /></label>
              <button
                onClick={this.handleSubmit}
                >Submit</button>
              {this.deleteButton()}
            </div>
        );
    }
}
