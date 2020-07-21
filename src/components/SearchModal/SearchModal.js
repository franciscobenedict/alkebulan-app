import React, { useState } from "react";
// import React, { useState, useContext } from "react";
// import * as mapData from "./mapData";
import './_search_modal.scss';

const SearchModal = () => {
  const dataListRedunmdantArray = [
    {
      "id": 1,
      "name": "cerulean",
      "year": 2000,
      "color": "#98B2D1",
      "pantone_value": "15-4020",
      "address": {
        "postcode": "PO5 8AD",
        "street": "Dominican Road"
      }
    },
    {
      "id": 2,
      "name": "fuchsia rose",
      "year": 2001,
      "color": "#C74375",
      "pantone_value": "17-2031",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 3,
      "name": "true red",
      "year": 2002,
      "color": "#BF1932",
      "pantone_value": "19-1664",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 4,
      "name": "aqua sky",
      "year": 2003,
      "color": "#7BC4C4",
      "pantone_value": "14-4811",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 5,
      "name": "tigerlily",
      "year": 2005,
      "color": "#E2583E",
      "pantone_value": "17-1456",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 6,
      "name": "blue turquoise",
      "year": 2005,
      "color": "#53B0AE",
      "pantone_value": "15-5217",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 7,
      "name": "sand dollar",
      "year": 2006,
      "color": "#DECDBE",
      "pantone_value": "13-1106",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 8,
      "name": "chili pepper",
      "year": 2007,
      "color": "#9B1B30",
      "pantone_value": "19-1557",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 9,
      "name": "blue iris",
      "year": 2008,
      "color": "#5A5B9F",
      "pantone_value": "18-3943",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 10,
      "name": "mimosa",
      "year": 2009,
      "color": "#F0C05A",
      "pantone_value": "14-0848",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 11,
      "name": "turquoise",
      "year": 2010,
      "color": "#45B5AA",
      "pantone_value": "15-5519",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 12,
      "name": "honeysuckle",
      "year": 2011,
      "color": "#D94F70",
      "pantone_value": "18-2120",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 13,
      "name": "cerulean",
      "year": 2000,
      "color": "#98B2D1",
      "pantone_value": "15-4020",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 14,
      "name": "fuchsia rose",
      "year": 2001,
      "color": "#C74375",
      "pantone_value": "17-2031",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 15,
      "name": "true red",
      "year": 2002,
      "color": "#BF1932",
      "pantone_value": "19-1664",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 16,
      "name": "aqua sky",
      "year": 2003,
      "color": "#7BC4C4",
      "pantone_value": "14-4811",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 17,
      "name": "tigerlily",
      "year": 2004,
      "color": "#E2583E",
      "pantone_value": "17-1456",
      "address": {
        "postcode": "R3 9OP",
        "street": "Mi Culpa Central"
      }
    },
    {
      "id": 18,
      "name": "blue turquoise",
      "year": 2005,
      "color": "#53B0AE",
      "pantone_value": "15-5217",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 19,
      "name": "sand dollar",
      "year": 2006,
      "color": "#DECDBE",
      "pantone_value": "13-1106",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 20,
      "name": "chili pepper",
      "year": 2007,
      "color": "#9B1B30",
      "pantone_value": "19-1557",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 21,
      "name": "blue iris",
      "year": 2008,
      "color": "#5A5B9F",
      "pantone_value": "18-3943",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 22,
      "name": "mimosa",
      "year": 2009,
      "color": "#F0C05A",
      "pantone_value": "14-0848",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 23,
      "name": "turquoise",
      "year": 2010,
      "color": "#45B5AA",
      "pantone_value": "15-5519",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    },
    {
      "id": 24,
      "name": "honeysuckle",
      "year": 2011,
      "color": "#D94F70",
      "pantone_value": "18-2120",
      "address": {
        "postcode": "W2 6AW",
        "street": "Jasmine Street"
      }
    }
  ];
  // const dataList = mapData.features;
  // console.log('===> dataList', dataListRedunmdantArray);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(dataListRedunmdantArray);
  // const searchResults = [];

  // exclude column list from filter
  // const excludeColumns = ["id", "color"];
  const excludeColumns = ["id"];

  // handle change event of search input
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };

  // filter records by search text
  const filterData = (value) => {
    console.log('value', value);

    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') setData(dataListRedunmdantArray);
    else {
      const filteredData = dataListRedunmdantArray.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key)
          ? false
          : item[key]
            .toString()
            .toLowerCase()
            .includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  }

  return (
    <div className="modali-container">
      <hr className="hr_grey"/>
      <div className="modali-body">
        <div className="search_bar">
          <label
            style={
              {
                position: 'relative',
                top: 5
              }
            }>Search:</label>
          <input className="searchbar"
            style={
              {
                marginLeft: 5,
                border: 1,
                borderColor: '#666666',
                borderStyle: 'solid'
              }
            }
            type="text"
            placeholder="Type to search..."
            value={searchText}
            onChange={e => handleChange(e.target.value)}
          />
        </div>

        <div className="box-container">
          {data.map((d, i) => {
            return <div key={i} className="box" style={{ backgroundColor: d.color }}>
              <b>Name: </b>{d.name}<br />
              <b>Year: </b>{d.year}<br />
              <b>Color: </b>{d.color}<br />
              <b>Pantone value: </b>{d.pantone_value}<br />
              <b>Address: </b>{d.address.postcode}, {d.address.street}
            </div>
          })}
          <div className="clearboth"></div>
          { data.length === 0 && <span>No records found to display!</span> }
        </div>
      </div>
      <div className="modali-footer"></div>
    </div>
  );
};

export default SearchModal;
