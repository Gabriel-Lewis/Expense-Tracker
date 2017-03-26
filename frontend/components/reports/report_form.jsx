import React,{ Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

export default class NewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment()
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const startDate = moment(newProps.activeReport.startDate);
    const endDate = moment(newProps.activeReport.endDate);

    this.setState({
      startDate,
      endDate,
      _id: newProps.activeReport._id
    });

  }

  deleteButton() {
    if (this.props.isEditting) {
      return (
        <button
          onClick={this.handleDelete}
          >Delete</button>
      );
    }
  }

  handleDelete() {
    this.props.deleteReport(this.state._id);
  }

  handleSubmit() {
    if (this.props.isEditting) {
      this.props.updateReport(this.state);
    } else {
      this.props.createReport(this.state);
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    return (

            <div className="new-report-form">

              <label>Start Date
                <br />
                  <DatePicker
                    name="startDate"
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    /></label>
              <label>End Date
                <br />
                  <DatePicker
                    name="endDate"
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
                    /></label>
              <br />
              <button
                onClick={this.handleSubmit}
                >Submit</button>
              {this.deleteButton()}
            </div>
    );
  }
}
