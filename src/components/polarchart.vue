<template>
  <canvas id="polarChart"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import config from '../config.js';

Chart.register(...registerables);

export default {
  name: 'polarChart',
  data() {
    return {
      configdata: config,
      skills: null,
      skillPoints: null,
      skillLinks: null,
    };
  },
  mounted() {
    if (import.meta.env.VITE_CONFIG) {
      this.configdata = JSON.parse(import.meta.env.VITE_CONFIG);
    }
    this.skills = this.configdata.polarChart.skills;
    this.skillPoints = this.configdata.polarChart.skillPoints;
    this.skillLinks = this.configdata.polarChart.skillLinks || [];
    this.renderChart();
  },
  methods: {
    generateColors(count) {
      // 使用固定颜色，避免每次渲染时颜色变化
      const fixedColors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ];
      return fixedColors.slice(0, count);
    },
    renderChart() {
      const ctx = document.getElementById('polarChart').getContext('2d');
      const colors = this.generateColors(this.skills.length);
      new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: this.skills,
          datasets: [{
            label: '技能点',
            data: this.skillPoints,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.6', '1')),
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          onClick: (event, elements) => {
            console.log('左侧转盘点击', { elements });
            
            // 直接触发信件弹窗（每次点击都触发）
            window.dispatchEvent(new CustomEvent('show-global-letter'));
            
            // 发送转盘点击事件，由隐藏诗歌组件统一处理
            document.dispatchEvent(new CustomEvent('turntable-click', {
              detail: { source: 'left' }
            }));
            
            if (elements && elements.length > 0) {
              const index = elements[0].index;
              const link = this.skillLinks[index];
              if (link) {
                window.open(link, '_blank', 'noopener,noreferrer');
              }
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: 'rgba(40, 40, 40, 0.7)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 2,
              padding: 10,
              caretSize: 6,
              caretPadding: 8,
              cornerRadius: 6,
              boxWidth: 10,
              boxHeight: 10,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || '';
                  const index = context.dataIndex;
                  const hasLink = this.skillLinks[index] ? ' 🔗' : '';
                  return `${label}: ${value} 技能点${hasLink}`;
                },
                title: (context) => {
                  return `${context[0].label}`;
                }
              }
            },
          },
          scales: {
            r: {
              ticks: {
                display: false,
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                lineWidth: 0.5,
              },
              angleLines: {
                color: 'rgba(0, 0, 0, 0.2)',
                lineWidth: 1,
              },
            },
          },
          animation: {
            duration: 1800,
            easing: 'easeOutQuad',
            animateRotate: true,
            animateScale: true,
          }
        },
      });
    },
  },
};
</script>

<style scoped>
</style>