import React, { useEffect, useState } from 'react';
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';
import styles from './style.module.css';

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const graphData = data.map((photo) => ({
      x: photo.title,
      y: Number(photo.acessos)
    }));

    const totalViews = data
      .map((photo) => Number(photo.acessos))
      .reduce((a, b) => a + b, 0);

    setTotal(totalViews);
    setGraph(graphData);
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>

      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2
            },
            labels: {
              fontSize: 14,
              fill: '#333'
            }
          }}
        />
      </div>

      <div lassName={styles.graphItem}>
        <VictoryChart>
          <VictoryBar data={graph} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  );
}

export default UserStatsGraphs;