import React,{Component} from 'react';
import ReportItem from './report_item';

export default class ReportIndex extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
      this.props.fetchReports()
    }

    render() {
        return (
            <div className="report-index">
              <ul>
                {
                  this.props.reports.map(report => (
                  <ReportItem
                    key={report._id}
                    id={report.id}
                    startDate={report.startDate}
                    endDate={report.endDate}
                    expenses={report.expenseList}
                    totalSpent={report.totalSpent}
                    />
                ))
              }
              </ul>
            </div>
        );
    }
}
