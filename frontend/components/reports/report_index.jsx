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
                    date={report.transactionDate}
                    description={report.description}
                    amount={report.amount}
                    email={report.authorEmail}
                    id={report._id}
                    />
                ))
              }
              </ul>
            </div>
        );
    }
}
