/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-plusplus */
import { format } from 'date-fns';
import Compress from 'react-image-file-resizer';
import styled from 'styled-components';
import Grid from '../components/atoms/Grid';

export const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = this.getDateObject(new Date());
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;

  return true;
};

export const getCookie = name => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const clearCookie = name => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

  return true;
};

export const convertPdfBase64 = file =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });

export const compressImage = (file, type = 'JPEG') =>
  new Promise(resolve => {
    Compress.imageFileResizer(
      file,
      Infinity,
      Infinity,
      type,
      70,
      0,
      uri => {
        resolve(uri);
      },
      'base64',
    );
  });

export const capitalize = (str = '') => {
  const arr = str.toLowerCase().split(' ');

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');
  return str2;
};

export const getStatusIconClass = (status = '') => {
  switch (status.trim().toLowerCase()) {
    case 'pending':
      return 'icon-clock';
    case 'processing':
      return 'icon-clock';
    case 'approved':
      return 'icon-check-circle';
    case 'rejected':
      return 'icon-error-circle';
    case 'cancelled':
      return 'icon-times-circle';
    default:
      return 'icon-warning';
  }
};

function changeTimezone(date, ianatz) {
  // suppose the date is 12:00 UTC
  const invdate = new Date(
    date.toLocaleString('en-US', {
      timeZone: ianatz,
    }),
  );

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  const diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff); // needs to substract
}

export const getDateObject = e => changeTimezone(new Date(e), 'Canada/Eastern');

