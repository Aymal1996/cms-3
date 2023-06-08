import React, { Component, useState } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import Timeline from 'react-timelines';
import { START_YEAR, NUM_OF_YEARS, NUM_OF_TRACKS } from './component/constants';
import { buildTimebar, buildTrack } from './component/builders';
import { fill } from './component/utils';
import './component/index.css';
import moment from 'moment';
import {SelectField } from '../../atoms/FormElement';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const now = new Date();
const timebar = buildTimebar();
const { Title, Text } = Typography;

const AcademicCalendar = (props) => {
    const history = useHistory();
    const {data} = props
    const [open, setOpen] = useState(false);
    const [zoom, setZoom] = useState(0);
    const { control } = useForm();
    //const [tracksById, setTracksById] = useState();
    //const [tracks, setTracks] = useState(Object.values(tracksById));
    const start = new Date(`${START_YEAR}`)
    const end = new Date(`${START_YEAR + NUM_OF_YEARS}`)
    const todayDate = moment(new Date()).format('LL');
    const clickElement = element => history.push(`/aqa/academic-calendar/terms-detail/${element?.name}`);
    const tracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
        const track = buildTrack(i + 1)
        acc[track.id] = track
        return acc  
    }, {})
  
    const handleToggleOpen = () => {
        setOpen(({ open }) => ({ open: !open }))
    }


    const checkTodayDate = (sDate, eDate) => {
      const compareDate = moment();
      const startDate   = moment(sDate);
      const endDate     = moment(eDate);
      return compareDate.isBetween(startDate, endDate);
    }
       

    const events = [
      {
        id: "prog-1",
        title: "Foundation",
        elements: [
          {
            start: new Date('1/1/2021 00:00:00'),
            end: new Date('4/30/2021 00:00:00'),
            title: "F1 January 2021 (15)",
            style: null
          },
          {
            start: new Date('7/13/2021 00:00:00'),
            end: new Date('9/13/2021 00:00:00'),
            title: "adroit pancake",
            style: {
              backgroundColor: '#000',
              borderRadius: '4px',
              boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
              textTransform: 'capitalize',
            }
          }
        ]
      },
      {
        id: "track-2",
        title: "Diploma",
        elements: [
          {
            start: new Date('2/13/2021 00:00:00'),
            end: new Date('4/13/2021 00:00:00'),
            title: "adroit pancake",
            style: {
              backgroundColor: '#000',
              borderRadius: '4px',
              boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
              textTransform: 'capitalize',
              color: '#fff'
            }
          },
          {
            start: new Date('5/13/2021 00:00:00'),
            end: new Date('6/13/2021 00:00:00'),
            title: "adroit pancake",
            style: {
              backgroundColor: '#000',
              borderRadius: '4px',
              boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
              textTransform: 'capitalize',
              color: '#fff'
            }
          }
        ]
      },
      {
        id: "track-3",
        title: "Degree",
        elements: [
          {
            start: new Date('2/13/2021 00:00:00'),
            end: new Date('4/13/2021 00:00:00'),
            title: "adroit pancake",
            style: {
              backgroundColor: '#000',
              borderRadius: '4px',
              boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
              textTransform: 'capitalize',
              color: '#fff'
            }
          },
          {
            start: new Date('5/13/2021 00:00:00'),
            end: new Date('6/13/2021 00:00:00'),
            title: "adroit pancake",
            style: {
              backgroundColor: '#000',
              borderRadius: '4px',
              boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
              textTransform: 'capitalize',
              color: '#fff'
            }
          }
        ]
      },
      {
        id: "track-4",
        title: "Postgrad",
        elements: [
          {
            start: new Date('2/13/2021 00:00:00'),
            end: new Date('4/13/2021 00:00:00'),
            title: "adroit pancake",
            style: {
              backgroundColor: '#000',
              borderRadius: '4px',
              boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
              textTransform: 'capitalize',
              color: '#fff'
            }
          },
          {
            start: new Date('5/13/2021 00:00:00'),
            end: new Date('6/13/2021 00:00:00'),
            title: "adroit pancake",
            style: {
              backgroundColor: '#000',
              borderRadius: '4px',
              boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
              textTransform: 'capitalize',
              color: '#fff'
            }
          }
        ]
      },
    ]

    let eventArray = [];
    data?.map((resp) => {
      eventArray.push({
        id: resp?.id,
        title: resp?.title,
        elements: resp?.elements.map(e => {
          return {
            name: e?.name,
            end: new Date(e?.end),
            start: new Date(e?.start),
            title: e.title,
            style: checkTodayDate(e?.start, e?.end) ? {backgroundColor: '#0077b6', color: '#fff'} : null
          }
        })
      })
    })

    return (
      <Card bordered={false} className='uni-card'>
        <Title className="" level={4}>Current Term</Title>
        <Row style={{position:'relative', zIndex:'9'}}>
          <Col span={18}>
            <Title className="mt-0" level={3}>{todayDate}</Title>
          </Col>
          <Col span={6}>
              <SelectField 
                  fieldname='year'
                  label=''
                  control={control}
                  class='mb-0'
                  iProps={{ placeholder: 'Please select'}}
                  initValue=''
                  selectOption={[
                    {label: '2022', value: '2022'},
                  ]}
              />
          </Col>
        </Row>
        <Timeline
            scale={{
                start,
                end,
                zoom,
                // zoomMin: MIN_ZOOM,
                // zoomMax: MAX_ZOOM,
            }}
            isOpen={open}
            toggleOpen={handleToggleOpen}
            //zoomIn={this.handleZoomIn}
            //zoomOut={this.handleZoomOut}
            clickElement={clickElement}
            // clickTrackButton={track => {
            //     // eslint-disable-next-line no-alert
            //     alert(JSON.stringify(track))
            // }}
            timebar={timebar}
            tracks={eventArray}
            now={now}
            //toggleTrackOpen={this.handleToggleTrackOpen}
            enableSticky
            scrollToNow
        />
      </Card>
    );
  };
  
  export default AcademicCalendar;