import React, { useEffect, useState } from 'react';
import AppLayout from '@layout/app';
import { Badge, Breadcrumb, Button, Col, Descriptions, Modal, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { IPlayerDetail } from '../../schemas/IContact';
import Loader from '@components/loader/Loader';
import moment from 'moment';
import Logo from '../../assets/img/aicf-logo.png';
import { AicfId, PlayerName } from '@utils/helpers';

export default function ShowPlayer() {
  const { id }: any = useParams();
  const [isloading, setIsloading] = useState(true);
  const [showIdCard, setShowIdCard] = useState(false);
  const [data, setData] = useState({} as IPlayerDetail);
  const { player, photo } = data;

  const getData = async () => {
    setIsloading(true);
    try {
      const { data } = await Axios.get(`players/${id}`);
      setData(data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Search</Breadcrumb.Item>
        <Breadcrumb.Item>{player?.id}</Breadcrumb.Item>
      </Breadcrumb>
      {isloading ? <Loader /> :
        <div>
          <Descriptions title={`${player?.first_name} ${player?.middle_name} ${player?.last_name}`} bordered={true}>
            <Descriptions.Item label="First Name">{player?.first_name}</Descriptions.Item>
            <Descriptions.Item label="Middle Name">{player?.middle_name}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{player?.last_name}</Descriptions.Item>

            <Descriptions.Item label="Email">{player?.email}</Descriptions.Item>
            <Descriptions.Item label="Mobile No" span={2}>
              {player?.mobile}
            </Descriptions.Item>

            <Descriptions.Item label="Son/Daughter of" >{player?.son_daughter_of}</Descriptions.Item>
            <Descriptions.Item label="Relationship">{player?.relationship}</Descriptions.Item>
            <Descriptions.Item label="Mother Tounge">{player?.mother_tounge}</Descriptions.Item>

            <Descriptions.Item label="Gender" span={1}>
              <Badge status="processing" text={player?.gender} />
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth" span={2}>{player?.date_of_birth ? moment(player.date_of_birth).format('DD-MM-YYYY') : null}</Descriptions.Item>

            <Descriptions.Item label="Address" span={1}>{player?.address}</Descriptions.Item>
            <Descriptions.Item label="Config Info" span={2}>
              City: <b>{player?.city}</b>
              <br />
              District: <b>{player?.district}</b>
              <br />
              State: <b>{player?.state}</b>
              <br />
            </Descriptions.Item>

            <Descriptions.Item label="Payer Type" span={1}>
              <Badge status="processing" text={player?.player_type} />
            </Descriptions.Item>
            <Descriptions.Item label="Are you a PIO/OCI" span={2}>{player?.poi}</Descriptions.Item>
          </Descriptions>
          <div style={{ margin:'1rem 0'}}>
           <Button onClick={() => setShowIdCard(true)} type="primary" size="large">Show ID</Button>
           </div>
          <Modal
           width="500px"
           onCancel={() => setShowIdCard(false)} 
           visible={showIdCard} onOk={() => setShowIdCard(false)}>
            <Row gutter={16}>
              <Col span={8}>
                 <img src={Logo} alt="aicf logo" width="100%" height="auto"/>
              </Col>
              <Col span={16}>
                <Typography>
                  <Typography.Title level={5} style={{color:'#3F51B5'}}>ALL INDIA CHESS FEDERATION </Typography.Title>
                    <p>Affilate of FIDE & Recognized by the Government of India</p>
                    <p>Room No. 70, Jawaharlal Nehru Stadium,<br />
                    Chennai - 600 003,INDIA.<br />
                    Phone: 044 - 65144966 Fax: 044 - 25382121</p>
                </Typography>
              </Col>
            </Row>
            <Row gutter={16} style={{margin:'1rem 0'}}>
              <Col span={8}>
                 {photo && <img src={photo?.original} width="100%" height="auto" alt={`${player?.first_name} profile`} />}
              </Col>
              <Col span={16}>
               <Descriptions column={1}>
                <Descriptions.Item label="Name">{PlayerName(player.first_name,player.middle_name,player.last_name)}</Descriptions.Item>
                <Descriptions.Item label="AICF Regn. No.">{AicfId(player.id,player.state,player.created_at)}</Descriptions.Item>
                <Descriptions.Item label="State">{player?.state}</Descriptions.Item>
                <Descriptions.Item label="Valid Upto">{moment(player.created_at).add('1','y').format('DD-MM-YYYY')}</Descriptions.Item>
                {/* <Descriptions.Item label="Type">YES</Descriptions.Item> */}
               </Descriptions>
              </Col>
            </Row>
          </Modal>
        </div>}
    </AppLayout>
  );
}
