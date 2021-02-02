<template>
  <div class="my-statement__main-container">
      <h4 class="c-app__page-title">
        {{$options.headline.title}} ({{tables.billings.items.length}})
      </h4>
      <p class="c-app__page-description">
        {{$options.headline.description}}
      </p>
    <!-- <div class="add-button-container">
      <b-button
        class="pay-button"
        variant="primary"> PAY
      </b-button>
    </div> -->
    <b-table
      ref="billings"
      class="c-app__table"
      small outlined show-empty
      :fields="tables.billings.fields"
      :busy="tables.billings.isBusy"
      :items="tables.billings.items">
      <template v-slot:table-busy>
        <div class="text-center my-2">
          <v-icon
            name="spinner"
            spin
            class="mr-2" />
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(billingNo)="row">
        <div><span class="link" @click="loadDetails(row)">{{ row.item.billingNo }}</span></div>
      </template>
      <template v-slot:cell(totalPaid)="row">
        <b-badge
              :variant="
                row.item.submittedPayments.length > 0 
                  ? 'warning'
                  : 'success'"
            >
        {{ row.item.submittedPayments.length > 0 ? 'For Approval' : formatNumber(row.item.totalPaid) }}</b-badge>
      </template>
      <template v-slot:cell(action)="row">
         <b-dropdown
            right
            variant="link"
            toggle-class="text-decoration-none"
            no-caret>
            <template v-slot:button-content>
              <v-icon name="ellipsis-v" />
            </template>
            <b-dropdown-item
              @click="loadDetails(row)" >
              View Details
            </b-dropdown-item>
            <b-dropdown-item
              :to="`/payment/${row.item.id}`"
              v-if="!row.item.submittedPayments.length > 0">
              Pay Bill
            </b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:row-details="data">
        <b-overlay :show="data.item.isLoading" rounded="sm">
          <div class="row-details-container">
            <div v-if="data.item.termBillings && data.item.termBillings.length > 0">
                <b-table
                  small outlined show-empty
                  :fields="tables.soaBillings.fields"
                  :busy="tables.soaBillings.isBusy"
                  :items="data.item.termBillings">
                  <template v-slot:table-busy>
                    <div class="text-center my-2">
                      <v-icon
                        name="spinner"
                        spin
                        class="mr-2" />
                      <strong>Loading...</strong>
                    </div>
                  </template>
                </b-table>
            </div>
            <div v-if="data.item.otherBillings && data.item.otherBillings.length > 0">
              <b-table
                  small outlined show-empty
                  :fields="tables.otherBillings.fields"
                  :busy="tables.otherBillings.isBusy"
                  :items="data.item.otherBillings">
                  <template v-slot:table-busy>
                    <div class="text-center my-2">
                      <v-icon
                        name="spinner"
                        spin
                        class="mr-2" />
                      <strong>Loading...</strong>
                    </div>
                  </template>
                </b-table>
            </div>
          </div>
        </b-overlay>
      </template>
    </b-table>
    <div class="total-container">
      <strong>TOTAL REMAINING BALANCE :</strong>
      <vue-autonumeric
        :disabled="true"
        ref="totalAmount"
        :value="getTotalBilling"
        class="total-billing-amount"
        :class="'form-control'"
        :options="[{
          modifyValueOnWheel: false,
          emptyInputBehavior: 0 }]">
      </vue-autonumeric>
    </div>
  </div>
</template>

<script>
import { StudentApi, PaymentApi, BillingApi, SchoolYearApi } from "../../../mixins/api"
import { showNotification, formatNumber, clearFields, validate, reset, } from "../../../helpers/forms"
import { format } from 'date-fns'
import Maintenance from '../../components/Maintenance';
import headline from './data/statement';

