import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { MonsterType } from '../utils/MonsterType';

interface MonsterProps {
  monster: MonsterType;
}

export default function Monster({ monster }: MonsterProps) {
  return (
    <ListGroup.Item>
      <Row>
        <Col xs={1}>{monster.name}</Col>
      </Row>
    </ListGroup.Item>
  );
}
