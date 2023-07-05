import React from "react";
import Select from 'react-select';

export default ({onChange, options, value, classnames}) => {
    const defaultValue=(options, value)=>{
        return options ? options.find(option=>option.value===value): ""
     }

    return(
        
        <div classnames={classnames} className="text-md">


        <Select
        value={defaultValue(options, value)}
        onChange={value=>onChange(value)}
        theme={(theme) => ({
            ...theme,
            
            borderRadius: 5,
            colors: {
              ...theme.colors,

              primary25: '#22c55e',
              primary: '#22c55e',
            },
          })}
         className=" py-2.5 px-0 w-full text-sm border-0 border-b-2 dark:bg-black dark:text-lg dark:text-stone-950 dark:border-gray-700 "
        options={options}
        />
        </div>
    )

}