export default {
  mixins: [ StudentApi, PaymentApi, BillingApi, SchoolYearApi ],
  headline,
  components: {
    Maintenance
  },
  data() {
    return {
      student: null,
      formatNumber,
      tables: {
        billings: {
          fields: [
            {
              key: "billingNo",
              label: "Billing No",
              tdClass: "align-middle",
              thStyle: {width: "17%"}
            },
            {
              key: "dueDate",
              label: "Due Date",
              tdClass: "align-middle",
              thStyle: {width: "10%"},
            },
            {
              key: "previousBalance",
              label: "Previous Balance",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value) => {
                if(Math.sign(value) < 0) {
                  return `(${formatNumber(Math.abs(value))})`
                }
                return formatNumber(value)
              }
            },
            {
              key: "totalAmount",
              label: "CurrentDue ",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value) => {
                if(Math.sign(value) < 0) {
                  return `(${formatNumber(Math.abs(value))})`
                }
                return formatNumber(value)
              }
            },
            {
              key: "total",
              label: "Total Amount Due",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value, key, item) => {
                const total = parseFloat(item.previousBalance) + parseFloat(item.totalAmount)
                if(Math.sign(total) < 0) {
                  return `(${formatNumber(Math.abs(total))})`
                }
                return formatNumber(total)
              }
            },
            {
              key: "totalPaid",
              label: "Paid ",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value) => {
                if(Math.sign(value) < 0) {
                  return `(${formatNumber(Math.abs(value))})`
                }
                return formatNumber(value)
              }
            },
            {
              key: "remainingBalance",
              label: "Balance ",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value, key, item) => {
                const remBalance = parseFloat(item.previousBalance) + parseFloat(item.totalAmount) - item.totalPaid
                if(Math.sign(remBalance) < 0) {
                  return `(${formatNumber(Math.abs(remBalance))})`
                }
                return formatNumber(remBalance)
              }
            },
            {
              key: "action",
              label: "",
              tdClass: "align-middle",
              thClass: "text-center",
              thStyle: {width: "50px"}
            },
          ],
          items: []
        },
        soaBillings: {
          isBusy: false,
          fields: [
            {
							key: "term.name",
							label: "Term",
							tdClass: "align-middle",
              thStyle: {width: "35%"},
            },
            {
							key: "term.schoolYear.name",
							label: "School Year",
							tdClass: "align-middle",
              thStyle: {width: "30%"},
            },
            {
							key: "term.semester.name",
							label: "Semester",
							tdClass: "align-middle",
              thStyle: {width: "20%"},
            },
            {
							key: "amount",
							label: "Amount",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value) => {
                return formatNumber(value)
              }
            },
          ],
          items: []
        },
        otherBillings: {
          isBusy: false,
          fields: [
            {
							key: "schoolFee.name",
							label: "Fees",
							tdClass: "align-middle",
              thStyle: {width: "85%"},
            },
            {
							key: "amount",
							label: "Amount",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value) => {
                return formatNumber(value)
              }
            },
          ],
          items: []
        }
      }
    }
  },
  created() {
    this.student = this.$store.state?.user
    this.loadBillings(this.student.id)
  },
  methods: {
    loadBillings(studentId) {
      const { billings } = this.tables
      billings.isBusy = true
      this.getBillingsOfStudent(studentId).then(({ data }) => {
        billings.items = data
        billings.isBusy = false
      })

      // if (billings.items.length > 0)
      //   this.$refs.billings.selectRow(0)
    },
    loadDetails(row) {
      const { item } = row
      this.$set(item, 'isLoading', true)
      if (!row.detailsShowing) {
        this.getBillingItemsOfBilling(item.id).then(({ data }) => {
          this.$set(item, 'termBillings', data.filter(e => e.termId !== null))
          this.$set(item, 'otherBillings', data.filter(e => e.termId === null))
          this.$set(item, 'isLoading', false)
        })
      }
      row.toggleDetails()
    },
    onRowSelected(row) {
      if(row.length > 0) {
        // const remainingBalance = parseFloat(row[0].previousBalance) + parseFloat(row[0].totalAmount) - parseFloat(row[0].totalPaid)
        // payment.fields.billingId = row.length ? row[0].id :  null
        // payment.fields.amount = remainingBalance > 0 ? remainingBalance : 0
      }
    },
  },
  computed: {
    getTotalBilling() {
      const { billings } = this.tables
      var sum = billings.items.reduce((sum, current)=>{
        return sum + (parseFloat(current.totalAmount) + parseFloat(current.previousBalance) - parseFloat(current.totalPaid));
      }, 0);

      return formatNumber(sum, 2);
    },
  }
}
</script>

<style lang="scss" scoped>
  .my-statement__main-container {
    height: 100%;
    width: 100%;
    padding: 20px;
  }

  .my-statement__title-container {
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