<template>
  <MainContainer
    :title="`${$options.headline.title}`"
    :description="$options.headline.description">
    <template v-slot:subheader>
      <Tabs
        :activeIndex="selectedTabIndex"
        :items="tabItems"
        @onSelect="onTabChange"
      />
    </template>
    <b-table
      ref="billings"
      class="c-new-table mt-3"
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
        <BillColumn
          :data="row.item"
          @onClick="() => row.item.billingTypeId !== BillingTypes.INITIAL.id
            ? previewBilling(row.item.id)
            : viewAssessment(row.item.academicRecordId)"
        />
      </template>
      <template v-slot:cell(totalPaid)="row">
        <BillPaymentColumn :data="row.item" />
      </template>
      <template v-slot:cell(status)="row">
        <BillStatus :data="row.item" />
      </template>
      <template v-slot:cell(action)="row">
         <b-dropdown
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            boundary="window">
            <template v-slot:button-content>
              <v-icon name="ellipsis-v" />
            </template>
            <b-dropdown-item
              v-if="row.item.billingTypeId !== BillingTypes.INITIAL.id"
              @click="previewBilling(row.item.id)">
              Preview
            </b-dropdown-item>
            <b-dropdown-item
              v-else
              @click="viewAssessment(row.item.academicRecordId)">
              View Assessment
            </b-dropdown-item>
            <b-dropdown-item
              v-if="row.item.billingStatusId !== BillingStatus.PAID.id && !row.item.isForwarded && row.item.pendingPaymentsCount === 0"
              :to="`/payment/${row.item.id}`">
              Pay Bill
            </b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:custom-foot>
        <b-tr class="font-weight-bold">
          <b-td class="text-right pt-3 pb-3" colspan="8">
            BALANCE
          </b-td>
          <b-td class="text-right pt-3 pb-3" colspan="2">
            {{ $options.formatAccountingNumber(tables.billings.totalRemainingBalance)}}
          </b-td>
        </b-tr>
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
    <b-pagination
      class="c-new-pagination"
      :total-rows="tables.billings.totalRows"
      :per-page="tables.billings.perPage"
      @input="onPageChange"
      size="sm"
      align="end"
    />
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
import { formatAccountingNumber, formatNumber, toReadableDate } from "../../../helpers/forms"
import headline from './data/statement';
import FileViewer from '../../components/FileViewer';
import { BillingStatus, BillingTypes } from '../../../helpers/enum';
import BillColumn from '../../components/ColumnDetails/BillColumn';
import BillPaymentColumn from '../../components/ColumnDetails/BillPayment';
import BillStatus from '../../components/ColumnDetails/BillStatus';

export default {
  formatAccountingNumber,
  mixins: [StudentApi, PaymentApi, BillingApi, SchoolYearApi, ReportApi],
  headline,
  components: {
    FileViewer,
    BillColumn,
    BillPaymentColumn,
    BillStatus
  },
  data() {
    return {
      BillingTypes,
      BillingStatus,
      student: null,
      selectedTabIndex: 0,
      tabItems: [
        { id: 0, name: 'All Statements' },
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
          totalRemainingBalance: 0,
          isBusy: false,
          perPage: 10,
          totalRows: 100,
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
              key: "systemNotes",
              label: "Description",
              tdClass: "align-middle",
              thStyle: { width: "25%" }
            },
            {
              key: "status",
              label: "Status",
              tdClass: "align-middle",
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
  watch: {
    // 'tables.billings.page': function(value) {
    //   this.loadBillings(this.student.id, { page: value });
    // }
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
      this.getBillingsOfStudent(studentId, params).then(({ data: { data, meta } }) => {
        billings.items = data;
        billings.totalRows = meta?.total;
        billings.isBusy = false
        billings.totalRemainingBalance = meta?.totalRemainingBalance || 0;
      })
    },
    onPageChange(page) {
      this.loadBillings(this.student.id, { page });
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
    viewAssessment(academicRecordId) {
      this.file.type = null
      this.file.src = null
      this.file.notes = null
      this.file.isLoading = true
      this.file.owner = null;
      this.file.name = 'Assessment Form'
      this.fileViewer.show = true;
      this.getAssessmentFormPreview(academicRecordId)
        .then(response => {
          this.file.type = response.headers.contentType
          const file = new Blob([response.data], { type: "application/pdf" } )
          const reader = new FileReader();
          reader.onload = e => this.file.src = e.target.result
          reader.readAsDataURL(file);
          this.file.isLoading = false
      })
    },
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
  //   isAllowedPayBill(billing){

  //     if(billing.submittedPayments.length > 0) {
  //       //prevent pay bill while there's a pending payment
  //       return false
  //     }

  //     if(parseFloat(billing.totalPaid) < parseFloat(billing.totalAmount)) {
  //       return true
  //     }

  //     return false
  //   }
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