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
        <BillStatusColumn :data="row.item" />
      </template>
      <template v-slot:cell(type)="row">
        <BillTypeColumn :data="row.item" />
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
        <b-tr class="font-weight-bold table-dark">
          <b-td class="text-right pt-2 pb-2" colspan="7">
            Total Balance (Unpaid)
          </b-td>
          <b-td class="text-right pt-2 pb-2" colspan="2">
            {{ $options.formatAccountingNumber(tables.billings.totalRemainingBalance)}}
          </b-td>
          <b-td />
        </b-tr>
      </template>
    </b-table>
    <b-pagination
      class="c-new-pagination"
      :total-rows="tables.billings.totalRows"
      :per-page="tables.billings.perPage"
      @input="onPageChange"
      size="sm"
      align="end"
    />
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
import { formatAccountingNumber, toReadableDate } from "../../../helpers/forms"
import headline from './data/statement';
import FileViewer from '../../components/FileViewer';
import { BillingStatus, BillingTypes } from '../../../helpers/enum';
import BillColumn from '../../components/ColumnDetails/BillColumn';
import BillPaymentColumn from '../../components/ColumnDetails/BillPayment';
import BillStatusColumn from '../../components/ColumnDetails/BillStatus';
import BillTypeColumn from '../../components/ColumnDetails/BillType';

export default {
  formatAccountingNumber,
  mixins: [StudentApi, PaymentApi, BillingApi, SchoolYearApi, ReportApi],
  headline,
  components: {
    FileViewer,
    BillColumn,
    BillPaymentColumn,
    BillStatusColumn,
    BillTypeColumn,
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
            },
            {
              key: "type",
              label: "Type",
            },
            {
              key: "previousBalance",
              label: "Previous",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              formatter: (v) => formatAccountingNumber(v)
            },
            {
              key: "totalAmount",
              label: "Current",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              formatter: (v) => formatAccountingNumber(v)
            },
            // {
            //   key: "totalAmountDue",
            //   label: "Total",
            //   tdClass: "align-middle text-right",
            //   thClass: "text-right",
            //   formatter: (v) => formatAccountingNumber(v)
            // },
            {
              key: "totalPaid",
              label: "Paid",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              formatter: (v) => formatAccountingNumber(v)
            },
            {
              key: "totalRemainingDue",
              label: "Balance",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              formatter: (v) => formatAccountingNumber(v)
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
      }
    }
  },
  created() {
    this.student = this.$store.state?.user;
  },
  methods: {
    onTabChange({ item, index }) {
      const params = { billingStatusId: item?.id };

      if (item?.id === this.tabItems.slice(-1)?.[0]?.id) {
        params.isForwarded = 1;
        delete params.billingStatusId;
      }

      this.selectedTabIndex = index;
      this.loadBillings(this.student.id, params)
    },
    loadBillings(studentId, params) {
      const { billings } = this.tables
      billings.isBusy = true
      this.getBillingsOfStudent(studentId, params).then(({ data: { data, meta } }) => {
        billings.items = data.map(
          v => ({ ...v, _rowVariant: v?.isForwarded || v?.billingStatusId === BillingStatus.PAID.id ? 'secondary' : '' })
        );
        billings.totalRows = meta?.total;
        billings.isBusy = false
        billings.totalRemainingBalance = meta?.totalRemainingBalance || 0;
      })
    },
    onPageChange(page) {
      this.loadBillings(this.student.id, { page });
    },
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
  },
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