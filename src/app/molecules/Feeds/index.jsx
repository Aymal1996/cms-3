import React, { useState, useEffect } from 'react';
import { List, Comment, Tabs, Card, Button, Typography } from 'antd';
import { getTeamUpdates, getForYouUpdates } from './ducks/actions';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

export const baseUrl = process.env.REACT_APP_BASE_URL;

const { TabPane } = Tabs;
const { Title, Text } = Typography;
export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feeds.teamMarketingList);
  const feedForYou = useSelector((state) => state.feeds.forYouList);
  const [teamUpdates, setTeamUpdates] = React.useState([]);
  const [teamUpdates1, setTeamUpdates1] = React.useState([]);
  const [detailLink, setDetailLink] = useState();
  const defaultImage = JSON.parse(localStorage.getItem('userdetails'))?.user_employee_detail[0].default_image;
  const rolesList = JSON.parse(localStorage.getItem('userdetails')).role_list;

  const rolesParams = {
    mlist: ['Marketing', 'Faculty'],
  };

  useEffect(() => {
    dispatch(getTeamUpdates(rolesParams));
    dispatch(getForYouUpdates());
    // setInterval(() => {
    //   dispatch(getTeamUpdates(rolesParams));
    //   dispatch(getForYouUpdates());
    // }, 60000);
  }, []);

  const generateLink = (doctype, docname, pageLink) => {
    switch (doctype) {
      case 'Application':
        return (pageLink = `/marketing/incomplete-applications/${docname}`);
        break;

      default:
      // code block
    }
  };

  useEffect(() => {
    if (feed && feed.length) {
      // console.log('feed', feed);
      let arr = [];
      feed.map((res) => {
        const endTime = moment(res?.time);
        const startTime = moment(res?.current_date);
        var duration = endTime.from(startTime);

        let obj = null;
        const datetime = res?.modified_timestmp ? res.modified_timestmp : '';
        const ava = res?.comment_modified_data || res?.version_modified_data;
        const doctype = res?.doc_type;
        const docname = res?.docname;
        const action = res?.comment ? [res?.comment] : '';
        const content = res?.comment
          ? `Commented in ${res?.docname} ${res.doc_type}`
          : `Updated in ${res?.docname} ${res.doc_type}`;
        const author = ava?.length ? ava[0].full_name : '';
        //const avatar = ava?.length ? ava[0].user_image ? `${baseUrl}${ava[0].user_image}` : defaultImage : defaultImage;

        const avatar = ava?.length
          ? ava[0].user_image
            ? `${baseUrl}${ava[0].user_image}`
            : baseUrl + defaultImage
          : baseUrl + defaultImage;
        const employee_id = ava?.length
          ? ava[0].employee_id
          : "";
        const link = res?.link;
        const stage = res?.application_status;
        let stageLink = '';
        let pageLink = '';

        switch (stage) {
          case 'Incomplete document':
            stageLink = `incomplete-documents`;
            break;

          case 'Eligibility assessment':
            stageLink = `eligibility-assessments`;
            break;

          case 'Incomplete registration visa':
            stageLink = `pending-registration-visa`;
            break;

          case 'Pending accomodation':
            stageLink = `pending-accommodations`;
            break;

          case 'Pending enrollment':
            stageLink = `pending-enrolment`;
            break;

          default:
            stageLink = `incomplete-documents`;
        }

        switch (doctype) {
          case 'Application':
            pageLink = `/marketing/applications/${stageLink}/${docname}`;
            break;

          case 'AQA Form Request':
            pageLink = `/aqa/requests/${docname}`;
            break;

          case 'AQA Form Request':
            pageLink = `/aqa/requests/${docname}`;
            break;

          default:
        }
        obj = {
          action: action,
          author: author,
          avatar: avatar,
          content: content,
          datetime: duration,
          docname: docname,
          link: link,
          pageLink: pageLink,
          employee_id: employee_id
        };
        if (obj) {
          arr.push(obj);
        }
      });
      setTeamUpdates(arr);
    }
  }, [feed]);

  useEffect(() => {
    if (feedForYou) {
      let arr = [];
      feedForYou.map((res) => {
        let obj = null;
        const datetime = res.time ? moment(new Date(res.time)).fromNow() : '';
        const ava = res?.comment_modified_data || res?.version_modified_data;
        const doctype = res?.doc_type;
        const docname = res?.docname;
        const employee_id = res?.employee_id;
        const action = res?.comment ? [res?.comment] : '';
        const content = res?.comment
          ? `Commented in ${res?.docname} ${res.doc_type}`
          : `Updated in ${res?.docname} ${res.doc_type}`;
        const author = ava?.length ? ava[0].full_name : '';
        const avatar = ava?.length
          ? ava[0].user_image
            ? `${baseUrl}${ava[0].user_image}`
            : baseUrl + defaultImage
          : baseUrl + defaultImage;
        const link = res?.link;
        const stage = res?.application_status;
        let stageLink = '';
        let pageLink = '';

        switch (stage) {
          case 'Incomplete document':
            stageLink = `incomplete-documents`;
            break;

          case 'Eligibility assessment':
            stageLink = `eligibility-assessments`;
            break;

          case 'Incomplete registration visa':
            stageLink = `pending-registration-visa`;
            break;

          case 'Pending accomodation':
            stageLink = `pending-accommodations`;
            break;

          case 'Pending enrollment':
            stageLink = `pending-enrolment`;
            break;

          default:
            stageLink = `incomplete-documents`;
        }

        switch (doctype) {
          case 'Application':
            pageLink = `/marketing/applications/${stageLink}/${docname}`;
            break;

          case 'AQA Form Request':
            pageLink = `/aqa/requests/${docname}`;
            break;

          case 'AQA Form Request':
            pageLink = `/aqa/requests/${docname}`;
            break;

          default:
        }
        obj = {
          action: action,
          author: author,
          avatar: avatar,
          content: content,
          datetime: datetime,
          link: link,
          pageLink: pageLink,
          employee_id: employee_id
        };
        if (obj) {
          arr.push(obj);
        }
      });
      setTeamUpdates1(arr);
    }
  }, [feedForYou]);

  return (
    <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
      <TabPane tab="Updates" key="1" forceRender={true}>
        <Card bordered={false} className="transparent-card" style={{ height: 'calc(100vh - 220px)' }}>
          {console.log('item', teamUpdates)}
          <List
            className="sider-comment-list"
            itemLayout="horizontal"
            dataSource={teamUpdates}

            renderItem={(item) => {

              return (
                <li>
                  <Comment
                    actions={item.action}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.link ? <Link className="linkSidebar" to={"/profile/" + item.employee_id}>{item.content}</Link> : item.content}
                    // content={item.content}
                    datetime={item.datetime}
                  />

                </li>
              );
            }}
          />
        </Card>
      </TabPane>
      <TabPane tab={`For You ${teamUpdates1?.length}`} key="2" forceRender={true}>
        <Card bordered={false} className="transparent-card" style={{ height: 'calc(100vh - 220px)' }}>
          {teamUpdates1?.length > 0 ? (
            <List
              className="sider-comment-list"
              itemLayout="horizontal"
              dataSource={teamUpdates1}
              renderItem={(item) => {
                return (
                  <li>
                    <Comment
                      actions={item.action}
                      author={item.author}
                      avatar={item.avatar}
                      content={
                        item.link ? (
                          <a type="link" className="linkSidebar" href={item?.pageLink}>
                            {item.content}
                          </a>
                        ) : (
                          item.content
                        )
                      }
                      datetime={item.datetime}
                    />
                  </li>
                );
              }}
            />
          ) : (
            <Title level={4} className="mb-0 mt-2 text-center b-black" style={{ padding: '20px' }}>
              There are no comments available for now
            </Title>
          )}
        </Card>
      </TabPane>
    </Tabs>
  );
};
