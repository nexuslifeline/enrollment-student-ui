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
                  ? 'success'
                  : data.item.paymentStatusId === PaymentStatuses.SUBMITTED.id
                  ? 'warning'
                  : 'danger'
              "
            >
              {{ data.item.paymentStatusId === PaymentStatuses.SUBMITTED.id ? 'Pending' : PaymentStatuses.getEnum(data.item.paymentStatusId).name }}
            </b-badge>
      </template>
      <template v-slot:row-details="data">
        <b-overlay :show="data.item.isLoading" rounded="sm">
          <div class="p-4 mb-4">
            <h5>Attachments</h5>
            <AttachmentList
              :items="data.item.files"
              titleKey="name"
              descriptionKey="notes"
              documentTypeKey="documentType"
              @onAttachmentItemDownload="
                (file) => downloadFile(file, data)
              "
              @onAttachmentItemView="
                (file) => previewFile(file, data)
              "
            />
            <h6 v-if="!data.item.files.length > 0"> No Attachment Files</h6>
          </div>

          <div class="p-4 mb-4">
            <h5>Receipt Files</h5>
            <AttachmentList
              :items="data.item.paymentReceiptFiles"
              titleKey="name"
              descriptionKey="notes"
              documentTypeKey="documentType"
              @onAttachmentItemDownload="
                (file) => downloadReceiptFile(file, data)
              "
              @onAttachmentItemView="
                (file) => previewReceiptFile(file, data)
              "
            />
            <h6 v-if="!data.item.paymentReceiptFiles.length > 0"> No Receipt Files</h6>
          </div>
        </b-overlay>
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
              @click="loadDetails(row)" >
              {{ row.detailsShowing ? 'Hide Details' : 'View Details'}}
            </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
    <FileViewer
      :show="fileViewer.paymentFile.show"
      :file="file"
      :isBusy="file.isLoading"
      :owner="file.owner"
      @close="fileViewer.paymentFile.show = false"
      @onNavLeft="onFileNavLeft"
      @onNavRight="onFileNavRight"
      :navCount="fileViewer.paymentFile.activeNavCount"
      :navActiveIndex="fileViewer.paymentFile.activeNavIndex"
      :enableArrowNav="fileViewer.paymentFile.isActiveNavEnabled"
    />
    <FileViewer
      :show="fileViewer.paymentReceiptFile.show"
      :file="file"
      :isBusy="file.isLoading"
      :owner="file.owner"
      @close="fileViewer.paymentReceiptFile.show = false"
      @onNavLeft="onPaymentReceiptFileNavLeft"
      @onNavRight="onPaymentReceiptFileNavRight"
      :navCount="fileViewer.paymentReceiptFile.activeNavCount"
      :navActiveIndex="fileViewer.paymentReceiptFile.activeNavIndex"
      :enableArrowNav="fileViewer.paymentReceiptFile.isActiveNavEnabled"
    />
  </div>
</template>

<script>
import { PaymentApi, PaymentFileApi, PaymentReceiptFileApi } from "../../../mixins/api";
import FileViewer from "../../components/FileViewer";
import headline from './data/payment';
import { formatNumber } from '../../../helpers/forms'
import { PaymentStatuses } from '../../../helpers/enum'
import AttachmentList from  '../../components/Attachment/AttachmentList'

