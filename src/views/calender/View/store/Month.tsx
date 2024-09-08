import React, {Component} from 'react';
import {DayPilot, DayPilotMonth, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import {createEvent} from "@/views/calender/View/store";

class Month extends Component {
    calendarRef;


    constructor(props:any) {
        super(props);
        this.calendarRef = React.createRef();
        this.state = {
            startDate: DayPilot.Date.today(),
            onEventClick: this.onEventClick,
           // onTimeRangedSelected: this.onTimeRangeSelected,
        };
    }

    get calendar() {
        return this.calendarRef.current.control;
    }

    componentDidMount() {
        const events = [
            {
                id: 1,
                text: "Parish Feast Day",
                start: DayPilot.Date.fromYearMonthDay(2024, 9, 15).addHours(19),
                end: DayPilot.Date.fromYearMonthDay(2024, 9, 15).addHours(20),
                description: "Knight of Columbus BBQ",
            },
            {
                id: 2,
                text: "KOFC Breakfest",
                start: DayPilot.Date.fromYearMonthDay(2024, 10, 6).addHours(19),
                end: DayPilot.Date.fromYearMonthDay(2024, 10, 6).addHours(20),
                description: "This is a general meeting",
            },
            {
                id: 3,
                text: "Memorial Mass",
                start: DayPilot.Date.fromYearMonthDay(2024, 11, 13).addHours(19),
                end: DayPilot.Date.fromYearMonthDay(2024, 11, 13).addHours(20),
                description: "This is a next general meeting",
            },
            {
                id: 4,
                text: "KOFC Children's Christmas Party",
                start: DayPilot.Date.fromYearMonthDay(2024, 12, 14).addHours(19),
                end: DayPilot.Date.fromYearMonthDay(2024, 12, 14).addHours(20),
                description: "This is a next general meeting",
            },
            {
                id: 5,
                text: "KOFC Breakfast",
                start: DayPilot.Date.fromYearMonthDay(2025, 1, 12).addHours(19),
                end: DayPilot.Date.fromYearMonthDay(2025, 1, 12).addHours(20),
                description: "This is a next general meeting",
            },
            {
                id: 6,
                text: "KOFC Breakfast",
                start: DayPilot.Date.fromYearMonthDay(2025, 2, 9).addHours(19),
                end: DayPilot.Date.fromYearMonthDay(2025, 2, 9).addHours(20),
                description: "This is a next general meeting",
            },
            {
                id: 7,
                text: "Shrove Tuesday Pancake Dinner ",
                start: DayPilot.Date.fromYearMonthDay(2025, 3, 4).addHours(19),
                end: DayPilot.Date.fromYearMonthDay(2025, 3, 4).addHours(20),
                description: "This is a next general meeting",
            },
            {
                id: 8,
                text: "Knights Free Breakfast.",
                start: DayPilot.Date.fromYearMonthDay(2025, 5, 4).addHours(19),
                end: DayPilot.Date.fromYearMonthDay(2025, 5, 4).addHours(20),
                description: "This is a next general meeting",
            },
        ];
        this.calendar.update({events})
        //this.loadEvents();
    }

    async onTimeRangeSelected(args: any) {

        const options = [
            { name: "None", id: "none" },
            { name: "Monthly", id: "monthly" },
            { name: "Quarterly", id: "quarterly" },
        ];

        const form = [
            {name: "Event", id: "text"},
            {name: "Start", id: "start", dateFormat: "MM/dd/yyyy", type: "datetime"},
            {name: "End", id: "end", dateFormat: "MM/dd/yyyy", type: "datetime"},
            {name: "Recurring", id: "recurring", type: "select", options:options, selected: "none"},
        ];


        const data = {"start": args.start, "end": args.end}
      //  console.log(args)
        //const data = args.end;
//        console.log("DATA")
 //       console.log(data);
    //    console.log("args")
     //   console.log(args);

        const modal = await DayPilot.Modal.form(form, data);


//        const modal = await DayPilot.Modal.form(form);


/*        console.log("hello")
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        const dp = args.control;
        dp.clearSelection();
        if (!modal.result) { return; } */

        if (modal.canceled) {
            return;
        }

        const dp = args.control;

       // dp.events.add(new DayPilot.Event(modal.result));
  //      console.log("args")
   //     console.log(args);
    //    console.log("result")
     //   console.log(args.start);
      //  console.log("1")
        dp.events.add(new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result.text,
        }));
        console.log('hhelllo')
        console.log({
            data: {
                start: args.start.value,
                end: args.end.value,
                id: DayPilot.guid(),
                text: modal.result.text,
            }
        });
       await createEvent({
            data: {
                start: args.start.value,
                end: args.end.value,
                id: DayPilot.guid(),
                text: modal.result.text,
            }
        })
        console.log('bye')


    }
    async onEventClick (args:any) {

        const options = [
            { name: "None", id: "none" },
            { name: "Monthly", id: "monthly" },
            { name: "Quarterly", id: "quarterly" },
        ];

         const form = [
             {name: "Event", id: "text"},
             {name: "Start", id: "start", dateFormat: "MM/dd/yyyy", type: "datetime"},
             {name: "End", id: "end", dateFormat: "MM/dd/yyyy", type: "datetime"},
             {name: "Recurring", id: "recurring", type: "select", options:options, selected: "none"},

         ];

         const data = args.e.data;

         const modal = await DayPilot.Modal.form(form, data);

         if (modal.canceled) {
             return;
         }

         const dp = args.control;

         dp.events.update(modal.result);







         //  if (!calendar) return; // Ensure calender is set

/*        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        this.calendar.events.update(e); */
    };

    async loadEvents() {
        const start = this.calendar.visibleStart();
        const end = this.calendar.visibleEnd();
        const {data} = await DayPilot.Http.get(`/api/Events?start=${start}&end=${end}`);
        this.calendar.update({events: data});
    }

    render() {
        return (
            <>
                <div>
                <DayPilotNavigator
                    selectMode={"Month"}
                    showMonths={3}
                    skipMonths={3}
                    onTimeRangeSelected={ args => {
                        this.setState({
                            startDate: args.day
                        });
                    }}
                />
            </div>
            <div>
                <DayPilotMonth
                    {...this.state}
                    onTimeRangeSelected={this.onTimeRangeSelected}
                    //onEventClick={onEventClick}
                    ref={this.calendarRef}
                />
            </div>
                </>
        );
    }
}

export default Month;