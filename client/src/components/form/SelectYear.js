const selectOptions = (id, handleChange, value, yearOptions) => {
    return (
        <select
            id={id}
            name={id}
            onChange={handleChange}
            value={value}
            className="form-select"
        >
            <option>--</option>
            {yearOptions}
        </select>
    );
}

const singleYear = (formik, yearOptions, handleClick) => {
    return (
        <div className="form-section">
            <div className="choose-year">
                <label className="form-label chosen" htmlFor="year">Year</label>
                <label className="form-label" htmlFor="year" onClick={handleClick}>Period</label>
            </div>
            { selectOptions("year", formik.handleChange, formik.values.year, yearOptions) }
        </div>
    );
}

const yearPeriod = (formik, yearOptions, handleClick) => {
    return (
        <div className="form-section">
            <div className="choose-year">
                <label className="form-label" htmlFor="year" onClick={handleClick}>Year</label>
                <label className="form-label chosen" htmlFor="year">Period</label>
            </div>
            <div className="year-period-select">
                { selectOptions("startYear", formik.handleChange, formik.values.startYear, yearOptions) }
                { selectOptions("endYear", formik.handleChange, formik.values.endYear, yearOptions) }
            </div>
        </div>
    );
}

export { singleYear, yearPeriod }