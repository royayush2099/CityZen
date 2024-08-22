import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calandar.css'

function Calandar() {
    const [value, setValue] = React.useState(new Date());

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            // Only show dates of the current month
            const today = new Date();
            return date.getMonth() !== today.getMonth() ? 'hide-date' : null;
        }
        return null;
    };

    return (
        <Calendar
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
        />
    )
}

export default Calandar