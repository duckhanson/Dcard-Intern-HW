import React from 'react';
import ReactDOM from 'react-dom';

import FilterableProductTable from 'components/FilterableProductTable.jsx';

import 'bootstrap/dist/css/bootstrap.css';

window.onload = function () {
    ReactDOM.render(
        <FilterableProductTable />,
        document.getElementById('root')
    );
};
