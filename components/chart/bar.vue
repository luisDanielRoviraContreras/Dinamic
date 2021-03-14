<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Ingresos',
          fill: false,
          backgroundColor: '#5f28ff',
          borderColor: '#5f28ff',
          data: [30, 20, 50, 10, 1, 5, 30],
          borderWidth: 2,
          pointRadius: 2
        },
        {
          label: 'Retiros',
          fill: false,
          borderWidth: 2,
          backgroundColor: '#ffb300',
          borderColor: '#ffb300',
          data: [10, 25, 20, 5, 40, 30, 10],
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
          },
          barThickness: 5
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
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
