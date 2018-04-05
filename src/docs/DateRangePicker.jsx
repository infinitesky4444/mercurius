import React from 'react';
import isSameDay from 'date-fns/is_same_day';
import isBefore from 'date-fns/is_before';

import Calendar, { CalendarType } from '../lib/index.jsx';

class DateRangePicker extends React.PureComponent {
	constructor() {
		super();
		
		this.state = {
			startDate: null,
			endDate: null,
			hoveredDate: null
		};
		
		this.isDateEnabled = this.isDateEnabled.bind(this);
		this.onStartDateSelected = this.onStartDateSelected.bind(this);
		this.onEndDateSelected = this.onEndDateSelected.bind(this);
		this.onDateHovered = this.onDateHovered.bind(this);
	}
	
	isDateHighlighted(date) {
		const specialDays = [
			new Date(2018, 3, 20),
			new Date(2018, 4, 13),
			new Date(2018, 5, 21),
			new Date(2018, 6, 4)
		];
		
		return specialDays.some((special) => isSameDay(date, special));
	}
	isDateEnabled(date) {
		const now = new Date();
		const todayDay = now.getDate();
		const todayMonth = now.getMonth();
		const todayYear = now.getFullYear();
		const today = new Date(todayYear, todayMonth, todayDay);

		return !isBefore(date, today);
	}
	onStartDateSelected(date) {
		this.setState({
			startDate: date
		});
	}
	onEndDateSelected(date) {
		this.setState({
			endDate: date
		});
	}
	onDateHovered(date) {
		this.setState({
			hoveredDate: date
		});
	}
	
	render() {
		const { startDate, endDate, hoveredDate } = this.state;
		const locale = 'en-US';
		
		return (
			<div id="DateRangePickerExample">
				<b>Date Range Picker Example</b>
				<Calendar
					type={ CalendarType.DateRangePicker }
					startDate={ startDate }
					endDate={ endDate }
					hoveredDate={ hoveredDate }
					isDateHighlighted={ this.isDateHighlighted }
					isDateEnabled={ this.isDateEnabled }
					onStartDateSelected={ this.onStartDateSelected }
					onEndDateSelected={ this.onEndDateSelected }
					onDateHovered={ this.onDateHovered }
					locale={ locale } />
			</div>
		);
	}
}

export default DateRangePicker;