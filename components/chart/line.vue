<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Ingresos',
          fill: false,
          backgroundColor: '#3085ff',
          borderColor: '#3085ff',
          data: [30, 20, 50, 10, 1, 5, 30],
          borderWidth: 2,
          pointRadius: 2
        },
        {
          label: 'Retiros',
          fill: false,
          borderWidth: 2,
          backgroundColor: '#1f1645',
          borderColor: '#1f1645',
          data: [10, 25, 20, 5, 40, 15, 10],
          pointRadius: 2
        }
      ]
    },
    options: {
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 10,
          bottom: 0
        }
      },
      scales: {
        pointLabels: {
          fontStyle: 'bold'
        },
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }
        }]
      },
      defaultFontFamily: 'Poppins',
      legend: false,
      type: 'line',
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
