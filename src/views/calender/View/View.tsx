import React, { useState, useEffect } from 'react';
import {DayPilot, DayPilotCalendar, DayPilotMonth, DayPilotNavigator} from "@daypilot/daypilot-lite-react";

function View() {
    const [calendar, setCalendar] = useState(null);
    const [events, setEvents] = useState([]);
    const date = DayPilot.Date.today();

    const state = {
        startDate: null
    };
    useEffect(() => {
        setEvents([
            {
                id: 1,
                text: "Event 1",
                start: "2024-09-07T10:30:00",
                end: "2024-09-07T13:00:00",
                description: "A test"
            },
            {
                id: 2,
                text: "Event 2",
                start: "2024-09-08T09:30:00",
                end: "2024-09-08T11:30:00",
                barColor: "#6aa84f",
                description: "A test2"
            },
        ]);
    }, []);

    const onEventClick = async args => {
        if (!calendar) return; // Ensure calender is set

        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        calendar.events.update(e);
    };

    return (
        <>
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

    <DayPilotMonth
    startDate={"2024-09-07"}
    timeRangeSelectedHandling={"Enabled"}
    events={events}
    onEventClick={onEventClick}
    controlRef={setCalendar}
    />
    </>
    )
}

export default View;