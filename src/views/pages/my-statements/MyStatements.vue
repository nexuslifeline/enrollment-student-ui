<template>
  <MainContainer
    :title="`${$options.headline.title} (${tables.billings.items.length})`"
    :description="$options.headline.description">
    <template v-slot:subheader>
      <Tabs :activeIndex="selectedTabIndex" :items="tabItems" @onSelect="onTabChange">
        test
      </Tabs>
    </template>
    <b-table
      ref="billings"
      class="c-app__table mt-3"
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
        <BillColumn :data="row.item" @onClick="previewBilling(row.item.id)" />
      </template>
      <template v-slot:cell(totalPaid)="row">
        <BillPaymentColumn :data="row.item" />
        <!-- <b-badge
              :variant="
                row.item.submittedPayments.length > 0
                  ? 'warning'
                  : 'success'"
            >
        {{ row.item.submittedPayments.length > 0 ? 'For Approval' : formatNumber(row.item.totalPaid) }}</b-badge> -->
      </template>
      <template v-slot:cell(action)="row">
         <b-dropdown
            right
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            boundary="window">
            <template v-slot:button-content>
              <v-icon name="ellipsis-v" />
            </template>
            <b-dropdown-item
              @click="previewBilling(row.item.id)"
            >
            Preview
            </b-dropdown-item>
            <b-dropdown-item
              :to="`/payment/${row.item.id}`"
              v-if="isAllowedPayBill(row.item)">
              Pay Bill
            </b-dropdown-item>
        </b-dropdown>
      </template>
      <!-- <template v-slot:row-details="data">
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
      </template> -->
    </b-table>
    <!-- <div class="total-container">
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
    </div> -->
    <FileViewer
      :show="fileViewer.show"
      :file="file"
      :owner="file.owner"
      :isBusy="file.isLoading"
      @close="fileViewer.show = false"
    />
  </MainContainer>
</template>

<script>
import { StudentApi, PaymentApi, BillingApi, SchoolYearApi, ReportApi } from "../../../mixins/api"
import { showNotification, formatAccountingNumber, formatNumber, toReadableDate } from "../../../helpers/forms"
import Maintenance from '../../components/Maintenance';
import headline from './data/statement';
import FileViewer from '../../components/FileViewer';
import { BillingStatus } from '../../../helpers/enum';
import BillColumn from '../../components/ColumnDetails/BillColumn';
import BillPaymentColumn from '../../components/ColumnDetails/BillPayment';

export default {
  mixins: [StudentApi, PaymentApi, BillingApi, SchoolYearApi, ReportApi],
  headline,
  components: {
    Maintenance,
    FileViewer,
    BillColumn,
    BillPaymentColumn
  },
  data() {
    return {
      student: null,
      selectedTabIndex: 0,
      tabItems: [
        { id: 0, name: 'All' },
        ...BillingStatus.values,
        { id: 4, name: 'Forwarded' },
      ],
      fileViewer: {
        isActiveNavEnabled: false,
        activeNavCount: 0,
        activeNavIndex: 0,
        show: false,
      },
      file: {
        type: null,
        src: null,
        name: null,
        notes: null,
        isLoading: false,
      },
      tables: {
        billings: {
          isBusy: false,
          fields: [
            {
              key: "billingNo",
              label: "Billing No",
              tdClass: "align-middle",
            },
            {
              key: "dueDate",
              label: "Due Date",
              tdClass: "align-middle",
              formatter: (v) => toReadableDate(v)
            },
            {
              key: "previousBalance",
              label: "Previous",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              formatter: formatAccountingNumber
            },
            {
              key: "totalAmount",
              label: "Current",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              formatter: formatAccountingNumber
            },
            {
              key: "totalAmountDue",
              label: "Total",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              formatter: formatAccountingNumber
            },
            {
              key: "totalPaid",
              label: "Paid",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              formatter: formatAccountingNumber
            },
            {
              key: "totalRemainingDue",
              label: "Balance",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              formatter: formatAccountingNumber,
            },
            {
              key: "action",
              label: "",
              tdClass: "align-middle",
              thClass: "text-center",
              thStyle: { width: "50px" }
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
    onTabChange({ item, index }) {
      let params = { billingStatusId: item?.id };

      if (item?.id === this.tabItems.slice(-1)?.[0]?.id) {
        params.isForwarded = 1;
      }

      if (item?.id === this.tabItems.slice(0)?.[0]?.id) {
        delete params.billingStatusId;
      }

      this.selectedTabIndex = index;
      this.loadBillings(this.student.id, params)
    },
    loadBillings(studentId, params) {
      const { billings } = this.tables
      billings.isBusy = true
      this.getBillingsOfStudent(studentId, params).then(({ data }) => {
        billings.items = data.data;
        billings.isBusy = false
      })
    },
    // loadDetails(row) {
    //   const { item } = row
    //   this.$set(item, 'isLoading', true)
    //   if (!row.detailsShowing) {
    //     this.getBillingItemsOfBilling(item.id).then(({ data }) => {
    //       this.$set(item, 'termBillings', data.filter(e => e.termId !== null))
    //       this.$set(item, 'otherBillings', data.filter(e => e.termId === null))
    //       this.$set(item, 'isLoading', false)
    //     })
    //   }
    //   row.toggleDetails()
    // },
    previewBilling(id) {
      this.file.type = null;
      this.file.src = null;
      this.fileViewer.show = true;
      this.file.isLoading = true;
      this.file.name = 'Statement of Account';
      this.previewStatementOfAccount(id).then((response) => {
        this.file.type = response.headers.contentType;
        const file = new Blob([response.data], { type: 'application/pdf' });
        const reader = new FileReader();
        reader.onload = (e) => (this.file.src = e.target.result);
        reader.readAsDataURL(file);
        this.file.isLoading = false;
      });
    },
    isAllowedPayBill(billing){

      if(billing.submittedPayments.length > 0) {
        //prevent pay bill while there's a pending payment
        return false
      }

      if(parseFloat(billing.totalPaid) < parseFloat(billing.totalAmount)) {
        return true
      }

      return false
    }
  },
  // computed: {
  //   getTotalBilling() {
  //     const { billings } = this.tables
  //     var sum = billings.items.reduce((sum, current)=>{
  //       return sum + (parseFloat(current.totalAmount) + parseFloat(current.previousBalance) - parseFloat(current.totalPaid));
  //     }, 0);

  //     return formatNumber(sum, 2);
  //   },
  // }
}
</script>

<style lang="scss" scoped>

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