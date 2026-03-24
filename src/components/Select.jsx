import React, {use, useId} from 'react'

function Select(
    {options,
    label,
    className,
    ...props},
    ref
) {
    const id = useId();
  return (
    <div className = 'w-full '>
        {label && <label htmlFor={id} className=''></label>}
        <select 
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        ref = {ref}
        >
            {options?.map(option => (       //This ?. is a shorthand for options && options.map, it checks if options is not null or undefined before trying to map over it.
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)