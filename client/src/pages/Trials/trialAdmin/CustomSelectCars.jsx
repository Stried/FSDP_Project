import React from "react";
import Select from 'react-select';

export default ({ onChange, options, value, classnames }) => {
  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : ""
  }

  return (

    <div classnames={classnames}>


      <Select
      className="my-react-select-container"
      classNamePrefix="my-react-select"
        value={defaultValue(options, value)}
        onChange={value => onChange(value)}
        theme={(theme) => ({
          ...theme,

          borderRadius: 3,
          colors: {
            ...theme.colors,

            primary25: '#22c55e',
            primary: '#22c55e',
          },
        })}
      
        options={options}
      />
    </div>
  )

}
