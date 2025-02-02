// /client/src/ApiPage.jsx
// import React from 'react';
import ApiRequest from './ApiRequest';
import ApiRequest2 from './ApiRequest2';
import ApiRequest3 from './ApiRequest3';
import GraphQLRequest from './GraphQLRequest';
const ApiPage = () => {
    return (
        <div>
            <h1>API Requests</h1>
            <GraphQLRequest />
            <ApiRequest3 />
            <ApiRequest2 />
            <ApiRequest />
        </div>
    );
};
export default ApiPage;