export const convertToCurrencyFormat = (amount = '0') =>
  `$${Number(amount)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

export const shortenString = (str, len = 10) => {
  if (!str) return null;
  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }
  return str;
};

export const convertReadable = (amount = 0) =>
  `${
    Math.abs(amount) > 999
      ? `${Math.sign(amount) * (Math.abs(amount) / 1000).toFixed(1)}K`
      : Math.sign(amount) * Math.abs(amount)
  }`;

export const GeoCode = async value => {
  try {
    const { results } = typeof window !== 'undefined' && (await new window.google.maps.Geocoder().geocode(value));

    if (!results) {
      throw Error('Unable to load maps');
    }
    const { address_components, geometry, place_id, formatted_address, types } = results[0];
    const address = {};
    // eslint-disable-next-line no-shadow
    address_components?.forEach(({ short_name, types }) => {
      if (types.includes('administrative_area_level_1')) {
        address.state = short_name;
      } else if (types.includes('administrative_area_level_2')) {
        address.county = short_name;
      } else if (types.includes('locality')) {
        address.city = short_name;
      } else address[types[0]] = short_name;
    });

    return {
      ...address,
      types,
      place_id,
      latlng: {
        lat: geometry?.location?.lat(),
        lng: geometry?.location?.lng(),
      },
      formatted_address,
    };
  } catch (err) {
    throw Error(err?.message ?? 'Unable to load maps');
  }
};

export const convertToBase64 = file =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });

export const getVisitNo = visit => {
  switch (visit) {
    case 1:
      return `${String(visit)}st`;
    case 2:
      return `${String(visit)}nd`;
    case 3:
      return `${String(visit)}rd`;
    default:
      return `${String(visit)}th`;
  }
};

export const getOfferDetails = ({
  offer_type,
  // eslint-disable-next-line no-unused-vars
  offer_details: { minimum_amount, minimum_visit, maximum_amount, plastk_points_value, plastk_points },
  stores,
  duration: { startDate, endDate },
  state,
}) => {
  if (!stores.length || !offer_type || !plastk_points_value || !startDate || !endDate) return '';
  const Text = styled.span`
    display: block;
    margin: 0 0 15px;

    &:last-child {
      margin: 0;
    }
  `;
  const TextWrap = styled.div`
    width: 100%;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #dadada;
    border-radius: 5px;
    margin: 0 0 20px;
    padding: 25px 20px;
    background: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  try {
    switch (offer_type) {
      case 'dollarBased':
        return (
          <>
            <Text>
              Spend at least {convertToCurrencyFormat(minimum_amount)} and receive {plastk_points_value} plastk points.
            </Text>
            <Text>
              Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} To ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </Text>
            <Text>*Terms And Conditions Apply</Text>
          </>
        );

      case 'repeatVisit':
        return (
          <>
            <Text>
              Visit {minimum_visit} times and receive {plastk_points_value} plastk points on the{' '}
              {(() => {
                switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                  case 1:
                    return `${String(minimum_visit)}st`;
                  case 2:
                    return `${String(minimum_visit)}nd`;
                  case 3:
                    return `${String(minimum_visit)}rd`;
                  default:
                    return `${String(minimum_visit)}th`;
                }
              })()}{' '}
              visit.
            </Text>
            <Text>
              Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </Text>
            <Text>*Terms And Conditions Apply</Text>
          </>
        );
      case 'initialOffer':
        return (
          <Grid xs={1} sm={2} gap={20} css="margin-top:20px">
            <TextWrap>
              <Text>Introductory Offer</Text>
              <Text>
                {getVisitNo(Number(Object.keys(state?.initial_offer)[0]))}&nbsp;Visit - Spend&nbsp;
                {convertToCurrencyFormat(minimum_amount)}&nbsp;Or More And Receive {state?.initial_offer['1']}% In
                Plastk Points, Up to {((state?.initial_offer['1'] / 100) * state?.maximum_amount * 200).toFixed(0)}
                &nbsp;Points
              </Text>
              <Text>Expires {format(getDateObject(new Date(endDate).toString()), 'MMM do yyyy hh:mm a')}</Text>
              <Text>*Terms And Conditions Apply</Text>
            </TextWrap>
            <TextWrap>
              {Object.values(state?.initial_offer).map((val, index) => (
                <Text key={index + 1}>
                  {`${getVisitNo(index + 1)} visit- ${val}% in Plastk Reward Points up to`}&nbsp;
                  {`${((val / 100) * state?.maximum_amount * 200).toFixed(0)}`}&nbsp;Points
                </Text>
              ))}
              {state?.every_day_offer && (
                <Text>
                  {`Everyday visit- ${state?.every_day_offer}% in Plastk Reward Points up to`}&nbsp;
                  {`${((state?.every_day_offer / 100) * state?.maximum_amount * 200).toFixed(0)}`}&nbsp;Points
                </Text>
              )}
            </TextWrap>
          </Grid>
        );
      case 'percentBased':
        return (
          <>
            <Text>
              Spend ${minimum_amount} or more and receive {plastk_points}% in plastk points, <br />
              up to a maximum of{' '}
              {plastk_points_value % 1 !== 0
                ? convertToCurrencyFormat(plastk_points_value)
                : convertToCurrencyFormat(0)}
              points.
            </Text>
            <Text>
              Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </Text>
            <Text>*Terms And Conditions Apply</Text>
          </>
        );
      default:
        return (
          <>
            <Text>Wrong Offer Type ....</Text>
            <Text>Offer valid between ---- ----</Text>
            <Text>*Terms And Conditions Apply</Text>
          </>
        );
    }
  } catch (e) {
    return (
      <>
        <Text>{e.message}</Text>
        <Text>Offer valid between ---- ----</Text>
        <Text>*Terms And Conditions Apply</Text>
      </>
    );
  }
};

