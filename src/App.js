import React, { useState, useEffect } from 'react';
import { InputNumber, Button, Row, Col, Card } from 'antd';
import * as echarts from 'echarts';
import 'antd/dist/reset.css'; // 引入 Ant Design 样式

const App = () => {
  const [columns, setColumns] = useState(6);
  const [total, setTotal] = useState(100);
  const [charts, setCharts] = useState([]);

  const generateCharts = () => {
    const newCharts = [];
    for (let i = 0; i < total; i++) {
      newCharts.push({
        id: i,
        title: `图表 ${i + 1}`,
        data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
      });
    }
    setCharts(newCharts);
  };

  useEffect(() => {
    generateCharts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // 初始化 ECharts
    charts.forEach((chart) => {
      const chartDom = document.getElementById(`chart-${chart.id}`);
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          title: {
            text: chart.title,
            left: 'center',
            textStyle: {
              fontSize: 14,
            },
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E', 'F'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '销量',
              type: 'bar',
              data: chart.data,
            },
          ],
        };
        myChart.setOption(option);
      }
    });
  }, [charts]);

  return (
      <div style={{ padding: '20px' }}>
        <Card title="控制面板" style={{ marginBottom: '20px' }}>
        <span style={{ marginRight: '10px' }}>
          每行图表数量:
          <InputNumber
              min={1}
              max={20}
              value={columns}
              onChange={(value) => setColumns(value)}
              style={{ marginLeft: '5px' }}
          />
        </span>
          <span style={{ marginRight: '10px' }}>
          总图表数量:
          <InputNumber
              min={1}
              max={1000}
              value={total}
              onChange={(value) => setTotal(value)}
              style={{ marginLeft: '5px' }}
          />
        </span>
          <Button type="primary" onClick={generateCharts}>
            生成图表
          </Button>
        </Card>
        <Row gutter={[16, 16]}>
          {charts.map((chart) => (
              <Col
                  key={chart.id}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={Math.floor(24 / columns)}
                  xl={Math.floor(24 / columns)}
              >
                <Card>
                  <div
                      id={`chart-${chart.id}`}
                      style={{ width: '100%', height: '300px' }}
                  ></div>
                </Card>
              </Col>
          ))}
        </Row>
      </div>
  );
};

export default App;
