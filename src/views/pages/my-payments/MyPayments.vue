<template>
  <div class="my-payment__main-container">
    <h4 class="c-app__page-title">
      {{$options.headline.title}} ({{tables.payments.items.length}})
    </h4>
    <p class="c-app__page-description">
      {{$options.headline.description}}
    </p>
    <b-table
      class="c-app__table"
      :fields="tables.payments.fields"
      :items.sync="tables.payments.items"
      :busy="tables.payments.isBusy"
      responsive
      small
      hover
      outlined
      show-empty>
      <!-- <template v-slot:cell(action) = "row">
        <b-button
          @click="onPreviewFile(row.index)"
          variant="primary">
          <v-icon name="print" />
        </b-button>
      </template> -->
      <template v-slot:table-busy>
        <div class="text-center my-2">
          <v-icon
            name="spinner"
            spin
            class="mr-2" />
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(paymentStatus)="data">
            <b-badge
              :variant="
                data.item.paymentStatusId === PaymentStatuses.APPROVED.id
                  ? 'primary'
                  : data.item.paymentStatusId === PaymentStatuses.SUBMITTED.id
                  ? 'warning'
                  : 'danger'
              "
            >
              {{ PaymentStatuses.getEnum(data.item.paymentStatusId).name }}
            </b-badge>
          </template>
    </b-table>

  </div>
</template>

<script>
import { PaymentApi } from "../../../mixins/api";
import FileViewer from "../../components/FileViewer";
import headline from './data/payment';
import { formatNumber } from '../../../helpers/forms'
import { PaymentStatuses } from '../../../helpers/enum'

export default {
  mixins: [ PaymentApi ],
  headline,
  data() {
    return {
      showModalPreview : false,
      PaymentStatuses,
      tables: {
        payments: {
          isBusy: false,
          fields: [
            {
              key: 'referenceNo',
              label: 'Reference No',
              tdClass: 'align-middle',
              thStyle: { width: '20%' },
            },
            {
              key: 'paymentMode.name',
              label: 'Payment Mode',
              tdClass: 'align-middle',
              thStyle: { width: 'auto' },
            },
            {
              key: 'billing.billingNo',
              label: 'Billing No',
              tdClass: 'align-middle',
              thStyle: { width: '15%' },
            },
            {
              key: 'datePaid',
              label: 'Date Paid',
              tdClass: 'align-middle',
              thStyle: { width: '15%' },
            },
            {
              key: 'paymentStatus',
              label: 'Status',
              tdClass: 'align-middle',
              thStyle: { width: '10%' },
            },
            {
              key: 'amount',
              label: 'Amount',
              tdClass: 'align-middle text-right',
              thClass: 'text-right',
              thStyle: { width: '13%' },
              formatter: (value) => {
                return formatNumber(value);
              },
            },
            {
              key: 'action',
              label: '',
              tdClass: 'align-middle',
              thStyle: { width: '40px' },
            },
          ],
          items: []
        }
      }
    }
  },
  created() {
    const studentId = this.$store.state.user.id;
    const { payments } = this.tables
    const params = { paginate: false, studentId }
    payments.isBusy = true

    this.getPaymentList(params).then(({ data }) => {
      payments.items = data
      payments.isBusy = false
    })
  },
  methods: {

  },
  computed: {
    user() {
      return this.$store.state.user || {};
    },
  }
}
</script>

<style lang="scss" scoped>
  .my-payment__main-container {
    height: 100%;
    width: 100%;
    padding: 20px;
  }

  .requirement__title-container {
    margin-bottom: 10px;
  }

  .total-container {
    height: 55px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .total-billing-amount {
      width: 200px;
      margin-left: 20px;
      text-align: right;
    }
  }

  .row-details-container {
    width: 100%;
    height: 100%;
    padding: 30px 60px 10px 60px;
  }

  .add-button-container {
     margin-bottom: 10px;
     .pay-button {
       width: 100px;
     }
  }

  .link {
    color: rgb(45, 164, 204);
    cursor: pointer;

    &:hover {
      color: lightblue;
    }
  }
</style>