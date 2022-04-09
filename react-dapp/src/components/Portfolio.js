import { Row, Col, Image, Card, Button } from "antd";

const Portfolio = () => {
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
              <img
                alt="example"
                width="100%"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <h3>Europe Street</h3>
              <h3>30NCT</h3>
            </div>
            <Button type="primary" style={{ padding: 4, width: "100%" }}>
              Sell
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
              <img
                alt="example"
                width="100%"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <h3>Europe Street</h3>
              <h3>30NCT</h3>
            </div>
            <Button type="primary" style={{ padding: 4, width: "100%" }}>
              Sell
            </Button>
          </Card>
        </Col>
      </Row>
      ,
    </>
  );
};

export default Portfolio;
