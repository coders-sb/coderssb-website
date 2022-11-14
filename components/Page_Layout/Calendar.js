import React from "react";
import {
  Calendar as BigCalendar,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import moment, { parseTwoDigitYear } from "moment";
import events from "../../utils/events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvent from "./CustomEvent";
import { addYears } from "date-fns";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    // Set min and max times to show on the Calendar Week / Work Week / Day views.
    // Currently, the min and max times should be 9am and 10pm (most reasonable)
    var minTimeSet = new Date();
    minTimeSet.setHours(10, 0, 0); //For some reason this is 9am. Time inputted should be one number ahead
    var maxTimeSet = new Date();
    maxTimeSet.setHours(21, 0, 0); //For some reason this is 22:00 (10pm). Time inputted should be one number ahead

    // Set initial variables for localizer, allViews, and min/max time
    this.state = {
      localizer: momentLocalizer(moment),
      allViews: Object.keys(Views).map((k) => Views[k]),
      minTime: minTimeSet,
      maxTime: maxTimeSet,
      events: []
    };
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
  }

  eventStyleGetter() {
    return {
      style: {
        minHeight: "40px", //35px is the minimum number required to have the event title not cut off due to the time. 38px just looks a little better
        fontSize: "80%"
      },
    };
  }

  async getGoogleCalendarEvents(calendarID, apiKey) {
    let url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?key=${apiKey}`
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data.items);
  }

  parseGoogleCalendarDate(date) {
    let [year, month, day] = date.split("-");
    console.log([year, month, day]);
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  componentDidMount() {
    let calendarID = '8hv334vs0a44fc19dpml9ndup4@group.calendar.google.com';
    let apiKey = 'AIzaSyB8T1J2iSaVzmEWAZ9eC2oCsY9-UrEJTV4';
    this.getGoogleCalendarEvents(calendarID, apiKey)
      .then((data) => {this.setState({
        events: data.map((event) => {
          let parsed = {
            id: event.id, 
            title: event.summary,
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
            location: event.location,
            info: event.description,
            url: event.htmlLink
          };
          if ('dateTime' in event.start === false) {
            parsed.start= this.parseGoogleCalendarDate(event.start.date);
            parsed.allDayAccessor = true;
          }
          if ('dateTime' in event.end === false) {
            parsed.end= this.parseGoogleCalendarDate(event.end.date);
            parsed.allDayAccessor = true;
          }
          console.log(event);
          console.log(parsed);
          return parsed;
        })
      })})
  }

  render() {
    return (
      <div>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Note: All times are show in Pacific time (PST/PDT).
        </p>
        <div style={{ height: "500pt", padding: "20px" }}>
          <BigCalendar
            events={this.state.events}
            views={this.state.allViews}
            defaultView={"month"}
            min={this.state.minTime}
            max={this.state.maxTime}
            step={60}
            popup={false}
            startAccessor="start"
            endAccessor="end"
            showMultiDayTimes
            defaultDate={moment().toDate()}
            localizer={this.state.localizer}
            components={{ event: CustomEvent }}
            eventPropGetter={this.eventStyleGetter}
          />
        </div>
      </div>
    );
  }
}
export default Calendar;
