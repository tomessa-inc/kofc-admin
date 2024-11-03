import React, {Component, useEffect, useMemo, useRef, useState} from 'react';
import {DayPilot, DayPilotMonth, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import {createEvent, createEvent2, getEvents, useAppDispatch, useAppSelector} from "@/views/calender/View/store";
import {injectReducer} from "@/store";
import reducer from "@/views/calender/View/store";
import type {DataTableResetHandle} from "@/components/shared";
import {getEventMonthByDay} from "@/views/calender/View/store";
import {date} from "yup";
import {FormikErrors, FormikTouched} from "formik";
import "./DayPilotMonth.css"

export type Event = {
    "id": string,
    "text": string,
    "start": DayPilot.Date,
    "end": DayPilot.Date
}



injectReducer('events', reducer)

type MonthFieldProps = {
    events: Event[]
    startDate?: any

}


export const DayPilotMonthWithData = (props: MonthFieldProps) => {
    const { events, startDate } = props


    const [state, setState] = useState({
        startDate: DayPilot.Date.today(),
    });
    const calenderRef : React.RefObject<any> = React.createRef();
    const tableRef = useRef<DataTableResetHandle>(null)

//
//
//    const dispatch = useAppDispatch()

    /*
        const { pageIndex, pageSize, sort, query, total } = useAppSelector(
            (state) => state.events.data.data
        )

     */
    const data = useAppSelector(
        (state) => state.events.data
    )

    /*
        const filterData = useAppSelector(
            (state) => state.events.data.filterData
        )
    */
    const loading = useAppSelector(
        (state) => state.events.data.loading
    )

//    const data = useAppSelector(
    //      (state) => state.events.data.eventList
    // )

    const options = [
        { name: "None", id: "none" },
        { name: "Weekly", id: "weekly" },
        { name: "Monthly", id: "monthly" },
        { name: "Quarterly", id: "quarterly" },
    ];
    const optionsFrequency = [
        { name: "0", id: 0 },
        { name: "1", id: 1 },
        { name: "2", id: 2 },
        { name: "3", id: 3 },
        { name: "4", id: 4 },
        { name: "5", id: 5 },
        { name: "6", id: 6 },
        { name: "7", id: 7 },
        { name: "8", id: 8 },
        { name: "9", id: 9 },
        { name: "10", id: 10 },
        { name: "11", id: 11 },
        { name: "12", id: 12 },
        { name: "13", id: 13 },
        { name: "14", id: 14 },
        { name: "15", id: 15 },

    ];


    const interestedOptions = [
        { name: " Yes", id: "A" },
        { name: " No", id: "B" },
    ];



    const optionsPublic = [
        { name: "Public", id: true},
        { name: "Private", id: false},
    ];

    /*
        const tableData = useMemo(
            () => ({ pageIndex, pageSize, sort, query, total }),
            [pageIndex, pageSize, sort, query, total]
        )
    */
 /*   const fetchData = () => {
        const date = new Date();

        dispatch(getEventMonthByDay({data: {month: date.getMonth(), year: date.getFullYear()}}))
    } */

    const onTimeRangeSelected = async (args: any) => {
        console.log('on time selecte')
        const form = [
            {name: "Event", id: "text"},
            {name: "Start", id: "start", dateFormat: "MM/dd/yyyy", type: "datetime"},
            {name: "End", id: "end", dateFormat: "MM/dd/yyyy", type: "datetime"},
            {name: "Recurring", id: "recurring", type: "select", options:options, selected: "none"},
            {name: "Frequency", id: "frequency", type: "select", options:optionsFrequency, selected: 0},
            {name: "Viewing", id: "viewing", type: "select", options:optionsPublic, selected: true},
        ];


        const data = {"start": args.start, "end": args.end}
        //  console.log(args)
        //const data = args.end;
//        console.log("DATA")
        //       console.log(data);3
        //    console.log("args")
        //   console.log(args);

        const modal = await DayPilot.Modal.form(form, data);
        console.log("modal")
        console.log(modal);

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

        console.log({
            data: {
                start: args.start.value,
                end: args.end.value,
                id: DayPilot.guid(),
                text: modal.result.text,
                recurring: modal.result.recurring,
                frequency: modal.result.frequency,
                viewing:modal.result.viewing ?? true
            }
        });
        console.log('about to go to create Event')
        let newVar = await createEvent({
            data: {
                start: args.start.value,
                end: args.end.value,
                id: DayPilot.guid(),
                text: modal.result.text,
                recurring: modal.result.recurring ?? "none",
                frequency: modal.result.frequency ?? "0",
                viewing: modal.result.viewing ?? true
            }
        });

        console.log('bye')


    }


    const updateCalender = () => {

        return calenderRef.current.control
    }

    useEffect(() => {
        updateCalender().update({events})
        //     fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events])




    /*const componentDidMount = () => {
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
        updateCalender().update(events)
        //   loadEvents();
    } */

    const onEventClick  = async (args:any) => {
        console.log('hee')
        const form = [
            {name: "Event", id: "text", disabled: true},
            {name: "Start", id: "start", dateFormat: "MM/dd/yyyy", type: "datetime", disabled: true},
            {name: "End", id: "end", dateFormat: "MM/dd/yyyy", type: "datetime", disabled:true},
/*            {name: "Recurring", id: "recurring", type: "select", options:options, selected: "none"},
            {name: "Frequency", id: "frequency", type: "select", options:optionsFrequency, selected: 0},
            {name: "Viewing", id: "viewing", type: "select", options:optionsPublic, selected: true}, */
            {name: "Interested To Volunteer for this event?", id: "interested", type: "radio", options:interestedOptions, selected: "A"},
        ];


        const eventData = args.e.data;

        const modal = await DayPilot.Modal.form(form, eventData);

        if (modal.canceled) {
            return;
        }

        const dp = args.control;

        dp.events.update(modal.result);




//           if (!calendar) return; // Ensure calender is set

        /*        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
                if (!modal.result) { return; }
                const e = args.e;
                e.data.text = modal.result;
                this.calendar.events.update(e); */
    };

    const loadEvents = async ()  => {
        console.log('checking')
        const start = updateCalender().visibleStart();
        const end = updateCalender().visibleEnd();
        const {data} = await DayPilot.Http.post(`http://localhost:9000/event/api/events`);
        console.log(data);
        //this.calendar.update({events: data});
        updateCalender().update({events: data})
    }


    return (
        <>
            <div>
                <DayPilotMonth
                    startDate={startDate}
                    onEventClick= {onEventClick}
                    onTimeRangeSelected={onTimeRangeSelected}
                    ref={calenderRef}
                />
            </div>
        </>
    )
}

export default DayPilotMonthWithData;