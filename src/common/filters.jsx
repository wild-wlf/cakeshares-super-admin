// import React, { useState, useMemo, useRef, useEffect } from 'react';
// import styled from 'styled-components/macro';
// import Grid from 'components/atoms/Grid';
// import GridCol from 'components/atoms/GridCol';
// import Field from 'components/molecules/Field';
// import Select from 'components/atoms/Select';
// import { useRouter } from "next/router";
// import debounce from 'lodash/debounce';
// import { format } from 'date-fns';
// import Nav from './filtersData.json';

// const FiltersHolder = styled.div`
//   padding: 30px 0 20px;
//   border-top: 1px solid var(--gray);
// `;

// // eslint-disable-next-line no-unused-vars
// function Filters({ onChangeFilters, customFilterKey = '', extraFilters }) {
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [searchText, setSearchText] = useState('');
//   // eslint-disable-next-line prefer-const
//   let { view, child } = useRouter();
//   const debounceRef = useRef(0);

//   if (customFilterKey) {
//     view = customFilterKey;
//   } else if (child) {
//     view = child;
//   }

//   const [loadingFilters, setLoadingFilter] = useState(false);
//   const [filtersState, setFiltersState] = useState({});
//   const [filterOptions, setFilterOptions] = useState({});

//   const currentFilter = useMemo(() => Nav.find(({ key }) => key === view), [Nav]);

//   const getFiltersData = async ({ filters, filtersData }) => {
//     const state = {};
//     try {
//       await Promise.all(
//         filters
//           .filter(key => key.toLowerCase().includes('filter'))
//           .map(async key => {
//             const { isDynamic, options, params, call, returnKey } = filtersData[key];
//             if (!isDynamic) {
//               state[key] = options.map(x => {
//                 const [value, label] = Object.entries(x)[0];
//                 return { label, value };
//               });
//             } else {
//               const [serviceFile, functionName] = call.split('.');
//               const serviceCall = await import(`services/${serviceFile}`);
//               try {
//                 state[key] = (await serviceCall.default[functionName](params))[returnKey];
//                 options.forEach(x => {
//                   const [value, label] = Object.entries(x)[0];
//                   state[key].unshift({ label, value });
//                 });
//               } catch (ex) {
//                 state[key] = [{ label: 'All', value: '' }];
//               }
//             }
//           }),
//       );
//       return state;
//     } catch (ex) {
//       return state;
//     }
//   };

//   useEffect(() => {
//     setLoadingFilter(true);
//     getFiltersData(currentFilter).then(res => {
//       setFilterOptions(res);
//       Object.entries(res).forEach(([key, value]) => setFiltersState(_ => ({ ..._, [key]: value[0] })));
//       setLoadingFilter(false);
//     });
//   }, [currentFilter]);

//   const onSearchCallText = useMemo(
//     () =>
//       debounce(value => {
//         debounceRef.current += 1;
//         const LocalRef = debounceRef.current;
//         setTimeout(() => {
//           if (LocalRef === debounceRef.current) {
//             onChangeFilters({ searchText: value });
//           }
//         }, 1);
//       }, 300),
//     [],
//   );

//   return (
//     <FiltersHolder>
//       <Grid lg={24} xl={25} gap={14}>
//         {currentFilter?.filters?.includes('text') && (
//           <GridCol sm={12} md={6} xl={6}>
//             <Field
//               maxLength="150"
//               md
//               noMargin
//               label="Search"
//               type="search"
//               name="searchText"
//               placeholder="Search"
//               value={searchText}
//               onChange={({ target: { value } }) => {
//                 setSearchText(value);
//                 onSearchCallText(value.trim());
//               }}
//               prefix={<i className="material-icons-outlined">search</i>}
//               clear={searchText}
//             />
//           </GridCol>
//         )}

//         {currentFilter?.filters?.includes('date') && (
//           <GridCol sm={12} md={6} xl={7}>
//             <Field
//               prefix={<i className="material-icons-outlined">date_range</i>}
//               placeholderText="Select date range"
//               type="datepicker"
//               label="Date Range"
//               name="dateRange"
//               noMargin
//               md
//               selectsRange
//               clear={startDate || endDate}
//               startDate={startDate}
//               endDate={endDate}
//               onChange={({ target: { value } }) => {
//                 setDateRange(value);
//                 if (value?.length > 1) {
//                   if (value?.[0] && value?.[1]) {
//                     onChangeFilters({
//                       startDate: format(value?.[0], 'yyyy-MM-dd'),
//                       endDate: format(value?.[1], 'yyyy-MM-dd'),
//                     });
//                   }

//                   if (!value?.[0] && !value?.[1]) {
//                     onChangeFilters({
//                       startDate: '',
//                       endDate: '',
//                     });
//                   }
//                 }
//               }}
//             />
//           </GridCol>
//         )}

//         {currentFilter?.filters
//           ?.filter(key => {
//             if (currentFilter?.filtersData) {
//               const item = currentFilter?.filtersData[key];
//               const show = item?.show;
//               if (show) {
//                 return (
//                   !Object.entries(show)
//                     .map(e => filtersState[e[0]]?.value === e[1])
//                     .includes(false) && key.toLowerCase().includes('filter')
//                 );
//               }
//             }
//             return key.toLowerCase().includes('filter');
//           })
//           ?.map((filter, index) => (
//             <GridCol sm={12} md={6} lg={7} xl={6} key={index}>
//               <Select
//                 md
//                 noMargin
//                 defaultOptions
//                 name={`${filter}`}
//                 label={`${currentFilter.filtersData[filter].label}`}
//                 isDisabled={loadingFilters}
//                 loading={loadingFilters}
//                 options={filterOptions[filter]}
//                 placeholder={`${currentFilter.filtersData[filter].label}`}
//                 value={filtersState[filter]}
//                 prefix={<i className="material-icons-outlined">{currentFilter.filtersData[filter].icon}</i>}
//                 clear={filtersState[filter] && filtersState[filter].value}
//                 onChange={({ target: { value } }) => {
//                   const s = {};
//                   if (value?.value === '') {
//                     const filtered = currentFilter?.filtersData[filter]?.depends;
//                     if (filtered) {
//                       s[filtered] = { label: 'All', value: '' };
//                     }
//                   }
//                   s[filter] = value;
//                   setFiltersState(prevState => ({
//                     ...prevState,
//                     ...s,
//                   }));
//                   onChangeFilters({ [filter]: value?.value });
//                 }}
//               />
//             </GridCol>
//           ))}

//         {extraFilters}
//       </Grid>
//     </FiltersHolder>
//   );
// }

// export default Filters;
