import React from 'react';
import queryString from 'query-string';

const DistrictPage = (props: any) => {
    const tikNum = queryString.parse(props.location.search)
    console.log(tikNum)
    return (
        <main>
            <p>Hello World</p>
        </main>
    )
}

export default DistrictPage