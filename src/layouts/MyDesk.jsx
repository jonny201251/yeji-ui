import { Card } from 'antd';
import b from '../assets/b.jpg';
import c from '../assets/c.jpg';

export default () => {
  return (
    <>
      <Card
        hoverable
        // style={{ width: 240 }}
        cover={<img alt="" src={b} />}
      >
        <Card.Meta title="Europe Street beat" />
      </Card>
      <Card
        hoverable
        // style={{ width: 240 }}
        cover={<img alt="" src={c} />}
      >
        <Card.Meta title="Europe Street beat" />
      </Card>
    </>
  );
};