export default {
  mixins: [ PaymentApi, PaymentFileApi, PaymentReceiptFileApi ],
  headline,
  components: { AttachmentList, FileViewer  },
  data() {
    return {
      showModalPreview : false,
      PaymentStatuses,
      fileViewer: {
        paymentFile: {
          isActiveNavEnabled: false,
          activeNavCount: 0,
          activeNavIndex: 0,
          show: false,
        },
        paymentReceiptFile: {
          isActiveNavEnabled: false,
          activeNavCount: 0,
          activeNavIndex: 0,
          show: false,
        },
      },
      file: {
        type: null,
        src: null,
        name: null,
        notes: null,
        isLoading: false,
      },
      lastActivePayment: null,
      lastActiveFile: null,
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
    loadDetails(row) {
      const { item } = row
      this.$set(item, 'isLoading', true)
      if (!row.detailsShowing) {
        this.getPayment(item.id).then(({ data }) => {
          this.$set(item, 'files', data.files)
          this.$set(item, 'paymentReceiptFiles', data.paymentReceiptFiles)
          this.$set(item, 'isLoading', false)
        })

      }
      row.toggleDetails()
    },
    downloadFile(row, data) {
      const { paymentId, id, name } = row.item;

      this.getPaymentFilePreview(paymentId, id).then((response) => {
        const fileUrl = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers.contentType,
          })
        );
        const reader = new FileReader();
        reader.onload = (e) => (this.file.src = e.target.result);
        const fileLink = document.createElement('a');

        fileLink.href = fileUrl;
        fileLink.setAttribute('download', name);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    previewFile(row, data) {
      this.setupActiveFileViewer(row, data);
      const { paymentId, id, name, notes } = row.item;
      this.file.type = null;
      this.file.src = null;
      this.file.name = name;
      this.file.notes = notes;
      this.fileViewer.paymentFile.show = true;
      this.file.owner = data.item.student;
      this.file.isLoading = true;
      this.getPaymentFilePreview(paymentId, id).then((response) => {
        console.log(response)
        this.file.type = response.headers.contentType;
        this.file.isLoading = false;
        const file = new Blob([response.data], {
          type: response.headers.contentType,
        });
        const reader = new FileReader();
        reader.onload = (e) => (this.file.src = e.target.result);
        reader.readAsDataURL(file);
      });
    },
    downloadReceiptFile(row, data) {
      const { paymentId, id, name } = row.item;

      this.getPaymentReceiptFilePreview(paymentId, id).then((response) => {
        const fileUrl = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers.contentType,
          })
        );
        const reader = new FileReader();
        reader.onload = (e) => (this.file.src = e.target.result);
        const fileLink = document.createElement('a');

        fileLink.href = fileUrl;
        fileLink.setAttribute('download', name);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    previewReceiptFile(row, data) {
      this.setupPaymentReceiptActiveFileViewer(row, data);
      const { paymentId, id, name, notes } = row.item;
      this.file.type = null;
      this.file.src = null;
      this.file.name = name;
      this.file.notes = notes;
      this.fileViewer.paymentReceiptFile.show = true;
      this.file.owner = data.item.student;
      this.file.isLoading = true;
      this.getPaymentReceiptFilePreview(paymentId, id).then((response) => {
        this.file.type = response.headers.contentType;
        this.file.isLoading = false;
        const file = new Blob([response.data], {
          type: response.headers.contentType,
        });
        const reader = new FileReader();
        reader.onload = (e) => (this.file.src = e.target.result);
        reader.readAsDataURL(file);
      });
    },
    getCurrentPaymentFiles() {
      const { files } = this.lastActivePayment?.item;
      return files;
    },
    getCurrentPaymentReceiptFiles() {
      const { paymentReceiptFiles } = this.lastActivePayment?.item;
      return paymentReceiptFiles;
    },
    getCurrentFileIndex() {
      const { index } = this.lastActiveFile;
      return index;
    },
    onFileNavLeft() {
      const files = this.getCurrentPaymentFiles();
      let currentIdx = this.getCurrentFileIndex();
      const isFirst = currentIdx === 0;
      currentIdx = isFirst ? files.length - 1 : currentIdx - 1;
      const file = files[currentIdx];
      const currentFileItem = {
        ...this.lastActiveFile,
        index: currentIdx,
        item: file,
      };
      this.previewFile(currentFileItem, this.lastActivePayment);
    },
    onFileNavRight() {
      const files = this.getCurrentPaymentFiles();
      let currentIdx = this.getCurrentFileIndex();
      const isLast = currentIdx === files.length - 1;
      currentIdx = isLast ? 0 : currentIdx + 1;
      const file = files[currentIdx];
      const currentFileItem = {
        ...this.lastActiveFile,
        index: currentIdx,
        item: file,
      };
      this.previewFile(currentFileItem, this.lastActivePayment);
    },
    onPaymentReceiptFileNavLeft() {
      const files = this.getCurrentPaymentReceiptFiles()
      let currentIdx = this.getCurrentFileIndex();
      const isFirst = currentIdx === 0;
      currentIdx = isFirst ? files.length - 1 : currentIdx - 1;
      const file = files[currentIdx];
      const currentFileItem = {
        ...this.lastActiveFile,
        index: currentIdx,
        item: file,
      };
      this.previewReceiptFile(currentFileItem, this.lastActivePayment);
    },
    onPaymentReceiptFileNavRight() {
      const files = this.getCurrentPaymentReceiptFiles()
      let currentIdx = this.getCurrentFileIndex();
      const isLast = currentIdx === files.length - 1;
      currentIdx = isLast ? 0 : currentIdx + 1;
      const file = files[currentIdx];
      const currentFileItem = {
        ...this.lastActiveFile,
        index: currentIdx,
        item: file,
      };
      this.previewReceiptFile(currentFileItem, this.lastActivePayment);
    },
    setupActiveFileViewer(row, data) {
      this.lastActivePayment = data;
      this.lastActiveFile = row;
      this.fileViewer.paymentFile.isActiveNavEnabled =
        data?.item?.files?.length > 1;
      this.fileViewer.paymentFile.activeNavCount = data?.item?.files?.length;
      this.fileViewer.paymentFile.activeNavIndex = row.index;
    },
    setupPaymentReceiptActiveFileViewer(row, data) {
      console.log('set p r')
      console.log(data)
      this.lastActivePayment = data;
      this.lastActiveFile = row;
      this.fileViewer.paymentReceiptFile.isActiveNavEnabled = data?.item?.paymentReceiptFiles?.length > 1;
      this.fileViewer.paymentReceiptFile.activeNavCount = data?.item?.paymentReceiptFiles?.length;
      this.fileViewer.paymentReceiptFile.activeNavIndex = row.index;
      console.log(this.fileViewer)
    },
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