export const getOfferText = ({
  offer_type,
  // eslint-disable-next-line no-unused-vars
  offer_details: {
    minimum_amount,
    minimum_visit,
    maximum_amount,
    plastk_points_value,
    plastk_points,
    initial_offer,
    every_day_offer,
  },
  stores,
  duration: { startDate, endDate },
}) => {
  switch (offer_type) {
    case 'dollarBased':
      return `Spend at least ${convertToCurrencyFormat(
        minimum_amount,
      )} And receive ${plastk_points_value} Plastk points`;
    case 'repeatVisit':
      return `Visit ${minimum_visit} Times And recieve ${plastk_points_value} Plastk points on the
        ${(() => {
          switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
            case 1:
              return `${String(minimum_visit)}st`;
            case 2:
              return `${String(minimum_visit)}nd`;
            case 3:
              return `${String(minimum_visit)}rd`;
            default:
              return `${String(minimum_visit)}th`;
          }
        })()} visit.`;

    case 'percentBased':
      return `Spend ${parseFloat(+minimum_amount).toFixed(2)} Or More
                And recieve ${plastk_points}% in Plastk points, up to a
                maximum of
                ${plastk_points * 2 * maximum_amount}
                points.`;

    case 'initialOffer':
      return `Visit ${minimum_visit} times and receive ${plastk_points_value} plastk points on the
              ${(() => {
                switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                  case 1:
                    return `${String(minimum_visit)}st`;
                  case 2:
                    return `${String(minimum_visit)}nd`;
                  case 3:
                    return `${String(minimum_visit)}rd`;
                  default:
                    return `${String(minimum_visit)}th`;
                }
              })()}
              visit`;

    default:
      return null;
  }
};
export const getOfferDetailsAppView = ({
  offer_type,
  // eslint-disable-next-line no-unused-vars
  offer_details: {
    minimum_amount,
    minimum_visit,
    maximum_amount,
    plastk_points_value,
    plastk_points,
    initial_offer,
    every_day_offer,
  },
  stores,
  duration: { startDate, endDate },
}) => {
  if (!stores.length || !offer_type || !plastk_points_value || !startDate || !endDate) return '';
  try {
    switch (offer_type) {
      case 'dollarBased':
        return (
          <>
            <p>
              Spend at least {convertToCurrencyFormat(minimum_amount, 0)} and receive {plastk_points_value} plastk
              points. Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} To ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </p>
            <p>*Terms And Conditions Apply</p>
          </>
        );

      case 'repeatVisit':
        return (
          <>
            <p>
              Visit {minimum_visit} times and receive {plastk_points_value} plastk points on the{' '}
              {(() => {
                switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                  case 1:
                    return `${String(minimum_visit)}st`;
                  case 2:
                    return `${String(minimum_visit)}nd`;
                  case 3:
                    return `${String(minimum_visit)}rd`;
                  default:
                    return `${String(minimum_visit)}th`;
                }
              })()}{' '}
              visit. Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </p>
            <p>*Terms And Conditions Apply</p>
          </>
        );

      case 'percentBased':
        return (
          <>
            <p>
              Spend ${minimum_amount} or more and receive {plastk_points}% in plastk points, up to a maximum of{' '}
              {plastk_points_value % 1 !== 0
                ? convertToCurrencyFormat(plastk_points_value, 2, false)
                : convertToCurrencyFormat(plastk_points_value, 0, false)}
              points. Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </p>
            <p>*Terms And Conditions Apply</p>
          </>
        );
      case 'initialOffer':
        return (
          <>
            <p>
              Visit {minimum_visit} times and receive {plastk_points_value} plastk points on the &nbsp;
              {(() => {
                switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                  case 1:
                    return `${String(minimum_visit)}st`;
                  case 2:
                    return `${String(minimum_visit)}nd`;
                  case 3:
                    return `${String(minimum_visit)}rd`;
                  default:
                    return `${String(minimum_visit)}th`;
                }
              })()}{' '}
              visit. Offer valid between
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </p>
            <p>*Terms And Conditions Apply</p>

            {/* {Object.values(initial_offer).map((val, index) => (
              <p key={index + 1}>
                {`${getVisitNo(index + 1)} visit- ${val}% in Plastk Reward Points up to`}&nbsp;
                {`${((val / 100) * maximum_amount * 200).toFixed(0)}`}&nbsp;Points
              </p>
            ))}
            {every_day_offer && (
              <p>
                {`Everyday visit- ${every_day_offer}% in Plastk Reward Points up to`}&nbsp;
                {`${((every_day_offer / 100) * maximum_amount * 200).toFixed(0)}`}&nbsp;Points
              </p>
            )} */}
          </>
        );
      default:
        return (
          <>
            <p>Wrong Offer Type ....</p>
            <p>Offer valid between ---- ----</p>
            <p>*Terms And Conditions Apply</p>
          </>
        );
    }
  } catch (e) {
    return (
      <>
        <p>{e.message}</p>
        <p>Offer valid between ---- ----</p>
        <p>*Terms And Conditions Apply</p>
      </>
    );
  }
};
const validateImage = url =>
  new Promise((resolve, reject) => {
    const img = new Image(url);
    // eslint-disable-next-line no-multi-assign
    img.onerror = img.onabort = async function () {
      reject();
    };
    img.onload = function () {
      resolve();
    };
    img.src = url;
  });

const checkValidImageProtocol = url => {
  if (/(http(s?)):\/\//i.test(url)) {
    return true;
  }
  return false;
};

const checkValidImageExtension = url => {
  if (['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG'].includes(url.split(/[#?]/)[0].split('.').pop().trim())) {
    return true;
  }
  return false;
};

export const checkInValidImage = async url => {
  try {
    await validateImage(url);
    return !(checkValidImageExtension(url) && checkValidImageProtocol(url));
  } catch (ex) {
    return true;
  }
};
