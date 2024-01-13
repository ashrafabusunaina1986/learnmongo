import React from 'react'

function page() {
    const t=()=>{
        return <div>
            <p>
                <table>fovfzv</table>
            </p>
        </div>
    }
    const x = (v) => {
        if (v == 0 || v == 1) return 1
        else return x(v - 1) * v
    }

    const result = {
        x: 3,
        y: (v) => {
            if (v == 0 || v == 1) return 1
            else return x(v - 1) * v
        }
    }
    return (
        <div className='text-center'>
            the factorial of x is {x(10)}<br/>
            {result.y(result.x)}
            
        </div>
    )
}

export default page